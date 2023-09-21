const parse = require('lambda-multipart-parser')

const uploadFile  = async (event) => {
    const { file, fields } = await parse.parse(event);
    const tags = { filename: file.filename };
    try {
      await s3Client
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

  module.exports ={
    uploadFile
  }