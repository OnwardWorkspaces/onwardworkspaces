const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const keys = require("./key.json");
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

let projectId = keys?.project_id; // Get this from Google Cloud
let keyFilename = "services/profilePicture/key.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("tume_meta"); // Get this from Google Cloud -> Storage

exports.uploadThumb = async (file, res) => {
  console.log("Made it /upload");
  try {
    if (file) {
      console.log("File found, trying to upload...");
      const path = "camp/" + new Date().getTime() + '.jpg';
      const bucketRes = await bucket.file(path).save(file?.data);
      console.log('response from bucket', bucketRes);
      if (!bucketRes) {
        return {
          statusCode: 200,
          path: path,
          message: "SUCCESS"
        }
      }
      // });
      // blobStream.end(file.data);
    } else throw "error with img";
  } catch (error) {
    console.log('error while uploading', error);
    return {
      statusCode: 500,
      message: "ERROR",
      error: error
    }
  }
}
