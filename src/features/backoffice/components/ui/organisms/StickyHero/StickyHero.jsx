import { Menu, Moon, Sun } from 'lucide-react';
import './StickyHero.scss';

export default function StickyHero({
  title, subtitle, theme, onToggleTheme, onMenuClick, className = '',
}) {
  const isDark = theme === 'dark';

  return (
    <header className={['sticky-hero', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="sticky-hero__menu"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <div className='sticky-hero__textcontainer'>
      <h1 className="sticky-hero__title">{title}</h1>
      <p className='sticky-hero__subtitle'>{subtitle}</p>
      </div>

      <button
        type="button"
        className="sticky-hero__theme"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      >
        {isDark
          ? <Sun size={18} aria-hidden="true" />
          : <Moon size={18} aria-hidden="true" />}
      </button>
    </header>
  );
}