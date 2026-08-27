import { useEffect, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import './FileUpload.scss';

export default function FileUpload({
                                       id,
                                       value = null,
                                       onChange,
                                       accept = 'image/*',
                                       maxSizeMB = 5,
                                       label = 'Añadir una foto',
                                       hint = 'Ayuda a entender el problema más rápido',
                                   }) {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState('');

    // Crea la URL de previsualización y la libera al cambiar/quitar
    useEffect(() => {
        if (!value) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(value);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [value]);

    function handleSelect(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('El archivo debe ser una imagen.');
            return;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`La imagen no puede superar los ${maxSizeMB} MB.`);
            return;
        }

        setError('');
        onChange(file);
    }

    function handleRemove() {
        setError('');
        onChange(null);
        if (inputRef.current) inputRef.current.value = '';
    }

    const errorId = `${id}-error`;

    return (
        <div className="file-upload">
            {!value ? (
                <label className="file-upload__dropzone">
                    <input
                        ref={inputRef}
                        id={id}
                        type="file"
                        accept={accept}
                        className="file-upload__input"
                        aria-describedby={error ? errorId : undefined}
                        onChange={handleSelect}
                    />
                    <ImagePlus className="file-upload__icon" size={20} aria-hidden="true" />
                    <span className="file-upload__label">{label}</span>
                    <span className="file-upload__hint">{hint}</span>
                </label>
            ) : (
                <div className="file-upload__preview">
                    <img
                        src={previewUrl}
                        alt={`Vista previa de ${value.name}`}
                        className="file-upload__image"
                    />
                    <div className="file-upload__meta">
                        <span className="file-upload__filename">{value.name}</span>
                        <button
                            type="button"
                            className="file-upload__remove"
                            onClick={handleRemove}
                        >
                            <X size={16} aria-hidden="true" />
                            Quitar foto
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <p className="file-upload__error" id={errorId} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}