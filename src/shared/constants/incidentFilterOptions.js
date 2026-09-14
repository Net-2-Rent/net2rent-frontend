import { INCIDENT_CATEGORY, INCIDENT_CATEGORY_LABEL } from "./incidentCategory.js";
import { INCIDENT_PRIORITY_LABEL } from "./incidentPriority.js";

export const CATEGORY_FILTER_OPTIONS = [
    { value: "ALL", label: "Categorías" },
    ...Object.values(INCIDENT_CATEGORY).map((value) => ({
        value,
        label: INCIDENT_CATEGORY_LABEL[value],
    })),
];

export const PRIORITY_FILTER_OPTIONS = [
    { value: "ALL", label: "Prioridad" },
    { value: "URGENT", label: INCIDENT_PRIORITY_LABEL.URGENT },
    { value: "HIGH", label: INCIDENT_PRIORITY_LABEL.HIGH },
    { value: "NORMAL", label: INCIDENT_PRIORITY_LABEL.NORMAL },
    { value: "LOW", label: INCIDENT_PRIORITY_LABEL.LOW },
];