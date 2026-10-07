const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Returns configured Cloudflare R2 S3Client
 */
function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

/**
 * Upload Image / Video to Cloudflare R2 with automatic WebP compression
 * @param {Object} file - The file object from express-fileupload (file.data, file.name, file.mimetype)
 * @param {string} folder - Target subfolder (e.g. 'property', 'cities', 'Blog', 'clientale')
 */
exports.uploadImage = async (file, folder = 'general') => {
  try {
    if (!file || !file.data) {
      throw new Error("No file provided for upload");
    }

    const originalName = file.name || "upload";
    const ext = path.extname(originalName).toLowerCase().replace(".", "");
    const mimeType = file.mimetype || "";

    let processedBuffer = file.data;
    let finalExt = ext;
    let contentType = mimeType || "application/octet-stream";

    const isSvg = ext === "svg" || mimeType.includes("svg");
    const isVideo = ["mp4", "webm", "mov", "avi", "mkv"].includes(ext) || mimeType.startsWith("video/");
    const isImage = !isSvg && !isVideo && (
      ["png", "jpg", "jpeg", "webp", "gif", "avif", "tiff", "bmp"].includes(ext) ||
      mimeType.startsWith("image/")
    );

    // If it is a raster image, compress and convert to WebP format
    if (isImage) {
      try {
        processedBuffer = await sharp(file.data)
          .webp({ quality: 80, effort: 4 })
          .toBuffer();
        finalExt = "webp";
        contentType = "image/webp";
      } catch (sharpErr) {
        console.warn("Sharp WebP conversion warning, using original buffer:", sharpErr.message);
      }
    } else if (isSvg) {
      finalExt = "svg";
      contentType = "image/svg+xml";
    } else if (isVideo) {
      finalExt = ext || "mp4";
      contentType = mimeType || `video/${finalExt}`;
    }

    const timestamp = Date.now();
    const key = `onward/${folder}/${timestamp}.${finalExt}`;
    const r2Client = getR2Client();

    if (r2Client) {
      const bucketName = process.env.R2_BUCKET_NAME || "onward-website";
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: processedBuffer,
        ContentType: contentType
      });

      await r2Client.send(command);

      const publicBaseUrl = (process.env.R2_PUBLIC_URL || "https://pub-378f88a78cba4484be6bf66065e91a59.r2.dev").replace(/\/+$/, "");
      const publicUrl = `${publicBaseUrl}/${key}`;

      console.log(`[R2 Upload Success] -> ${publicUrl}`);

      return {
        statusCode: 200,
        url: publicUrl,
        message: "SUCCESS"
      };
    } else {
      // Local fallback in public/uploads/<folder>
      const uploadDir = path.join(__dirname, `../../public/uploads/${folder}`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filename = `${timestamp}.${finalExt}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, processedBuffer);

      const localUrl = `/uploads/${folder}/${filename}`;
      console.log(`[Local Upload Fallback] -> ${localUrl}`);

      return {
        statusCode: 200,
        url: localUrl,
        message: "SUCCESS"
      };
    }
  } catch (error) {
    console.error("Error while uploading file:", error);
    return {
      statusCode: 500,
      message: "ERROR",
      error: error.message || error
    };
  }
};

/**
 * Delete file from Cloudflare R2
 */
exports.deleteImage = async (fileKey) => {
  try {
    if (!fileKey) return { statusCode: 400, message: "File key required" };

    const r2Client = getR2Client();
    if (r2Client) {
      const bucketName = process.env.R2_BUCKET_NAME || "onward-website";
      const cleanKey = fileKey.replace(/^https?:\/\/[^\/]+\//, "");
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: cleanKey
      });
      await r2Client.send(command);
    }
    return { statusCode: 200, message: "SUCCESS" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { statusCode: 500, message: "ERROR", error: error.message || error };
  }
};