//página de desarollo - ELIMINAR ANTES DE ENTREGA

import { useForm } from "react-hook-form";
import PrimaryButton from "../../../components/guest/PrimaryButton/PrimaryButton";
import TextButton from "../../../components/guest/TextButton/TextButton";
import StatusBadge from "../../../components/shared/StatusBadge/StatusBadge";
import { INCIDENT_STATUS } from "../../../constants/incidentStatus";
import NoticeBox from "../../../components/guest/NoticeBox/NoticeBox.jsx";
import DetailRow from "../../../components/guest/DetailRow/DetailRow.jsx";
import PropertyCard from "../../../components/guest/PropertyCard/PropertyCard.jsx";
import EmptyState from "../../../components/guest/EmptyState/EmptyState.jsx";
import { CheckCircle2 } from "lucide-react";
import SuccessPanel from "../../../components/guest/SuccessPanel/SuccessPanel.jsx";
import IssueListItem from "../../../components/guest/IssueListItem/IssueListItem.jsx";

import GradientBackground from "../../../components/guest/GradientBackground/GradientBackground.jsx";
import Logo from "../../../components/guest/Logo/Logo.jsx";
import ThemeToggle from "../../../components/guest/ThemeToggle/ThemeToggle.jsx";
import Card from "../../../components/guest/Card/Card.jsx";
import PageHeader from "../../../components/guest/PageHeader/PageHeader.jsx";
import AuthLayout from "../../../components/guest/AuthLayout/AuthLayout.jsx";
import ContentLayout from "../../../components/guest/ContentLayout/ContentLayout.jsx";

export default function GuestSandbox() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Simula una llamada al backend para ver el spinner
  const onSubmit = () => new Promise((resolve) => setTimeout(resolve, 1500));

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
      <h1>Sandbox · G3 y G4</h1>

      <h2>GP — Base y layout</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <GradientBackground
          fullHeight={false}
          style={{ padding: "20px", borderRadius: "12px" }}
        >
          <Logo />
        </GradientBackground>
        <Card variant="content">Card variante "content" (radio 22)</Card>
        <Card variant="auth">Card variante "auth" (radio 20)</Card>
      </div>

      <div
        style={{
          position: "relative",
          height: "360px",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <AuthLayout>
          <PageHeader
            eyebrow="Identificación"
            title="Accede a tu alojamiento"
          />
          <p>Contenido del formulario de login aquí.</p>
        </AuthLayout>
      </div>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <ContentLayout
          header={
            <PageHeader
              backLabel="Mi alojamiento"
              onBack={() => alert("volver")}
              eyebrow="INC-2026-000042"
              title="El aire acondicionado no enfría"
            />
          }
        >
          <p>Contenido de la incidencia aquí.</p>
        </ContentLayout>
      </div>

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

      <PropertyCard name="Apto. Marina 3B" reference="CB-001" />

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
        <IssueListItem
          to="/incidencias/1"
          code="INC-2026-000042"
          title="El aire acondicionado del salón no enfría y hace un ruido fuerte al arrancar"
          status={INCIDENT_STATUS.IN_PROGRESS}
          openedAt="2026-08-21T09:14:00Z"
        />
        <IssueListItem
          to="/incidencias/2"
          code="INC-2026-000038"
          title="Gotera en el baño"
          status={INCIDENT_STATUS.CLOSED}
          openedAt="2026-08-14T17:02:00Z"
        />
      </ul>
    </main>
  );
}
