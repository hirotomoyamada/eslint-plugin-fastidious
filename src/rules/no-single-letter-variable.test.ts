import { Linter } from "eslint"
import rule from "./no-single-letter-variable.js"

const linter = new Linter()

function lint(
  code: string,
  options?: { allow?: Array<string> },
): Linter.LintMessage[] {
  return linter.verify(code, {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
    plugins: {
      fastidious: {
        rules: {
          "no-single-letter-variable": rule,
        },
      },
    },
    rules: {
      "fastidious/no-single-letter-variable": options
        ? ["error", options]
        : "error",
    },
  })
}

describe("no-single-letter-variable", () => {
  test("has a documentation URL", () => {
    expect(rule.meta?.docs?.url).toBe(
      "https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/no-single-letter-variable.md",
    )
  })

  test("allows descriptive variable names", () => {
    const validCases = [
      "const index = 0",
      "for (let index = 0; index < items.length; index += 1) {}",
      "const { value } = object",
      "function render(value) { return value }",
      "try {} catch (error) {}",
      "const object = { i: 1 }",
    ]

    for (const code of validCases) {
      expect(lint(code)).toHaveLength(0)
    }
  })

  test("reports single-letter variable names", () => {
    const invalidCases = [
      { code: "const i = 0", name: "i" },
      { code: "let v", name: "v" },
      { code: "for (let i = 0; i < items.length; i += 1) {}", name: "i" },
      { code: "const [v] = values", name: "v" },
      { code: "const { i } = object", name: "i" },
      { code: "const callback = (v) => v", name: "v" },
      { code: "try {} catch (e) {}", name: "e" },
    ]

    for (const { code, name } of invalidCases) {
      expect(lint(code)).toMatchObject([
        {
          message: `Use a descriptive name instead of the single-letter variable '${name}'.`,
          ruleId: "fastidious/no-single-letter-variable",
          severity: 2,
        },
      ])
    }
  })

  test("allows configured single-letter variable names", () => {
    expect(
      lint('const z = { string: () => "" }', { allow: ["z"] }),
    ).toHaveLength(0)
    expect(lint("const i = 0", { allow: ["z"] })).toMatchObject([
      {
        message:
          "Use a descriptive name instead of the single-letter variable 'i'.",
        ruleId: "fastidious/no-single-letter-variable",
        severity: 2,
      },
    ])
  })
})
