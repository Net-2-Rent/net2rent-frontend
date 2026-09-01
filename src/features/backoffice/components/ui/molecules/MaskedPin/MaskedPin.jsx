import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PinBadge from "../../atoms/PinBadge/PinBadge.jsx";
import "./MaskedPin.scss";

export default function MaskedPin({
  value,
  label = "PIN de acceso",
  className = "",
}) {
  const [revealed, setRevealed] = useState(false);
  const classes = ["masked-pin", className].filter(Boolean).join(" ");
  const toggleLabel = `${revealed ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`;

  return (
    <span className={classes}>
      <span className="masked-pin__label">{label}</span>
      <span aria-hidden="true">
        <PinBadge value={revealed ? value : "••••"} />
      </span>
      <span className="visually-hidden">{revealed ? value : "oculto"}</span>
      <button
        type="button"
        className="masked-pin__toggle"
        onClick={() => setRevealed((v) => !v)}
        aria-pressed={revealed}
        aria-label={toggleLabel}
      >
        {revealed ? (
          <EyeOff size={16} aria-hidden="true" />
        ) : (
          <Eye size={16} aria-hidden="true" />
        )}
      </button>
    </span>
  );
}
