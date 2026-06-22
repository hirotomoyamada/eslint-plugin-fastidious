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

| Name                                                                  | Recommended | Description                            |
| :-------------------------------------------------------------------- | ----------- | :------------------------------------- |
| [`no-single-letter-variable`](src/rules/no-single-letter-variable.md) | ✅          | Disallow single-letter variable names. |
