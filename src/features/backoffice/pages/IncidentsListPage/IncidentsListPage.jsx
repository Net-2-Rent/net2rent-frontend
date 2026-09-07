import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIncidentList } from "../../hooks/useIncidentList.js";
import { listActiveLodgings, listOperators } from "../../services/incidentApi.js";
import FilterBar from "../../components/ui/molecules/FilterBar/FilterBar.jsx";
import StatusBadgeIncident from "../../components/ui/molecules/StatusBadgeIncident/StatusBadgeIncident.jsx";
import TableIncident from "../../components/ui/organisms/TableIncident/TableIncident.jsx";
import DropdownField from "../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx";
import Input from "../../../../shared/components/ui/atoms/Input/Input.jsx";
import Skeleton from "../../../../shared/components/ui/atoms/Skeleton/Skeleton.jsx";
import Button from "../../../../shared/components/ui/atoms/Button/Button.jsx";
import { INCIDENT_STATUS } from "../../../../shared/constants/incidentStatus.js";
import { ALL_STATUS } from "../../../../shared/constants/statusBadgeIncident.js";
import "./IncidentsListPage.scss";

const HEADER_STATUSES = [
    INCIDENT_STATUS.NEW,
    INCIDENT_STATUS.ASSIGNED,
    INCIDENT_STATUS.IN_PROGRESS,
    INCIDENT_STATUS.PAUSED,
    INCIDENT_STATUS.RESOLVED,
];

const FILTER_KEYS = [
    "status", "priority", "category",
    "lodgingId", "assigneeId", "unassigned", "openedFrom", "openedTo",
];

const OPERATOR_UNASSIGNED = "UNASSIGNED";

export default function IncidentsListPage() {
    const navigate = useNavigate();
    const {
        filters, rows, counters, loading, error,
        page, totalPages, totalElements, updateParams, goToPage, reload,
    } = useIncidentList();

    const [lodgings, setLodgings] = useState([]);
    const [operators, setOperators] = useState([]);
    useEffect(() => {
        let active = true;
        Promise.all([listActiveLodgings(), listOperators()])
            .then(([lods, ops]) => { if (active) { setLodgings(lods); setOperators(ops); } })
            .catch(() => { /* if options fail, the dropdowns just stay minimal */ });
        return () => { active = false; };
    }, []);

    const [search, setSearch] = useState("");
    const visibleRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((r) =>
            [r.code, r.title, r.accommodation].filter(Boolean).some((v) => v.toLowerCase().includes(q))
        );
    }, [rows, search]);

    const currentStatus = filters.status || ALL_STATUS;
    const openTotal = HEADER_STATUSES.reduce((sum, s) => sum + (counters[s] ?? 0), 0);
    const onStatusClick = (status) =>
        updateParams({ status: status === ALL_STATUS ? null : status });

    const lodgingOptions = [
        { value: "ALL", label: "Todos los alojamientos" },
        ...lodgings.map((l) => ({ value: String(l.id), label: `${l.ref} · ${l.name}` })),
    ];
    const operatorOptions = [
        { value: "ALL", label: "Todos los operarios" },
        { value: OPERATOR_UNASSIGNED, label: "Sin asignar" },
        ...operators.map((o) => ({ value: String(o.id), label: o.name })),
    ];
    const operatorValue = filters.unassigned
        ? OPERATOR_UNASSIGNED
        : (filters.assigneeId ?? "ALL");
    const onOperatorChange = (e) => {
        const v = e.target.value;
        if (v === "ALL") updateParams({ assigneeId: null, unassigned: null });
        else if (v === OPERATOR_UNASSIGNED) updateParams({ unassigned: true, assigneeId: null });
        else updateParams({ assigneeId: v, unassigned: null });   // numeric id
    };

    const hasActiveFilters = FILTER_KEYS.some((k) => filters[k]) || search.trim() !== "";
    const clearFilters = () => {
        setSearch("");
        updateParams(Object.fromEntries(FILTER_KEYS.map((k) => [k, null])));
    };

    return (
        <section className="incidents-page">
            <header className="incidents-page__header">
                <h1 className="incidents-page__title">Incidencias</h1>
                <div className="incidents-page__counters" role="group" aria-label="Filtrar por estado">
                    <StatusBadgeIncident
                        status={ALL_STATUS} count={openTotal}
                        active={currentStatus === ALL_STATUS} onClick={() => onStatusClick(ALL_STATUS)} />
                    {HEADER_STATUSES.map((s) => (
                        <StatusBadgeIncident
                            key={s} status={s} count={counters[s] ?? 0}
                            active={currentStatus === s} onClick={() => onStatusClick(s)} />
                    ))}
                </div>
            </header>

            <FilterBar
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                category={filters.category || "ALL"}
                onCategoryChange={(e) => updateParams({ category: e.target.value })}
                priority={filters.priority || "ALL"}
                onPriorityChange={(e) => updateParams({ priority: e.target.value })}
                onReload={reload}
                reloading={loading}
                onCreate={() => navigate("/backoffice/nueva-incidencia")}
            />

            <div className="incidents-page__filters">
                <DropdownField
                    className="incidents-page__filter"
                    value={filters.lodgingId ?? "ALL"}
                    onChange={(e) => updateParams({ lodgingId: e.target.value })}
                    options={lodgingOptions}
                    aria-label="Filtrar por alojamiento"
                />
                <DropdownField
                    className="incidents-page__filter"
                    value={operatorValue}
                    onChange={onOperatorChange}
                    options={operatorOptions}
                    aria-label="Filtrar por operario"
                />
                <DropdownField
                    className="incidents-page__filter"
                    value={`${filters.sort}:${filters.dir}`}
                    onChange={(e) => {
                        const [sort, dir] = e.target.value.split(":");
                        updateParams({ sort, dir });
                    }}
                    options={[
                        { value: "openedAt:desc", label: "Fecha (más reciente)" },
                        { value: "openedAt:asc",  label: "Fecha (más antigua)" },
                        { value: "priority:desc", label: "Prioridad (mayor)" },
                        { value: "priority:asc",  label: "Prioridad (menor)" },
                    ]}
                    aria-label="Ordenar por"
                />
                <label className="incidents-page__filter incidents-page__daterange">
                    <span className="incidents-page__daterange-label">Fecha inicio</span>
                    <Input
                        type="date"
                        value={filters.openedFrom ?? ""}
                        onChange={(e) => updateParams({ openedFrom: e.target.value || null })}
                    />
                </label>
                <label className="incidents-page__filter incidents-page__daterange">
                    <span className="incidents-page__daterange-label">Fecha fin</span>
                    <Input
                        type="date"
                        value={filters.openedTo ?? ""}
                        onChange={(e) => updateParams({ openedTo: e.target.value || null })}
                    />
                </label>
                {hasActiveFilters && (
                    <Button variant="tertiary" onClick={clearFilters}>Limpiar filtros</Button>
                )}
            </div>

            {error && (
                <p className="incidents-page__error" role="alert">
                    No se pudieron cargar las incidencias. Inténtalo de nuevo.
                </p>
            )}

            {loading && rows.length === 0 ? (
                <div className="incidents-page__skeleton" aria-hidden="true">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} width="100%" height={44} radius={8}
                                  className="incidents-page__skeleton-row" />
                    ))}
                </div>
            ) : (
                <TableIncident
                    incidents={visibleRows}
                    onRowClick={(inc) => navigate(`/backoffice/incidencias/${inc.id}`)}
                    page={page}
                    totalPages={totalPages}
                    totalResults={totalElements}
                    onPrevPage={() => goToPage(page - 1)}
                    onNextPage={() => goToPage(page + 1)}
                    onGoToPage={goToPage}
                    emptyMessage="No hay incidencias con esos filtros"
                />
            )}
        </section>
    );
}