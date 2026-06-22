import type { Rule } from "eslint"
import { isNode } from "@/utils"

type Options = [
  {
    allow?: string[]
  }?,
]

const messageId = "singleLetterVariable"

const noSingleLetterVariable: Rule.RuleModule = {
  create(context) {
    const [options = {}] = context.options as Options

    options.allow ??= []
    options.allow.push("_")

    const allowedNames = new Set(options.allow)

    function checkPattern(pattern: unknown): void {
      if (!isNode(pattern)) return

      switch (pattern.type) {
        case "Identifier":
          if (pattern.name.length !== 1 || allowedNames.has(pattern.name))
            return

          context.report({
            data: { name: pattern.name },
            messageId,
            node: pattern,
          })

          break
        case "ArrayPattern":
          for (const element of pattern.elements) checkPattern(element)

          break
        case "ObjectPattern":
          for (const property of pattern.properties) {
            if (!isNode(property)) continue

            switch (property.type) {
              case "Property":
                checkPattern(property.value)
                break
              default:
                checkPattern(property.argument)
                break
            }
          }
          break
        case "RestElement":
          checkPattern(pattern.argument)
          break
        case "AssignmentPattern":
          checkPattern(pattern.left)
          break
      }
    }

    return {
      ArrowFunctionExpression({ params }) {
        for (const param of params) checkPattern(param)
      },
      CatchClause({ param }) {
        checkPattern(param)
      },
      FunctionDeclaration({ params }) {
        for (const param of params) checkPattern(param)
      },
      FunctionExpression({ params }) {
        for (const param of params) checkPattern(param)
      },
      VariableDeclarator({ id }) {
        checkPattern(id)
      },
    }
  },
  meta: {
    docs: {
      description: "Disallow single-letter variable names",
      url: "https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/no-single-letter-variable.md",
    },
    messages: {
      [messageId]:
        "Use a descriptive name instead of the single-letter variable '{{name}}'.",
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          allow: {
            items: {
              maxLength: 1,
              minLength: 1,
              type: "string",
            },
            type: "array",
            uniqueItems: true,
          },
        },
        type: "object",
      },
    ],
    type: "suggestion",
  },
}

export default noSingleLetterVariable
