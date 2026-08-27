import {
    INCIDENT_STATUS_LABEL,
    toStatusModifier,
} from '../../constants/incidentStatus.js';
import './StatusBadge.scss';

export default function StatusBadge({ status, className = '' }) {
    const label = INCIDENT_STATUS_LABEL[status];

    if (!label) {
        console.warn(`StatusBadge: unknown status "${status}"`);
        return null;
    }

    const classes = [
        'status-badge',
        `status-badge--${toStatusModifier(status)}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={classes}>
      <span className="visually-hidden">Estado: </span>
            {label}
    </span>
    );
}