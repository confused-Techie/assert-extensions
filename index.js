const assert = require("node:assert");

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;

  let messageToDisplay = obj.message;

  if (typeof obj.message != "string" || obj.message.length == 0) {
    // We need to craft our own message.
    switch(obj.operator) {
      case "toHaveLength":
        messageToDisplay = `Expected Item Length of: ${obj.expected}; Got: ${obj.actual}`;
        break;
      default:
        messageToDisplay = `Expected: ${obj.expected}; Got: ${obj.actual}`;
        break;
    }
  }
  throw new Error(messageToDisplay);
}

function argCheck() {
  if (arguments[0].length < 2) {
    throw new Error("MISSING_ARGS");
  }
}

// Type Checks
assert.toBeString = (actual, message) => {
  if (typeof actual === "string") {
    return;
  } else {
    innerFail({
      actual: actual, expected: "string", message, operator: "toBeString", stacksStartFn: toBeString
    });
  }
};

assert.toHaveLength = (actual, expected, message) => {
  argCheck(arguments);

  if (actual.length !== expected) {
    innerFail({
      actual: actual.length,
      expected,
      message,
      operator: "toHaveLength",
      stacksStartFn: toHaveLength
    });
  }
};

assert.toBeCloseTo = (actual, expected, numDigits, message) => {
  argCheck(arguments);

  let precision = numDigits ?? 2;

  let expectedDiff = Math.pow(10, -precision);
  let receivedDiff = Math.abs(expected - actual);
  let pass = receivedDiff < expectedDiff;

  if (!pass) {
    innerFail({
      actual: actual, expected, message, operator: "toBeCloseTo", stacksStartFn: toBeCloseTo
    });
  }
};

assert.toBeFalsy = (actual, message) => {
  if (typeof actual === "boolean") {
    if (actual === false) {
      return;
    } else {
      innerFail({actual, expected: "falsy", message, operator: "toBeFalsy", stacksStartFn: toBeFalsy});
    }
  } else if (typeof actual === "number") {
    if (actual === 0) {
      return;
    } else if (isNaN(actual)) {
      return;
    } else {
      innerFail({
        actual, expected: 'falsy', message, operator: "toBeFalsy", stacksStartFn: toBeFalsy
      });
    }
  } else if (typeof actual === "string") {
    if (actual.length === 0) {
      return;
    } else {
      innerFail({
        actual, expected: 'falsy', message, operator: "toBeFalsy", stacksStartFn: toBeFalsy
      });
    }
  } else if (actual === undefined) {
    return;
  } else if (actual === null) {
    return;
  } else {
    innerFail({
      actual, expected: 'falsy', message, operator: "toBeFalsy", stacksStartFn: toBeFalsy
    });
  }
};

module.exports = assert;
