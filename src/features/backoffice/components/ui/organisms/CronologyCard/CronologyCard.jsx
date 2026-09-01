import { useState } from "react";
import { formatDate } from "../../../../../../shared/utils/formatDate.js";
import { toStatusModifier } from "../../../../../../shared/constants/incidentStatus.js";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import { useEditableList } from "../../../../../../hooks/useEditableList.js";
import "./CronologyCard.scss";

export default function CronologyCard({
  initialEntries = [],
  onAddComment,
  currentUser = "Tú",
  title = "Cronología",
  className = "",
}) {
  const { items: entries, add } = useEditableList(initialEntries, {
    onAdd: onAddComment,
  });
  const [draft, setDraft] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const comment = {
      id: crypto.randomUUID(),
      title: "Comentario interno",
      author: currentUser,
      at: new Date().toISOString(),
      description: text,
    };
    add(comment);
  }

  const classes = ["cronology", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <h2 className="cronology__title">{title}</h2>

      {entries.length === 0 ? (
        <p className="cronology__empty">Aún no hay actividad ni comentarios.</p>
      ) : (
        <ol className="cronology__list">
          {entries.map((entry) => {
            const statusMod = entry.status
              ? toStatusModifier(entry.status)
              : null;
            const dotClasses = [
              "cronology__dot",
              statusMod && `cronology__dot--${statusMod}`,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li key={entry.id} className="cronology__item">
                <span className={dotClasses} aria-hidden="true" />

                <div className="cronology__body">
                  <p className="cronology__head">
                    <span className="cronology__event">{entry.title}</span>
                    <span className="cronology__meta">
                      {entry.atLabel ?? formatDate(entry.at)}
                      {entry.author ? ` · ${entry.author}` : ""}
                    </span>
                  </p>
                  {entry.description && (
                    <p className="cronology__text">{entry.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <form className="cronology__add" onSubmit={handleSubmit}>
        <Input
          className="cronology__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Añadir un comentario interno"
          aria-label="Nuevo comentario interno"
        />
        <Button type="submit" variant="primary" disabled={!draft.trim()}>
          Enviar
        </Button>
      </form>
    </section>
  );
}
