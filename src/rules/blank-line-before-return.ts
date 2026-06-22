import type { Rule } from "eslint"

const messageId = "missingBlankLineBeforeReturn"

function getParent(node: Rule.Node): Rule.Node | undefined {
  return (node as Rule.Node & { parent?: Rule.Node }).parent
}

function getPreviousStatement(node: Rule.Node): Rule.Node | undefined {
  const parent = getParent(node)

  if (!parent) return

  switch (parent.type) {
    case "BlockStatement": {
      const body = parent.body as Rule.Node[]
      const index = body.indexOf(node)

      return index > 0 ? body[index - 1] : undefined
    }
    case "SwitchCase": {
      const consequent = parent.consequent as Rule.Node[]
      const index = consequent.indexOf(node)

      return index > 0 ? consequent[index - 1] : undefined
    }
  }
}

const blankLineBeforeReturn: Rule.RuleModule = {
  create(context) {
    return {
      ReturnStatement(node) {
        const previousStatement = getPreviousStatement(node)

        if (!previousStatement) return

        const tokenBeforeReturn = context.sourceCode.getTokenBefore(node, {
          includeComments: true,
        })

        if (!tokenBeforeReturn) return
        if (
          !node.loc ||
          !node.range ||
          !previousStatement.loc ||
          !tokenBeforeReturn.loc ||
          !tokenBeforeReturn.range
        )
          return

        if (node.loc.start.line - tokenBeforeReturn.loc.end.line > 1) return

        const indentColumn =
          tokenBeforeReturn.loc.end.line === node.loc.start.line
            ? previousStatement.loc.start.column
            : node.loc.start.column
        const tokenBeforeReturnRange = tokenBeforeReturn.range
        const nodeRange = node.range

        context.report({
          fix(fixer) {
            return fixer.replaceTextRange(
              [tokenBeforeReturnRange[1], nodeRange[0]],
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
      description: "Require a blank line before return statements",
      url: "https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/blank-line-before-return.md",
    },
    fixable: "whitespace",
    messages: {
      [messageId]: "Add a blank line before this return statement.",
    },
    schema: [],
    type: "layout",
  },
}

export default blankLineBeforeReturn
