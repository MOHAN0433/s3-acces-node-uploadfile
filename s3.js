const parse = require('lambda-multipart-parser')

const uploadFi  =  (event) => {
    const { file, fields } =  parse.parseFormData(event);
    const tags = { filename: file.filename };
    try {
       s3Client
        .putObject({
          //bucket name
          Bucket: BUCKET_NAME,
          Key: fields.filename || file.filename,
          Body: file.content,
          Tagging: queryString.encode(tags),
        })
        .promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ description:'file create', result:'ok' }),
      };
    } catch (_error) {
      // this is not ideal error handling, but good enough for the purpose of this example
      return {
        statusCode: 409,
        body: JSON.stringify({ description: 'something went wrong', result: 'error' })
      }
    }
  };

  module.exports = {
    uploadFi,
  }