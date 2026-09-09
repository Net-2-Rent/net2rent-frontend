import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, XCircle } from "lucide-react";
import HeroIncidentCard from "../../components/ui/molecules/HeroIncidentCard/HeroIncidentCard";
import ClassificationCard from "../../components/ui/organisms/ClassificationCard/ClassificationCard";
import ChecklistCard from "../../components/ui/organisms/ChecklistCard/ChecklistCard";
import IncidentEditForm from "../../components/ui/organisms/IncidentEditForm/IncidentEditForm";
import Button from "../../../../shared/components/ui/atoms/Button/Button";
import Spinner from "../../../../shared/components/ui/atoms/Spinner/Spinner";
import {
  getIncidentById,
  classifyIncident,
  correctIncidentText,
  rejectIncident,
  claimIncident,
  startIncident,
  pauseIncident,
  resumeIncident,
} from "../../services/incidentApi";
import ActionsMenu from "../../components/ui/molecules/ActionsMenu/ActionsMenu";
import RejectionModal from "../../components/ui/organisms/RejectionModal/RejectionModal";
import NoticeBox from "../../../../shared/components/ui/molecules/NoticeBox/NoticeBox";
import { useIncidentChecklist } from "../../hooks/useIncidentChecklist";
import { useIncidentTimeline } from "../../hooks/useIncidentTimeline.js";
import { useAuthStore } from "../../../auth/store/authStore";
import { ROLES } from "../../../../shared/constants/nav";
import { INCIDENT_STATUS } from "../../../../shared/constants/incidentStatus";
import "./IncidentDetailPage.scss";
import ReporterCard from "../../components/ui/organisms/ReporterCard/ReporterCard";
import LodgingCard from "../../components/ui/organisms/LodgingCard/LodgingCard";
import IncidentPrimaryAction from "../../components/ui/molecules/IncidentPrimaryAction/IncidentPrimaryAction";
import PauseModal from "../../components/ui/organisms/PauseModal/PauseModal";
import NoticeBanner from "../../../../shared/components/ui/molecules/NoticeBanner/NoticeBanner";
import ChronologyCard from "../../components/ui/organisms/ChronologyCard/ChronologyCard.jsx";

export default function IncidentDetailPage() {
  const { id } = useParams();
  const role = useAuthStore((s) => s.user?.role);
  const canTriage = role === ROLES.COORDINATOR || role === ROLES.ADMIN;
  const isOperator = role === ROLES.OPERATOR;

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [rejectError, setRejectError] = useState(null);

  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState(null);

  const [executing, setExecuting] = useState(false);
  const [executeError, setExecuteError] = useState(null);

  const [pauseOpen, setPauseOpen] = useState(false);
  const [pausing, setPausing] = useState(false);
  const [pauseError, setPauseError] = useState(null);

  const {
    items: checklistItems,
    loading: checklistLoading,
    error: checklistError,
    adding: checklistAdding,
    pendingIds: checklistPendingIds,
    addItem: addChecklistItem,
    toggleItem: toggleChecklistItem,
    removeItem: removeChecklistItem,
    reorderItem: reorderChecklistItem,
  } = useIncidentChecklist(id);

  const {
    entries: timelineEntries,
    loading: timelineLoading,
    error: timelineError,
    submitting: timelineSubmitting,
    addComment: addTimelineComment,
  } = useIncidentTimeline(id);

  const loadIncident = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getIncidentById(id);
      setIncident(data);
    } catch (err) {
      setLoadError(
        err.response?.status === 404
          ? "La incidencia no existe o no es de tu cuenta."
          : "No se pudo cargar la incidencia.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadIncident();
  }, [loadIncident]);

  async function handleClassify(values) {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const updated = await classifyIncident(id, values);
      setIncident(updated);
      setSaved(true);
      setEditing(false);
    } catch (err) {
      setSaveError(
        err.response?.data?.message ??
          "No se pudo guardar la clasificación. Inténtalo de nuevo.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit(values) {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      let updated = incident;

      if (values.title !== incident.title) {
        updated = await correctIncidentText(id, {
          title: values.title,
          description: incident.description,
        });
      }

      if (
        values.category !== incident.category ||
        values.priority !== incident.priority
      ) {
        updated = await classifyIncident(id, {
          category: values.category,
          priority: values.priority,
        });
      }

      setIncident(updated);
      setSaved(true);
      setEditing(false);
    } catch (err) {
      setSaveError(
        err.response?.data?.message ??
          "No se pudieron guardar los cambios. Inténtalo de nuevo.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleReject(reason) {
    setRejecting(true);
    setRejectError(null);
    try {
      const updated = await rejectIncident(id, reason);
      setIncident(updated);
      setRejectOpen(false);
    } catch (err) {
      setRejectError(
        err.response?.data?.message ??
          "No se pudo rechazar la incidencia. Inténtalo de nuevo",
      );
    } finally {
      setRejecting(false);
    }
  }

  async function handleClaim() {
    setClaiming(true);
    setClaimError(null);
    try {
      const updated = await claimIncident(id);
      setIncident(updated);
    } catch (err) {
      setClaimError(
        err.response?.data?.message ??
          "No se pudo asignar la incidencia. Inténtalo de nuevo.",
      );
      if (err.response?.status === 409) loadIncident();
    } finally {
      setClaiming(false);
    }
  }

  async function handleStart() {
    setExecuting(true);
    setExecuteError(null);
    try {
      const updated = await startIncident(id);
      setIncident(updated);
    } catch (err) {
      setExecuteError(
        err.response?.data?.message ??
          "No se pudo comenzar la incidencia. Inténtalo de nuevo.",
      );
    } finally {
      setExecuting(false);
    }
  }

  async function handleResume() {
    setExecuting(true);
    setExecuteError(null);
    try {
      const updated = await resumeIncident(id);
      setIncident(updated);
    } catch (err) {
      setExecuteError(
        err.response?.data?.message ??
          "No se pudo reanudar la incidencia. Inténtalo de nuevo.",
      );
    } finally {
      setExecuting(false);
    }
  }

  async function handlePause(reason) {
    setPausing(true);
    setPauseError(null);
    try {
      const updated = await pauseIncident(id, reason);
      setIncident(updated);
      setPauseOpen(false);
    } catch (err) {
      setPauseError(
        err.response?.data?.message ??
          "No se pudo pausar la incidencia. Inténtalo de nuevo.",
      );
    } finally {
      setPausing(false);
    }
  }

  if (loading) return <Spinner />;
  if (loadError) return <p role="alert">{loadError}</p>;
  if (!incident) return null;

  const canClaim =
    isOperator &&
    incident.assigneeName == null &&
    incident.status === INCIDENT_STATUS.NEW;

  const isUnclassified = incident.category == null;
  const isTerminal =
    incident.status === INCIDENT_STATUS.CLOSED ||
    incident.status === INCIDENT_STATUS.REJECTED;

  const canReject =
    canTriage &&
    [
      INCIDENT_STATUS.NEW,
      INCIDENT_STATUS.ASSIGNED,
      INCIDENT_STATUS.IN_PROGRESS,
      INCIDENT_STATUS.PAUSED,
    ].includes(incident.status);

  const canEdit = canTriage && !isUnclassified && !editing && !isTerminal;
  const heroActions = (
    <>
      {canClaim && (
        <Button variant="primary" onClick={handleClaim} disabled={claiming}>
          {claiming ? "Asignando…" : "Asignármela"}
        </Button>
      )}

      <IncidentPrimaryAction
        status={incident.status}
        loading={executing}
        onStart={handleStart}
        onPause={() => {
          setPauseError(null);
          setPauseOpen(true);
        }}
        onResume={handleResume}
      />

      {canEdit && (
        <Button
          variant="secondary"
          aria-label="Editar incidencia"
          onClick={() => {
            setSaved(false);
            setSaveError(null);
            setEditing(true);
          }}
        >
          <Pencil size={18} aria-hidden="true" />
        </Button>
      )}

      {canReject && (
        <ActionsMenu
          items={[
            {
              id: "reject",
              label: "Rechazar incidencia",
              icon: XCircle,
              danger: true,
              onSelect: () => {
                setRejectError(null);
                setRejectOpen(true);
              },
            },
          ]}
        />
      )}
    </>
  );

  return (
    <section className="incident-detail">
      <Link to="/backoffice/incidencias" className="incident-detail__back">
        ← Volver al listado
      </Link>

      <HeroIncidentCard
        code={incident.code}
        title={incident.title}
        status={incident.status}
        priority={incident.priority}
        category={incident.category}
        actions={heroActions}
      />

      {claimError && (
        <NoticeBanner tone="error" onClose={() => setClaimError(null)}>
          {claimError}
        </NoticeBanner>
      )}

      {executeError && (
        <NoticeBanner tone="error" onClose={() => setExecuteError(null)}>
          {executeError}
        </NoticeBanner>
      )}

      {incident.status === INCIDENT_STATUS.REJECTED &&
        incident.rejectionReason && (
          <NoticeBox tone="warning">
            <strong>Motivo del rechazo:</strong> {incident.rejectionReason}
          </NoticeBox>
        )}

      {canTriage && isUnclassified && !isTerminal && (
          <ClassificationCard
            onSubmit={handleClassify}
            primaryLabel={
              isUnclassified ? "Guardar clasificación" : "Guardar cambios"
            }
            saving={saving}
            error={saveError}
            saved={saved}
          />
        )}

      {canTriage && !isUnclassified && editing && (
        <IncidentEditForm
          initialTitle={incident.title}
          initialCategory={incident.category}
          initialPriority={incident.priority}
          onSubmit={handleEdit}
          onCancel={() => setEditing(false)}
          saving={saving}
          error={saveError}
          saved={saved}
        />
      )}

      <ReporterCard
        message={incident.description}
        reporterName={`${incident.guestFirstName ?? ""} ${incident.guestLastName ?? ""}`.trim()}
        reporterContact={incident.guestContact}
        openedLabel={incident.openedAt}
      />

      <LodgingCard
        name={incident.lodgingName}
        address={incident.lodgingAddress}
        reference={incident.lodgingRef}
        accessNotes={incident.lodgingAccessNotes}
        mapEmbedUrl={
          incident.lodgingAddress
            ? `https://maps.google.com/maps?q=${encodeURIComponent(incident.lodgingAddress)}&output=embed`
            : undefined
        }
        mapsUrl={
          incident.lodgingAddress
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(incident.lodgingAddress)}`
            : undefined
        }
      />

      <ChecklistCard
        items={checklistItems}
        loading={checklistLoading}
        error={checklistError}
        adding={checklistAdding}
        pendingIds={checklistPendingIds}
        disabled={isTerminal}
        onAdd={addChecklistItem}
        onToggle={toggleChecklistItem}
        onRemove={removeChecklistItem}
        onReorder={reorderChecklistItem}
      />

      <ChronologyCard
          entries={timelineEntries}
          onAddComment={addTimelineComment}
          loading={timelineLoading}
          error={timelineError}
          submitting={timelineSubmitting}
          canComment={!isTerminal}
      />

      <RejectionModal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        incidentCode={incident.code}
        lodgingName={incident.lodgingName}
        onReject={handleReject}
        submitting={rejecting}
        error={rejectError}
      />

      <PauseModal
        isOpen={pauseOpen}
        onClose={() => setPauseOpen(false)}
        incidentCode={incident.code}
        lodgingName={incident.lodgingName}
        onPause={handlePause}
        submitting={pausing}
        error={pauseError}
      />
    </section>
  );
}
