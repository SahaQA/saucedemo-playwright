const { test, expect } = require('@playwright/test');

const users = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
};

const invalidUsers = [
  {
    username: 'invalid_user',
    password: 'wrong_password'
  },
  {
    username: 'standard_user',
    password: 'wrong_password'
  }
];

test.describe('SauceDemo login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('user can open the SauceDemo login page', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('user can login with valid credentials', async ({ page }) => {
    await page.locator('[data-test="username"]').fill(users.valid.username);
    await page.locator('[data-test="password"]').fill(users.valid.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

for (const user of invalidUsers) {
test(`user cannot login with invalid credentials: ${user.username}`, async ({ page }) => {
    await page.locator('[data-test="username"]').fill(user.username);
    await page.locator('[data-test="password"]').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });
}

test('login page starts with empty credentials', async ({ page }) => {
  await expect(page.locator('[data-test="username"]')).toHaveValue('');
  await expect(page.locator('[data-test="password"]')).toHaveValue('');
});
});