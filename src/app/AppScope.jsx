import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getInitialTheme, applyTheme } from '../shared/utils/theme.js';

export default function AppScope({ app }) {
    useLayoutEffect(() => {
        document.documentElement.dataset.app = app;
        applyTheme(getInitialTheme());
    }, [app]);

    return <Outlet />;
}