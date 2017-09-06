import { expect } from 'chai';
import Example from "../src/core";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

describe('Hello function', () => {
    it('should return hello world', () => {
        let a = new Example();
        expect(a.echo('Hello World!')).to.equal('Hello World!');
    });
});