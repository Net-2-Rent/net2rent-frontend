import { Image as ImageIcon } from 'lucide-react';
import './ReporterCard.scss';

export default function ReporterCard({
    message,
    hasPhoto = false,
    onViewPhoto,
    className = '',
}) {
    const classes = ['reporter-card', className].filter(Boolean).join(' ');
    

    return (
        <section className={classes}>
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
        </section>  
    );
}