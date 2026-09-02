import guestHttpClient from "./guestHttpClient";

export async function requestGuestAccess(ref, pin) {
  const { data } = await guestHttpClient.post("/api/guest/access", { ref, pin });
  return data;
}