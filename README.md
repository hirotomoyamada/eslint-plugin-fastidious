# ESLint Plugin Fastidious

ESLint plugin for checking for fastidious code.

## Usage

```js
import fastidious from "eslint-plugin-fastidious"

export default [
  {
    plugins: {
      fastidious,
    },
    rules: {
      "fastidious/blank-line-before-return": "error",
      "fastidious/no-single-letter-variable": "error",
    },
  },
]
```

You can also use the recommended config:

```js
import fastidious from "eslint-plugin-fastidious"

export default [fastidious.configs.recommended]
```

## Rules

| Name                                                                  | Recommended | Description                                    |
| :-------------------------------------------------------------------- | ----------- | :--------------------------------------------- |
| [`blank-line-before-return`](src/rules/blank-line-before-return.md)   | ✅          | Require a blank line before return statements. |
| [`no-single-letter-variable`](src/rules/no-single-letter-variable.md) | ✅          | Disallow single-letter variable names.         |
