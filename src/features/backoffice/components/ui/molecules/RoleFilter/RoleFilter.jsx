import { ALL_ROLES, ROLE_FILTER_OPTIONS } from "../../../../../../shared/constants/nav.js";
import "./RoleFilter.scss";

export default function RoleFilter({
  value = ALL_ROLES,
  onChange,
  counts = {},
  options = ROLE_FILTER_OPTIONS,
  className = "",
}) {
  const classes = ["role-filter", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {options.map((opt) => {
        const isActive = value === opt.value;
        const btnClass = [
          "role-filter__option",
          isActive ? "role-filter__option--active" : "",
        ].filter(Boolean).join(" ");

        return (
          <button
            key={opt.value}
            type="button"
            className={btnClass}
            aria-pressed={isActive}
            onClick={() => onChange?.(opt.value)}
          >
            <span>{opt.label}</span>
            <span className="role-filter__count" aria-hidden="true">
              {counts[opt.value] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}