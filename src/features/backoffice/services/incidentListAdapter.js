function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? ""
        : d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function mapIncidentRow(dto) {
    return {
        id: dto.id,
        code: dto.code,
        title: dto.title,
        category: dto.category,
        accommodation: dto.lodgingName ?? dto.lodgingRef ?? "",
        status: dto.status,
        priority: dto.priority,
        assignee: dto.assigneeName ?? null,
        createdAt: formatDate(dto.openedAt),
    };
}

export function mapIncidentList(content = []) {
    return content.map(mapIncidentRow);
}