# Playwright TypeScript Automation Framework

A scalable and maintainable test automation framework built using **Playwright and TypeScript**, following the **Page Object Model (POM)** design pattern. The framework promotes reusability, readability, and separation of concerns through reusable fixtures, page objects, component classes, test data management, and environment-based configuration.

## Features

- **Playwright with TypeScript** — Reliable browser automation with type safety.
- **Page Object Model (POM)** — Separates page interactions from test logic.
- **Reusable Components** — Encapsulates common UI elements and section-specific functionality.
- **Custom Fixtures** — Simplifies page object initialization and dependency management.
- **Test Data Management** — Keeps test data separate from test scripts.
- **Environment-Based Configuration** — Supports different configurations for development, QA, and production.
- **Assertions and Validation** — Uses Playwright's built-in assertion library.
- **Test Reporting** — Generates Playwright HTML reports.
- **Debugging Support** — Supports headed execution, Playwright Inspector, and trace-based debugging.

## Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- npm
- Playwright Test Runner

## Project Structure

```text
playwright-typescript-automation-framework/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── fixtures/
│   │   └── base-fixture.ts
│   ├── models/
│   │   ├── RegisterUserModel.ts
│   │   └── SavedUserDetailsModel.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── Header.ts
│   │   └── RegisterPage.ts
│   └── components/
├── tests/
│   └── Register.spec.ts
├── test-data/
│   └── register-user.data.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env.dev.example
├── .gitignore
└── README.md
```

*Note: The structure above is illustrative. Adjust the file names to match the actual repository.*

## Prerequisites

Install the following before running the tests:

- Node.js (LTS version recommended)
- npm
- Git

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/<your-username>/playwright-typescript-automation-framework.git
cd playwright-typescript-automation-framework
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install
```

## Environment Configuration

Create environment files for the environments you intend to test, for example:

- `.env.dev`
- `.env.qa`
- `.env.prod`

Example environment configuration:

```dotenv
BASE_URL=http://demowebshop.tricentis.com/
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
```

Keep actual credentials in local environment files and **never commit secrets to GitHub**. Add `.env*` to `.gitignore`, and commit only safe example files such as `.env.dev.example`.

Ensure the environment loader and `playwright.config.ts` are configured to load the selected environment before accessing these variables.

## GitHub Actions

The Playwright workflow runs the dev suite on pushes and pull requests targeting `main` or `master`. It loads `BASE_URL`, `TEST_USER_EMAIL`, and `TEST_USER_PASSWORD` directly from `.env.dev`; no GitHub Actions secrets are configured. The file must be present in the checked-out repository for the workflow to run.

Committing `.env.dev` makes its contents visible to anyone with repository access. Do not put real credentials in a tracked file; use GitHub Actions secrets for credentials that must remain private.

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/Register.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

Run tests with a specific environment:

```bash
npm run test:dev
```

The environment-specific command assumes the corresponding npm script and environment loader have been configured in `package