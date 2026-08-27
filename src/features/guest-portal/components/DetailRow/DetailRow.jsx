import './DetailRow.scss';

export default function DetailRow({ label, children, className = '' }) {
    const classes = ['detail-row', className].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <dt className="detail-row__label">{label}</dt>
            <dd className="detail-row__value">{children}</dd>
        </div>
    );
}