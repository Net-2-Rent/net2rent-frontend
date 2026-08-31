import { INCIDENT_PRIORITY_LABEL, toPriorityModifier } from "../../../../../../shared/constants/incidentPriority.js";
import "./PriorityBadge.scss";

export default function PriorityBadge({ priority, className = "" }) {
  if (!priority) {
    return (
      <span className={`priority-badge priority-badge--unset ${className}`}>
        <span className="visually-hidden">Prioridad: </span>
        Prioridad pendiente
      </span>
    );
  }

  const label = INCIDENT_PRIORITY_LABEL[priority];
  if (!label) return null;

  return (
    <span className={`priority-badge priority-badge--${toPriorityModifier(priority)} ${className}`}>
      <span className="visually-hidden">Prioridad: </span>
      {label}
    </span>
  );
}