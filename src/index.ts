import type { ESLint, Linter } from "eslint"
import blankLineAfterDirective from "./rules/blank-line-after-directive"
import blankLineBeforeReturn from "./rules/blank-line-before-return"
import noSingleLetterVariable from "./rules/no-single-letter-variable"

const rules = {
  "blank-line-after-directive": blankLineAfterDirective,
  "blank-line-before-return": blankLineBeforeReturn,
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
    "fastidious/blank-line-after-directive": "error",
    "fastidious/blank-line-before-return": "error",
    "fastidious/no-single-letter-variable": "error",
  },
}

plugin.configs = {
  recommended,
}

export default plugin
