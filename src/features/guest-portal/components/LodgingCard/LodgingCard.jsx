import './LodgingCard.scss';

export default function LodgingCard({ name, reference, className = '' }) {
    const classes = ['property-card', className].filter(Boolean).join(' ');

    return (
        <section className={classes} aria-labelledby="property-card-name">
            <h2 className="property-card__name" id="property-card-name">
                {name}
            </h2>
            <p className="property-card__reference">
                <span className="property-card__reference-label">Referencia</span>
                <span className="property-card__reference-value">{reference}</span>
            </p>
        </section>
    );
}