import { createBrowserRouter } from "react-router-dom";
import AppScope from "./AppScope";
import IdentificationPage from "../features/guest-portal/pages/IdentificationPage";
import MyLodgingPage from "../features/guest-portal/pages/MyLodgingPage";
import NewGuestIncidentPage from "../features/guest-portal/pages/NewGuestIncidentPage";
import ConfirmationPage from "../features/guest-portal/pages/ConfirmationPage";
import IncidentDetailGuestPage from "../features/guest-portal/pages/IncidentDetailGuestPage";
import GuestSandbox from "../features/guest-portal/pages/GuestSandbox";
import BackofficeSandbox from "../features/backoffice/pages/BackofficeSandbox";
import LoginPage from "../features/auth/pages/LoginPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppScope app="guest" />,
    children: [
      { path: "/", element: <IdentificationPage /> },
      { path: "/alojamiento", element: <MyLodgingPage /> },
      { path: "/incidencias/nueva", element: <NewGuestIncidentPage /> },
      { path: "/incidencias/confirmacion/:code", element: <ConfirmationPage /> },
      { path: "/incidencias/:id", element: <IncidentDetailGuestPage /> },
      { path: "/sandbox", element: <GuestSandbox /> },
    ],
  },
  {
    element: <AppScope app="backoffice" />,
    children: [
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/backoffice", element: <BackofficeSandbox /> },
        ],
      },
      { path: "/sandbox/backoffice", element: <BackofficeSandbox /> },
    ],
  },
]);

export default router;