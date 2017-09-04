export default class Example {
    public run (input: string) {
        console.log(input);
    }

    public map<T> (input: Array<T>): Array<T> {
        return input.map(i => {
            return "Hello " + i + "!";
        })
    }
}