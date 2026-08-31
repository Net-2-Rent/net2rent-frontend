import {
    INCIDENT_PRIORITY_LABEL,
    PRIORITY_UNSET_LABEL,
    toPriorityModifier,
} from '../../constants/incidentPriority.js';
import './PriorityPill.scss';

export default function PriorityPill({ priority, className = '' }) {
    const isUnset = priority == null;

    const label = isUnset
        ? PRIORITY_UNSET_LABEL
        : INCIDENT_PRIORITY_LABEL[priority];

        if (!label) {
            console.warn(`PriorityPill: Unknown priority "${priority}"`);
            return null;
        }

        const classes = [
            'priority-pill',
            `priority-pill--${toPriorityModifier(priority)}`,
            className,
        ]
        .filter(Boolean)
        .join(' ');

        return (
            <span className={classes}>
                {!isUnset && <span className="visually-hidden">Prioridad: </span>}
                {label}
            </span>
        );
}
