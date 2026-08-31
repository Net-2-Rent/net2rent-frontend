import { useState } from 'react';
import { MessageSquare, Activity } from 'lucide-react';
import { formatDate } from '../../../../shared/utils/formatDate.js';
import './CronologyCard.scss';

export default function CronologyCard({
    initialEntries = [],
    onAddComment,
    currentUser = 'Tú',
    title = 'Cronología',
    className = '',
}) {
    const [entries, setEntries] = useState(initialEntries);
    const [draft, setDraft] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const text = draft.trim();
        if (!text) return;

        const comment = {
            id: crypto.randomUUID(),
            type: 'comment',
            author: currentUser,
            text,
            at: new Date().toISOString(),
        };
        setEntries([...entries, comment]);
        onAddComment?.(comment);
        setDraft('');
    }

    const classes = ['cronology', className].filter(Boolean).join(' ');

    return (
        <section className={classes}>
            <h2 className="cronology__title">{title}</h2>

            {entries.length === 0 ? (
                <p className="cronology__empty">Aún no hay actividad ni comentarios.</p>
            ) : (
                <ol className="cronology__list">
                    {entries.map((entry) => {
                        const isEvent = entry.type === 'event';
                        const Icon = isEvent ? Activity : MessageSquare;
                        const itemClasses = [
                            'cronology__item',
                            isEvent ? 'cronology__item--event' : 'cronology__item--comment',
                        ].join(' ');

                        return (
                            <li key={entry.id} className={itemClasses}>
                                <span className="cronology__icon" aria-hidden="true">
                                    <Icon size={15} />
                                </span>

                                <div className="cronology__body">
                                    <p className="cronology__meta">
                                        <span className="cronology__author">{entry.author}</span>
                                        {entry.at && (
                                            <time className="cronology__date" dateTime={entry.at}>
                                                {entry.atLabel ?? formatDate(entry.at)}
                                            </time>
                                        )}
                                    </p>
                                    <p className="cronology__text">{entry.text}</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            )}

            <form className="cronology__add" onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="cronology-comment">
                    Nuevo comentario
                </label>
                <textarea
                    id="cronology-comment"
                    className="cronology__input"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Escribe un comentario…"
                    rows={3}
                />
                <div className="cronology__actions">
                    <button type="submit" className="cronology__submit" disabled={!draft.trim()}>
                        Comentar
                    </button>
                </div>
            </form>
        </section>
    );
}