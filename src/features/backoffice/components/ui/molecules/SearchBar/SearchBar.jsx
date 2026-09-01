import { useId } from "react";
import { Search, Plus } from "lucide-react";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import "./SearchBar.scss";

export default function SearchBar({
  search = "",
  onSearchChange,
  onCreate,
  placeholder = "Buscar alojamiento",
  className = "",
}) {
  const inputId = useId();
  const classes = ["search-bar", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="search">
      <label htmlFor={inputId} className="visually-hidden">
        {placeholder}
      </label>
      <div className="search-bar__field">
        <Search className="search-bar__icon" size={18} aria-hidden="true" />
        <Input
          id={inputId}
          className="search-bar__search"
          placeholder={placeholder}
          value={search}
          onChange={onSearchChange}
        />
      </div>
      {onCreate && (
        <Button
          variant="primary"
          className="search-bar__create"
          onClick={onCreate}
        >
          <Plus size={16} aria-hidden="true" />
          Nuevo alojamiento
        </Button>
      )}
    </div>
  );
}
