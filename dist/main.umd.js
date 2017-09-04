(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('main', factory) :
	(global.main = factory());
}(this, (function () { 'use strict';

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
    return Example;
}());

return Example;

})));
