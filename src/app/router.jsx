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
import BackofficeLayout from "../features/backoffice/components/ui/organisms/BackofficeLayout/BackofficeLayout";
import {
  BackofficeIndexPage,
  Placeholder,
} from "../features/backoffice/pages/BackofficePlaceholders.jsx";

const router = createBrowserRouter([
  {
    element: <AppScope app="guest" />,
    children: [
      { path: "/", element: <IdentificationPage /> },
      { path: "/alojamiento", element: <MyLodgingPage /> },
      { path: "/incidencias/nueva", element: <NewGuestIncidentPage /> },
      {
        path: "/incidencias/confirmacion/:code",
        element: <ConfirmationPage />,
      },
      { path: "/incidencias/:id", element: <IncidentDetailGuestPage /> },
      { path: "/sandbox", element: <GuestSandbox /> },
    ],
  },
  {
  element: <AppScope app="backoffice" />,
  children: [
    { path: "/login", element: <LoginPage /> },
    {
      path: "/backoffice",
      element: <BackofficeLayout />,
      children: [
        { index: true, element: <BackofficeIndexPage /> },
        { path: "incidencias", element: <Placeholder title="Incidencias" /> },
        { path: "nueva-incidencia", element: <Placeholder /> },
        { path: "alojamientos", element: <Placeholder /> },
        { path: "usuarios", element: <Placeholder /> },
        { path: "perfil", element: <Placeholder /> },
      ],
    },
    { path: "/sandbox/backoffice", element: <BackofficeSandbox /> },
  ],
},
]);

export default router;
