import StatusBadge from '../../../../shared/components/StatusBadge/StatusBadge.jsx';
import PriorityPill from '../../../../shared/components/PriorityPill/PriorityPill.jsx';
import './HeroIncidentCard.scss';

export default function HeroIncidentCard({
    code,
    title,
    status,
    priority,
    actions,
    className = '',
}) {
    const classes = ['hero-incident', className].filter(Boolean).join(' ');

    return (
        <section className={classes}>
            <div className="hero-incident__meta">
                <span className="hero-incident__code">
                    <span className="visually-hidden">Incidencia </span>
                    {code}
                </span>
                <StatusBadge status={status} />
                <PriorityPill priority={priority} />
            </div>

            <h1 className="hero-incident__title">{title}</h1>

            {actions && <div className="hero-incident__actions">{actions}</div>}
        </section>
    );
}