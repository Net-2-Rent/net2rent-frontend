import { useEffect, useState } from "react";
import LodgingRow from "../../components/ui/molecules/LodgingRow/LodgingRow.jsx";
import LodgingModal from "../../components/ui/organisms/LodgingModal/LodgingModal.jsx";
import ConfirmationModal from "../../components/ui/organisms/ConfirmationModal/ConfirmationModal.jsx";
import SearchBar from "../../components/ui/molecules/SearchBar/SearchBar.jsx";
import "./LodgingsPage.scss";
import {
  listLodgings,
  createLodging,
  updateLodging,
  deactivateLodging,
} from "../../services/lodgingApi.js";
import { useAuthStore } from "../../../auth/store/authStore.js";
import { ROLES } from "../../../../shared/constants/nav.js";

function toRowProps(lodging) {
  return {
    name: lodging.name,
    address: lodging.address,
    reference: lodging.ref,
    active: lodging.active,
    notes: lodging.accessNotes,
  };
}
const BACKEND_TO_FORM_FIELD = {
  ref: "reference",
  accessNotes: "notes",
};

export default function LodgingsPage() {
  const role = useAuthStore((s) => s.user?.role);
  const isAdmin = role === ROLES.ADMIN;

  const [lodgings, setLodgings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [modalMode, setModalMode] = useState(null); 
  const [selected, setSelected] = useState(null);
  

  const [confirmTarget, setConfirmTarget] = useState(null);

  const [search, setSearch] = useState("");

  async function loadLodgings() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await listLodgings();
      setLodgings(data);
    } catch {
      setLoadError("No se pudieron cargar los alojamientos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLodgings();
  }, []);

  function openCreate() {
    setSelected(null);
    setSubmitError("");
    setFieldErrors({});
    setModalMode("create");
  }

  function openEdit(lodging) {
    setSelected(lodging);
    setSubmitError("");
    setFieldErrors({});
    setModalMode("edit");
  }

  function openPin(lodging) {
    setSelected(lodging);
    setSubmitError("");
    setFieldErrors({});
    setModalMode("pin");
  }

  function closeModal() {
    setModalMode(null);
    setSelected(null);
  }

  async function handleSubmit(values) {
    setSubmitError("");
    try {
      if (modalMode === "create") {
        await createLodging(values);
      } else if (modalMode === "edit") {
        await updateLodging(selected.id, values);
      } else if (modalMode === "pin") {
        await updateLodging(selected.id, {
          name: selected.name,
          address: selected.address,
          reference: selected.ref,
          notes: selected.accessNotes,
          pin: values.pin,
        });
      }
      closeModal();
      await loadLodgings();
        } catch (err) {
      const data = err.response?.data;
      const backendErrors = data?.errors ?? [];

      if (backendErrors.length > 0) {
        const mapped = {};
        backendErrors.forEach(({ field, message }) => {
          mapped[BACKEND_TO_FORM_FIELD[field] ?? field] = message;
        });
        setFieldErrors(mapped);
        setSubmitError("");
      } else if (data?.message?.includes("referencia")) {
        setFieldErrors({ reference: data.message });
        setSubmitError("");
      } else if (data?.message?.includes("PIN")) {
        setFieldErrors({ pin: data.message });
        setSubmitError("");
      } else {
        setFieldErrors({});
        setSubmitError(data?.message ?? "No se pudo guardar el alojamiento.");
      }
    }
  }

  async function confirmDeactivate() {
    if (!confirmTarget) return;
    try {
      await deactivateLodging(confirmTarget.id);
      setConfirmTarget(null);
      await loadLodgings();
    } catch {
      setConfirmTarget(null);
      setLoadError("No se pudo desactivar el alojamiento.");
    }
  }
  const term = search.trim().toLowerCase();
  const filteredLodgings = term
    ? lodgings.filter((lodging) => {
        const statusLabel = lodging.active ? "activo" : "inactivo";
        return (
          lodging.ref?.toLowerCase().includes(term) ||
          lodging.name?.toLowerCase().includes(term) ||
          lodging.address?.toLowerCase().includes(term) ||
          statusLabel.includes(term)
        );
      })
    : lodgings;

  return (
    <div className="lodgings-page">
      <div className="lodgings-page__toolbar">
        <SearchBar
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          onCreate={isAdmin ? openCreate : undefined}
          placeholder="Buscar por nombre, referencia, ubicación o estado"
        />
      </div>

      {loading && <p>Cargando alojamientos…</p>}
      {loadError && <p role="alert">{loadError}</p>}
      {!loading && !loadError && lodgings.length === 0 && (
        <p>Todavía no hay alojamientos registrados.</p>
      )}
      {!loading &&
        !loadError &&
        lodgings.length > 0 &&
        filteredLodgings.length === 0 && (
          <p>No se encontraron alojamientos para "{search}".</p>
        )}

      <div className="lodgings-page__list">
        {filteredLodgings.map((lodging) => (
          <LodgingRow
            key={lodging.id}
            {...toRowProps(lodging)}
            onEdit={isAdmin ? () => openEdit(lodging) : undefined}
            onChangePin={isAdmin ? () => openPin(lodging) : undefined}
            onToggleActive={
              isAdmin && lodging.active
                ? () => setConfirmTarget(lodging)
                : undefined
            }
          />
        ))}
      </div>

      {isAdmin && (
        <LodgingModal
          key={modalMode}
          isOpen={modalMode !== null}
          onClose={closeModal}
          onSubmit={handleSubmit}
          mode={modalMode ?? "create"}
          submitError={submitError}
          fieldErrors={fieldErrors}
          defaultValues={
            modalMode === "edit" && selected
              ? {
                  name: selected.name,
                  address: selected.address,
                  reference: selected.ref,
                  notes: selected.accessNotes,
                  pin: "",
                }
              : undefined
          }
        />
      )}

      {isAdmin && (
        <ConfirmationModal
          isOpen={!!confirmTarget}
          onClose={() => setConfirmTarget(null)}
          onConfirm={confirmDeactivate}
          title="Desactivar alojamiento"
          message={`¿Seguro que quieres desactivar "${confirmTarget?.name}"? No se elimina, pero dejará de estar disponible para nuevas incidencias.`}
          confirmLabel="Desactivar"
          tone="danger"
        />
      )}
    </div>
  );
}
