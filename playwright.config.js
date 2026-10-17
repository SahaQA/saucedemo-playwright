const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
});