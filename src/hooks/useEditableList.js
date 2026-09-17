import { useState } from 'react';

export function useEditableList(initialItems = [], { onChange, onAdd } = {}) {
    const [items, setItems] = useState(initialItems);

    function commit(next) {
        setItems(next);
        onChange?.(next);
    }

    function add(item) {
        commit([...items, item]);
        onAdd?.(item);
        return item;
    }

    function remove(id) {
        commit(items.filter((it) => it.id !== id));
    }

    function patch(id, changes) {
        commit(
            items.map((it) =>
                it.id === id
                    ? { ...it, ...(typeof changes === 'function' ? changes(it) : changes) }
                    : it,
            ),
        );
    }

    function move(index, direction) {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        commit(next);
    }

    return { items, add, remove, patch, move };
}