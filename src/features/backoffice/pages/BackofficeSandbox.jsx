//página de desarrollo - ELIMINAR ANTES DE ENTREGA

import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../../shared/components/ui/atoms/StatusBadge/StatusBadge.jsx';
import { INCIDENT_STATUS } from '../../../shared/constants/incidentStatus.js';
import { getInitialTheme, setTheme } from '../../../shared/utils/theme.js';

/* Helpers de la sandbox                                               */

function DemoSection({ title, children }) {
  return (
    <section style={{ margin: '0 0 2rem' }}>
      <h2 style={{
        fontSize: '13px',
        fontWeight: 800,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        margin: '0 0 .75rem',
      }}>
        {title}
      </h2>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {children}
      </div>
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span style={{
        width: '120px',
        flex: 'none',
        fontSize: '12px',
        color: 'var(--color-text-muted)',
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

/* Sandbox                                                             */

export default function BackofficeSandbox() {
    const [theme, setThemeState] = useState(getInitialTheme);

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark';
        setThemeState(next);
        setTheme(next);
    }

  return (
    <main style={{
      width: '100%',
      maxWidth: 'var(--layout-content-max)',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 2rem',
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Sandbox · Backoffice</h1>
          <p style={{ margin: '.25rem 0 0', color: 'var(--color-text-muted)' }}>
            <code>data-app="backoffice"</code> ·{' '}
            <Link to="/sandbox">Sandbox guest</Link>
          </p>
        </div>

          <button
              onClick={toggleTheme}
              style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-field)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-strong)',
                  color: 'var(--color-text-strong)',
                  cursor: 'pointer',
              }}
          >
              Tema: {theme}
          </button>
      </header>

      <DemoSection title="StatusBadge · compartido">
        <Row label="Estados">
          {Object.values(INCIDENT_STATUS).map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </Row>
        <Row label="Fuera de rango">
          <StatusBadge status="INVENTADO" />
        </Row>
      </DemoSection>
    </main>
  );
}