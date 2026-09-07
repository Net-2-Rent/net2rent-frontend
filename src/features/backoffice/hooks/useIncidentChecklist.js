import { useCallback, useEffect, useState } from "react";
import {
  getIncidentChecklist,
  addChecklistItem,
  setChecklistItemDone,
  deleteChecklistItem,
} from "../services/incidentApi.js";

export function useIncidentChecklist(incidentId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [pendingIds, setPendingIds] = useState(() => new Set());

  useEffect(() => {
    if (incidentId == null) return;

    let active = true;
    setLoading(true);
    setError(null);

    getIncidentChecklist(incidentId)
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [incidentId]);

  const markPending = useCallback((itemId, isPending) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (isPending) next.add(itemId);
      else next.delete(itemId);
      return next;
    });
  }, []);

  const addItem = useCallback(
    async (text) => {
      setAdding(true);
      try {
        const created = await addChecklistItem(incidentId, text);
        setItems((prev) => [...prev, created]);
      } finally {
        setAdding(false);
      }
    },
    [incidentId],
  );

  const toggleItem = useCallback(
    async (itemId, done) => {
      markPending(itemId, true);
      try {
        const updated = await setChecklistItemDone(incidentId, itemId, done);
        setItems((prev) => prev.map((it) => (it.id === itemId ? updated : it)));
      } finally {
        markPending(itemId, false);
      }
    },
    [incidentId, markPending],
  );

  const removeItem = useCallback(
    async (itemId) => {
      markPending(itemId, true);
      try {
        await deleteChecklistItem(incidentId, itemId);
        setItems((prev) => prev.filter((it) => it.id !== itemId));
      } catch (err) {
        markPending(itemId, false);
        throw err;
      }
    },
    [incidentId, markPending],
  );

  return {
    items,
    loading,
    error,
    adding,
    pendingIds,
    addItem,
    toggleItem,
    removeItem,
  };
}
