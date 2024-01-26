# Learn to build interpreters from scratch

Thanks to @tlaceby's series about building interpreters from scratch: https://www.youtube.com/playlist?list=PL_2VhOvlMk4UHGqYCLWc6GO8FaPl8fQTh

### folder tree:
```
.
├── frontend
│   ├── ast.ts
│   ├── lexer.ts
│   └── parser.ts
├── main.ts
└── test.fsc
```

### Repl:
```shell

 REPL v0.1
$>  1 + 2
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: { kind: "NumericLiteral", value: 1 },
      right: { kind: "NumericLiteral", value: 2 },
      operator: "+"
    }
  ]
}
```
```shell
$>  10 x foo bar
{
  kind: "Program",
  body: [
    { kind: "NumericLiteral", value: 10 },
    { kind: "Identifier", symbol: "x" },
    { kind: "Identifier", symbol: "foo" },
    { kind: "Identifier", symbol: "bar" }
  ]
}
```
```shell
$>  1 + 2 - 4
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: {
        kind: "BinaryExpr",
        left: { kind: "NumericLiteral", value: 1 },
        right: { kind: "NumericLiteral", value: 2 },
        operator: "+"
      },
      right: { kind: "NumericLiteral", value: 4 },
      operator: "-"
    }
  ]
}
```
```shell
$>  let x = 42
Unexpected token found during parsing! { value: "let", type: 6 }
$>
```
