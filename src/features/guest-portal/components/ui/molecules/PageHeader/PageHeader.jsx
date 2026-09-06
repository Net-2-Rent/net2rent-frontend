import { ArrowLeft } from 'lucide-react'
import './PageHeader.scss'

export default function PageHeader({ backLabel, onBack, eyebrow, title, reference }) {
  return (
    <header className="page-header">
      {onBack && (
        <button type="button" className="page-header__back" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          {backLabel}
        </button>
      )}
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {reference && (
        <p className="page-header__reference">
          Referencia <span className="page-header__reference-value">{reference}</span>
        </p>
      )}
    </header>
  )
}