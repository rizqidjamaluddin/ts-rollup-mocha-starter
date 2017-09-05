const Example = require('..');

let a = new Example;
console.log(a.uid());
a.run('hello world');
console.log(a.map(["Aerith", "Bob"]));