import './Overlay.scss';

export default function Overlay({ onClose, className = '', ...rest }) {
  return (
    <div
      className={['overlay', className].filter(Boolean).join(' ')}
      onClick={onClose}
      aria-hidden="true"
      {...rest}
    />
  );
}