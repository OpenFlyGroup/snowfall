import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// cleanup after each test
afterEach(() => {
  cleanup();
});

// Mocks for ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

// Mock for requestAnimationFrame
window.requestAnimationFrame = (callback) => {
  return setTimeout(() => callback(Date.now()), 0);
};

window.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
