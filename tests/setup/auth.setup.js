const { test: setup, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/login.page");
const { users } = require("../../test-data/users");

const authFile = "playwright/.auth/user.json";

setup("authenticate standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(users.valid.username, users.valid.password);

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: authFile,
  });
});
