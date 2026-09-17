import { useId, useState } from "react";
import { Image as ImageIcon, MessageSquareText } from "lucide-react";
import "./ReporterCard.scss";

const DESCRIPTION_CLAMP_THRESHOLD = 320;

export default function ReporterCard({
                                         message,
                                         media,
                                         aside,
                                         hasPhoto = false,
                                         onViewPhoto,
                                         className = "",
                                     }) {
    const [expanded, setExpanded] = useState(false);
    const messageId = useId();
    const isLong = (message ?? "").length > DESCRIPTION_CLAMP_THRESHOLD;

    const classes = ["reporter-card", aside ? "reporter-card--with-aside" : "", className]
        .filter(Boolean)
        .join(" ");

    const messageClasses = [
        "reporter-card__message",
        isLong && !expanded ? "reporter-card__message--clamped" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classes}>
            <div className="reporter-card__description">
                <h2 className="reporter-card__title">
                    <MessageSquareText size={18} aria-hidden="true" />
                    <span>Descripción de la incidencia</span>
                </h2>
                <p id={messageId} className={messageClasses}>{message}</p>

                {isLong && (
                    <button
                        type="button"
                        className="reporter-card__toggle"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        aria-controls={messageId}
                    >
                        {expanded ? "Ver menos" : "Ver más"}
                    </button>
                )}

                {media && <div className="reporter-card__media">{media}</div>}

                {hasPhoto && (
                    <button type="button" className="reporter-card__photo" onClick={onViewPhoto}>
                        <ImageIcon size={18} aria-hidden="true" />
                        <span>Ver foto adjunta</span>
                    </button>
                )}
            </div>

            {aside && <div className="reporter-card__aside">{aside}</div>}
        </section>
    );
}