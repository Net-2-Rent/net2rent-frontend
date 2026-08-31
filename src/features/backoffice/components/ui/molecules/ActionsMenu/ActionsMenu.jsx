import { useEffect, useRef, useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import './ActionsMenu.scss';

export default function ActionsMenu({
    label = 'Más acciones',
    items = [],
    className = '',
}) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const menuId = useId();

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(event) {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);
    }, [open]);

    function handleKeyDown(event) {
        if (event.key === 'Escape' && open) {
            setOpen(false);
            triggerRef.current?.focus();
        }
    }

    function handleSelect(item) {
        setOpen(false);
        triggerRef.current?.focus();
        item.onSelect?.();
    }

    const classes = ['actions-menu', className].filter(Boolean).join(' ');

    return (
        <div className={classes} ref={rootRef} onKeyDown={handleKeyDown}>
            <button
                type="button"
                ref={triggerRef}
                className="actions-menu__trigger"
                aria-expanded={open}
                aria-controls={open ? menuId : undefined}
                onClick={() => setOpen((v) => !v)}
            >
                <span>{label}</span>
                <ChevronDown className="actions-menu__caret" size={16} aria-hidden="true" />
            </button>

            {open && (
                <div id={menuId} className="actions-menu__list">
                    {items.map((item, index) => {
                        const ItemIcon = item.icon;
                        const itemClasses = [
                            'actions-menu__item',
                            item.danger && 'actions-menu__item--danger',
                        ].filter(Boolean).join(' ');

                        return (
                            <button
                                key={item.id ?? index}
                                type="button"
                                className={itemClasses}
                                onClick={() => handleSelect(item)}
                            >
                                {ItemIcon && <ItemIcon size={16} aria-hidden="true" />}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}