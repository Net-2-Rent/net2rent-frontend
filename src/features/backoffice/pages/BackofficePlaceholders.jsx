export function Placeholder({ title = "" }) {
  return (
    <div style={{ color: "var(--color-text-muted)" }}>
      Página en construcción: {title || "…"}
    </div>
  );
}

export function BackofficeIndexPage() {
  return <Placeholder title="Incidencias" />;
}