import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function AppScope({ app }) {
    useLayoutEffect(() => {
        document.documentElement.dataset.app = app;
    }, [app]);

    return <Outlet />;
}