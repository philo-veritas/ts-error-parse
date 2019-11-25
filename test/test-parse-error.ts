import { parseError } from "../src/index"
import { expect } from 'chai';
import 'mocha';

describe('parseError function', () => {
    describe('Chrome Error Case', () => {
        it('should return', () => {
            const fixtureStack = `TypeError: Error raised
            at bar http://192.168.31.8:8000/c.js:2:9
            at foo http://192.168.31.8:8000/b.js:4:15
            at calc http://192.168.31.8:8000/a.js:4:3
            at <anonymous>:1:11
            at http://192.168.31.8:8000/a.js:22:3
            `
            const chromeError = new Error();
            chromeError.name = "TypeError"
            chromeError.message = "Error raised"
            chromeError.stack = fixtureStack
            expect(1).to.equal(1);
           
        });
    })
    describe('Firefox Error Case', () => {
        it('should return', () => {
            const fixtureFirefoxStack = `
            bar@http://192.168.31.8:8000/c.js:2:9
            foo@http://192.168.31.8:8000/b.js:4:15
            calc@http://192.168.31.8:8000/a.js:4:3
            <anonymous>:1:11
            http://192.168.31.8:8000/a.js:22:3
            `
            const firefoxError = Error();
            firefoxError.name = "TypeError"
            firefoxError.message = "Error raised"
            firefoxError.stack = fixtureFirefoxStack

            const result = "Hello World!";
            expect(1).to.equal(1);
        });
    })
  });