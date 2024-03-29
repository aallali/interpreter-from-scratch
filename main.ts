import Parser from "./frontend/parser.ts";


repl();



async function repl () {
    const parser = new Parser();
    console.log("\nREPL v0.1");

    while(true) {

        const input = await prompt("$> ");

        if (!input || input == "exit") {
            Deno.exit(1)
        }

        const program = parser.produceAST(input)

        console.log(program)
    }
}