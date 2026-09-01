//página de desarrollo - ELIMINAR ANTES DE ENTREGA
import { useEffect, useState } from "react";
import { UserPlus, Pause, Ban, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "../../../shared/components/ui/atoms/StatusBadge/StatusBadge.jsx";
import { INCIDENT_STATUS } from "../../../shared/constants/incidentStatus.js";
import Spinner from "../../../shared/components/ui/atoms/Spinner/Spinner.jsx";
import Button from "../../../shared/components/ui/atoms/Button/Button.jsx";
import Input from "../../../shared/components/ui/atoms/Input/Input.jsx";
import InlineError from "../../../shared/components/ui/atoms/InlineError/InlineError.jsx";
import HelperText from "../../../shared/components/ui/atoms/HelperText/HelperText.jsx";
import Avatar from "../../../shared/components/ui/atoms/Avatar/Avatar.jsx";
import Skeleton from "../../../shared/components/ui/atoms/Skeleton/Skeleton.jsx";
import FormField from "../../../shared/components/ui/molecules/FormField/FormField.jsx";
import SideBar from "../components/ui/organisms/SideBar/SideBar.jsx";
import { ROLES } from "../../../shared/constants/nav";
import NoticeBanner from "../../../shared/components/ui/molecules/NoticeBanner/NoticeBanner.jsx";
import StickyHero from "../components/ui/organisms/StickyHero/StickyHero.jsx";
import StatusBadgeIncident from "../components/ui/molecules/StatusBadgeIncident/StatusBadgeIncident.jsx";
import {
  ALL_STATUS,
  STATUS_BADGE_LABEL,
  STATUS_BADGE_FILTERS,
} from "../../../shared/constants/statusBadgeIncident.js";
import DropdownField from "../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx";
import FilterBar from "../components/ui/molecules/FilterBar/FilterBar.jsx";
import ToggleIncident from "../components/ui/molecules/ToggleIncident/ToggleIncident.jsx";
import PageButton from "../components/ui/atoms/PageButton/PageButton.jsx";
import EmptyMessage from "../components/ui/atoms/EmptyMessage/EmptyMessage.jsx";
import TableIncident from "../components/ui/organisms/TableIncident/TableIncident.jsx";
import {
  INCIDENT_PRIORITY,
  INCIDENT_PRIORITY_LABEL,
} from "../../../shared/constants/incidentPriority.js";
// Componentes A3 (Vivi)
import HeroIncidentCard from "../components/ui/molecules/HeroIncidentCard/HeroIncidentCard.jsx";
import ActionsMenu from "../components/ui/molecules/ActionsMenu/ActionsMenu.jsx";
import BackLink from "../components/ui/atoms/BackLink/BackLink.jsx";
import ReporterCard from "../components/ui/organisms/ReporterCard/ReporterCard.jsx";
import LodgingCard from "../components/ui/organisms/LodgingCard/LodgingCard.jsx";
import ChecklistCard from "../components/ui/organisms/ChecklistCard/ChecklistCard.jsx";
import CronologyCard from "../components/ui/organisms/CronologyCard/CronologyCard.jsx";
import TimeAllocation from "../components/ui/organisms/TimeAllocation/TimeAllocation.jsx";
import ResolutionModal from "../components/ui/organisms/ResolutionModal/ResolutionModal.jsx";
import ConfirmationModal from "../components/ui/organisms/ConfirmationModal/ConfirmationModal.jsx";
import ClassificationCard from "../components/ui/organisms/ClassificationCard/ClassificationCard.jsx";
import PhoneIncidentForm from "../components/ui/organisms/PhoneIncidentForm/PhoneIncidentForm.jsx";
import { getInitialTheme, setTheme } from "../../../shared/utils/theme.js";
import SearchBar from "../components/ui/molecules/SearchBar/SearchBar.jsx";
import LodgingRow from "../components/ui/molecules/LodgingRow/LodgingRow.jsx";

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

function DemoLoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      {loading && <Spinner size="sm" tone="on-brand" />}
      Guardar incidencia
    </Button>
  );
}

/* Datos de ejemplo                                                    */

const MOCK_INCIDENCES = [
  { code: "INC-001", status: "NEW" },
  { code: "INC-002", status: "IN_PROGRESS" },
  { code: "INC-003", status: "NEW" },
  { code: "INC-004", status: "ASSIGNED" },
  { code: "INC-005", status: "RESOLVED" },
  { code: "INC-006", status: "RESOLVED" },
  { code: "INC-007", status: "PAUSED" },
  { code: "INC-008", status: "CLOSED" },
  { code: "INC-009", status: "REJECTED" },
  { code: "INC-010", status: "CLOSED" },
];

const PRIORITY_OPTIONS = [
  { value: "ALL", label: "Toda prioridad" },
  { value: "URGENT", label: INCIDENT_PRIORITY_LABEL.URGENT },
  { value: "HIGH", label: INCIDENT_PRIORITY_LABEL.HIGH },
  { value: "NORMAL", label: INCIDENT_PRIORITY_LABEL.NORMAL },
  { value: "LOW", label: INCIDENT_PRIORITY_LABEL.LOW },
];

const MOCK_TABLE_INCIDENTS = [
  {
    code: "INC-1042",
    title: "El aire acondicionado del salón no enfría",
    category: "CLIMATIZATION",
    accommodation: "Apto. Marina 3B",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignee: "Marc Vidal",
    createdAt: "hace 2 h",
  },
  {
    code: "INC-1041",
    title: "Fuga de agua bajo el fregadero de la cocina",
    category: "PLUMBING",
    accommodation: "Villa Sant Jordi",
    status: "NEW",
    priority: null,
    assignee: null,
    createdAt: "hace 25 min",
  },
  {
    code: "INC-1040",
    title: "Cerradura de la puerta principal atascada",
    category: "LOCKSMITH",
    accommodation: "Apto. Rambla 12",
    status: "ASSIGNED",
    priority: "HIGH",
    assignee: "Laura Puig",
    createdAt: "hace 4 h",
  },
  {
    code: "INC-1039",
    title: "Wifi intermitente en las dos habitaciones",
    category: "CONNECTIVITY_TV",
    accommodation: "Apto. Marina 1A",
    status: "PAUSED",
    priority: "NORMAL",
    assignee: "Marc Vidal",
    createdAt: "ayer",
  },
  {
    code: "INC-1038",
    title: "Bombilla fundida en el baño principal",
    category: "ELECTRICITY",
    accommodation: "Casa Tramuntana",
    status: "RESOLVED",
    priority: "LOW",
    assignee: "Núria Serra",
    createdAt: "ayer",
  },
  {
    code: "INC-1037",
    title: "Persiana del salón bloqueada a media altura",
    category: "OTHERS",
    accommodation: "Apto. Rambla 7",
    status: "CLOSED",
    priority: "NORMAL",
    assignee: "Laura Puig",
    createdAt: "hace 3 d",
  },
  {
    code: "INC-1036",
    title: "El cliente indica olor a gas en la cocina",
    category: "PLUMBING",
    accommodation: "Villa Cala Blanca",
    status: "REJECTED",
    priority: "URGENT",
    assignee: null,
    createdAt: "hace 3 d",
  },
  {
    code: "INC-1035",
    title: "El lavavajillas no desagua correctamente",
    category: "APPLIANCES",
    accommodation: "Apto. Port 4C",
    status: "ASSIGNED",
    priority: "NORMAL",
    assignee: "Marc Vidal",
    createdAt: "hace 5 d",
  },
  {
    code: "INC-1034",
    title: "Mando del televisor sin pilas",
    category: "CONNECTIVITY_TV",
    accommodation: "Apto. Marina 2C",
    status: "NEW",
    priority: null,
    assignee: null,
    createdAt: "hace 6 d",
  },
];

const MOCK_LODGINGS = [
  { id: "lod-1", name: "Apto. Marina 3B" },
  { id: "lod-2", name: "Villa Sant Jordi" },
  { id: "lod-3", name: "Apto. Rambla 12" },
];

const MOCK_OPERATORS = [
  { id: "op-1", name: "Marc Vidal" },
  { id: "op-2", name: "Laura Puig" },
  { id: "op-3", name: "Núria Serra" },
];

/* Sandbox                                                             */

export default function BackofficeSandbox() {
  const [theme, setThemeState] = useState(getInitialTheme);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  }

  const [activeItem, setActiveItem] = useState("incidents");
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoStatus, setDemoStatus] = useState(null);
  const [demoPriority, setDemoPriority] = useState("ALL");
  const [demoCategory, setDemoCategory] = useState("ALL");
  const [demoSearch, setDemoSearch] = useState("");
  const [demoReloading, setDemoReloading] = useState(false);
  const [demoTablePage, setDemoTablePage] = useState(1);
  const [demoToggle, setDemoToggle] = useState("ASSIGNED");
  const [resolveOpen, setResolveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [demoLodgingActive, setDemoLodgingActive] = useState(true);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleStatus = (f) =>
    setDemoStatus((c) => {
      if (f === ALL_STATUS) return null;
      return c === f ? null : f;
    });

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
          onClick={toggleTheme}
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
      <DemoSection title="Spinner">
        <Row label="Tamaños">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Row>
        <Row label="Fuera de rango">
          <Spinner size="GRANDE" />
        </Row>
      </DemoSection>
      <DemoSection title="Button">
        <DemoLoadingButton />
        <Button variant="secondary">Guardar incidencia</Button>
        <Button variant="tertiary">Guardar incidencia</Button>
      </DemoSection>
      <DemoSection title="PageButton">
        <Row label="Estados">
          <PageButton>1</PageButton>
          <PageButton active>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton disabled>Anterior</PageButton>
        </Row>
      </DemoSection>
      <DemoSection title="input">
        <Input />
      </DemoSection>
      <DemoSection title="Inline error">
        <InlineError>Debe contener 20 lineas</InlineError>
      </DemoSection>
      <DemoSection title="Helper text">
        <HelperText>Debe contener 20 lineas</HelperText>
      </DemoSection>
      <DemoSection title="Avatar">
        <Avatar name="Marc Vidal" size="sm" />
        <Avatar name="Manuel Turizo" size="md" />
        <Avatar name="Pau Roig" size="lg" />
        <Avatar size="xl" />
      </DemoSection>
      <DemoSection title="FormField · compartido">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: 320,
          }}
        >
          <FormField
            id="ff-nombre"
            label="Nombre"
            helper="Tal y como aparece en el DNI"
          >
            <Input type="text" placeholder="Ej.: Laura Pérez" />
          </FormField>

          <FormField
            id="ff-email"
            label="Email"
            required
            error="Introduce un email válido"
          >
            <Input type="email" placeholder="nombre@email.com" invalid />
          </FormField>
        </div>
      </DemoSection>
      <DemoSection title="Skeleton">
        <Row label="Línea de texto">
          <Skeleton width={200} />
          <Skeleton width={140} />
          <Skeleton width={260} />
        </Row>
        <Row label="Avatar">
          <Skeleton width={48} height={48} radius="50%" />
          <Skeleton width={32} height={32} radius="50%" />
        </Row>
        <Row label="Tarjeta">
          <Skeleton width="350px" height={80} radius={14} />
        </Row>
      </DemoSection>

      <DemoSection title="Layout responsive — SideBar / drawer (<1040px)">
        <StickyHero
          title="Incidencias"
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuClick={() => setMenuOpen(true)}
        />
        <SideBar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          role={ROLES.ADMIN}
          activeItem={activeItem}
          onSelect={(key) => {
            setActiveItem(key);
            setMenuOpen(false);
          }}
          userName="Laura Pérez"
          onLogout={() => console.log("Logout")}
        />
      </DemoSection>
      <DemoSection title="NoticeBanner">
        <NoticeBanner title="Error al guardar" tone="error">
          Revisa los campos marcados en rojo.
        </NoticeBanner>

        <NoticeBanner title="Aviso" onClose={() => console.log("Cerrar")}>
          Ya tienes una reserva en estas fechas.
        </NoticeBanner>
      </DemoSection>

      <DemoSection title="DropdownField">
        <Row label="Prioridad">
          <DropdownField
            value={demoPriority}
            onChange={(e) => setDemoPriority(e.target.value)}
            options={PRIORITY_OPTIONS}
          />
        </Row>
        <Row label="Con FormField · error">
          <div style={{ maxWidth: 320, width: "100%" }}>
            <FormField
              id="ff-prio"
              label="Prioridad"
              error="Selecciona una prioridad"
            >
              <DropdownField options={PRIORITY_OPTIONS} invalid />
            </FormField>
          </div>
        </Row>
      </DemoSection>

      <DemoSection title="ToggleIncident · solo operarios">
        <Row label="Toggle">
          <ToggleIncident value={demoToggle} onChange={setDemoToggle} />
        </Row>
        <Row label="Valor actual">{demoToggle}</Row>
      </DemoSection>

      <DemoSection title="FilterBar">
        <FilterBar
          search={demoSearch}
          onSearchChange={(e) => setDemoSearch(e.target.value)}
          category={demoCategory}
          onCategoryChange={(e) => setDemoCategory(e.target.value)}
          priority={demoPriority}
          onPriorityChange={(e) => setDemoPriority(e.target.value)}
          onReload={() => {
            setDemoReloading(true);
            setTimeout(() => setDemoReloading(false), 800);
          }}
          reloading={demoReloading}
          onCreate={() => console.log("Nueva incidencia")}
        />
      </DemoSection>

      <DemoSection title="Estado · resumen con contador y punto de color">
        <Row label="Estados">
          {STATUS_BADGE_FILTERS.map((f) => (
            <StatusBadgeIncident
              key={f}
              status={f}
              count={
                f === ALL_STATUS
                  ? MOCK_INCIDENCES.length
                  : MOCK_INCIDENCES.filter((i) => i.status === f).length
              }
              active={f === ALL_STATUS ? demoStatus === null : demoStatus === f}
              onClick={() => toggleStatus(f)}
            />
          ))}
        </Row>
        <Row label="Filtro actual">
          {demoStatus ? STATUS_BADGE_LABEL[demoStatus] : "Todas"}
        </Row>
      </DemoSection>

      <DemoSection title="EmptyMessage">
        <EmptyMessage />
        <EmptyMessage message="No hay usuarios con esos filtros" />
      </DemoSection>

      <DemoSection title="TableIncident · con datos">
        <TableIncident
          incidents={MOCK_TABLE_INCIDENTS}
          onRowClick={(inc) => console.log("Clicked:", inc.code)}
          page={demoTablePage}
          totalPages={2}
          totalResults={MOCK_TABLE_INCIDENTS.length}
          onPrevPage={() => setDemoTablePage((p) => Math.max(1, p - 1))}
          onNextPage={() => setDemoTablePage((p) => Math.min(2, p + 1))}
          onGoToPage={(p) => setDemoTablePage(p)}
        />
      </DemoSection>

      <DemoSection title="TableIncident · vacío">
        <TableIncident incidents={[]} />
      </DemoSection>

      <DemoSection title="StickyHero">
        <div
          style={{
            border: "1px dashed var(--color-border-strong)",
            borderRadius: "var(--radius-card)",
            overflow: "auto",
            height: 300,
          }}
        >
          <StickyHero
            title="Incidencias"
            subtitle="Listado operativo de mantenimiento"
            theme={theme}
            onToggleTheme={toggleTheme}
            onMenuClick={() => console.log("Abrir menú")}
          />
          <div
            style={{
              height: 600,
              padding: "1rem",
              color: "var(--color-text-soft)",
              background:
                "repeating-linear-gradient(0deg, var(--color-border) 0 1px, transparent 1px 48px)",
            }}
          >
            Desplázate con la rueda del ratón dentro de esta caja: el header se
            queda fijo arriba.
          </div>
        </div>
      </DemoSection>

      {/* ===== Componentes A3 (Vivi) ===== */}
      <DemoSection title="HeroIncident Card">
        <BackLink onClick={() => console.log("volver")}>
          Volver al listado
        </BackLink>
        <HeroIncidentCard
          code="INC-1042"
          title="El aire acondicionado del salón no enfría"
          status={INCIDENT_STATUS.IN_PROGRESS}
          priority={INCIDENT_PRIORITY.HIGH}
          actions={
            <>
              <Button variant="primary" onClick={() => setResolveOpen(true)}>
                Resolver
              </Button>
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
                    id: "change",
                    label: "Cambiar prioridad",
                    icon: RefreshCw,
                    onSelect: () => console.log("cambiar"),
                  },
                  {
                    id: "reject",
                    label: "Rechazar",
                    icon: Ban,
                    danger: true,
                    onSelect: () => setRejectOpen(true),
                  },
                ]}
              />
              <ConfirmationModal
                isOpen={rejectOpen}
                onClose={() => setRejectOpen(false)}
                onConfirm={() => {
                  console.log("rechazada");
                  setRejectOpen(false);
                }}
                title="Rechazar incidencia"
                subtitle="INC-1042 · Apto. Marina 3B"
                message="¿Seguro que quieres rechazar esta incidencia? Esta acción no se puede deshacer."
                confirmLabel="Rechazar"
                tone="danger"
              />
            </>
          }
        />
      </DemoSection>

      <DemoSection title="ClassificationCard">
        <ClassificationCard
          onChange={(c) => console.log("clasificación →", c)}
          onAssign={(c) => console.log("asignar →", c)}
        />
      </DemoSection>

      <DemoSection title="Reporter Card">
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
          name="Apto. Marina 2C"
          address="Passeig Marítim 44, 2ºC, Palma"
          reference="REF-0030"
          owner="Inmobiliaria Illes SL"
          coordinates="39.5696, 2.6502"
          mapEmbedUrl="https://www.openstreetmap.org/export/embed.html?bbox=2.63%2C39.56%2C2.66%2C39.58&layer=mapnik&marker=39.57%2C2.65"
          mapsUrl="https://www.google.com/maps?q=39.5696,2.6502"
          accessNotes="Misma caja de llaves que el 3B (PIN 4821). Material de repuesto en el trastero -1, plaza 12."
        />
      </DemoSection>

      <DemoSection title="Checklist Card">
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

      <DemoSection title="Cronology Card">
        <CronologyCard
          currentUser="Marc Vidal"
          initialEntries={[
            {
              id: "e1",
              title: "Incidencia creada por teléfono",
              author: "Pau Roig",
              atLabel: "10:12",
              status: INCIDENT_STATUS.NEW,
              description:
                "El cliente indica que el equipo arranca pero expulsa aire templado desde ayer por la tarde.",
            },
            {
              id: "e2",
              title: "Asignada a Marc Vidal",
              author: "Pau Roig",
              atLabel: "10:20",
              status: INCIDENT_STATUS.ASSIGNED,
            },
            {
              id: "e3",
              title: "Trabajo iniciado",
              author: "Marc Vidal",
              atLabel: "11:47",
              status: INCIDENT_STATUS.IN_PROGRESS,
            },
            {
              id: "e4",
              title: "Comentario interno",
              author: "Marc Vidal",
              atLabel: "12:05",
              description:
                "Filtros muy saturados. Limpiados. Sigue sin enfriar, reviso circuito de gas.",
            },
            {
              id: "e5",
              title: "Trabajo pausado",
              author: "Pau Roig",
              atLabel: "ahora",
              status: INCIDENT_STATUS.PAUSED,
            },
            {
              id: "e6",
              title: "Trabajo reanudado",
              author: "Pau Roig",
              atLabel: "ahora",
              status: INCIDENT_STATUS.IN_PROGRESS,
            },
          ]}
          onAddComment={(c) => console.log("comentario →", c)}
        />
      </DemoSection>

      <DemoSection title="Time Allocation">
        <TimeAllocation
          currentOperator="Juan (operario)"
          initialEntries={[
            {
              id: "a1",
              operator: "Juan",
              concept: "Revisión de gas refrigerante",
              minutes: 30,
            },
            {
              id: "a2",
              operator: "Juan",
              concept: "Cambio de filtro",
              minutes: 45,
            },
          ]}
          onImpute={(entry) => console.log("imputar →", entry)}
        />
      </DemoSection>

      <DemoSection title="Resolution Modal">
        <Button onClick={() => setResolveOpen(true)}>Resolver</Button>
        <ResolutionModal
          isOpen={resolveOpen}
          onClose={() => setResolveOpen(false)}
          incidentCode="INC-1042"
          lodgingName="Apto. Marina 3B"
          onResolve={(data) => {
            console.log("resuelta →", data);
            setResolveOpen(false);
          }}
        />
      </DemoSection>

      <DemoSection title="PhoneIncidentForm · B-A4">
        <PhoneIncidentForm
          lodgings={MOCK_LODGINGS}
          operators={MOCK_OPERATORS}
          onSubmit={(data) => console.log("Nueva incidencia telefónica", data)}
        />
      </DemoSection>

      <DemoSection title="SearchBar">
        <SearchBar
          search={demoSearch}
          onSearchChange={(e) => setDemoSearch(e.target.value)}
          onCreate={() => console.log("Nuevo alojamiento")}
        />
      </DemoSection>

      <DemoSection title="LodgingRow">
        <LodgingRow
          name="Apto. Marina 3B"
          address="Passeig Marítim 44, 3B, Palma"
          pin="4821"
          reference="REF-0031"
          active={demoLodgingActive}
          notes="Caja de llaves a la izquierda del portal. El ascensor requiere la llave magnética del llavero verde."
          onEdit={() => console.log("Editar")}
          onChangePin={() => console.log("Cambiar PIN")}
          onToggleActive={() => setConfirmDeactivate(true)}
        />

        <ConfirmationModal
          isOpen={confirmDeactivate}
          onClose={() => setConfirmDeactivate(false)}
          onConfirm={() => {
            setDemoLodgingActive((v) => !v);
            setConfirmDeactivate(false);
          }}
          title={
            demoLodgingActive
              ? "¿Desactivar alojamiento?"
              : "¿Activar alojamiento?"
          }
          message={
            demoLodgingActive
              ? "Se bloquearán nuevos reportes de huéspedes y se ocultará del selector telefónico. Las incidencias previas se conservan."
              : "El alojamiento volverá a admitir el acceso de huéspedes."
          }
          confirmLabel={demoLodgingActive ? "Desactivar" : "Activar"}
          tone={demoLodgingActive ? "danger" : "default"}
        />
      </DemoSection>
    </main>
  );
}
