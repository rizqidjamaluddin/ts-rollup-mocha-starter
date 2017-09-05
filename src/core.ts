let v4 = require('uuid/v4');

export default class Example {
    public run (input: string) {
        console.log(input);
    }

    public map (input: Array<string>): Array<string> {
        return input.map(i => {
            return "Hello " + i + "!";
        })
    }

    public uid (): string {
        return v4();
    }
}