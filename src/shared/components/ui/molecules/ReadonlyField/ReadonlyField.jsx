import './ReadonlyField.scss';

export default function ReadonlyField({ label, tag, children }) {
    return (
        <div className="readonly-field">
            {label && <span className="readonly-field__label">{label}</span>}
            <div className="readonly-field__box">
                <div className="readonly-field__value">{children}</div>
                {tag && <span className="readonly-field__tag">{tag}</span>}
            </div>
        </div>
    );
}