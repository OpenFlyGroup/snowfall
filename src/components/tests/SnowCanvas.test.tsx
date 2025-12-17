import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SnowCanvas } from "../SnowCanvas";

// Создаем мок с правильными типами
class CanvasRenderingContext2DMock {
  clearRect = vi.fn();
  beginPath = vi.fn();
  arc = vi.fn();
  fill = vi.fn();
  fillStyle = "";
  save = vi.fn();
  restore = vi.fn();
  translate = vi.fn();
  rotate = vi.fn();
  scale = vi.fn();
}

describe("SnowCanvas", () => {
  let originalContext: typeof HTMLCanvasElement.prototype.getContext | null =
    null;

  beforeEach(() => {
    originalContext = HTMLCanvasElement.prototype.getContext;

    HTMLCanvasElement.prototype.getContext = vi.fn(() => {
      return new CanvasRenderingContext2DMock() as unknown as CanvasRenderingContext2D;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  });

  afterEach(() => {
    if (originalContext) {
      HTMLCanvasElement.prototype.getContext = originalContext;
    }
    vi.clearAllMocks();
  });

  it("рендерит canvas элемент", () => {
    render(<SnowCanvas />);
    const canvas = screen.getByRole("presentation");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("принимает custom className", () => {
    render(<SnowCanvas className="custom-class" />);
    const container = screen.getByRole("presentation").parentElement;
    expect(container).toHaveClass("custom-class");
  });
});
