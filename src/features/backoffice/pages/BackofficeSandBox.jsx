//página de desarrollo - ELIMINAR ANTES DE ENTREGA

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../../shared/components/StatusBadge/StatusBadge.jsx";
import { INCIDENT_STATUS } from "../../../shared/constants/incidentStatus.js";
import { INCIDENT_PRIORITY } from "../../../shared/constants/incidentPriority.js";
import BackLink from "../components/BackLink/BackLink.jsx";
import HeroIncidentCard from "../components/HeroIncidentCard/HeroIncidentCard.jsx";
import ActionsMenu from "../components/ActionsMenu/ActionsMenu.jsx";
import { UserPlus, Pause, Ban, RefreshCw } from "lucide-react";
import ReporterCard from "../components/ReporterCard/ReporterCard.jsx";
import LodgingCard from "../components/LodgingCard/LodgingCard.jsx";
import ChecklistCard from "../components/ChecklistCard/ChecklistCard.jsx";
import CronologyCard from "../components/CronologyCard/CronologyCard.jsx";
import Modal from "../../../shared/components/Modal/Modal.jsx";
/* Helpers de la sandbox                                               */

function DemoSection({ title, children }) {
  return (
    <section style={{ margin: "0 0 2rem" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          margin: "0 0 .75rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span
        style={{
          width: "120px",
          flex: "none",
          fontSize: "12px",
          color: "var(--color-text-muted)",
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Sandbox                                                             */

export default function BackofficeSandbox() {
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main
      style={{
        width: "100%",
        maxWidth: "var(--layout-content-max)",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 0 2rem",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Sandbox · Backoffice</h1>
          <p style={{ margin: ".25rem 0 0", color: "var(--color-text-muted)" }}>
            <code>data-app="backoffice"</code> ·{" "}
            <Link to="/sandbox">Sandbox guest</Link>
          </p>
        </div>

        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          style={{
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
      </header>

      <DemoSection title="StatusBadge · compartido">
        <Row label="Estados">
          {Object.values(INCIDENT_STATUS).map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </Row>
        <Row label="Fuera de rango">
          <StatusBadge status="INVENTADO" />
        </Row>
      </DemoSection>

      <DemoSection title="BackLink">
        <BackLink to="/gestion/incidencias">Volver al listado</BackLink>
      </DemoSection>

      <DemoSection title="Cabecera de incidencia">
        <HeroIncidentCard
          code="INC-2025-0042"
          title="El aire acondicionado no enfría"
          status={INCIDENT_STATUS.IN_PROGRESS}
          priority={INCIDENT_PRIORITY.HIGH}
        />
      </DemoSection>

      <DemoSection title="Actions Menu">
        <ActionsMenu
          items={[
            {
              id: "reassign",
              label: "Reasignar a otro operario",
              icon: UserPlus,
              onSelect: () => console.log("reasignar"),
            },
            {
              id: "pause",
              label: "Pausar trabajo",
              icon: Pause,
              onSelect: () => console.log("pausar"),
            },
            {
              id: "change-priority",
              label: "Cambiar prioridad",
              icon: RefreshCw,
              onSelect: () => console.log("cambiar prioridad"),
            },
            {
              id: "reject",
              label: "Rechazar",
              icon: Ban,
              danger: true,
              onSelect: () => console.log("rechazar"),
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="ReporterCard">
        <ReporterCard
          message="El equipo arranca pero expulsa aire templado desde ayer por la tarde. El mando muestra 18°C."
          reporterName="Sophie Klein"
          reporterContact="+34 611 204 887"
          openedLabel="hace 2 h"
          stayLabel="18–25 ago · 4 huéspedes"
          hasPhoto
          onViewPhoto={() => console.log("ver foto")}
        />
      </DemoSection>

      <DemoSection title="Lodging Card">
        <LodgingCard
          name="Apto. Marina 3B"
          address="Passeig Marítim 44, 3ºB, Palma"
          reference="REF-0031"
          owner="Inmobiliaria Illes SL"
          coordinates="39.5696, 2.6502"
          mapEmbedUrl="https://www.openstreetmap.org/export/embed.html?bbox=2.63%2C39.56%2C2.66%2C39.58&layer=mapnik&marker=39.57%2C2.65"
          mapsUrl="https://www.google.com/maps?q=39.5696,2.6502"
        />
      </DemoSection>

      <DemoSection title="ChecklistCard">
        <ChecklistCard
          initialTasks={[
            {
              id: "t1",
              text: "Comprobar filtros y limpiar rejillas",
              done: true,
            },
            {
              id: "t2",
              text: "Medir temperatura de salida del split",
              done: false,
            },
          ]}
          onChange={(tasks) => console.log("autoguardar →", tasks)}
        />
      </DemoSection>

      <DemoSection title="ChecklistCard · vacío">
        <ChecklistCard
          onChange={(tasks) => console.log("autoguardar →", tasks)}
        />
      </DemoSection>

      <DemoSection title="CronologyCard">
        <CronologyCard
          currentUser="Marta (coordinadora)"
          initialEntries={[
            {
              id: "e1",
              type: "event",
              author: "Sistema",
              text: "Incidencia creada",
              at: "2026-08-27T16:10:00Z",
            },
            {
              id: "e2",
              type: "event",
              author: "Marta",
              text: "Asignada a Juan (operario)",
              at: "2026-08-27T16:20:00Z",
            },
            {
              id: "c1",
              type: "comment",
              author: "Juan",
              text: "Reviso el equipo esta tarde.",
              at: "2026-08-27T17:05:00Z",
            },
          ]}
          onAddComment={(comment) => console.log("nuevo comentario →", comment)}
        />
      </DemoSection>

      <DemoSection title="Modal base">
        <button type="button" onClick={() => setModalOpen(true)}>
          Abrir modal
        </button>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Título del modal"
          footer={
            <>
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" onClick={() => setModalOpen(false)}>
                Confirmar
              </button>
            </>
          }
        >
          <p>
            Contenido de prueba. Prueba: Tab (el foco no se sale), Escape y clic
            en el fondo.
          </p>
        </Modal>
      </DemoSection>
    </main>
  );
}
