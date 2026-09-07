import { useState, useId } from 'react';
import FormField from '../../../../../../shared/components/ui/molecules/FormField/FormField.jsx';
import DropdownField from '../../../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx';
import Button from '../../../../../../shared/components/ui/atoms/Button/Button.jsx';
import NoticeBox from '../../../../../../shared/components/ui/molecules/NoticeBox/NoticeBox.jsx';
import { INCIDENT_CATEGORY, INCIDENT_CATEGORY_LABEL } from '../../../../../../shared/constants/incidentCategory.js';
import { INCIDENT_PRIORITY, INCIDENT_PRIORITY_LABEL } from '../../../../../../shared/constants/incidentPriority.js';
import './ClassificationCard.scss';

const CATEGORY_OPTIONS = Object.values(INCIDENT_CATEGORY)
    .filter((value) => value !== '')
    .map((value) => ({ value, label: INCIDENT_CATEGORY_LABEL[value] }));

const PRIORITY_OPTIONS = Object.values(INCIDENT_PRIORITY)
    .map((value) => ({ value, label: INCIDENT_PRIORITY_LABEL[value] }));

export default function ClassificationCard({
    initialCategory = '',
    initialPriority = '',
    onAssign,
    onSubmit,
    onChange,
    title = 'Clasificación',
    primaryLabel = 'Asignar a un operario',
    saving = false,
    error = null,
    saved = false,
    className = '',
}) {
    const [category, setCategory] = useState(initialCategory);
    const [priority, setPriority] = useState(initialPriority);
    const categoryId = useId();
    const priorityId = useId();

    const canSubmit = Boolean(category) && Boolean(priority) && !saving;

    function updateCategory(value) {
        setCategory(value);
        onChange?.({ category: value, priority });
    }
    function updatePriority(value) {
        setPriority(value);
        onChange?.({ category, priority: value });
    }

    function handlePrimary() {
        if (!canSubmit) return;
        (onSubmit ?? onAssign)?.({ category, priority });
    }

    const classes = ['classification-card', className].filter(Boolean).join(' ');

    return (
        <section className={classes}>
            <h2 className="classification-card__title">{title}</h2>

            <div className="classification-card__fields">
                <FormField id={categoryId} label="Categoría">
                    <DropdownField
                        value={category}
                        onChange={(e) => updateCategory(e.target.value)}
                        disabled={saving}
                    >
                        <option value="" disabled>Selecciona una categoría</option>
                        {CATEGORY_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </DropdownField>
                </FormField>

                <FormField id={priorityId} label="Prioridad">
                    <DropdownField
                        value={priority}
                        onChange={(e) => updatePriority(e.target.value)}
                        disabled={saving}
                    >
                        <option value="" disabled>Selecciona una prioridad</option>
                        {PRIORITY_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </DropdownField>
                </FormField>
            </div>

            {error && (
                <div role="alert">
                    <NoticeBox tone="danger">{error}</NoticeBox>
                </div>
            )}

            <p className="classification-card__status" role="status" aria-live="polite">
                {saved ? 'Clasificación guardada.' : ''}
            </p>

            <Button
                variant="primary"
                onClick={handlePrimary}
                disabled={!canSubmit}
                className="classification-card__assign"
            >
                {saving ? 'Guardando…' : primaryLabel}
            </Button>
        </section>
    );
}