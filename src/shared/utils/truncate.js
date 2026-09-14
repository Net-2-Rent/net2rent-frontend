export function truncate(text, max = 80) {
    if (!text) return '';
    const clean = text.trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max).trimEnd() + '...';
}