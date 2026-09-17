const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export function formatDate(isoString) {
    if (!isoString) return '';
    
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    
    return dateFormatter.format(date);
}