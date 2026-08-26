import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function Providers() {
  useEffect(() => {
    document.documentElement.setAttribute('data-app', 'guest');
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.lang = 'es';
  }, []);

  return <RouterProvider router={router} />;
}
