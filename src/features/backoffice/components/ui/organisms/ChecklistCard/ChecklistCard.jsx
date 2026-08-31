import { useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button";
import { useEditableList } from "../../../../../../hooks/useEditableList";
import "./ChecklistCard.scss";

export default function ChecklistCard({
  initialTasks = [],
  onChange,
  title = "Checklist de trabajo",
  className = "",
}) {
    const { items: tasks, add, remove, patch, move } = useEditableList(initialTasks, {onChange});
    const [draft, setDraft] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    add({ id: crypto.randomUUID(), text, done: false });
    setDraft('');
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const percent = total ? (done / total) * 100 : 0;

  const classes = ["checklist", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <header className="checklist__header">
        <h2 className="checklist__title">{title}</h2>
        {total > 0 && (
          <p className="checklist__progress" aria-live="polite">
            {done} {done === 1 ? "tarea" : "tareas"} de {total}{" "}
            {total === 1 ? "tarea" : "tareas"} completadas
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

      {total === 0 ? (
        <p className="checklist__empty">
          Aún no hay tareas. Añade la primera abajo.
        </p>
      ) : (
        <ul className="checklist__list">
          {tasks.map((task, index) => (
            <li key={task.id} className="checklist__item">
              <label className="checklist__check">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => patch(task.id, (t) => ({ done: !t.done }))}
                />
                <span
                  className={
                    "checklist__text" +
                    (task.done ? " checklist__text--done" : "")
                  }
                >
                  {task.text}
                </span>
              </label>

              <div className="checklist__controls">
                <button
                  type="button"
                  className="checklist__move"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Subir "${task.text}"`}
                >
                  <ChevronUp size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="checklist__move"
                  onClick={() => move(index, 1)}
                  disabled={index === tasks.length - 1}
                  aria-label={`Bajar "${task.text}"`}
                >
                  <ChevronDown size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="checklist__remove"
                  onClick={() => remove(task.id)}
                  aria-label={`Eliminar "${task.text}"`}
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
        />
        <Button type="submit" variant="primary" disabled={!draft.trim()}>
          <Plus size={16} aria-hidden="true" />
          Agregar
        </Button>
      </form>
    </section>
  );
}
