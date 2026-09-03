import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../components/ui/organisms/ContentLayout/ContentLayout.jsx";
import PageHeader from "../components/ui/molecules/PageHeader/PageHeader.jsx";
import NewIncidentForm from "../components/ui/organisms/NewIncidentForm/NewIncidentForm.jsx";
import ReadonlyField from "../../../shared/components/ui/molecules/ReadonlyField/ReadonlyField.jsx";
import { useGuestAuthStore } from "../store/guestAuthStore.js";
import { createGuestIncident } from "../services/guestApi.js";
import "./NewGuestIncidentPage.scss";

const reportDateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function NewGuestIncidentPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const lodgingName = useGuestAuthStore((state) => state.lodgingName);
  const lodgingAddress = useGuestAuthStore((state) => state.lodgingAddress);

  async function handleSubmit(values) {
    setSubmitError(null);
    try {
      const incident = await createGuestIncident(values);
      navigate(`/incidencias/confirmacion/${incident.code}`);
    } catch (err) {
      const message =
        err.response?.data?.message ??
        "No se pudo enviar la incidencia. Inténtalo de nuevo.";
      setSubmitError(message);
    }
  }

  return (
    <ContentLayout
      header={
        <PageHeader
          backLabel="Volver"
          onBack={() => navigate("/alojamiento")}
          title="Nueva incidencia"
        />
      }
    >
      <div className="new-guest-incident-page">
        <ReadonlyField label="Fecha del reporte" tag="Automático">
          {reportDateFormatter.format(new Date())}
        </ReadonlyField>

        <ReadonlyField label="Dirección del alojamiento" tag="Fijo">
          <strong>{lodgingAddress || "Dirección no disponible"}</strong>
          {lodgingName && (
            <>
              <br />
              <span style={{ color: "var(--color-text-muted)" }}>
                {lodgingName}
              </span>
            </>
          )}
        </ReadonlyField>

        <NewIncidentForm onSubmit={handleSubmit} submitError={submitError} />
      </div>
    </ContentLayout>
  );
}

export default NewGuestIncidentPage;
