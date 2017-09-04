export default class Example {
    public run (input: string) {
        console.log(input);
    }

    public map (input: Array<string>): Array<string> {
        return input.map(i => {
            return "Hello " + i + "!";
        })
    }
}