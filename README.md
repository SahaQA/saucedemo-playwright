# SauceDemo Playwright Automation Framework

End-to-end UI automation framework for [SauceDemo](https://www.saucedemo.com/) using Playwright and JavaScript.

## Tech Stack

- JavaScript
- Node.js
- Playwright
- GitHub Actions
- Prettier

## Project Structure

```text
saucedemo-playwright/
├── fixtures/
│   └── test-fixtures.js
├── pages/
│   ├── login.page.js
│   ├── inventory.page.js
│   ├── cart.page.js
│   ├── checkout-information.page.js
│   ├── checkout-overview.page.js
│   └── checkout-complete.page.js
├── test-data/
│   ├── users.js
│   ├── products.js
│   └── checkout.js
├── tests/
│   ├── login.spec.js
│   ├── inventory.spec.js
│   ├── checkout.spec.js
│   └── setup/
│       └── auth.setup.js
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.js
├── package.json
└── README.md
```

## Installation

Clone the repository and install dependencies:

```bash
npm ci
npx playwright install
```

## Run Tests

Run the complete Playwright test suite:

```bash
npm test
```

Run only Chromium:

```bash
npm run test:chromium
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

Run individual test suites:

```bash
npm run test:login
npm run test:inventory
npm run test:checkout
```

## Test Groups

The framework uses lightweight test tags for targeted execution.

### Smoke Tests

Smoke tests cover critical application workflows such as:

- Successful login
- Inventory page access
- Successful checkout flow

Tests are tagged with:

```text
@smoke
```

### Regression Tests

Regression tests cover broader validation scenarios such as required-field validation.

Tests are tagged with:

```text
@regression
```

## Test Coverage

The current framework covers:

- Login page availability
- Successful login
- Invalid login credentials
- Locked-out user validation
- Login required-field validation
- Login test isolation
- Inventory page validation
- Adding products to the cart
- Parameterized product scenarios
- Cart content validation
- Removing products from the cart
- Proceeding from cart to checkout
- Checkout customer-information validation
- Parameterized checkout required-field validation
- Checkout overview validation
- Checkout product validation
- Checkout subtotal, tax, and total validation
- Checkout total calculation
- Successful order completion
- Cross-browser execution

## Authentication

Authenticated tests reuse Playwright storage state instead of performing UI login before every test.

Authentication is created by:

```text
tests/setup/auth.setup.js
```

The generated storage state is saved under:

```text
playwright/.auth/
```

The authentication directory is excluded from Git because storage-state files may contain session information.

Browser projects depend on the authentication setup project and reuse the generated authenticated state.

Login tests explicitly override the authenticated state so they always start unauthenticated.

## Page Object Model

Page-specific locators and interactions are encapsulated in Page Objects.

Current Page Objects include:

```text
LoginPage
InventoryPage
CartPage
CheckoutInformationPage
CheckoutOverviewPage
CheckoutCompletePage
```

Checkout was intentionally separated into multiple Page Objects because the information, overview, and completion screens have different responsibilities.

This keeps each Page Object focused and avoids creating one large checkout class with unrelated behavior.

## Custom Fixtures

Reusable Page Objects are provided through custom Playwright fixtures in:

```text
fixtures/test-fixtures.js
```

Fixtures provide reusable objects such as:

```text
inventoryPage
cartPage
checkoutInformationPage
checkoutOverviewPage
checkoutCompletePage
```

The inventory fixture also prepares the authenticated inventory page before tests that depend on it.

## Test Data

Reusable test data is separated from test logic.

Test-data modules include:

```text
test-data/users.js
test-data/products.js
test-data/checkout.js
```

This keeps test scenarios readable and prevents reusable domain data from being duplicated throughout the suite.

## Parameterized Testing

Parameterized tests are used when multiple scenarios share the same workflow but use different inputs or expectations.

Examples include:

- Invalid login credentials
- Adding different products to the cart
- Checkout required-field validation

This reduces duplication while keeping each generated test independently visible in Playwright reports.

## Checkout Validation

The successful checkout scenario validates more than navigation.

It verifies:

- Selected product reaches checkout
- Customer information can be submitted
- Checkout overview is displayed
- Subtotal is displayed
- Tax is displayed
- Total is displayed
- Subtotal plus tax matches the displayed total
- Order can be completed
- Order confirmation is displayed

The total calculation is validated programmatically instead of relying only on hard-coded displayed values.

## Cross-Browser Testing

The framework runs against:

- Chromium
- Firefox
- WebKit

Browser projects are configured in:

```text
playwright.config.js
```

Run only Chromium with:

```bash
npm run test:chromium
```

Run the complete cross-browser suite with:

```bash
npm test
```

## Environment Configuration

The default application URL is:

```text
https://www.saucedemo.com/
```

The framework supports overriding the base URL using the `BASE_URL` environment variable.

Example:

```bash
BASE_URL=https://example.com npm test
```

This allows the same framework to target different environments without changing test code.

## Debugging Artifacts

The framework captures debugging artifacts when tests fail.

Configured artifacts include:

- Screenshots on failure
- Playwright traces retained on failure
- HTML test reports

Open the latest HTML report with:

```bash
npx playwright show-report
```

Playwright traces can be used to inspect:

- Test actions
- DOM snapshots
- Network requests
- Errors
- Timing information

## Parallel Execution

Playwright tests execute using multiple workers locally.

CI uses a controlled worker count to balance execution speed and stability.

This helps prevent excessive resource contention in CI environments.

## Retry Strategy

Retries are environment-aware.

Locally:

```text
0 retries
```

In CI:

```text
2 retries
```

Retries are primarily used to provide resilience against transient infrastructure or browser failures in CI, not to hide consistently failing tests.

## Formatting

The project uses Prettier for consistent code formatting.

Format the project:

```bash
npm run format
```

Check formatting without modifying files:

```bash
npm run format:check
```

Generated files and directories such as Playwright reports and authentication state are excluded through `.prettierignore`.

## CI/CD

GitHub Actions runs the Playwright suite automatically.

The workflow is located at:

```text
.github/workflows/playwright.yml
```

### Pull Requests

Pull requests run:

```text
Chromium + @smoke tests
```

This provides fast feedback on critical workflows.

### Pushes to Main

Pushes to the `main` branch run:

```text
Full test suite
Chromium + Firefox + WebKit
```

This provides broader regression and cross-browser coverage after code is integrated.

## CI Reports

GitHub Actions uploads the Playwright HTML report as an artifact.

The report can be downloaded from the corresponding GitHub Actions workflow run and used to inspect:

- Passed tests
- Failed tests
- Execution duration
- Browser/project information
- Failure details
- Available debugging artifacts

## Git Workflow

The project follows a small, incremental Git workflow:

```text
Make a focused change
→ run relevant tests
→ inspect the result
→ commit the verified change
→ push to GitHub
```

This keeps commits focused and ensures changes are verified before they enter repository history.

## Design Principles

The framework intentionally follows several maintainability principles:

- Keep Page Objects focused on page-specific behavior
- Keep assertions primarily in tests
- Use fixtures for reusable setup and dependencies
- Parameterize scenarios when workflows are genuinely identical
- Avoid unnecessary abstractions
- Prefer explicit test behavior over hidden framework magic
- Separate test data from test behavior when reuse justifies it
- Keep tests isolated
- Use authentication state to reduce unnecessary UI setup
- Use failure artifacts to debug rather than increasing timeouts blindly
- Optimize CI differently from local development when appropriate

## Current Framework Flow

A typical authenticated end-to-end scenario follows this flow:

```text
Authentication Setup
        ↓
Inventory Page
        ↓
Add Product
        ↓
Cart
        ↓
Checkout Information
        ↓
Checkout Overview
        ↓
Validate Pricing
        ↓
Finish Order
        ↓
Checkout Complete
```

## Project Goal

The purpose of this project is not only to automate SauceDemo.

It is designed as a practical learning project for building maintainable Playwright automation using software-engineering and SDET practices including:

- Framework architecture
- Page Object Model
- Fixtures
- Test isolation
- Authentication reuse
- Test-data management
- Parameterization
- Assertions
- Debugging
- Cross-browser testing
- Reporting
- CI/CD
- Git and GitHub workflow
- Maintainable test design
