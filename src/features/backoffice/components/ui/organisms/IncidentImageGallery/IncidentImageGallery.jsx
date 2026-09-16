import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Modal from "../../../../../../shared/components/ui/molecules/Modal/Modal";
import Spinner from "../../../../../../shared/components/ui/atoms/Spinner/Spinner";
import { getIncidentImageBlob } from "../../../../services/incidentApi";
import "./IncidentImageGallery.scss";

export default function IncidentImageGallery({ incidentId, images = [] }) {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const imageKey = images.map((img) => img.id).join(",");

    useEffect(() => {
        if (!incidentId || !imageKey) return;

        const ids = imageKey.split(",").map(Number);
        let active = true;
        const created = [];
        setLoading(true);
        setError(false);

        Promise.all(
            ids.map((imgId) =>
                getIncidentImageBlob(incidentId, imgId).then((blob) => {
                    const url = URL.createObjectURL(blob);
                    created.push(url);
                    return [imgId, { url, type: blob.type }];
                }),
            ),
        )
            .then((pairs) => { if (active) setItems(Object.fromEntries(pairs)); })
            .catch(() => { if (active) setError(true); })
            .finally(() => { if (active) setLoading(false); });

        return () => {
            active = false;
            created.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [incidentId, imageKey]);

    if (images.length === 0) return null;

    const openImg = openIndex != null ? images[openIndex] : null;
    const openItem = openImg ? items[openImg.id] : null;

    function downloadName() {
        const ext = openItem?.type === "image/png" ? "png" : "jpg";
        return `incidencia-${incidentId}-${(openIndex ?? 0) + 1}.${ext}`;
    }

    return (
        <section className="image-gallery">
            {loading && <Spinner />}

            {error && (
                <p className="image-gallery__error" role="alert">
                    No se pudieron cargar las imágenes.
                </p>
            )}

            {!loading && !error && (
                <ul className="image-gallery__grid">
                    {images.map((img, index) => (
                        <li key={img.id} className="image-gallery__item">
                            <button
                                type="button"
                                className="image-gallery__thumb"
                                onClick={() => setOpenIndex(index)}
                                aria-label={`Ver imagen ${index + 1} en grande`}
                            >
                                {items[img.id] && (
                                    <img src={items[img.id].url} alt={`Imagen ${index + 1} de la incidencia`} />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <Modal
                isOpen={openIndex != null}
                onClose={() => setOpenIndex(null)}
                title={`Imagen ${openIndex != null ? openIndex + 1 : ""}`}
                footer={
                    openItem && (
                        <a className="image-gallery__download" href={openItem.url} download={downloadName()}>
                            <Download size={16} aria-hidden="true" />
                            Descargar
                        </a>
                    )
                }
            >
                {openItem && (
                    <img
                        className="image-gallery__full"
                        src={openItem.url}
                        alt={`Imagen ${(openIndex ?? 0) + 1} de la incidencia`}
                    />
                )}
            </Modal>
        </section>
    );
}