import './DataList.scss';

export default function DataList({ items = [], className = '' }) {
    const classes = ['data-list', className].filter(Boolean).join(' ');

    return (
        <dl className={classes}>
            {items.map(({ label, value, mono }) => (
                <div className="data-list__row" key={label}>
                    <dt className="data-list__label">{label}</dt>
                    <dd className={
                        'data-list__value' + (mono ? ' data-list__value--mono' : '')
                    }>
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}