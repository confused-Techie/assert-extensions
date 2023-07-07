const assert = require("node:assert");

// Since each check is part of the assert library, we will just need to extend this, to add in our own features.

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

function toHaveLength(actual, expected, message) {
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
}

function toBeFalsy(actual, message) {
  //argCheck(arguments);

  if (typeof actual === "boolean" && actual != false) {
    innerFail({
      actual,
      expected: 'falsy',
      message,
      operator: "toBeFalsy",
      stacksStartFn: toBeFalsy
    });
  } else if (typeof actual === "number" && actual != 0) {
    innerFail({
      actual, expected: 'falsy', message, operator: "toBeFalsy", stacksStartFn: toBeFalsy
    });
  } else if (typeof actual === "string" && actual.length != 0) {
    innerFail({
      actual, expected: 'falsy', message, operator: "toBeFalsy", stacksStartFn: toBeFalsy
    });
  } else if (actual !== undefined && actual !== null && !isNaN(actual)) {
    innerFail({
      actual, expected: 'falsy', message, operator: "toBeFalsy", stacksStartFn: toBeFalsy
    });
  }
}

const assertExtensions = {
  "toHaveLength": toHaveLength,
  "toBeFalsy": toBeFalsy
};

for (const key in assertExtensions) {
  if (!assert[key]) {
    assert[key] = assertExtensions[key];
  }
}

module.exports = assert;
