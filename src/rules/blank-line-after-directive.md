# fastidious/blank-line-after-directive Style

✅ This rule is included in the recommended config.

### What it does

Requires a blank line after Next.js and React directives.

This rule reports the following directives when another token appears immediately after them without a blank line:

- `"use cache"`
- `"use cache: private"`
- `"use cache: remote"`
- `"use client"`
- `"use server"`

Only directives in directive prologues at the top of a module or function body are reported.

### Why is this bad?

Directives affect the behavior of the module or function that follows them. A blank line after the directive separates that metadata from the implementation and makes the boundary easier to scan.

### Examples

Examples of **incorrect** code for this rule:

```ts
"use client"
import { Button } from "./button"
```

Examples of **correct** code for this rule:

```ts
"use client"

import { Button } from "./button"
```

The following code is also **correct** because the string literal is not in a directive prologue:

```ts
const value = getValue()
;("use client")
console.log(value)
```
