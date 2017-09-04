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

export default Example;
