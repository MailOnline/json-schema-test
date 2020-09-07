declare function jsonSchemaTest(
  validators: jsonSchemaTest.Validator[],
  opts: jsonSchemaTest.Options
): void;

declare namespace jsonSchemaTest {
  type ValidationError = any;

  type Schema = Record<string, unknown> | boolean;

  interface Validator {
    validate(
      schema: Schema,
      data: unknown
    ): boolean | Promise<boolean | unknown>;
    errors?: ValidationError[] | null;
  }

  interface Options {
    description?: string;
    suites: Record<string, Suites>;
    async?: boolean;
    asyncValid?: "data";
    afterEach?: (res: TestResult) => void;
    afterError?: (res: TestResult) => void; // res.passed === false
    log?: boolean; // pass false to prevent logging
    only?: true | string[]; // names of TestSuite or filenames or true to perform only these tests
    skip?: true | string[]; // skip all or some tests
    cwd?: string; // working dir, pass __dirname to use paths relative to the module
    hideFolder?: string;
    timeout?: number;
    assert?: Assert;
  }

  type Suites = SuitesPath | TestSuite[] | TestSuitePath[];

  type SuitesPath = string; // glob pattern

  interface TestSuite {
    name: string;
    test: TestGroup[];
  }

  interface TestSuitePath {
    name: string;
    path: string;
  }

  interface TestGroup {
    description: string;
    schema?: Schema | string;
    schemas?: (Schema | string)[];
    tests: Test[];
  }

  interface Test {
    description: string;
    data: unknown;
    valid?: boolean;
    error?: string;
  }

  interface TestResult {
    validator: Validator;
    schema: Schema;
    data: unknown;
    valid: boolean; // validation result
    expected: boolean; // expected validation result
    errors: ValidationError[] | null; // validation errors if valid === false
    passed: boolean; // true if valid == expected
  }

  interface Assert {
    (ok: boolean): void;
    equal: (x: unknown, y: unknown) => void;
  }
}

export = jsonSchemaTest;
