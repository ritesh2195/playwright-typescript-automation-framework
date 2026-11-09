# Project rules for AI agents

You are working in a Playwright TypeScript automation project.
Follow these rules for every code change.

## Stack

- Playwright 1.56+ with TypeScript
- Node 20+
- Test runner: @playwright/test
- Reporter: Allure + built-in HTML
- CI: GitHub Actions, sharded

## Current project structure

```text
src/
├── components/         # Reusable UI sections (Header, etc.)
├── config/             # Environment and config helpers
│   ├── env.ts
│   ├── environment.ts
│   ├── constants.ts
├── fixtures/           # Custom test fixtures
│   └── base-fixture.ts
├── models/             # Strongly typed test data / request payload models
│   ├── RegisterUserModel.ts
│   ├── SavedUserDetailsModel.ts
│   └── ProductDetailsModel.ts
├── pages/              # Page Object classes extending BasePage
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── AccountPage.ts
│   ├── ProductListPage.ts
│   ├── ShoppingCartPage.ts
│   └── ...
├── utils/              # Pure helpers, no test logic
│   └── price.util.ts
└── ...

tests/
├── smoke/              # Smoke tests
├── regression/         # Regression tests
├── test-data/          # Test data files (TypeScript/JSON/CSV)
├── auth.setup.ts       # Auth/setup flows
├── seed.spec.ts        # Seed or bootstrap scenarios
└── ...

specs/                  # Planner-generated markdown test plans
```

## Coding conventions

- Import `test` from `src/fixtures/base-fixture.ts`, never directly from `@playwright/test`.
- Use `test.describe` per feature area.
- Keep each test focused on a single user flow or assertion group.
- Use `test.step` when a workflow contains more than 3 actions.
- Follow the existing naming conventions: kebab-case for files, PascalCase for classes, camelCase for methods.
- Keep page objects reusable and domain-focused; do not put business logic into tests.

## Locator priority (STRICT — do not deviate)

1. `getByRole` with accessible name
2. `getByLabel` for form fields
3. `getByTestId` (attribute is `data-test-id`)
4. `getByText` only for genuinely static UI text
5. CSS / XPath — only if there is no suitable Playwright locator and it is explicitly justified

## Page Object contract

- One class per page or reusable section.
- Each class extends `BasePage`.
- Constructor takes `page: Page` only.
- All locators are declared as `readonly` in the constructor.
- Action methods return `Promise<void>` or the next page object.
- Do not put `expect()` calls inside page objects; assertions belong in tests.
- Reuse page objects and component classes instead of creating parallel test infra.

## Assertion and wait rules

- Use web-first assertions only, e.g. `await expect(locator).toBeVisible()`.
- Never use `page.waitForTimeout()`.
- Do not use `waitForSelector()`; rely on locator auto-waiting.
- Use custom timeouts only when clearly justified and documented.

## Test data and environment rules

- Keep test data under `tests/test-data/` and import it rather than embedding raw fixtures inline.
- Use environment configuration from `src/config/env.ts` and related files instead of hard-coding URLs or credentials.
- Do not add secrets to the repo; keep credentials in local environment variables or private files.

## When adding or changing tests

- Mirror the app URL structure inside `tests/` when creating new specs.
- Reuse existing page objects and fixtures instead of creating parallel infrastructure.
- Tag tests with `@smoke`, `@regression`, or `@critical` as appropriate.
- Prefer small, focused changes over broad refactors.

## Forbidden

- Do not skip or comment out failing tests to make CI green
- Do not use `page.evaluate` unless there is no MCP tool alternative
- Do not commit `.env`, credentials, `storage-state.json`, or auth tokens
- Do not modify `playwright.config.ts` without asking
- Do not add new npm dependencies without asking
- Do not use `page.pause()` in committed code

## When you (the agent) are unsure

- Ask a clarifying question before generating code
- Prefer a smaller, focused change over a big refactor
- If a required file does not exist, ask before creating it