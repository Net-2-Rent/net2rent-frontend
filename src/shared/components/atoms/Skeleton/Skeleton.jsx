import './Skeleton.scss';

export default function Skeleton({ width, height = 14, radius = 6, className = '' }) {
  const classes = ['skeleton', className].filter(Boolean).join(' ');
  const style = { width, height, borderRadius: radius };

  return <span className={classes} style={style} aria-hidden="true" />;
}