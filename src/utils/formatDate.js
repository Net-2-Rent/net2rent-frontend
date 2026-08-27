const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

export function formatDate(isoString) {
    return dateFormatter.format(new Date(isoString));
}