import { useState } from "react";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import { useEditableList } from "../../../../../../hooks/useEditableList.js";
import "./TimeAllocation.scss";

export default function TimeAllocation({
  initialEntries = [],
  currentOperator = "Tú",
  onImpute,
  title = "Imputación de tiempos",
  className = "",
}) {
  const { items: entries, add } = useEditableList(initialEntries, {
    onAdd: onImpute,
  });
  const [concept, setConcept] = useState("");
  const [minutes, setMinutes] = useState("");

  const total = entries.reduce((sum, e) => sum + Number(e.minutes || 0), 0);
  const canSubmit = concept.trim().length > 0 && Number(minutes) > 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    const entry = {
      id: crypto.randomUUID(),
      operator: currentOperator,
      concept: concept.trim(),
      minutes: Number(minutes),
    };
    add(entry);
  }

  const classes = ["time-allocation", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <header className="time-allocation__header">
        <h2 className="time-allocation__title">{title}</h2>
        <p className="time-allocation__total">{total} min</p>
      </header>

      {entries.length > 0 && (
        <ul className="time-allocation__list">
          {entries.map((entry) => (
            <li key={entry.id} className="time-allocation__row">
              <div className="time-allocation__info">
                <span className="time-allocation__operator">
                  {entry.operator}
                </span>
                <span className="time-allocation__concept">
                  {entry.concept}
                </span>
              </div>
              <span className="time-allocation__minutes">
                {entry.minutes} min
              </span>
            </li>
          ))}
        </ul>
      )}

      <form className="time-allocation__add" onSubmit={handleSubmit}>
        <div className="time-allocation__field-concept">
          <Input
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Concepto (ej. desplazamiento)"
            aria-label="Concepto"
          />
        </div>

        <div className="time-allocation__field-minutes">
          <Input
            type="number"
            min="1"
            inputMode="numeric"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutos"
            aria-label="Minutos"
          />
        </div>

        <Button type="submit" variant="primary" disabled={!canSubmit}>
          Imputar
        </Button>
      </form>
    </section>
  );
}
