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
    { key: 'incidents',    label: 'Incidencias',      icon: ClipboardList },
    { key: 'new-incident', label: 'Nueva incidencia', icon: FilePlus },
    { key: 'lodgings',     label: 'Alojamientos',     icon: Home },
    { key: 'users',        label: 'Usuarios',         icon: Users },
    { key: 'profile',      label: 'Mi perfil',        icon: User },
  ],
  [ROLES.COORDINATOR]: [
    { key: 'incidents',    label: 'Incidencias',      icon: ClipboardList },
    { key: 'new-incident', label: 'Nueva incidencia', icon: FilePlus },
    { key: 'lodgings',     label: 'Alojamientos',     icon: Home },
    { key: 'profile',      label: 'Mi perfil',        icon: User },
  ],
  [ROLES.OPERATOR]: [
    { key: 'incidents', label: 'Incidencias', icon: ClipboardList },
    { key: 'profile',   label: 'Mi perfil',   icon: User },
  ],
};