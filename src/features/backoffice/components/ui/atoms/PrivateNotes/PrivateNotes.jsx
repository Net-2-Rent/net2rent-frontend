import './PrivateNotes.scss'

export default function PrivateNotes({
    title = 'Notas privadas de acceso - Uso interno',
    children,
    className = '',
}) {
    const classes = ['private-notes', className].filter(Boolean).join(' ');

    return (
        <aside className={classes}>
            <p className="private-notes__title">
                <span className="private-notes__dot" aria-hidden="true" />
                {title}
            </p>
            <div className="private-notes__body">{children}</div>
        </aside>
    )
}