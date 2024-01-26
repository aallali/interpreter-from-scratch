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
$>  42 * (3 - 1)
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: { kind: "NumericLiteral", value: 42 },
      right: {
        kind: "BinaryExpr",
        left: { kind: "NumericLiteral", value: 3 },
        right: { kind: "NumericLiteral", value: 1 },
        operator: "-"
      },
      operator: "*"
    }
  ]
}
$>  42 * 3 - 1
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: {
        kind: "BinaryExpr",
        left: { kind: "NumericLiteral", value: 42 },
        right: { kind: "NumericLiteral", value: 3 },
        operator: "*"
      },
      right: { kind: "NumericLiteral", value: 1 },
      operator: "-"
    }
  ]
}
$>  42 * (3 - (2 - 1))
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: { kind: "NumericLiteral", value: 42 },
      right: {
        kind: "BinaryExpr",
        left: { kind: "NumericLiteral", value: 3 },
        right: {
          kind: "BinaryExpr",
          left: [Object],
          right: [Object],
          operator: "-"
        },
        operator: "-"
      },
      operator: "*"
    }
  ]
}
$>  1 + (2 + (3 + (4 + 5)))
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: { kind: "NumericLiteral", value: 1 },
      right: {
        kind: "BinaryExpr",
        left: { kind: "NumericLiteral", value: 2 },
        right: {
          kind: "BinaryExpr",
          left: [Object],
          right: [Object],
          operator: "+"
        },
        operator: "+"
      },
      operator: "+"
    }
  ]
}
$>  
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
$>  let x = 42
Unexpected token found during parsing! { value: "let", type: 6 }
$>
```
