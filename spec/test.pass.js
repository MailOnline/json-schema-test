'use strict';

var jsonSchemaTest = require('..');
var Ajv = require('ajv');
var ajv = new Ajv;
var assert = require('assert');

describe('passing tests', () => {
  var hookCalled;

  beforeEach(() => hookCalled = undefined);

  jsonSchemaTest(ajv, {
    description: 'passing tests',
    suites: { 'tests': './tests/*.pass.json' },
    cwd: __dirname,
    afterEach: () => hookCalled = true
  });

  jsonSchemaTest([ajv, ajv], {
    description: 'passing tests, two validators',
    suites: { 'tests': './tests/*.json' },
    cwd: __dirname,
    skip: [
      'standard.fail',
      'standard.fail.async',
      'standard.pass.async'
    ],
    afterEach: () => hookCalled = true
  });

  afterEach(() => assert(hookCalled));
});

jsonSchemaTest(ajv, {
  description: 'passing async tests',
  async: true,
  suites: { 'tests': './tests/*.pass.async.json' },
  cwd: __dirname
});

jsonSchemaTest([ajv, ajv], {
  description: 'passing async tests, two validators',
  async: true,
  suites: { 'tests': './tests/*.pass.async.json' },
  cwd: __dirname
});
