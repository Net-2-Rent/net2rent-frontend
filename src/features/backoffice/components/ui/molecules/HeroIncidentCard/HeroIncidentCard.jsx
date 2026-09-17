import StatusBadge from '../../../../../../shared/components/ui/atoms/StatusBadge/StatusBadge.jsx';
import PriorityBadge from '../../atoms/PriorityBadge/PriorityBadge.jsx';
import CategoryBadge from '../../atoms/CategoryBadge/CategoryBadge.jsx';
import './HeroIncidentCard.scss';

export default function HeroIncidentCard({
    code,
    title,
    status,
    priority,
    category,
    assigneeName,
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
                <PriorityBadge priority={priority} />
                <CategoryBadge category={category} />
            </div>

            <div className="hero-incident__heading">
                <h1 className="hero-incident__title">{title}</h1>
                {assigneeName && (
                    <p className="hero-incident__assignee">
                        Operario: <strong>{assigneeName}</strong>
                    </p>
                )}
            </div>
            
            {actions && <div className="hero-incident__actions">{actions}</div>}
        </section>
    );
}