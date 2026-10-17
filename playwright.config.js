const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});