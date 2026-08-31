import { INCIDENT_SCOPE } from "../../../../../../shared/constants/incidentScope.js";
import "./ToggleIncident.scss";

export default function ToggleIncident({
  value = INCIDENT_SCOPE.ASSIGNED,
  onChange,
  className = "",
}) {
  const options = [
    { value: INCIDENT_SCOPE.ASSIGNED, label: "Asignadas a mí" },
    { value: INCIDENT_SCOPE.POOL, label: "Pool" },
  ];

  return (
    <div
      className={["toggle-incident", className].filter(Boolean).join(" ")}
      role="radiogroup"
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        const btnClass = [
          "toggle-incident__option",
          isActive ? "toggle-incident__option--active" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={btnClass}
            onClick={() => onChange?.(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}