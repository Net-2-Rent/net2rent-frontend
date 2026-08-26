import { createBrowserRouter } from 'react-router-dom';
import IdentificationPage from '../features/guest-portal/pages/IdentificationPage';
import MyLodgingPage from '../features/guest-portal/pages/MyLodgingPage';
import NewGuestIncidentPage from '../features/guest-portal/pages/NewGuestIncidentPage';
import ConfirmationPage from '../features/guest-portal/pages/ConfirmationPage';
import IncidentDetailGuestPage from '../features/guest-portal/pages/IncidentDetailGuestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IdentificationPage />,
  },
  {
    path: '/alojamiento',
    element: <MyLodgingPage />,
  },
  {
    path: '/incidencias/nueva',
    element: <NewGuestIncidentPage />,
  },
  {
    path: '/incidencias/confirmacion/:code',
    element: <ConfirmationPage />,
  },
  {
    path: '/incidencias/:id',
    element: <IncidentDetailGuestPage />,
  }
]);

export default router;