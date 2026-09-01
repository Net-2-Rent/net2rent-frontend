import { ExternalLink } from 'lucide-react';
import DataList from '../../molecules/DataList/DataList.jsx';
import './LodgingCard.scss';
import PrivateNotes from '../../atoms/PrivateNotes/PrivateNotes.jsx';

export default function LodgingCard({
    name,
    address,
    reference,
    owner,
    coordinates,
    mapEmbedUrl,
    mapsUrl,
    accessNotes, 
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
                <DataList items={details} />

                
                {accessNotes && <PrivateNotes>{accessNotes}</PrivateNotes>}
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