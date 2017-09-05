'use strict';

var v4 = require('uuid/v4');
var Example = /** @class */ (function () {
    function Example() {
    }
    Example.prototype.run = function (input) {
        console.log(input);
    };
    Example.prototype.map = function (input) {
        return input.map(function (i) {
            return "Hello " + i + "!";
        });
    };
    Example.prototype.uid = function () {
        return v4();
    };
    return Example;
}());

module.exports = Example;
