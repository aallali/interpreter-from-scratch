import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier } from "./ast.ts";
import { ft_tokenize, Token, TokenType } from "./lexer.ts";


export default class Parser {
    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF
    }

    private at() {
        return this.tokens[0] as Token
    }

    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = ft_tokenize(sourceCode);

        const program: Program = {
            kind: "Program",
            body: []
        }

        while (this.not_eof()) {
            program.body.push(this.parse_stmt())
        }
        return program
    }


    private parse_stmt(): Stmt {
        return this.parse_expr();
    }

    private parse_expr(): Expr {
        // expression is a stmt but not vise versa
        // Expr => Stmt
        return this.parse_additive_expr()
    }

    // (10 + 5) - 5
    // (10 + (10 - x)) - 5
    // (10 + 5) - 5
    private parse_additive_expr(): Expr {
        let left = this.parse_primary_expr();

        while (["+", "-"].includes(this.at().value)) {
            const operator = this.eat().value;
            const right = this.parse_primary_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator
            } as BinaryExpr
        }

        return left
    }

    // Orders of prescidence:
    // - AssignmentExpr
    // - MemberExpr
    // - FunctionCall
    // - LogicalExpt
    // - ComparisonExpt
    // - AdditiveExpr
    // - MultiplicativeExpr
    // x UnaryExpr
    // - PrimaryExpr
    private parse_primary_expr(): Expr {
        const tk = this.at().type

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value) } as NumericLiteral
            default:
                console.error(`Unexpected token found during parsing! `, this.at())
                // trick the compiler for TS
                Deno.exit(1)
        }
    }
}