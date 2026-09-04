import guestHttpClient from "./guestHttpClient";

export async function requestGuestAccess(ref, pin) {
  const { data } = await guestHttpClient.post("/api/guest/access", {
    ref,
    pin,
  });
  return data;
}

// CU-GST-03: listado de incidencias del alojamiento
export async function fetchGuestIncidents() {
  const { data } = await guestHttpClient.get("/api/incidents/guest");
  return data; // [{ code, description, status, openedAt }]
}

// CU-GST-04/09: detalle público (404 si no pertenece al lodging)
export async function fetchGuestIncidentDetail(id) {
  const { data } = await guestHttpClient.get(`/api/incidents/guest/${id}`);
  return data; // { code, description, status, openedAt, closedAt }
}
function toCreatePayload(values) {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    contact: values.contact?.trim() || null,
    category: values.category || null,
    description: values.description,
  };
}

export async function createGuestIncident(values) {
  const { data } = await guestHttpClient.post(
    "/api/guest/incidents",
    toCreatePayload(values),
  );
  return data;
}
