import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ResolutionModal from "./ResolutionModal.jsx";

function renderModal(props = {}) {
  const onResolve = vi.fn();
  const onClose = vi.fn();
  const utils = render(
    <ResolutionModal
      isOpen
      onClose={onClose}
      onResolve={onResolve}
      incidentCode="INC-2026-000001"
      lodgingName="Piso Centro"
      {...props}
    />,
  );
  return { ...utils, onResolve, onClose };
}

describe("ResolutionModal", () => {
  it("disables the submit button until minutes and note are filled", () => {
    renderModal();
    const submit = screen.getByRole("button", { name: "Marcar como resuelta" });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Minutos invertidos"), {
      target: { value: "45" },
    });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Nota de resolución"), {
      target: { value: "Cambiado el filtro" },
    });
    expect(submit).toBeEnabled();
  });

  it("submits trimmed note and numeric minutes", () => {
    const { onResolve } = renderModal();

    fireEvent.change(screen.getByLabelText("Minutos invertidos"), {
      target: { value: "45" },
    });
    fireEvent.change(screen.getByLabelText("Nota de resolución"), {
      target: { value: "  Cambiado el filtro  " },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Marcar como resuelta" }),
    );

    expect(onResolve).toHaveBeenCalledWith({
      minutes: 45,
      note: "Cambiado el filtro",
    });
  });

  it("disables the submit button and shows the loading label while submitting", () => {
    renderModal({ submitting: true });
    expect(screen.getByRole("button", { name: "Guardando..." })).toBeDisabled();
  });

  it("shows the backend error message", () => {
    renderModal({ error: "Quedan 2 tareas del checklist sin completar" });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Quedan 2 tareas del checklist sin completar",
    );
  });

  it("resets minutes and note when reopened after a previous fill", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <ResolutionModal isOpen onClose={onClose} onResolve={vi.fn()} />,
    );

    fireEvent.change(screen.getByLabelText("Minutos invertidos"), {
      target: { value: "45" },
    });
    fireEvent.change(screen.getByLabelText("Nota de resolución"), {
      target: { value: "Cambiado el filtro" },
    });

    rerender(
      <ResolutionModal isOpen={false} onClose={onClose} onResolve={vi.fn()} />,
    );
    rerender(<ResolutionModal isOpen onClose={onClose} onResolve={vi.fn()} />);

    expect(screen.getByLabelText("Minutos invertidos").value).toBe("");
    expect(screen.getByLabelText("Nota de resolución").value).toBe("");
  });
});
