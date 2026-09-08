import { createBrowserRouter } from "react-router-dom";
import AppScope from "./AppScope";
import IdentificationPage from "../features/guest-portal/pages/IdentificationPage";
import MyLodgingPage from "../features/guest-portal/pages/MyLodgingPage";
import NewGuestIncidentPage from "../features/guest-portal/pages/NewGuestIncidentPage";
import ConfirmationPage from "../features/guest-portal/pages/ConfirmationPage";
import IncidentDetailGuestPage from "../features/guest-portal/pages/IncidentDetailGuestPage";
import GuestRoute from "../features/guest-portal/components/GuestRoute";
import BackofficeSandbox from "../features/backoffice/pages/BackofficeSandbox";
import LoginPage from "../features/auth/pages/LoginPage";
import BackofficeLayout from "../features/backoffice/components/ui/organisms/BackofficeLayout/BackofficeLayout";
import {
  BackofficeIndexPage,
  Placeholder,
} from "../features/backoffice/pages/BackofficePlaceholders.jsx";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import ProfilePage from "../features/backoffice/pages/ProfilePage/ProfilePage.jsx";
import NewIncidentPage from "../features/backoffice/pages/NewIncidentPage.jsx";
import LodgingsPage from "../features/backoffice/pages/LodgingsPage/LodgingsPage.jsx";
import IncidentDetailPage from "../features/backoffice/pages/IncidentDetailPage/IncidentDetailPage.jsx";
import UsersPage from "../features/backoffice/pages/UsersPage/UsersPage.jsx";
import GuestSandbox from "../features/guest-portal/pages/GuestSandbox";
import IncidentsListPage from "../features/backoffice/pages/IncidentsListPage/IncidentsListPage.jsx";

const router = createBrowserRouter([
  {
    element: <AppScope app="guest" />,
    children: [
      { path: "/", element: <IdentificationPage /> },
      {
        element: <GuestRoute />,
        children: [
          { path: "/alojamiento", element: <MyLodgingPage /> },
          { path: "/incidencias/nueva", element: <NewGuestIncidentPage /> },
          {
            path: "/incidencias/confirmacion/:code",
            element: <ConfirmationPage />,
          },
          { path: "/incidencias/:id", element: <IncidentDetailGuestPage /> },
        ],
      },
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
          {
            path: "/backoffice",
            element: <BackofficeLayout />,
            children: [
              { index: true, element: <BackofficeIndexPage /> },
              {
                path: "incidencias",
                element: <IncidentsListPage />,
              },
              { path: "incidencias/:id", element: <IncidentDetailPage /> },
              { path: "nueva-incidencia", element: <NewIncidentPage /> },
              { path: "alojamientos", element: <LodgingsPage /> },
              { path: "usuarios", element: <UsersPage /> },
              { path: "perfil", element: <ProfilePage /> },
            ],
          },
        ],
      },
      { path: "/sandbox/backoffice", element: <BackofficeSandbox /> },
    ],
  },
]);

export default router;