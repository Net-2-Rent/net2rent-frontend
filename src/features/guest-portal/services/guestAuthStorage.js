const STORAGE_KEY = "net2rent.guestAuth";

export function loadGuestSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveGuestSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearGuestSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getGuestToken() {
  return loadGuestSession()?.token ?? null;
}