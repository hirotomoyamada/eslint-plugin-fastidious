---
name: create-rule
description: Use when the user wants to create, add, or implement an ESLint rule in eslint-plugin-fastidious, including requests like "create rule", "add rule", "implement rule".
---

# Create Rule

Use this skill to implement a new ESLint rule in this plugin.

## Initial Questions

- If the user only invokes this skill or says they want to create a rule without describing the rule behavior, ask what rule they want to create.
- Ask whether the rule should be included in `configs.recommended` unless the user already said something equivalent to "recommended" or "not recommended".
- Before editing files, follow the repository workflow and ask whether to use the current worktree or create a new worktree.

## Required References

Read these before editing rule source files:

- `.agents/rules/source.md`
- `.agents/rules/changesets.md`
- `src/rules/no-single-letter-variable.ts`
- `src/rules/no-single-letter-variable.test.ts`
- `src/rules/no-single-letter-variable.md`
- `src/index.ts`
- `README.md`

## Implementation Shape

Follow `src/rules/no-single-letter-variable.ts` unless the requested rule needs a different structure.

- Create `src/rules/<rule-name>.ts`.
- Create `src/rules/<rule-name>.test.ts`.
- Create `src/rules/<rule-name>.md` in the same directory as the rule.
- Register the rule in `src/index.ts`.
- Add the rule to `configs.recommended` only when requested or already clearly implied by the user.
- Add the rule to the README Rules table and mark Recommended as `✅` only when included in `configs.recommended`.
- Add a `.changeset/*.md` file because new rule source changes modify package code.

## Rule Source Checklist

- Use a focused `messageId` constant.
- Export a `Rule.RuleModule` default export.
- Keep `meta.docs.description` short and user-facing.
- Set `meta.docs.url` to `https://github.com/hirotomoyamada/eslint-plugin-fastidious/blob/main/src/rules/<rule-name>.md`.
- Define `meta.messages`, `meta.schema`, and `meta.type` explicitly.
- Prefer explicit AST node handling over broad assumptions.
- Keep options minimal. Do not add configurability unless the user requested it or the rule cannot be useful without it.

## Documentation Shape

Use the existing rule documentation as the template:

- `# fastidious/<rule-name> Style`
- Recommended status line.
- `### What it does`
- `### Why is this bad?`
- `### Examples`
- `### Configuration` only when the rule has options.

## Validation

After implementation, run targeted checks first:

- `pnpm test`
- `pnpm typecheck`
- `pnpm lint:check`
- `pnpm format:check`

If a check fails, fix only issues caused by the new rule and re-run the failed check.

## Completion Criteria

The task is complete when:

- The rule source, test, and rule documentation exist.
- `src/index.ts` registers the rule.
- `README.md` lists the rule with the correct Recommended status.
- A changeset exists for the package change.
- Targeted validation passes or any remaining failure is clearly unrelated and reported.
