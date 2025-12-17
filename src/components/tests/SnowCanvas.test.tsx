import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SnowCanvas } from "../SnowCanvas";

// mock CanvasRenderingContext2D
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
  let originalContext: typeof HTMLCanvasElement.prototype.getContext;

  beforeEach(() => {
    originalContext = HTMLCanvasElement.prototype.getContext;

    HTMLCanvasElement.prototype.getContext = vi.fn(() => {
      return new CanvasRenderingContext2DMock() as any;
    });
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalContext;
    vi.clearAllMocks();
  });

  it("render SnowCanvas", () => {
    render(<SnowCanvas />);
    const canvas = screen.getByRole("presentation");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass("fixed");
  });

  it("injects custom className", () => {
    render(<SnowCanvas className="custom-class" />);
    const canvas = screen.getByRole("presentation");
    expect(canvas).toHaveClass("custom-class");
  });

  it("injects custom styles", () => {
    render(<SnowCanvas style={{ opacity: 0.5 }} />);
    const canvas = screen.getByRole("presentation");
    expect(canvas).toHaveStyle("opacity: 0.5");
  });
});
