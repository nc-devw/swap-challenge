const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png)$": "<rootDir>/mocks/fileMock.js",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/context/(.*)$": "<rootDir>/context/$1",
    "^@/helpers/(.*)$": "<rootDir>/helpers/$1",
    "^@/public/(.*)$": "<rootDir>/public/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
    "^@/styles/(.*)$": "<rootDir>/styles/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "pages/**/*.{ts,tsx}",
    "!pages/_app.tsx",
    "!pages/_document.tsx",
    "helpers/**/*.{ts,tsx}",
    "context/**/*.{ts,tsx}",
  ],
};

module.exports = createJestConfig(customJestConfig);
