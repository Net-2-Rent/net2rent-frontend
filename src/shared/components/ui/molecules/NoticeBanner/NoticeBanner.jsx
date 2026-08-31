import { X } from 'lucide-react';
import './NoticeBanner.scss';

export default function NoticeBanner({
  tone = 'error',
  onClose,
  className = '',
  children,
}) {
  const classes = ['notice-banner', `notice-banner--${tone}`, className].filter(Boolean).join(' ');

  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={classes}>
      <span className="notice-banner__marker" aria-hidden="true">
        {tone === 'error' ? '!' : 'i'}
      </span>
      <div className="notice-banner__body">
        <div className="notice-banner__content">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className="notice-banner__close"
          onClick={onClose}
          aria-label="Cerrar aviso"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}