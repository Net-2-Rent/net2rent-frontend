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