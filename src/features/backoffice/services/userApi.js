import httpClient from "../../../shared/api/httpClient";

export async function listUsers({ role, active } = {}) {
    const { data } = await httpClient.get("/users", { params: { role, active } });
    return data;
}

export async function createUser({ firstName, lastName, email, role, password }) {
    const { data } = await httpClient.post("/users", { firstName, lastName, email, role, password });
    return data;
}

export async function updateUser(id, { firstName, lastName, email, role }) {
    const { data } = await httpClient.patch(`/users/${id}`, { firstName, lastName, email, role });
    return data;
}

export async function resetUserPassword(id, password) {
    await httpClient.patch(`/users/${id}/password`, { password });
}

export async function deactivateUser(id) {
    const { data } = await httpClient.patch(`/users/${id}/deactivate`);
    return data;
}