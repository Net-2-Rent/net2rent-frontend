import "./DropdownField.scss";

export default function DropdownField({
  id,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  invalid = false,
  className = "",
  children = null,
  ...rest
}) {
  const classes = [
    "dropdown-field",
    invalid ? "dropdown-field--error" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={classes}
      {...rest}
    >
      {children ?? options.map(({ value: v, label }) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}