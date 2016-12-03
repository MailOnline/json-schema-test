'use strict';

var jsonSchemaTest = require('..');
var Ajv = require('ajv');
var ajv = new Ajv;
var assert = require('assert');

describe('failing tests', () => {
  var hookCalled;

  beforeEach(() => hookCalled = undefined);

  jsonSchemaTest(ajv, {
    description: 'failing tests',
    suites: { 'tests': './tests/*.fail.json' },
    cwd: __dirname,
    afterError: () => hookCalled = true
  });

  afterEach(() => assert(hookCalled));
});

jsonSchemaTest(ajv, {
  description: 'failing async tests',
  async: true,
  suites: { 'tests': './tests/*.fail.async.json' },
  cwd: __dirname
});
