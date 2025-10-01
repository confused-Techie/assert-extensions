# Assert Extensions

Simple extensions to use within the Built-In NodeJS Assert module.

Allowing for expect statements to be written much more similarly to those that exist in Jest.

## `assert.toHaveLength(actual, expected[, message])`

* `actual`: `<array>`
* `expected`: `<number>`
* `message`: `<string>` | `<Error>`

Expects the array to have the length supplied.

## `assert.toBeCloseTo(actual, expected, numDigits[, message])`

* `actual`: `<number>`
* `expected`: `<number>`
* `numDigits`: `<number>`
* `message`: `<string>` | `<Error>`

Expects the actual number to be within the range defined by numDigits as expected.

## `assert.toBeFalsy(actual[, message])`

* `actual`: `<any>`
* `message`: `<string>` | `<Error>`

Expects the actual to be a falsy value.

Passes in the following cases:

* Actual is a `boolean` and is `false`.
* Actual is a `number` and is `0` or `NaN`.
* Actual is a `string` and has a length of `0`.
* Actual is `undefined`.
* Actual is `null`.
* Actual is none of the above types.
