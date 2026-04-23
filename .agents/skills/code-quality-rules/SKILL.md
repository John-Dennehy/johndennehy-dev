s---
name: code-quality-rules
description: Strict coding rules to prevent Biome lint errors, ensure accessibility, and enforce TypeScript safety. Use this skill whenever writing new React components or TypeScript logic.
user-invocable: true

---

# Code Quality & Linting Rules

To prevent wasting AI compute on repetitive linting loops, you **MUST ALWAYS** follow these rules when writing code in this repository.

## 1. Button Accessibility (`a11y/useButtonType`)

Whenever you create or modify a `<button>` element in React/Next.js, you MUST provide an explicit `type` prop.

- **Correct**: `<button type="button" onClick={...}>`
- **Correct**: `<button type="submit">`
- **Incorrect**: `<button onClick={...}>` (This triggers a Biome error because the default type is `submit`, which causes unexpected form submissions).

## 2. Strict TypeScript (`suspicious/noExplicitAny`)

NEVER use the `any` keyword.

- Do not type arrays as `any[]`.
- Always define explicit `interface` or `type` declarations.
- If a type is truly unknown, use `unknown` and properly narrow it.
- Using `any` violates the repository's strict Biome configuration.

## 3. Formatting & Linting (`pnpm lint`)

Always strive to write code that passes `biome check .` on the first try.

- If you modify files, you should run `pnpm run format` (which executes `biome format --write .`) to fix formatting automatically before running `pnpm lint`.
- If you encounter lint errors, use `biome check --write .` where safe, or manually fix the specific rules reported. Do not get stuck in a loop; analyze the errors thoroughly and fix them in one pass.

## 4. Import Organization

When creating new files or adding many imports, be aware that Biome enforces import sorting. Running `pnpm dlx @biomejs/biome check --write <file>` will automatically organize imports for you.
