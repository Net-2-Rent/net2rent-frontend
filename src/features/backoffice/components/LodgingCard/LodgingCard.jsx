import { ExternalLink } from 'lucide-react';
import './LodgingCard.scss';
import PrivateNotes from '../PrivateNotes/PrivateNotes';

export default function LodgingCard({
    name,
    address,
    reference,
    owner,
    coordinates,
    mapEmbedUrl,
    mapsUrl,
    privateNotes, 
    className = '',
}) {
    const classes = ['lodging-card', className].filter(Boolean).join(' ');

    const details = [
        { label: 'Alojamiento', value: name },
        { label: 'Dirección', value: address },
        { label: 'Referencia', value: reference },
        { label: 'Propietario', value: owner },
        { label: 'Coordenadas', value: coordinates, mono: true },
    ].filter((item) => item.value);

    return (
        <section className={classes}>
            <div className="lodging-card__info">
                <h2 className="lodging-card__title">Alojamiento</h2>
                <dl className="lodging-card__details">
                    {details.map(({ label, value, mono }) => (
                        <div className="lodging-card__row" key={label}>
                            <dt className="lodging-card__label">{label}</dt>
                            <dd className={
                                'lodging-card__value' +
                                (mono ? ' lodging-card__value--mono' : '')
                            }>
                                {value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <PrivateNotes>
                    Misma caja de llaves que el 3B (PIN 4821). Material de repuesto en el trastero -1, plaza 12.
                </PrivateNotes>
            </div>

            <div className="lodging-card__location">
                <h2 className="lodging-card__title">Ubicación</h2>

                {mapEmbedUrl && (
                    <div className="lodging-card__map">
                        <iframe
                            src={mapEmbedUrl}
                            title="Mapa del alojamiento"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                )}

                {mapsUrl && (

                    <a
                        className="lodging-card__open"
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Abrir en mapas</span>
                        <ExternalLink size={14} aria-hidden="true" />
                    </a>
                )}
            </div>
        </section>
    );
}