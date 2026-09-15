import { Image as ImageIcon, MessageSquareText } from "lucide-react";
import "./ReporterCard.scss";

export default function ReporterCard({
  message,
  hasPhoto = false,
  onViewPhoto,
  className = "",
}) {
  const classes = ["reporter-card", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      <h2 className="reporter-card__title">
        <MessageSquareText size={18} aria-hidden="true" />
        <span>Descripción de la incidencia</span>
      </h2>
      <p className="reporter-card__message">{message}</p>

      {hasPhoto && (
        <button
          type="button"
          className="reporter-card__photo"
          onClick={onViewPhoto}
        >
          <ImageIcon size={18} aria-hidden="true" />
          <span>Ver foto adjunta</span>
        </button>
      )}
    </section>
  );
}
