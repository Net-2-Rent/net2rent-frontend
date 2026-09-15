import { Image as ImageIcon, MessageSquareText } from "lucide-react";
import "./ReporterCard.scss";

export default function ReporterCard({
                                         message,
                                         aside,
                                         hasPhoto = false,
                                         onViewPhoto,
                                         className = "",
                                     }) {
    const classes = ["reporter-card", aside ? "reporter-card--with-aside" : "", className]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classes}>
            <div className="reporter-card__description">
                <h2 className="reporter-card__title">
                    <MessageSquareText size={18} aria-hidden="true" />
                    <span>Descripción de la incidencia</span>
                </h2>
                <p className="reporter-card__message">{message}</p>

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