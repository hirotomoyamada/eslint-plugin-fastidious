# fastidious/no-single-letter-variable Style

✅ This rule is included in the recommended config.

### What it does

Disallows single-letter variable names.

This rule reports single-letter identifiers in variable declarations, function parameters, arrow function parameters, catch parameters, and destructuring patterns.

### Why is this bad?

Single-letter variable names often hide meaning from readers. For example, `i` is commonly used as a shorthand for `index`, and `v` is commonly used as a shorthand for `value`. These names force readers to infer intent from surrounding code instead of reading it directly from the identifier.

This is similar to why magic numbers are discouraged: the code contains a value, but not the meaning behind that value.

### Examples

Examples of **incorrect** code for this rule:

```ts
// `i` is short, but the intent is only implied.
for (let i = 0; i < items.length; i += 1) {
  console.log(items[i])
}
```

Examples of **correct** code for this rule:

```ts
// `index` makes the intent explicit.
for (let index = 0; index < items.length; index += 1) {
  console.log(items[index])
}
```

### Configuration

#### allow

type: `string[]`
default: `["_"]`

Specifies single-letter variable names that are allowed.

This is useful for names that are meaningful because of a library or project convention, such as `z` for Zod schemas or `t` for translation functions.

Each item must be exactly one character.

Examples of **correct** code for this option when `allow` is `["z", "t"]`:

```ts
const z = createSchemaBuilder()

const t = createTranslator()
```
