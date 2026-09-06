import { INCIDENT_STATUS_LABEL } from './incidentStatus.js';

export const INCIDENT_EVENT_LABEL = {
    CREATED: 'Incidencia creada',
    ASSIGNED: 'Operario asignado',
    REASSIGNED: 'Operario reasignado',
    UNASSIGNED: 'Devuelta al pool',
    STATUS_CHANGED: 'Cambio de estado',
    PRIORITY_CHANGED: 'Cambio de prioridad',
    CATEGORY_CHANGED: 'Cambio de categoría',
    TITLE_CHANGED: 'Título editado',
    DESCRIPTION_CHANGED: 'Descripción editada',
    TIME_LOGGED: 'Tiempo imputado',
};

export const INCIDENT_PRIORITY_LABEL = {
    LOW: 'Baja',
    NORMAL: 'Normal',
    HIGH: 'Alta',
    URGENT: 'Urgente',
};

export function prettyValue(value) {
    if (value == null) return null;
    return INCIDENT_STATUS_LABEL[value] ?? INCIDENT_PRIORITY_LABEL[value] ?? value;
}