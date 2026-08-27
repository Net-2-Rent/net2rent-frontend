const STORAGE_KEY = 'n2r-theme';

export function getInitialTheme() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
    } catch {
    }
    return 'system';
}

export function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'system') {
        delete root.dataset.theme;
    } else {
        root.dataset.theme = theme;
    }
}

export function setTheme(theme) {
    try {
        if (theme === 'system') localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, theme);
    } catch {
    }
    applyTheme(theme);
}