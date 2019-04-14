'use strict';

var AWS = require('aws-sdk');
var dynamoDbClient = new AWS.DynamoDB.DocumentClient({'region': process.env.REGION});

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!' + ", Region: " + process.env.REGION,
      input: event,
    }),
  };
};

module.exports.getAllConfigs = async (event) => {
  try {
    const data = await dynamoDbClient.scan({TableName: "tdp_config"}).promise();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify(e) };
  }
};
