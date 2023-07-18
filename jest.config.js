require('dotenv').config();
module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './report.html',
        expand: true,
        includeFailureMsg: true, // include error messages
      },
    ],
  ],
};
