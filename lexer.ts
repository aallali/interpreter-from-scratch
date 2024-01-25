// let x = 42
// [LetToken, IdentifierTk, EqualsToken, NumberToken]


export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let,
}

const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let
}
export interface Token {
    value: string,
    type: TokenType,
}

function token(value = "", type: TokenType) {
    return { value, type }
}

function isAlpha(src: string) {
    return src.toUpperCase() != src.toLowerCase()
}

function isInt(src: string) {
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];

    return (c >= bounds[0] && c <= bounds[1])
}

function isSkippable(src: string) {
    return [" ", "\n", "\t"].includes(src)
}
export function ft_tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    while (src.length) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen))
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen))
        } else if (["+", "-", "*", "/"].includes(src[0])) {
            tokens.push(token(src.shift(), TokenType.BinaryOperator))
        } else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals))
        } else {
            // handle multi characters tokens

            // Build number token
            if (isInt(src[0])) {
                let num = "";
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number))
            } else if (isAlpha(src[0])) {
                let ident = ""; // foo Let
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift()
                }
                const reserved = KEYWORDS[ident]
                if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier))
                } else {
                    tokens.push(token(ident, reserved))
                }
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                console.log("Unrecognized character found in source: ", src[0])
                Deno.exit(0)
            }
        }
    }

    return tokens;
}


const sourceCode = await Deno.readTextFile("./test.fs");
for (const token of ft_tokenize(sourceCode)) {
    console.log(token)
}