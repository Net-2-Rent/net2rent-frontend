import './Input.scss';

export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  className = '',
  ...rest
}) {
  const classes = ['input', invalid ? 'input--error' : '', className].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={classes}
      {...rest}
    />
  );
}