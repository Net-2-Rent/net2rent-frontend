import {
  ClipboardList,
  FilePlus,
  Home,
  User,
  Users,
} from 'lucide-react';

export const ROLES = {
  ADMIN: "ADMIN",
  COORDINATOR: "COORDINATOR",
  OPERATOR: "OPERATOR",
};

export const ALL_ROLES = "ALL";

export const ROLE_LABEL = {
  [ROLES.ADMIN]: "Administrador",
  [ROLES.COORDINATOR]: "Coordinador",
  [ROLES.OPERATOR]: "Operario",
};

export const ROLE_FILTER_OPTIONS = [
  { value: ALL_ROLES, label: "Todos" },
  { value: ROLES.ADMIN, label: ROLE_LABEL[ROLES.ADMIN] },
  { value: ROLES.COORDINATOR, label: ROLE_LABEL[ROLES.COORDINATOR] },
  { value: ROLES.OPERATOR, label: ROLE_LABEL[ROLES.OPERATOR] },
];

export const NAV_BY_ROLE = {
  [ROLES.ADMIN]: [
    { key: 'incidents',    label: 'Incidencias',      icon: ClipboardList, path: '/backoffice/incidencias',      subtitle: 'Listado operativo de mantenimiento' },
    { key: 'new-incident', label: 'Nueva incidencia', icon: FilePlus,      path: '/backoffice/nueva-incidencia', subtitle: 'Registro telefónico' },
    { key: 'lodgings',     label: 'Alojamientos',     icon: Home,          path: '/backoffice/alojamientos',     subtitle: 'Fichas, PINs y estado' },
    { key: 'users',        label: 'Usuarios',         icon: Users,         path: '/backoffice/usuarios',         subtitle: 'Cuentas de la empresa' },
    { key: 'profile',      label: 'Mi perfil',        icon: User,          path: '/backoffice/perfil',           subtitle: 'Datos de acceso' },
  ],
  [ROLES.COORDINATOR]: [
    { key: 'incidents',    label: 'Incidencias',      icon: ClipboardList, path: '/backoffice/incidencias',      subtitle: 'Listado operativo de mantenimiento' },
    { key: 'new-incident', label: 'Nueva incidencia', icon: FilePlus,      path: '/backoffice/nueva-incidencia', subtitle: 'Registro telefónico' },
    { key: 'lodgings',     label: 'Alojamientos',     icon: Home,          path: '/backoffice/alojamientos',     subtitle: 'Fichas, PINs y estado' },
    { key: 'profile',      label: 'Mi perfil',        icon: User,          path: '/backoffice/perfil',           subtitle: 'Datos de acceso' },
  ],
  [ROLES.OPERATOR]: [
    { key: 'incidents', label: 'Incidencias', icon: ClipboardList, path: '/backoffice/incidencias', subtitle: 'Listado operativo de mantenimiento' },
    { key: 'profile',   label: 'Mi perfil',   icon: User,          path: '/backoffice/perfil',      subtitle: 'Datos de acceso' },
  ],
};