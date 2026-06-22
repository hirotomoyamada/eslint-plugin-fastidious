import type { ESLint, Linter } from "eslint"
import noSingleLetterVariable from "./rules/no-single-letter-variable"

const rules = {
  "no-single-letter-variable": noSingleLetterVariable,
}

const plugin: ESLint.Plugin = {
  meta: {
    name: "eslint-plugin-fastidious",
  },
  rules,
}

const recommended: Linter.Config = {
  plugins: {
    fastidious: plugin,
  },
  rules: {
    "fastidious/no-single-letter-variable": "error",
  },
}

plugin.configs = {
  recommended,
}

export default plugin
