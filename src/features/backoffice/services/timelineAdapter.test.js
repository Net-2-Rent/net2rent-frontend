import { describe, it, expect } from 'vitest';
import { mapTimelineItemToEntry, mapTimeline } from './timelineAdapter.js';

describe('timelineAdapter', () => {
    it('mapea un COMMENT', () => {
        const item = {
            type: 'COMMENT', at: '2026-09-04T10:15:00', actorName: 'Pau Roig',
            eventType: null, previousValue: null, newValue: null, text: 'Reviso el circuito',
        };
        expect(mapTimelineItemToEntry(item, 0)).toMatchObject({
            id: 'comment-0', title: 'Comentario interno', author: 'Pau Roig',
            description: 'Reviso el circuito', status: null,
        });
    });

    it('mapea un EVENT de prioridad con "antes → después" legible', () => {
        const item = {
            type: 'EVENT', at: '2026-09-04T10:30:00', actorName: 'Pau Roig',
            eventType: 'PRIORITY_CHANGED', previousValue: 'NORMAL', newValue: 'URGENT', text: null,
        };
        const entry = mapTimelineItemToEntry(item, 1);
        expect(entry.title).toBe('Cambio de prioridad');
        expect(entry.description).toBe('Normal → Urgente');
        expect(entry.status).toBeNull();
    });

    it('en STATUS_CHANGED, status = newValue (para el color del punto)', () => {
        const item = {
            type: 'EVENT', at: '2026-09-04T11:00:00', actorName: 'Marc Vidal',
            eventType: 'STATUS_CHANGED', previousValue: 'ASSIGNED', newValue: 'IN_PROGRESS', text: null,
        };
        const entry = mapTimelineItemToEntry(item, 2);
        expect(entry.description).toBe('Asignada → En curso');
        expect(entry.status).toBe('IN_PROGRESS');
    });

    it('usa "Sistema" cuando el evento no tiene actor (alta del huésped)', () => {
        const item = {
            type: 'EVENT', at: '2026-09-04T09:00:00', actorName: null,
            eventType: 'CREATED', previousValue: null, newValue: 'NEW', text: null,
        };
        const entry = mapTimelineItemToEntry(item, 0);
        expect(entry.author).toBe('Sistema');
        expect(entry.title).toBe('Incidencia creada');
        expect(entry.description).toBe('Nueva');
    });

    it('mapTimeline conserva el orden y asigna ids por índice', () => {
        const items = [
            { type: 'EVENT', at: '2026-09-04T10:00:00', actorName: 'X', eventType: 'CREATED',
                previousValue: null, newValue: 'NEW', text: null },
            { type: 'COMMENT', at: '2026-09-04T10:15:00', actorName: 'X', eventType: null,
                previousValue: null, newValue: null, text: 'hola' },
        ];
        expect(mapTimeline(items).map((e) => e.id)).toEqual(['event-0', 'comment-1']);
    });
});