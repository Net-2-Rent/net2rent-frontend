import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PinGenerator from "./PinGenerator.jsx";

function renderPinGenerator(value = "") {
  const handleChange = vi.fn();
  render(<PinGenerator value={value} onChange={handleChange} />);
  return handleChange;
}

describe("PinGenerator", () => {
  it("renders 4 accessible digit boxes", () => {
    renderPinGenerator();
    expect(screen.getByLabelText("Dígito 1 de 4")).toBeInTheDocument();
    expect(screen.getByLabelText("Dígito 4 de 4")).toBeInTheDocument();
  });

  it("advances focus to the next box after typing a digit", () => {
    const handleChange = renderPinGenerator();
    fireEvent.change(screen.getByLabelText("Dígito 1 de 4"), {
      target: { value: "5" },
    });

    expect(handleChange).toHaveBeenCalledWith("5");
    expect(screen.getByLabelText("Dígito 2 de 4")).toHaveFocus();
  });

  it("clears and moves focus back on Backspace over an empty box", () => {
    const handleChange = renderPinGenerator("12");
    const thirdBox = screen.getByLabelText("Dígito 3 de 4");
    thirdBox.focus();
    fireEvent.keyDown(thirdBox, { key: "Backspace" });

    expect(handleChange).toHaveBeenCalledWith("1");
    expect(screen.getByLabelText("Dígito 2 de 4")).toHaveFocus();
  });

  it("fills a 4-digit numeric code when clicking Generar", () => {
    const handleChange = renderPinGenerator();
    fireEvent.click(screen.getByRole("button", { name: "Generar" }));

    expect(handleChange).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}$/));
  });
});
