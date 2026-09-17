import { useCallback, useEffect, useRef, useState } from "react";
import {
  getIncidentChecklist,
  addChecklistItem,
  setChecklistItemDone,
  deleteChecklistItem,
  reorderChecklistItems,
} from "../services/incidentApi.js";

export function useIncidentChecklist(incidentId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [pendingIds, setPendingIds] = useState(() => new Set());

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

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
        const list = await addChecklistItem(incidentId, text);
        setItems(list);
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
        const list = await setChecklistItemDone(incidentId, itemId, done);
        setItems(list);
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
        const list = await deleteChecklistItem(incidentId, itemId);
        setItems(list);
      } catch (err) {
        markPending(itemId, false);
        throw err;
      }
    },
    [incidentId, markPending],
  );

  const reorderItem = useCallback(
    async (fromIndex, toIndex) => {
      if (fromIndex === toIndex) return;
      const previous = itemsRef.current;
      const next = [...previous];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);

      setItems(next);
      try {
        const list = await reorderChecklistItems(
          incidentId,
          next.map((i) => i.id),
        );
        setItems(list);
      } catch (err) {
        setItems(previous);
        throw err;
      }
    },
    [incidentId],
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
    reorderItem,
  };
}