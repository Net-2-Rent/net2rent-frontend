import "./PageButton.scss";

export default function PageButton({
  active = false,
  disabled = false,
  onClick,
  children,
  className = "",
}) {
  const classes = [
    "page-btn",
    active ? "page-btn--active" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}