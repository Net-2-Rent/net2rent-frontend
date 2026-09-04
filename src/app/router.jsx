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
import { BackofficeIndexPage, Placeholder } from "../features/backoffice/pages/BackofficePlaceholders.jsx";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import ProfilePage from "../features/backoffice/pages/ProfilePage/ProfilePage.jsx";
import NewIncidentPage from "../features/backoffice/pages/NewIncidentPage.jsx";

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
                element: <Placeholder title="Incidencias" />,
              },
              { path: "nueva-incidencia", element: <NewIncidentPage /> },
              { path: "alojamientos", element: <Placeholder /> },
              { path: "usuarios", element: <Placeholder /> },
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