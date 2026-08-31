import { useState, useId } from 'react';
import FormField from '../../../../../../shared/components/ui/molecules/FormField/FormField.jsx';
import DropdownField from '../../../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx';
import Button from '../../../../../../shared/components/ui/atoms/Button/Button.jsx';
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
    onChange,
    title = 'Clasificación',
    className = '',
}) {
    const [category, setCategory] = useState(initialCategory);
    const [priority, setPriority] = useState(initialPriority);
    const categoryId = useId();
    const priorityId = useId();

    // Solo se puede asignar cuando hay categoría Y prioridad
    const canAssign = Boolean(category) && Boolean(priority);

    function updateCategory(value) {
        setCategory(value);
        onChange?.({ category: value, priority });
    }
    function updatePriority(value) {
        setPriority(value);
        onChange?.({ category, priority: value });
    }

    function handleAssign() {
        if (!canAssign) return;
        onAssign?.({ category, priority });
    }

    const classes = ['classification-card', className].filter(Boolean).join(' ');

    return (
        <section className={classes}>
            <h2 className="classification-card__title">{title}</h2>

            <div className="classification-card__fields">
                <FormField id={categoryId} label="Categoría">
                    <DropdownField value={category} onChange={(e) => updateCategory(e.target.value)}>
                        <option value="" disabled>Selecciona una categoría</option>
                        {CATEGORY_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </DropdownField>
                </FormField>

                <FormField id={priorityId} label="Prioridad">
                    <DropdownField value={priority} onChange={(e) => updatePriority(e.target.value)}>
                        <option value="" disabled>Selecciona una prioridad</option>
                        {PRIORITY_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </DropdownField>
                </FormField>
            </div>

            <Button
                variant="primary"
                onClick={handleAssign}
                disabled={!canAssign}
                className="classification-card__assign"
            >
                Asignar a un operario
            </Button>
        </section>
    );
}