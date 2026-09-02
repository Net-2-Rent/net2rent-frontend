import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar.jsx";
import StickyHero from "../StickyHero/StickyHero.jsx";
import { useAuthStore } from "../../../../../auth/store/authStore.js";
import {
  getInitialTheme,
  setTheme,
} from "../../../../../../shared/utils/theme.js";
import { NAV_BY_ROLE } from "../../../../../../shared/constants/nav.js";
import "./BackofficeLayout.scss";

const ROUTE_TO_KEY = {
  "/backoffice": "incidents",
  "/backoffice/incidencias": "incidents",
  "/backoffice/nueva-incidencia": "new-incident",
  "/backoffice/alojamientos": "lodgings",
  "/backoffice/usuarios": "users",
  "/backoffice/perfil": "profile",
};

const KEY_TO_PATH = Object.values(NAV_BY_ROLE)
  .flat()
  .reduce((acc, item) => {
    if (!(item.key in acc)) acc[item.key] = item.path;
    return acc;
  }, {});

export default function BackofficeLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setThemeState] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = NAV_BY_ROLE[user.role] || [];
  const activeKey = ROUTE_TO_KEY[location.pathname] ?? "";
  const activeItem = items.find((i) => i.key === activeKey);

  const userName = `${user.firstName} ${user.lastName}`.trim();

  // MOCK: sustituir por el nº real de incidencias nuevas cuando exista la API
  const newIncidentsCount = 2;

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  }

  function handleSelect(key) {
    const path = KEY_TO_PATH[key];
    if (path) navigate(path);
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="backoffice-layout">
      <SideBar
        role={user.role}
        activeItem={activeKey}
        onSelect={handleSelect}
        userName={userName}
        onLogout={handleLogout}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        newIncidentsCount={newIncidentsCount}
      />
      <div className="backoffice-layout__main">
        <StickyHero
          title={activeItem?.label ?? ""}
          subtitle={activeItem?.subtitle ?? ""}
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuClick={() => setMenuOpen(true)}
        />
        <main className="backoffice-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}