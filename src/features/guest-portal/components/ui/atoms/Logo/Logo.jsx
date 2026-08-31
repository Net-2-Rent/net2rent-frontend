import './Logo.scss'

export default function Logo({ className = '' }) {
  return (
    <div className={['logo', className].filter(Boolean).join(' ')}>
      <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="26" cy="26" r="10.5" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="11" cy="33" r="6" fill="currentColor" />
        <circle cx="40" cy="10" r="3.8" fill="none" stroke="currentColor" strokeWidth="3.4" />
      </svg>
      <span className="logo__label">net2rent</span>
    </div>
  )
}