import { expect } from "chai";
import "mocha";

import { parseError } from "../src/index";

describe("parseError function", () => {
  describe("Chrome Error Case", () => {
    it("should return", () => {
      const fixtureStack = `TypeError: Error raised
        at bar http://192.168.31.8:8000/c.js:2:9
        at foo http://192.168.31.8:8000/b.js:4:15
        at calc http://192.168.31.8:8000/a.js:4:3
        at <anonymous>:1:11
        at http://192.168.31.8:8000/a.js:22:3
        `;
      const chromeError = new Error();
      chromeError.name = "TypeError";
      chromeError.message = "Error raised";
      chromeError.stack = fixtureStack;

      const errorMessage = parseError(chromeError);
      const expectedErrorMessage = {
        message: "Error raised",
        stack: [
          { line: 2, column: 9, filename: "http://192.168.31.8:8000/c.js" },
          { line: 4, column: 15, filename: "http://192.168.31.8:8000/b.js" },
          { line: 4, column: 3, filename: "http://192.168.31.8:8000/a.js" },
          { line: 22, column: 3, filename: "http://192.168.31.8:8000/a.js" },
        ],
      };

      expect(errorMessage).to.deep.equal(expectedErrorMessage);
    });
  });
  describe("Firefox Error Case", () => {
    it("should return", () => {
      const fixtureFirefoxStack = `
        bar@http://192.168.31.8:8000/c.js:2:9
        foo@http://192.168.31.8:8000/b.js:4:15
        calc@http://192.168.31.8:8000/a.js:4:3
        <anonymous>:1:11
        http://192.168.31.8:8000/a.js:22:3
        `;
      const firefoxError = Error();
      firefoxError.name = "TypeError";
      firefoxError.message = "Error raised";
      firefoxError.stack = fixtureFirefoxStack;

      const errorMessage = parseError(firefoxError);
      const expectedErrorMessage = {
        message: "Error raised",
        stack: [
          { line: 2, column: 9, filename: "http://192.168.31.8:8000/c.js" },
          { line: 4, column: 15, filename: "http://192.168.31.8:8000/b.js" },
          { line: 4, column: 3, filename: "http://192.168.31.8:8000/a.js" },
          { line: 22, column: 3, filename: "http://192.168.31.8:8000/a.js" },
        ],
      };
      expect(errorMessage).to.deep.equal(expectedErrorMessage);
    });
  });
});
