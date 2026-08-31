import {
  ClipboardList,
  FilePlus,
  Home,
  User,
  Users,
} from 'lucide-react';

export const ROLES = {
  ADMIN: 'ADMIN',
  COORDINATOR: 'COORDINATOR',
  OPERATOR: 'OPERATOR',
};

export const ROLE_LABEL = {
  [ROLES.ADMIN]: 'Administrador',
  [ROLES.COORDINATOR]: 'Coordinador',
  [ROLES.OPERATOR]: 'Operario',
};

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