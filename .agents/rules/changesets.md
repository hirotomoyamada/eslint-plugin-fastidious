# Changeset Rules

Required when modifying package code or package metadata. Create a file in `.changeset/`.

This includes changes to:

- `src/**`
- `package.json`

```md
---
"eslint-plugin-fastidious": patch
---

One-sentence summary of the fix in English.
```

**Bump type**

- `patch`: bug fix, internal change
- `minor`: new feature with backward compatibility
- `major`: breaking change (alters existing API)
