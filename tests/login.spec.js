const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

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
  let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

  test('user can open the SauceDemo login page', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('user can login with valid credentials', async ({ page }) => {
    await loginPage.login(
      users.valid.username,
      users.valid.password
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  for (const user of invalidUsers) {
    test(`user cannot login with invalid credentials: ${user.username}`, async () => {
      await loginPage.login(user.username, user.password);

      await expect(loginPage.errorMessage).toContainText(
        'Username and password do not match'
      );
    });
  }

  test('login page starts with empty credentials', async () => {
    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('locked out user cannot login', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );
  });

  test('username is required', async () => {
    await loginPage.passwordInput.fill('secret_sauce');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText(
      'Username is required'
    );
  });

  test('password is required', async () => {
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText(
      'Password is required'
    );
  });
});