import './Spinner.scss';

export default function Spinner({ size = 'md', tone = 'default', className = '' }) {
  const classes = [
    'spinner',
    `spinner--${size}`,
    tone === 'on-brand' ? 'spinner--on-brand' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} role="status">
      <span className="visually-hidden">Cargando…</span>
      <span className="spinner__track" aria-hidden="true" />
    </span>
  );
}