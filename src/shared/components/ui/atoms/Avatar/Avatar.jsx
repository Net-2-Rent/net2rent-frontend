import './Avatar.scss';

function initialsOf(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => (part[0] ? part[0].toUpperCase() : ''))
    .join('');
}

export default function Avatar({ name, size = 'md', title, className = '' }) {
  const classes = ['avatar', `avatar--${size}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} title={title ?? name} aria-hidden="true">
      {initialsOf(name) || '—'}
    </span>
  );
}