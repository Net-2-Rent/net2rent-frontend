import './LodgingCard.scss';

export default function LodgingCard({ name, reference, className = '' }) {
    const classes = ['lodging-card', className].filter(Boolean).join(' ');

    return (
        <section className={classes} aria-labelledby="lodging-card-name">
            <h2 className="lodging-card__name" id="lodging-card-name">
                {name}
            </h2>
            <p className="lodging-card__reference">
                <span className="lodging-card__reference-label">Referencia</span>
                <span className="lodging-card__reference-value">{reference}</span>
            </p>
        </section>
    );
}