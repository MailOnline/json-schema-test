# json-schema-test
Testing JSON schemas against sample data

[![npm version](https://badge.fury.io/js/json-schema-test.svg)](http://badge.fury.io/js/json-schema-test)


## Install

```
npm install json-schema-test
```


## Usage

The module is designed to be used inside mocha test (global describe etc. should be avaliable).

Example usage:

```
var jsonSchemaTest = require('json-schema-test');

jsonSchemaTest([ ajv, tv4 ], {
  suites: {
    'JSON-Schema tests draft4': './JSON-Schema-Test-Suite/tests/draft4/{**/,}*.json',
    'Advanced schema tests': './tests/{**/,}*.json'
  },
  only: ONLY_FILES,
  skip: SKIP_FILES,
  cwd: __dirname,
  hideFolder: 'draft4/'
});
```


## Test files format

The library runs tests defined in JSON consructed using the same format as the tests in [JSON-Schema-Tests-Suite](https://github.com/json-schema/JSON-Schema-Test-Suite).

Each test file should have this format:

```
[
  { // schema to be tested, there can be multiple schemas in each file
    // only: true,  // only this schema will be tested
    // skip: true,  // skip this schema
    description: 'The description is shown in the test report',
    // schema object or reference if the validator supports it
    schema: { ... } // or 'http://schema.example.com/schema.json#',
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


## Parameters

```
jsonSchemaTest(valdator, options)
```


##### validator

Validator instance to be used or array of validator instances (in which case each test will run with each instance).

Validator should have `validate(schema, data)` method and after validation should have errors property (array in case of failure, empty array or null in case of success).

If validator instance has different API you can use [json-schema-consolidate](https://github.com/epoberezkin/json-schema-consolidate) as adapter (or just use some simple adaptor function).


##### options

- _suites_ - the map of test suite names and paths to test files. Names are used in test report, paths are passed to [glob](https://github.com/isaacs/node-glob) module.
- _only_ - array of files to be tested (only last element of the path and the name without `.json` extension)
- _skip_ - array of files to skip
- _cwd_ - base path for files, passed to glob. Use `__dirname` to pass paths relative to the module in `suites` option
- _hideFolder_ - don't show this folder name in test reports (files will be shown without folder)


## License

[MIT](https://github.com/MailOnline/json-schema-test/blob/master/LICENSE)
