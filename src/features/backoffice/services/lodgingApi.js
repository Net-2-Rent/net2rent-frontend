import httpClient from "../../../shared/api/httpClient";

export async function listLodgings() {
    const { data } = await httpClient.get("/lodgings");
    return data;
}

function toRequestPayload(values) {
    return {
        name: values.name,
        address: values.address,
        ref: values.reference,
        pin: values.pin || null,
        accessNotes: values.notes || null,
    };
}

export async function createLodging(values) {
    const { data } = await httpClient.post("/lodgings", toRequestPayload(values));
    return data;
}

export async function updateLodging(id, values) {
    const { data } = await httpClient.put(`/lodgings/${id}`, toRequestPayload(values));
    return data;
}

export async function deactivateLodging(id) {
    await httpClient.delete(`/lodgings/${id}`);
}