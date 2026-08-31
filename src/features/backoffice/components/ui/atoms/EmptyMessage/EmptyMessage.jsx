import "./EmptyMessage.scss";

export default function EmptyMessage({
  message = "No hay incidencias con esos filtros",
  className = "",
}) {
  return (
    <p className={["empty-message", className].filter(Boolean).join(" ")}>
      {message}
    </p>
  );
}