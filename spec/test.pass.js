'use strict';

var jsonSchemaTest = require('..');
var Ajv = require('ajv');
var ajv = new Ajv;
var assert = require('assert');

jsonSchemaTest(ajv, {
  description: 'passing tests',
  suites: {
    'tests': './tests/*.pass.json'
  },
  cwd: __dirname
});
