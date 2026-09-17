import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../../../shared/components/ui/atoms/Button/Button.jsx";
import { useAuthStore } from "../../../auth/store/authStore.js";
import { NAV_BY_ROLE } from "../../../../shared/constants/nav.js";
import "./NotFoundPage.scss";
 
export default function NotFoundPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const items = NAV_BY_ROLE[user?.role] ?? [];
 
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);
 
  return (
    <div className="not-found-page">
      <div className="not-found-page__card">
        <img
          className="not-found-page__logo"
          src="/images/logo-r.png"
          alt="net2rent"
        />
 
        <p className="not-found-page__code">404</p>
        <h1 className="not-found-page__title">Esta página no existe</h1>
        <p className="not-found-page__subtitle">
          El enlace al que intentabas acceder no existe o fue movido. Tu
          sesión sigue activa.
        </p>
 
        <div className="not-found-page__actions">
          <Button variant="primary" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} aria-hidden="true" />
            Volver atrás
          </Button>
        </div>
 
        {items.length > 0 && (
          <div className="not-found-page__quick-links">
            <p className="not-found-page__quick-links-title">
              Accesos rápidos
            </p>
            <div className="not-found-page__quick-links-list">
              {items.map(({ key, label, icon: Icon, path }) => (
                <Link
                  key={key}
                  to={path}
                  className="not-found-page__quick-link"
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}