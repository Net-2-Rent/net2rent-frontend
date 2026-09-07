import { useState } from "react";
import { Plus, X } from "lucide-react";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button";
import "./ChecklistCard.scss";

function extractErrorMessage(err, fallback) {
  return (
    err.response?.data?.errors?.[0]?.message ??
    err.response?.data?.message ??
    fallback
  );
}

export default function ChecklistCard({
  items = [],
  loading = false,
  error = null,
  adding = false,
  pendingIds = new Set(),
  disabled = false,
  onAdd,
  onToggle,
  onRemove,
  title = "Checklist de trabajo",
  className = "",
}) {
  const [draft, setDraft] = useState("");
  const [formError, setFormError] = useState(null);

  async function handleAdd(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || adding) return;

    setFormError(null);
    try {
      await onAdd(text);
      setDraft("");
    } catch (err) {
      setFormError(
        extractErrorMessage(
          err,
          "No se pudo añadir la tarea. Inténtalo de nuevo.",
        ),
      );
    }
  }

  async function handleToggle(item) {
    if (disabled || pendingIds.has(item.id)) return;
    try {
      await onToggle(item.id, !item.done);
    } catch (err) {
      setFormError(
        extractErrorMessage(
          err,
          "No se pudo añadir la tarea. Inténtalo de nuevo.",
        ),
      );
    }
  }

  async function handleRemove(item) {
    if (disabled || pendingIds.has(item.id)) return;
    try {
      await onRemove(item.id);
    } catch (err) {
      setFormError(
        extractErrorMessage(
          err,
          "No se pudo añadir la tarea. Inténtalo de nuevo.",
        ),
      );
    }
  }

  const total = items.length;
  const done = items.filter((t) => t.done).length;
  const percent = total ? (done / total) * 100 : 0;

  const classes = ["checklist", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <header className="checklist__header">
        <h2 className="checklist__title">{title}</h2>
        {total > 0 && (
          <p className="checklist__progress" aria-live="polite">
            {done} de {total} {total === 1 ? "tarea" : "tareas"} completadas
          </p>
        )}
      </header>

      {total > 0 && (
        <div className="checklist__bar" aria-hidden="true">
          <div
            className="checklist__bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}

      {loading ? (
        <p className="checklist__empty" role="status">
          Cargando checklist…
        </p>
      ) : error ? (
        <p className="checklist__empty" role="alert">
          No se pudo cargar la checklist.
        </p>
      ) : total === 0 ? (
        <p className="checklist__empty">
          Aún no hay tareas. Añade la primera abajo.
        </p>
      ) : (
        <ul className="checklist__list">
          {items.map((item) => (
            <li key={item.id} className="checklist__item">
              <label className="checklist__check">
                <input
                  type="checkbox"
                  checked={item.done}
                  disabled={disabled || pendingIds.has(item.id)}
                  onChange={() => handleToggle(item)}
                />
                <span
                  className={
                    "checklist__text" +
                    (item.done ? " checklist__text--done" : "")
                  }
                >
                  {item.text}
                </span>
              </label>

              <div className="checklist__controls">
                <button
                  type="button"
                  className="checklist__remove"
                  onClick={() => handleRemove(item)}
                  disabled={disabled || pendingIds.has(item.id)}
                  aria-label={`Eliminar "${item.text}"`}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className="checklist__add" onSubmit={handleAdd}>
        <Input
          className="checklist__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Añadir tarea y pulsar Enter"
          aria-label="Nueva tarea"
          disabled={disabled || adding}
          maxLength={200}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={disabled || adding || !draft.trim()}
        >
          <Plus size={16} aria-hidden="true" />
          {adding ? "Añadiendo…" : "Agregar"}
        </Button>
      </form>

      {formError && (
        <p className="checklist__error" role="alert">
          {formError}
        </p>
      )}
    </section>
  );
}
