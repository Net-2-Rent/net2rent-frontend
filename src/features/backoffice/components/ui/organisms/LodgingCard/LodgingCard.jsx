import { ExternalLink, Building2, MapPin, UserRound } from "lucide-react";
import DataList from "../../molecules/DataList/DataList.jsx";
import "./LodgingCard.scss";
import PrivateNotes from "../../atoms/PrivateNotes/PrivateNotes.jsx";

export default function LodgingCard({
                                      name,
                                      address,
                                      reference,
                                      owner,
                                      coordinates,
                                      mapEmbedUrl,
                                      mapsUrl,
                                      accessNotes,
                                      className = "",
                                    }) {
  const classes = ["lodging-card", className].filter(Boolean).join(" ");

  const lodgingDetails = [
    { label: "Alojamiento", value: name },
    { label: "Dirección", value: address },
    { label: "Referencia", value: reference },
    { label: "Propietario", value: owner },
    { label: "Coordenadas", value: coordinates, mono: true },
  ].filter((item) => item.value);

  return (
      <section className={classes}>
        <div className="lodging-card__lodging">
          <h2 className="lodging-card__title">
            <Building2 size={18} aria-hidden="true" />
            <span>Alojamiento</span>
          </h2>
          <DataList items={lodgingDetails} />
        </div>
          
        <div className="lodging-card__location">
          <h2 className="lodging-card__title">
            <MapPin size={18} aria-hidden="true" />
            <span>Ubicación</span>
          </h2>

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
              <a className="lodging-card__open" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <span>Abrir en mapas</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
          )}
        </div>

        {accessNotes && (
            <div className="lodging-card__notes">
              <PrivateNotes>{accessNotes}</PrivateNotes>
            </div>
        )}
      </section>
  );
}