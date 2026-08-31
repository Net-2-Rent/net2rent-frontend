import { Image as ImageIcon } from 'lucide-react';
import './ReporterCard.scss';

export default function ReporterCard({
    message,
    reporterName,
    reporterContact,
    openedLabel,
    stayLabel,
    hasPhoto = false,
    onViewPhoto,
    className = '',
}) {
    const classes = ['reporter-card', className].filter(Boolean).join(' ');

    const details = [
        { label: 'Nombre', value: reporterName },
        { label: 'Contacto', value: reporterContact },
        { label: 'Apertura', value: openedLabel },
        { label: 'Estancia', value: stayLabel },
    ];

    return (
        <section className={classes}>
            <div className="reporter-card__description">
                <h2 className="reporter-card__title">Descripción del reportante</h2>
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
            </div>

            <div className="reporter-card__info">
                <h2 className="reporter-card__title">Reportante</h2>
                <dl className="reporter-card__details">
                    {details.map(({ label, value }) => (
                        <div className="reporter-card__row" key={label}>
                            <dt className="reporter-card__label">{label}</dt>
                            <dd className="reporter-card__value">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}