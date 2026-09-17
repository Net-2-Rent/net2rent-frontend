import './Logo.scss'

export default function Logo({ className = '' }) {
  return (
    <div className={['logo', className].filter(Boolean).join(' ')}>
      <img src="/images/logo-r.png" alt="net2rent" className="logo__image" />
    </div>
  )
}