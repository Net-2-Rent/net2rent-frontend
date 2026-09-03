import guestHttpClient from "./guestHttpClient";

export async function requestGuestAccess(ref, pin) {
  const { data } = await guestHttpClient.post("/api/guest/access", {
    ref,
    pin,
  });
  return data;
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
