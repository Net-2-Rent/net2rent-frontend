import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import './SuccessPanel.scss';

export default function SuccessPanel({
                                         title,
                                         code,
                                         codeLabel = 'Tu código',
                                         children,
                                         action,
                                         className = '',
                                     }) {
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const classes = ['success-panel', className].filter(Boolean).join(' ');

    return (
        <div className={classes}>
      <span className="success-panel__icon">
        <Check size={24} strokeWidth={3} aria-hidden="true" />
      </span>

            <h1 className="success-panel__title" ref={titleRef} tabIndex={-1}>
                {title}
            </h1>

            {code && (
                <p className="success-panel__code">
                    <span className="success-panel__code-label">{codeLabel}</span>
                    <span className="success-panel__code-value">{code}</span>
                </p>
            )}

            {children && <p className="success-panel__text">{children}</p>}
            {action && <div className="success-panel__action">{action}</div>}
        </div>
    );
}