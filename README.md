# json-schema-test
Testing JSON schemas against sample data

[![Build Status](https://travis-ci.org/MailOnline/json-schema-test.svg?branch=master)](https://travis-ci.org/MailOnline/json-schema-test)
[![npm version](https://badge.fury.io/js/json-schema-test.svg)](http://badge.fury.io/js/json-schema-test)
[![Coverage Status](https://coveralls.io/repos/github/MailOnline/json-schema-test/badge.svg?branch=master)](https://coveralls.io/github/MailOnline/json-schema-test?branch=master)


## Install

```
npm install json-schema-test
```


## Usage

The module is designed to be used inside mocha test (global describe etc. should be avaliable).

Example usage:

```javascript
var jsonSchemaTest = require('json-schema-test');

jsonSchemaTest([ ajv, tv4 ], {
  description: 'My schema tests',
  suites: {
    'JSON-Schema tests draft4': './JSON-Schema-Test-Suite/tests/draft4/{**/,}*.json',
    'Advanced schema tests': './tests/{**/,}*.json'
  },
  // async: true,
  // asyncValid: true, // or 'data', deafult is true
  afterEach: afterEachFunc,
  // afterError: afterErrorFunc,
  log: false,
  only: ONLY_FILES,
  skip: SKIP_FILES,
  cwd: __dirname,
  hideFolder: 'draft4/',
  timeout: 10000,
  assert: chai.assert
});

function afterEachFunc(result) {
  // result is an object with properties:
  //   validator, schema, data,
  //   valid (validation result), expected (expected validation result),
  //   errors (array of errors or null), passed (true if valid == expected)

  // you can do some additional validation and logging
  // ...
  console.log(res);

  // Pass option log == false to prevent default error logging

  // If result.passed is false the test will fails after this function returns
}
```


## Test files format

The library runs tests defined in JSON consructed using the same format as the tests in [JSON-Schema-Tests-Suite](https://github.com/json-schema/JSON-Schema-Test-Suite).

Each test file should have this format:

```javascript
[
  { // schema to be tested, there can be multiple schemas in each file
    // only: true,  // only this schema will be tested
    // skip: true,  // skip this schema
    description: 'The description is shown in the test report',
    // schema object or reference if the validator supports it
    schema: { ... } // or 'http://schema.example.com/schema.json#',
    // schemas: []  // array of schema objects or refs (schema property won't be used)
    tests: [        // test cases for the schema
      {
        // only: true,  // only this data sample will be tested
        // skip: true,  // skip this data sample
        description: 'valid data',        // shown in report
        data: { ... },                    // data object (can be any type)
        // dataFile: './valid_data.json', // or the relative path to the file
        valid: true                       // whether the data is valid for schema
      },
      {
        description: 'invalid data',
        data: { ... },
        // dataFile: './channel_new_panel_sample.json',
        'valid': false
      }
      // , ...
    ]
  }
  // , ...
]
```

The schema for the test file is in [test_file_schema.json](https://github.com/MailOnline/json-schema-test/blob/master/test_file_schema.json).


## Parameters

```
jsonSchemaTest(valdator, options)
```


##### validator

Validator instance to be used or array of validator instances (in which case each test will run with each instance).

Validator should have `validate(schema, data)` method and after validation should have errors property (array in case of failure, empty array or null in case of success).

If validator instance has different API you can use [json-schema-consolidate](https://github.com/epoberezkin/json-schema-consolidate) as adapter (or just use some simple adaptor function).


##### options

- _description_ - optional top level suite name (passed to top level describe).
- _suites_ - the map of test suite names and paths to test files. Names are used in test report, paths are passed to [glob](https://github.com/isaacs/node-glob) module. Instead of glob paths, the array of filenames (objects with `name` and `path` properties) of of actual tests (objects with `name` and `test` properties) can be passed.
- _async_ - pass `true` if validate function is asynchronous and returns the Promise. The promise should resolve with true or reject with the exception that has `.errors` property (array of errors). The promise may also reject with any error (and if it is the expected result, the test case in json file should specify `error` property with the message instead of `valid` property). That is the asynchronous api of [Ajv](https://github.com/epoberezkin/ajv) - use an adaptor in case you are using some validator with a different api. It's safe to use async option if some results are synchronous, the results will simply be wrapped in the promise.
- _asyncValid_ - pass 'data' if in case of successful validation promise resolves with validated data. Otherwise, `true` will be expected.
- _afterEach_ - the function that will be called after each test. The function is passed an object with properties validator, schema, data, valid, expected, errors, passed (see above in example).
- _afterError_ - the function that is called if the test fails (the same result is passed as to _afterEach_ function).
- _log_ - log errors, true by default. Pass `false` to prevent default error logging.
- _only_
  - `true` to test only these suites
  - array of files to be tested (only the last element of the path and the name without `.json` extension).
- _skip_
  - `true` to skip all suites
  - array of files to skip.
- _cwd_ - base path for files, passed to glob. Use `__dirname` to pass paths relative to the module in `suites` option.
- _hideFolder_ - don't show this folder name in test reports (files will be shown without folder).
- _timeout_ - mocha test timeout in ms, 2000 by default.
- _assert_ - optional assertions library. If not specified `assert` from nodejs will be used that can be undesired when used in the browser.
- _Promise_ - Promise class used by validator in async mode. Only used if `async` option is true.


## License

[MIT](https://github.com/MailOnline/json-schema-test/blob/master/LICENSE)
