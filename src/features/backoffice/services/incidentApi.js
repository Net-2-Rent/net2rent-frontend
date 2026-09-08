import httpClient from "../../../shared/api/httpClient";

export async function listActiveLodgings() {
    const { data } = await httpClient.get("/lodgings");
    return data.filter((l) => l.active);
}

export async function listOperators() {
    const { data } = await httpClient.get("/users/operators");
    return data;
}

function toBackendDateTime(date, time) {
    return new Date(`${date}T${time || "00:00"}`).toISOString().slice(0, 19);
}

function toCreatePayload(values) {
    return {
        lodgingId: Number(values.lodgingId),
        openedAt: toBackendDateTime(values.openedDate, values.openedTime),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        contact: values.contact?.trim() || null,
        category: values.category,
        priority: values.priority,
        assigneeId: values.operatorId ? Number(values.operatorId) : null,
        description: values.description,
    };
}

export async function createPhoneIncident(values) {
    const { data } = await httpClient.post("/incidents", toCreatePayload(values));
    return data;
}

export async function getIncidentTimeline(incidentId) {
    const { data } = await httpClient.get(`/incidents/${incidentId}/timeline`);
    return data;
}

export async function addIncidentComment(incidentId, text) {
    const { data } = await httpClient.post(`/incidents/${incidentId}/comments`, { text });
    return data;
}

export async function getIncidentById(id) {
    const { data } = await httpClient.get(`/incidents/${id}`);
    return data;
}

export async function classifyIncident(id, { category, priority }) {
    const { data } = await httpClient.patch(`/incidents/${id}/classification`, {
        category,
        priority,
    });
    return data;
}

export async function markIncidentUrgent(id) {
    const { data } = await httpClient.patch(`/incidents/${id}/urgent`);
    return data;
}

export async function correctIncidentText(id, { title, description }) {
    const { data } = await httpClient.patch(`/incidents/${id}/text`, {
        title: title?.trim() || null,
        description,
    });
    return data;
}

export async function getIncidentChecklist(incidentId) {
  const { data } = await httpClient.get(`/incidents/${incidentId}/checklist`);
  return data;
}

export async function addChecklistItem(incidentId, text) {
  const { data } = await httpClient.post(`/incidents/${incidentId}/checklist`, {
    text,
  });
  return data;
}

export async function setChecklistItemDone(incidentId, itemId, done) {
  const { data } = await httpClient.patch(
    `/incidents/${incidentId}/checklist/${itemId}`,
    { done },
  );
  return data;
}

export async function deleteChecklistItem(incidentId, itemId) {
  await httpClient.delete(`/incidents/${incidentId}/checklist/${itemId}`);
}

function toListParams(filters = {}) {
    const params = {};
    const set = (key, value) => {
        if (value !== undefined && value !== null && value !== "" && value !== "ALL") {
            params[key] = value;
        }
    };
    set("status", filters.status);
    set("priority", filters.priority);
    set("category", filters.category);
    set("lodgingId", filters.lodgingId);
    if (filters.unassigned) params.unassigned = true;
    else set("assigneeId", filters.assigneeId);
    set("openedFrom", filters.openedFrom);
    set("openedTo", filters.openedTo);
    set("sort", filters.sort);
    set("dir", filters.dir);
    if (filters.page != null) params.page = filters.page;
    if (filters.size != null) params.size = filters.size;
    return params;
}

export async function listIncidents(filters) {
    const { data } = await httpClient.get("/incidents", { params: toListParams(filters) });
    return data;
}