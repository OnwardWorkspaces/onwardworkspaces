const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

var s3 = new AWS.S3();

//configuring parameters
exports.uploadImage = async (file, folder) => {
  console.log("Made it /upload", file);
  try {
    if (file) {
      console.log("File found, trying to upload...");
      let type = file.name.split(".");
      type = type[type.length - 1];
      var params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: file.data,
        Key: "onward/" + folder + "/" + Date.now() + "." + type,
        ACL: 'public-read'
      };
      if (type == "svg")
        params = { ...params, ContentType: "image/svg+xml" }
      const resp = await s3.upload(params).promise();
      console.log('response from s3', resp);
      if (resp)
        return {
          statusCode: 200,
          url: resp.Location,
          message: "SUCCESS"
        }
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

exports.deleteImage = async (path) => {
  try {
    if (path) {
      console.log('path to delete obj', "aahilya/" + path);
      var params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: "aahilya/" + path
      };
      s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);  // error
        else {
          console.log(data);
          return {
            statusCode: 200,
            message: "SUCCESS"
          }
        }
      });
    } else
      throw "image path is required!";
  } catch (error) {
    console.log('error while uploading', error);
    return {
      statusCode: 500,
      message: "ERROR",
      error: error
    }
  }
}