# fastidious/blank-line-before-return Style

✅ This rule is included in the recommended config.

### What it does

Requires a blank line before `return` statements when they follow another statement in the same block or switch case.

This rule does not report a `return` statement that is the first statement in its block.

### Why is this bad?

`return` statements are exit points. A blank line before them separates the final calculation from the exit and makes the control flow easier to scan.

### Examples

Examples of **incorrect** code for this rule:

```ts
function getValue() {
  const value = computeValue()
  return value
}
```

Examples of **correct** code for this rule:

```ts
function getValue() {
  const value = computeValue()

  return value
}
```

The following code is also **correct** because the `return` statement is the first statement in the block:

```ts
function getValue() {
  return computeValue()
}
```
