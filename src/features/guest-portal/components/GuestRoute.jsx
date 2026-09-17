import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGuestAuthStore, selectIsGuestAuthenticated } from '../store/guestAuthStore.js';

export default function GuestRoute() {
  const isAuthenticated = useGuestAuthStore(selectIsGuestAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
}