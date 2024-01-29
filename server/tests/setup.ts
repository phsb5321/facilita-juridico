// Global setup for all tests
import { beforeEach } from "vitest";

beforeEach(() => {
  process.env.NODE_ENV = "test";
  // Any other setup before each test
});

// Optionally add afterEach for cleanup, afterAll for cleanup after all tests, etc.
