import { useCallback, useEffect, useState } from 'react';
import { getIncidentTimeline, addIncidentComment } from '../services/incidentApi.js';
import { mapTimeline, mapTimelineItemToEntry } from '../services/timelineAdapter.js';

export function useIncidentTimeline(incidentId) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (incidentId == null) return;

        let active = true;
        setLoading(true);
        setError(null);

        getIncidentTimeline(incidentId)
            .then((items) => { if (active) setEntries(mapTimeline(items)); })
            .catch((err) => { if (active) setError(err); })
            .finally(() => { if (active) setLoading(false); });

        return () => { active = false; };
    }, [incidentId]);

    const addComment = useCallback(async (text) => {
        setSubmitting(true);
        try {
            const created = await addIncidentComment(incidentId, text);
            setEntries((prev) => [...prev, mapTimelineItemToEntry(created, prev.length)]);
        } finally {
            setSubmitting(false);
        }
    }, [incidentId]);

    return { entries, loading, error, submitting, addComment };
}