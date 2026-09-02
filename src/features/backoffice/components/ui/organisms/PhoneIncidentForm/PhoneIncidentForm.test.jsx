import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PhoneIncidentForm from "./PhoneIncidentForm.jsx";

function renderPhoneIncidentForm(props = {}) {
  const handleSubmit = vi.fn();
  render(<PhoneIncidentForm onSubmit={handleSubmit} {...props} />);
  return handleSubmit;
}

describe("PhoneIncidentForm", () => {
  it("shows required field errors when submitting an empty form", async () => {
    const handleSubmit = renderPhoneIncidentForm();

    fireEvent.click(
        screen.getByRole("button", { name: "Registrar incidencia" }),
    );

    expect(
        await screen.findByText("Selecciona un alojamiento", {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(
        screen.getByText("El nombre es obligatorio", {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(
        screen.getByText("El apellido es obligatorio", {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(
        screen.getByText("Selecciona una categoría", {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(
        screen.getByText("La descripción es obligatoria", {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("blocks submission when the opening date is in the future", async () => {
    const handleSubmit = renderPhoneIncidentForm();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    fireEvent.change(screen.getByLabelText(/^Fecha de apertura/), {
      target: { value: tomorrow.toISOString().slice(0, 10) },
    });
    fireEvent.click(
        screen.getByRole("button", { name: "Registrar incidencia" }),
    );

    expect(
        await screen.findByText("No se admiten fechas ni horas futuras.", {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("validates phone format when a contact is provided", async () => {
    const handleSubmit = renderPhoneIncidentForm();

    fireEvent.change(screen.getByLabelText(/Teléfono/), {
      target: { value: "600 sin prefijo" },
    });
    fireEvent.click(
        screen.getByRole("button", { name: "Registrar incidencia" }),
    );

    expect(
        await screen.findByText(/formato internacional/, {
          selector: '[role="alert"] *',
        }),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});