require('dotenv').config({
    path: './../../.env'
})
let axios = require('axios'),
    awsSdk = require('aws-sdk'),
    {
        stream,
        PassThrough
    } = require('stream');
const { response } = require('express');

awsSdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const s3 = new awsSdk.S3();


const uploadFromStream = (
    fileResponse,
    fileName,
    bucket,
) => {

    const passThrough = new PassThrough();
    const promise = s3
        .upload({
            Bucket: bucket,
            Key: `raw/${fileName}`,
            ContentType: fileResponse.headers['content-type'],
            ContentLength: fileResponse.headers['content-length'],
            Body: passThrough,
        })
        .promise();
    return {
        passThrough,
        promise
    };
};


const downloadFile = async (fileUrl) => {
    return axios.get(fileUrl, {
        responseType: 'stream',
    });
};

exports.doS3Upload = async (fileUrl, bucket, fileName ) => {

    const responseStream = await downloadFile(fileUrl);
  
    const { passThrough, promise } = uploadFromStream(responseStream, fileName, bucket);
  
    responseStream.data.pipe(passThrough);
  
    return promise
      .then((result) => {
        return result.Location;
      })
      .catch((e) => {
        throw e;
      });

}