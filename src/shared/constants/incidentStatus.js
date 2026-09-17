export const INCIDENT_STATUS = {
    NEW: 'NEW',
    ASSIGNED: 'ASSIGNED',
    IN_PROGRESS: 'IN_PROGRESS',
    PAUSED: 'PAUSED',
    RESOLVED: 'RESOLVED',
    CLOSED: 'CLOSED',
    REJECTED: 'REJECTED',
};

export const INCIDENT_STATUS_LABEL = {
    [INCIDENT_STATUS.NEW]: 'Nueva',
    [INCIDENT_STATUS.ASSIGNED]: 'Asignada',
    [INCIDENT_STATUS.IN_PROGRESS]: 'En curso',
    [INCIDENT_STATUS.PAUSED]: 'Pausada',
    [INCIDENT_STATUS.RESOLVED]: 'Resuelta',
    [INCIDENT_STATUS.CLOSED]: 'Cerrada',
    [INCIDENT_STATUS.REJECTED]: 'Rechazada',
};

export function toStatusModifier(status) {
    return status.toLowerCase().replaceAll('_', '-');
}