const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page");
const { InventoryPage } = require("../pages/inventory.page");
const { users, invalidUsers } = require("../test-data/users");

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe("SauceDemo login", () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
  });

  test("user can open the SauceDemo login page", async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test("@smoke user can login with valid credentials", async ({ page }) => {
    await loginPage.login(users.valid.username, users.valid.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toBeVisible();
  });

  for (const user of invalidUsers) {
    test(`user cannot login with invalid credentials: ${user.username}`, async () => {
      await loginPage.login(user.username, user.password);

      await expect(loginPage.errorMessage).toContainText(
        "Username and password do not match",
      );
    });
  }

  test("login page starts with empty credentials", async () => {
    await expect(loginPage.usernameInput).toHaveValue("");
    await expect(loginPage.passwordInput).toHaveValue("");
  });

  test("locked out user cannot login", async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText(
      "Sorry, this user has been locked out",
    );
  });

  test("@regression username is required", async () => {
    await loginPage.passwordInput.fill("secret_sauce");
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText("Username is required");
  });

  test("password is required", async () => {
    await loginPage.usernameInput.fill("standard_user");
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText("Password is required");
  });
});
