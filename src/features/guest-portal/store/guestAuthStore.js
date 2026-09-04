import { create } from "zustand";
import { loadGuestSession, saveGuestSession, clearGuestSession } from "../services/guestAuthStorage.js";
import { requestGuestAccess } from "../services/guestApi.js";

const initial = loadGuestSession();

export const useGuestAuthStore = create((set) => ({
  token: initial?.token ?? null,
  lodgingId: initial?.lodgingId ?? null,
  lodgingName: initial?.lodgingName ?? null,
  lodgingRef: initial?.lodgingRef ?? null,
  status: "idle",
  error: null,

  async access({ ref, pin }) {
    set({ status: "loading", error: null });
    try {
      const data = await requestGuestAccess(ref, pin);
      const session = {
        token: data.token,
        lodgingId: data.lodgingId,
        lodgingName: data.lodgingName,
        lodgingRef: ref,
      };
      saveGuestSession(session);
      set({ ...session, status: "idle", error: null });
      return { ok: true };
    } catch (err) {
      const message = err.response?.data?.message ?? "Ha ocurrido un error inesperado. Inténtalo de nuevo.";
      set({ status: "error", error: message });
      return { ok: false, message };
    }
  },

  logout() {
    clearGuestSession();
    set({ token: null, lodgingId: null, lodgingName: null, lodgingRef: null, status: "idle", error: null });
  },
}));

export const selectIsGuestAuthenticated = (state) => Boolean(state.token);