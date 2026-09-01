import { RefreshCw } from "lucide-react";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import PinInput from "../../../../../../shared/components/ui/atoms/PinInput/PinInput.jsx";

import "./PinGenerator.scss";

function randomPin() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(
    "",
  );
}

export default function PinGenerator({
  value = "",
  onChange,
  invalid = false,
  className = "",
}) {
  const classes = ["pin-generator", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <PinInput value={value} onChange={onChange} invalid={invalid} />
      <Button variant="secondary" onClick={() => onChange(randomPin())}>
        <RefreshCw size={16} aria-hidden="true" />
        Generar
      </Button>
    </div>
  );
}
