import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import HeroIncidentCard from "../../components/ui/molecules/HeroIncidentCard/HeroIncidentCard";
import ClassificationCard from "../../components/ui/organisms/ClassificationCard/ClassificationCard";
import ChecklistCard from "../../components/ui/organisms/ChecklistCard/ChecklistCard";
import Button from "../../../../shared/components/ui/atoms/Button/Button";
import Spinner from "../../../../shared/components/ui/atoms/Spinner/Spinner";
import { getIncidentById, classifyIncident } from "../../services/incidentApi";
import { useIncidentChecklist } from "../../hooks/useIncidentChecklist";
import { useAuthStore } from "../../../auth/store/authStore";
import { ROLES } from "../../../../shared/constants/nav";
import { INCIDENT_CATEGORY_LABEL } from "../../../../shared/constants/incidentCategory";
import { INCIDENT_PRIORITY_LABEL } from "../../../../shared/constants/incidentPriority";
import { INCIDENT_STATUS } from "../../../../shared/constants/incidentStatus";
import "./IncidentDetailPage.scss";

export default function IncidentDetailPage() {
  const { id } = useParams();
  const role = useAuthStore((s) => s.user?.role);
  const canTriage = role === ROLES.COORDINATOR || role === ROLES.ADMIN;

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);

  const {
    items: checklistItems,
    loading: checklistLoading,
    error: checklistError,
    adding: checklistAdding,
    pendingIds: checklistPendingIds,
    addItem: addChecklistItem,
    toggleItem: toggleChecklistItem,
    removeItem: removeChecklistItem,
  } = useIncidentChecklist(id);

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

  if (loading) return <Spinner />;
  if (loadError) return <p role="alert">{loadError}</p>;
  if (!incident) return null;

  const isUnclassified = incident.category == null;
  const isTerminal =
    incident.status === INCIDENT_STATUS.CLOSED ||
    incident.status === INCIDENT_STATUS.REJECTED;

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
      />

      {canTriage && (isUnclassified || editing) && (
        <ClassificationCard
          key={editing ? "edit" : "new"} // remonta con los valores correctos
          initialCategory={isUnclassified ? "" : incident.category}
          initialPriority={isUnclassified ? "" : incident.priority}
          onSubmit={handleClassify}
          primaryLabel={
            isUnclassified ? "Guardar clasificación" : "Guardar cambios"
          }
          saving={saving}
          error={saveError}
          saved={saved}
        />
      )}

      {canTriage && !isUnclassified && !editing && (
        <section className="classification-summary">
          <h2 className="classification-summary__title">Clasificación</h2>
          <p className="classification-summary__row">
            <span>Categoría:</span> {INCIDENT_CATEGORY_LABEL[incident.category]}
          </p>
          <p className="classification-summary__row">
            <span>Prioridad:</span> {INCIDENT_PRIORITY_LABEL[incident.priority]}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setSaved(false);
              setSaveError(null);
              setEditing(true);
            }}
          >
            Editar clasificación
          </Button>
        </section>
      )}

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
      />
    </section>
  );
}
