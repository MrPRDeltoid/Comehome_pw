import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.comehome.com/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Provide geolocation permission to supress any popups */
    geolocation: { longitude: -122.431297, latitude: 37.773972 },
    permissions: ['geolocation'],
    /* Toggle to capture video of test runs */
    //video: 'on',
    /* Options to employ after launch */
    //launchOptions: {
      //'slowMo': 1000 // Delay all actions in ms
    //}
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'load homepage',
    //   testMatch: 'global.setup.ts',
    // },
    // {
    //   name: 'close browser',
    //   testMatch: 'global.teardown.ts',
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      //dependencies: ['load homepage'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      //dependencies: ['load homepage'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      //dependencies: ['load homepage'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
