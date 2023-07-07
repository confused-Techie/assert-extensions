const { describe, it } = require("node:test");
const assert = require("../src/main.js");

describe("toHaveLength", () => {
  it("passes properly", () => {
    let array = [1, 2, 3];
    let wantedLength = 3;

    assert.toHaveLength(array, wantedLength);
  });
  it("fails properly", () => {
    let array = [0, 1];
    let wantedLength = 3;

    assert.throws(() => {
      assert.toHaveLength(array, wantedLength);
    });
  });
  it("fails on bad args properly", () => {
    assert.throws(() => {
      assert.toHaveLength();
    });
  });
});

describe("toBeFalsy", () => {
  describe("it passes properly", () => {
    it("if boolean false", () => {
      assert.toBeFalsy(false);
    });
    it("if number 0", () => {
      assert.toBeFalsy(0);
    });
    it("if empty string", () => {
      assert.toBeFalsy("");
    });
    it("if undefined", () => {
      assert.toBeFalsy(undefined);
    });
    it("if null", () => {
      assert.toBeFalsy(null);
    });
    it("if NaN", () => {
      assert.toBeFalsy(NaN);
    });
  });
});
