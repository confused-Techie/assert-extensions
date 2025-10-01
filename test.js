const { describe, it } = require("node:test");
const assert = require("./index.js");

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
  describe("passes properly", () => {
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
      assert.toBeFalsy(Number(undefined));
    });
  });
});

describe("toBeCloseTo", () => {
  describe("passes properly", () => {
    it("passes with default numDigits", () => {
      assert.toBeCloseTo(0, 0.001);
    });
    it("passes with provided numDigits", () => {
      assert.toBeCloseTo(0.20001, 0.2, 5);
    });
  });
  describe("fails properly", () => {
    it("fails", () => {
      assert.throws(() => {
        assert.toBeCloseTo(4.2, 5);
      });
    });
  });
});
