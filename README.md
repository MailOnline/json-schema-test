# json-schema-test
Testing JSON schemas against sample data


In progress ...


## Install

```
npm install json-schema-test
```


## Usage


Inside mocha test (global describe etc. should be avaliable):

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
