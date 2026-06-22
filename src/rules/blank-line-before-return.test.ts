import { Linter } from "eslint"
import rule from "./blank-line-before-return.js"

const linter = new Linter()

function lint(code: string): Linter.LintMessage[] {
  return linter.verify(code, {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
    plugins: {
      fastidious: {
        rules: {
          "blank-line-before-return": rule,
        },
      },
    },
    rules: {
      "fastidious/blank-line-before-return": "error",
    },
  })
}

function fix(code: string): string {
  return linter.verifyAndFix(code, {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
    plugins: {
      fastidious: {
        rules: {
          "blank-line-before-return": rule,
        },
      },
    },
    rules: {
      "fastidious/blank-line-before-return": "error",
    },
  }).output
}

describe("blank-line-before-return", () => {
  test("has a documentation URL", () => {
    expect(rule.meta?.docs?.url).toBe(
      "https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/blank-line-before-return.md",
    )
  })

  test("allows returns that are the first statement", () => {
    const validCases = [
      'function hoge() {\n  return "hoge"\n}',
      'function hoge() {\n  // Comment.\n  return "hoge"\n}',
      "function hoge() {\n  if (value) return value\n}",
      "function hoge(value) {\n  if (value) {\n    return value\n  }\n}",
    ]

    for (const code of validCases) {
      expect(lint(code)).toHaveLength(0)
    }
  })

  test("allows returns with a blank line before them", () => {
    expect(
      lint('function hoge() {\n  const value = "hoge"\n\n  return value\n}'),
    ).toHaveLength(0)
  })

  test("reports returns without a blank line before them", () => {
    expect(
      lint('function hoge() {\n  const value = "hoge"\n  return value\n}'),
    ).toMatchObject([
      {
        message: "Add a blank line before this return statement.",
        ruleId: "fastidious/blank-line-before-return",
        severity: 2,
      },
    ])
  })

  test("fixes returns without a blank line before them", () => {
    expect(
      fix('function hoge() {\n  const value = "hoge"\n  return value\n}'),
    ).toBe('function hoge() {\n  const value = "hoge"\n\n  return value\n}')
  })

  test("fixes comments before returns", () => {
    expect(
      fix(
        "function hoge() {\n  const value = getValue()\n  // Return early.\n  return value\n}",
      ),
    ).toBe(
      "function hoge() {\n  const value = getValue()\n  // Return early.\n\n  return value\n}",
    )
  })

  test("fixes returns on the same line as previous statements", () => {
    expect(
      fix("function hoge() {\n  const value = getValue(); return value\n}"),
    ).toBe(
      "function hoge() {\n  const value = getValue();\n\n  return value\n}",
    )
  })
})
