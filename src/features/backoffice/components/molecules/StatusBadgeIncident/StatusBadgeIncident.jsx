import { INCIDENT_STATUS_LABEL, toStatusModifier } from "../../../../../shared/constants/incidentStatus.js";
import { ALL_STATUS, STATUS_BADGE_LABEL } from "../../../../../shared/constants/statusBadgeIncident.js";
import "./StatusBadgeIncident.scss";

export default function StatusBadgeIncident({
  status,
  count = 0,
  active = false,
  onClick,
  className = "",
}) {
  const isAll = status === ALL_STATUS;
  const label = isAll ? "Todas" : STATUS_BADGE_LABEL[status] ?? INCIDENT_STATUS_LABEL[status];
  if (!label) return null;

  const modifier = isAll ? "all" : toStatusModifier(status);
  const classes = [
    "status-badge-incident",
    `status-badge-incident--${modifier}`,
    active ? "status-badge-incident--active" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} aria-pressed={active} onClick={onClick}>
      <span className={["status-dot", `status-dot--${modifier}`].join(" ")} aria-hidden="true" />
      <span className="status-badge-incident__label">{label}</span>
      <span className="status-badge-incident__count" aria-label={`${count} incidencias`}>
        {count}
      </span>
    </button>
  );
}