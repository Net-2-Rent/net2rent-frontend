import './EmptyState.scss';

export default function EmptyState({
                                       icon: Icon,
                                       title,
                                       children,
                                       action,
                                       className = '',
                                   }) {
    const classes = ['empty-state', className].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {Icon && (
                <span className="empty-state__icon">
          <Icon size={26} aria-hidden="true" />
        </span>
            )}
            <p className="empty-state__title">{title}</p>
            {children && <p className="empty-state__text">{children}</p>}
            {action && <div className="empty-state__action">{action}</div>}
        </div>
    );
}