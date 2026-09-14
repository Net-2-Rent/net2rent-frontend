import { CheckCircle, Circle, Wrench } from "lucide-react";
import { formatDate } from "../../../../../../shared/utils/formatDate.js";
import { useId } from "react";
import "./GuestIncidentTimeline.scss";

export default function GuestIncidentTimeline({ incident }) {
  const titleId = useId();
  const milestones = [
    {
      key: "opened",
      label: "Incidencia reportada",
      at: incident.openedAt,
      Icon: Circle,
    },
    {
      key: "assigned",
      label: "Asignada",
      at: incident.assignedAt,
      Icon: Wrench,
    },
    {
      key: "resolved",
      label: "Resuelta",
      at: incident.resolvedAt,
      Icon: CheckCircle,
    },
  ].filter((m) => Boolean(m.at));

  if (milestones.length === 0) return null;

  return (
    <section aria-labelledby={titleId} className="guest-timeline">
      <h3 id={titleId} className="guest-timeline__title">
        Seguimiento
      </h3>

      <ol className="guest-timeline__list">
        {milestones.map(({ key, label, at, Icon }) => (
          <li key={key} className="guest-timeline__item">
            <Icon
              className="guest-timeline__icon"
              size={18}
              aria-hidden="true"
            />
            <div className="guest-timeline__content">
              <span className="guest-timeline__label">{label}</span>
              <time className="guest-timeline__date" dateTime={at}>
                {formatDate(at)}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
