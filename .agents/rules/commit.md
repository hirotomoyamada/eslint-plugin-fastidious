# Commit Rules

Follow [Conventional Commits](https://www.conventionalcommits.org) for the commit message. Write commit messages in English.

**Format:** `<type>(<scope>): <description>`

- `scope` is the rule name, package name, or area of change (e.g., `no-single-letter-variable`, `rules`, `configs`, `docs`, `deps`, `changesets`).
- `description` starts with a lowercase verb.

**Examples:**

```text
fix(no-single-letter-variable): ignore object property keys
feat(rules): add no-abbreviated-variable rule
refactor(configs): simplify recommended config export
docs(rules): document no-single-letter-variable behavior
test(no-single-letter-variable): cover destructuring cases
ci(changesets): update release workflow
chore(deps): update eslint to latest
build: compile plugin before publishing
```
