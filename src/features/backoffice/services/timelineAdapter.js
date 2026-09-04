import { INCIDENT_EVENT_LABEL, prettyValue } from '../../../shared/constants/incidentEvent.js';

export function mapTimelineItemToEntry(item, index) {
    const author = item.actorName ?? 'Sistema';

    if (item.type === 'COMMENT') {
        return {
            id: `comment-${index}`,
            title: 'Comentario interno',
            at: item.at,
            author,
            description: item.text,
            status: null,
        };
    }

    return {
        id: `event-${index}`,
        title: INCIDENT_EVENT_LABEL[item.eventType] ?? item.eventType,
        at: item.at,
        author,
        description: eventDescription(item),
        status: item.eventType === 'STATUS_CHANGED' ? item.newValue : null,
    };
}

function eventDescription(item) {
    const before = prettyValue(item.previousValue);
    const after = prettyValue(item.newValue);
    if (before && after) return `${before} → ${after}`;
    if (after) return after;
    return null;
}

export function mapTimeline(items) {
    return items.map(mapTimelineItemToEntry);
}