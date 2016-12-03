'use strict';

var jsonSchemaTest = require('..');
var Ajv = require('ajv');
var ajv = new Ajv;

jsonSchemaTest(ajv, {
  description: 'failing tests',
  suites: {
    'tests': './tests/*.fail.json'
  },
  cwd: __dirname
});
