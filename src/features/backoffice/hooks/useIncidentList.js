import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listIncidents } from "../services/incidentApi.js";
import { mapIncidentList } from "../services/incidentListAdapter.js";

const PAGE_SIZE = 20;

export function useIncidentList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({
        rows: [], counters: {}, page: 0, totalPages: 1, totalElements: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    const filters = useMemo(() => {
        const get = (k) => searchParams.get(k) || undefined;
        return {
            status: get("status"),
            priority: get("priority"),
            category: get("category"),
            lodgingId: get("lodgingId"),
            assigneeId: get("assigneeId"),
            unassigned: searchParams.get("unassigned") === "true" || undefined,
            openedFrom: get("openedFrom"),
            openedTo: get("openedTo"),
            sort: get("sort") || "openedAt",
            dir: get("dir") || "desc",
            page: Number(searchParams.get("page") || 0), // 0-based, matches backend
            size: PAGE_SIZE,
        };
    }, [searchParams]);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError(null);
        listIncidents(filters)
            .then((res) => {
                if (!active) return;
                setData({
                    rows: mapIncidentList(res.page.content),
                    counters: res.counters ?? {},
                    page: res.page.page,
                    totalPages: res.page.totalPages,
                    totalElements: res.page.totalElements,
                });
            })
            .catch((err) => { if (active) setError(err); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [filters, reloadKey]);

    const updateParams = useCallback((patch, { resetPage = true } = {}) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            Object.entries(patch).forEach(([k, v]) => {
                if (v == null || v === "" || v === "ALL") next.delete(k);
                else next.set(k, String(v));
            });
            if (resetPage && !("page" in patch)) next.delete("page");
            return next;
        }, { replace: true });
    }, [setSearchParams]);

    const goToPage = useCallback((page1Based) => {
        updateParams({ page: Math.max(0, page1Based - 1) }, { resetPage: false });
    }, [updateParams]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return {
        filters,
        rows: data.rows,
        counters: data.counters,
        loading,
        error,
        page: data.page + 1,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        updateParams,
        goToPage,
        reload,
    };
}