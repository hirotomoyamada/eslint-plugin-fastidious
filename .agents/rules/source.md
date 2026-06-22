# Source Rules

When changing or reviewing `src/**`, follow these rules.

## Rule Changes

- Keep each rule focused on one behavior.
- Add or update tests for changed rule behavior.
- Register new rules in `src/index.ts` and include them in `configs.recommended` only when they should be enabled by default.
- Prefer explicit ESLint AST handling over broad assumptions about node shapes.

## Documentation

Update README when the change affects user-facing behavior, rule behavior, configuration, installation, setup, or examples.
