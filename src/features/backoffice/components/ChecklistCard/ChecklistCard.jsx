import { useState } from 'react';
import { Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import './ChecklistCard.scss';

export default function ChecklistCard({
    initialTasks = [],
    onChange,
    title = 'Checklist de trabajo',
    className = '',
}) {
    const [tasks, setTasks] = useState(initialTasks);
    const [draft, setDraft] = useState('');

    function commit(next) {
        setTasks(next);
        onChange?.(next);
    }

    function handleAdd(event) {
        event.preventDefault();
        const text = draft.trim();
        if (!text) return;
        commit([...tasks, { id: crypto.randomUUID(), text, done: false }]);
        setDraft('');
    }

    function toggle(id) {
        commit(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }

    function remove(id) {
        commit(tasks.filter((t) => t.id !== id));
    }

    function move(index, direction) {
        const target = index + direction;
        if (target < 0 || target >= tasks.length) return;

        const next = [...tasks];
        [next[index], next[target]] = [next[target], next[index]];
        commit(next)
    }

    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const percent = total ? (done / total) * 100 : 0;

    const classes = ['checklist', className].filter(Boolean).join(' ');

    return (
        <section className={classes}>
            <header className="checklist__header">
                <h2 className="checklist__title">{title}</h2>
                {total > 0 && (
                    <p className="checklist__progress" aria-live="polite">
                        {done} {done === 1 ? 'tarea' : 'tareas'} de {total}{' '}
                        {total === 1 ? 'tarea' : 'tareas'} completadas
                    </p>
                )}
            </header>

            {total > 0 && (
                <div className="checklist__bar" aria-hidden="true">
                    <div className="checklist__bar-fill" style={{ width: `${percent}%` }} />
                </div>
            )}

            {total === 0 ? (
                <p className="checklist__empty">
                    Aún no hay tareas. Añade la primera abajo.
                </p>
            ) : (
                <ul className="checklist__list">
                    {tasks.map((task, index) => (
                        <li key={task.id} className="checklist__item">
                            <label className="checklist__check">
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => toggle(task.id)}
                                />
                                <span
                                    className={
                                        'checklist__text' +
                                        (task.done ? ' checklist__text--done' : '')
                                    }
                                >
                                    {task.text}
                                </span>
                            </label>

                            <div className="checklist__controls">
                                <button
                                    type="button"
                                    className="checklist__move"
                                    onClick={() => move(index, -1)}
                                    disabled={index === 0}
                                    aria-label={`Subir "${task.text}"`}
                            >
                                <ChevronUp size={16} aria-hidden="true" />

                                </button>

                                <button
                                    type="button"
                                    className="checklist__move"
                                    onClick={() => move(index, 1)}
                                    disabled={index === tasks.length - 1}
                                    aria-label={`Bajar "${tasks.text}"`}
                                >
                                    <ChevronDown size={16} aria-hidden="true" />
                                </button>

                            <button
                                type="button"
                                className="checklist__remove"
                                onClick={() => remove(task.id)}
                                aria-label={`Eliminar "${task.text}"`}
                            >
                                <X size={16} aria-hidden="true" />
                            </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <form className="checklist__add" onSubmit={handleAdd}>
                <input
                    type="text"
                    className="checklist__input"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Añadir tarea y pulsar Enter"
                    aria-label="Nueva tarea"
                />
                <button
                    type="submit"
                    className="checklist__submit"
                    disabled={!draft.trim()}
                >
                    <Plus size={16} aria-hidden="true" />
                    <span>Agregar</span>
                </button>
            </form>
        </section>
    );
}