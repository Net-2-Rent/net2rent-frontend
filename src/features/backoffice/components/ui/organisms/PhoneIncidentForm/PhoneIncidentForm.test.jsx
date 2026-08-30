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
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("El nombre es obligatorio", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("El apellido es obligatorio", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("El título es obligatorio", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La descripción es obligatoria", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("updates the title counter as the user types", () => {
    renderPhoneIncidentForm();

    expect(screen.getByText("0/150")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Título de la incidencia"), {
      target: { value: "Fuga de agua" },
    });

    expect(screen.getByText("12/150")).toBeInTheDocument();
  });

  it("switches the notice text when an operator is selected", () => {
    renderPhoneIncidentForm({ operators: [{ id: "op-1", name: "Marta" }] });

    expect(
      screen.getByText(
        "Sin operario seleccionado: la incidencia se creará con estado NEW y estará disponible en el pool.",
      ),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Operario asignado (opcional)"), {
      target: { value: "op-1" },
    });

    expect(
      screen.getByText(
        "Se creará en estado ASSIGNED con la fecha de apertura indicada.",
      ),
    ).toBeInTheDocument();
  });

  it("blocks submission when the opening date is in the future", async () => {
    const handleSubmit = renderPhoneIncidentForm();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    fireEvent.change(screen.getByLabelText("Fecha de apertura"), {
      target: { value: tomorrow.toISOString().slice(0, 10) },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Registrar incidencia" }),
    );

    expect(
      await screen.findByText("No se admiten fechas ni horas futuras.", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
