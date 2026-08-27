//página de desarollo - ELIMINAR ANTES DE ENTREGA

import { useForm } from "react-hook-form";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton.jsx";
import TextButton from "../components/TextButton/TextButton.jsx";
import StatusBadge from "../../../shared/components/StatusBadge/StatusBadge.jsx";
import { INCIDENT_STATUS } from "../../../shared/constants/incidentStatus";
import NoticeBox from "../components/NoticeBox/NoticeBox.jsx";
import DetailRow from "../components/DetailRow/DetailRow.jsx";
import LodgingCard from "../components/LodgingCard/LodgingCard.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import { CheckCircle2 } from "lucide-react";
import SuccessPanel from "../components/SuccessPanel/SuccessPanel.jsx";
import GuestIncidentItem from "../components/GuestIncidentItem/GuestIncidentItem.jsx";
import { useState } from "react";
import { getInitialTheme, setTheme } from "../../../shared/utils/theme.js";
import NewIncidentForm from "../components/organisms/NewIncidentForm/NewIncidentForm.jsx";
import ReadonlyField from "../../../shared/components/molecules/ReadonlyField/ReadonlyField.jsx";
import PinInput from "../components/atoms/PinInput/PinInput.jsx";

export default function GuestSandbox() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Simula una llamada al backend para ver el spinner
  const onSubmit = () => new Promise((resolve) => setTimeout(resolve, 1500));

  const handleIncidentDemo = (data) =>
    new Promise((resolve) => {
      console.log("Nueva incidencia (demo):", data);
      setTimeout(resolve, 1500); // simula el backend para ver el spinner
    });

  const [theme, setThemeState] = useState(getInitialTheme);

  const [pin, setPin] = useState("");

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "420px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Sandbox · GP, G3 y G4</h1>

      <button
        type="button"
        onClick={toggleTheme}
        style={{
          alignSelf: "flex-start",
          padding: "8px 14px",
          borderRadius: "var(--radius-field)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-strong)",
          color: "var(--color-text-strong)",
          cursor: "pointer",
        }}
      >
        Tema: {theme}
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <PrimaryButton type="submit" isLoading={isSubmitting}>
          Enviar incidencia
        </PrimaryButton>
      </form>

      <PrimaryButton>Reposo</PrimaryButton>
      <PrimaryButton disabled>Deshabilitado</PrimaryButton>
      <PrimaryButton isLoading>Enviando</PrimaryButton>

      <TextButton to="/">Volver</TextButton>
      <TextButton onClick={() => alert("cerrar sesión")}>Salir</TextButton>
      <TextButton disabled>Deshabilitado</TextButton>

      <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
        {Object.values(INCIDENT_STATUS).map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </div>

      <StatusBadge status="INVENTADO" />

      <div
        style={{
          background: "var(--color-surface)",
          borderRadius: "var(--radius-card)",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <NoticeBox>
          Para incidencias urgentes como una fuga de agua o un corte de luz,
          llama directamente al teléfono de emergencias del alojamiento.
        </NoticeBox>

        <dl style={{ margin: 0 }}>
          <DetailRow label="Alojamiento">Apto. Marina 3B</DetailRow>
          <DetailRow label="Referencia">CB-001</DetailRow>
          <DetailRow label="Estado">
            <StatusBadge status={INCIDENT_STATUS.IN_PROGRESS} />
          </DetailRow>
        </dl>
      </div>

      <LodgingCard name="Apto. Marina 3B" reference="CB-001" />

      <EmptyState
        icon={CheckCircle2}
        title="Todo en orden"
        action={<PrimaryButton>Reportar una incidencia</PrimaryButton>}
      >
        No hay incidencias abiertas en tu alojamiento.
      </EmptyState>

      <SuccessPanel
        title="Hemos recibido tu aviso"
        code="INC-2026-000042"
        action={
          <TextButton to="/alojamiento">Volver a mi alojamiento</TextButton>
        }
      >
        Nuestro equipo revisará la incidencia. Puedes consultar su estado en
        cualquier momento con este código.
      </SuccessPanel>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
          padding: 0,
          margin: 0,
        }}
      >
        <GuestIncidentItem
          to="/incidencias/1"
          code="INC-2026-000042"
          title="El aire acondicionado del salón no enfría y hace un ruido fuerte al arrancar"
          status={INCIDENT_STATUS.IN_PROGRESS}
          openedAt="2026-08-21T09:14:00Z"
        />
        <GuestIncidentItem
          to="/incidencias/2"
          code="INC-2026-000038"
          title="Gotera en el baño"
          status={INCIDENT_STATUS.CLOSED}
          openedAt="2026-08-14T17:02:00Z"
        />
      </ul>

      <h2 style={{ margin: "1rem 0 0" }}>Organismo · Reportar incidencia</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
          padding: "1.25rem",
        }}
      >
        <ReadonlyField label="Fecha del reporte" tag="Automático">
          27 ago 2026, 17:46
        </ReadonlyField>

        <ReadonlyField label="Dirección del alojamiento" tag="Fijo">
          <strong>Carrer de la Marina 118, 3ºB · 08013 Barcelona</strong>
          <br />
          <span style={{ color: "var(--color-text-muted)" }}>
            Apartamento Marina Blava, 3ºB
          </span>
        </ReadonlyField>

        <NewIncidentForm onSubmit={handleIncidentDemo} />
      </div>

      <PinInput value={pin} onChange={setPin} />
    </main>
  );
}
