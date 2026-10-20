
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Select the environment: dev, qa, or prod
const environment = process.env.ENV ?? 'qa';

const allowedEnvironments = ['dev', 'qa', 'prod'];

if (!allowedEnvironments.includes(environment)) {
  throw new Error(
    `Invalid ENV: ${environment}. Use dev, qa, or prod.`
  );
}

// Load the selected environment file from the project root
const envFile = path.resolve(
  process.cwd(),
  `.env.${environment}`
);

const result = dotenv.config({ path: envFile });

if (result.error) {
  throw new Error(
    `Could not load ${envFile}: ${result.error.message}`
  );
}

// Read and validate the base URL
const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error(
    `BASE_URL is missing from .env.${environment}`
  );
}

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [["line"], ["allure-playwright"]],

  use: {
    baseURL,

    trace: 'on-first-retry',
    headless: !!process.env.CI,
    launchOptions:{
      slowMo:50
    }
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
