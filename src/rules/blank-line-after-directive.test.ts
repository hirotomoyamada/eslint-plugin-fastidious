import { Linter } from "eslint"
import rule from "./blank-line-after-directive.js"

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
          "blank-line-after-directive": rule,
        },
      },
    },
    rules: {
      "fastidious/blank-line-after-directive": "error",
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
          "blank-line-after-directive": rule,
        },
      },
    },
    rules: {
      "fastidious/blank-line-after-directive": "error",
    },
  }).output
}

describe("blank-line-after-directive", () => {
  test("has a documentation URL", () => {
    expect(rule.meta?.docs?.url).toBe(
      "https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/blank-line-after-directive.md",
    )
  })

  test("allows directives with a blank line after them", () => {
    const validCases = [
      '"use client"\n\nimport { Button } from "./button"',
      'async function action() {\n  "use server"\n\n  return value\n}',
      '"use client"',
    ]

    for (const code of validCases) {
      expect(lint(code)).toHaveLength(0)
    }
  })

  test("allows configured directives only in directive prologues", () => {
    expect(
      lint('const value = true\n"use client"\nconsole.log(value)'),
    ).toHaveLength(0)
  })

  test("reports directives without a blank line after them", () => {
    const invalidCases = [
      '"use cache"\nexport const value = getValue()',
      '"use cache: private"\nexport const value = getValue()',
      '"use cache: remote"\nexport const value = getValue()',
      '"use client"\nimport { Button } from "./button"',
      '"use server"\nexport async function action() {}',
    ]

    for (const code of invalidCases) {
      expect(lint(code)).toMatchObject([
        {
          message: "Add a blank line after this directive.",
          ruleId: "fastidious/blank-line-after-directive",
          severity: 2,
        },
      ])
    }
  })

  test("fixes directives without a blank line after them", () => {
    expect(fix('"use client"\nimport { Button } from "./button"')).toBe(
      '"use client"\n\nimport { Button } from "./button"',
    )
  })

  test("fixes directives before comments", () => {
    expect(
      fix('"use client"\n// Client component.\nexport function App() {}'),
    ).toBe('"use client"\n\n// Client component.\nexport function App() {}')
  })

  test("fixes directives on the same line as following tokens", () => {
    expect(fix('"use client"; import { Button } from "./button"')).toBe(
      '"use client";\n\nimport { Button } from "./button"',
    )
  })
})
