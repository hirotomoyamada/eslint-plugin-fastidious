import type { Rule } from "eslint"

const DIRECTIVES = new Set([
  "use cache",
  "use cache: private",
  "use cache: remote",
  "use client",
  "use server",
])

const messageId = "missingBlankLineAfterDirective"

function getDirectiveValue(node: Rule.Node): string | undefined {
  if (node.type !== "ExpressionStatement") return

  const expression = node.expression

  if (expression.type !== "Literal" || typeof expression.value !== "string")
    return

  return expression.value
}

function isFunctionNode(node: Rule.Node): boolean {
  return (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionDeclaration" ||
    node.type === "FunctionExpression"
  )
}

function getStatementList(node: Rule.Node): Rule.Node[] | undefined {
  if (!node.parent) return
  if (node.parent.type === "Program") return node.parent.body as Rule.Node[]
  if (node.parent.type !== "BlockStatement") return

  if (!isFunctionNode(node.parent.parent)) return

  return node.parent.body as Rule.Node[]
}

function isTargetDirective(node: Rule.Node): boolean {
  const statements = getStatementList(node)

  if (!statements) return false

  for (const statement of statements) {
    const directive = getDirectiveValue(statement)

    if (!directive) return false
    if (statement === node) return DIRECTIVES.has(directive)
  }

  return false
}

const blankLineAfterDirective: Rule.RuleModule = {
  create(context) {
    return {
      ExpressionStatement(node) {
        if (!isTargetDirective(node)) return

        const tokenAfterDirective = context.sourceCode.getTokenAfter(node, {
          includeComments: true,
        })

        if (!node.loc || !node.range) return
        if (!tokenAfterDirective?.loc || !tokenAfterDirective.range) return
        if (tokenAfterDirective.loc.start.line - node.loc.end.line > 1) return

        const nodeRange = node.range
        const tokenAfterDirectiveRange = tokenAfterDirective.range
        const indentColumn =
          tokenAfterDirective.loc.start.line === node.loc.end.line
            ? node.loc.start.column
            : tokenAfterDirective.loc.start.column

        context.report({
          fix(fixer) {
            return fixer.replaceTextRange(
              [nodeRange[1], tokenAfterDirectiveRange[0]],
              `\n\n${" ".repeat(indentColumn)}`,
            )
          },
          messageId,
          node,
        })
      },
    }
  },
  meta: {
    docs: {
      description: "Require a blank line after directives",
      url: "https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/blank-line-after-directive.md",
    },
    fixable: "whitespace",
    messages: {
      [messageId]: "Add a blank line after this directive.",
    },
    schema: [],
    type: "layout",
  },
}

export default blankLineAfterDirective
