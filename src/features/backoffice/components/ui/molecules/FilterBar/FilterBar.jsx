import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import DropdownField from "../../../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import Spinner from "../../../../../../shared/components/ui/atoms/Spinner/Spinner.jsx";
import { INCIDENT_PRIORITY_LABEL } from "../../../../../../shared/constants/incidentPriority.js";
import { INCIDENT_CATEGORY, INCIDENT_CATEGORY_LABEL } from "../../../../../../shared/constants/incidentCategory.js";
import "./FilterBar.scss";

const CATEGORY_FILTER_OPTIONS = [
  { value: "ALL", label: "Categorías" },
  ...Object.values(INCIDENT_CATEGORY).map((value) => ({
    value,
    label: INCIDENT_CATEGORY_LABEL[value],
  })),
];

const PRIORITY_FILTER_OPTIONS = [
  { value: "ALL", label: "Prioridad" },
  { value: "URGENT", label: INCIDENT_PRIORITY_LABEL.URGENT },
  { value: "HIGH", label: INCIDENT_PRIORITY_LABEL.HIGH },
  { value: "NORMAL", label: INCIDENT_PRIORITY_LABEL.NORMAL },
  { value: "LOW", label: INCIDENT_PRIORITY_LABEL.LOW },
];

export default function FilterBar({
  search = "",
  onSearchChange,
  category = "ALL",
  onCategoryChange,
  priority = "ALL",
  onPriorityChange,
  onReload,
  onCreate,
  reloading = false,
  placeholder = "Buscar por código, alojamiento o descripción",
  categoryOptions = CATEGORY_FILTER_OPTIONS,
  priorityOptions = PRIORITY_FILTER_OPTIONS,
  showCreate = true,
  className = "",
}) {
  const classes = ["filter-bar", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <Input
        className="filter-bar__search"
        aria-label="Buscar incidencias"
        placeholder={placeholder}
        value={search}
        onChange={onSearchChange}
      />
      <DropdownField
        className="filter-bar__category"
        aria-label="Filtrar por categoría"
        value={category}
        onChange={onCategoryChange}
        options={categoryOptions}
      />
      <DropdownField
        className="filter-bar__priority"
        aria-label="Filtrar por prioridad"
        value={priority}
        onChange={onPriorityChange}
        options={priorityOptions}
      />
      <Button variant="secondary" className="filter-bar__reload" onClick={onReload} disabled={reloading}>
        {reloading && <Spinner size="sm" />}
        Recargar
      </Button>
      {showCreate && (
          <Button variant="primary" className="filter-bar__create" onClick={onCreate}>
              Nueva incidencia
          </Button>
      )}
    </div>
  );
}