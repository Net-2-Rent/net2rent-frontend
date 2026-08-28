import GradientBackground from '../../atoms/GradientBackground/GradientBackground'
import Card from '../../atoms/Card/Card'
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle'
import './ContentLayout.scss'

export default function ContentLayout({ header, children }) {
  return (
    <div className="content-layout">
      <GradientBackground fullHeight={false} className="content-layout__header">
        <ThemeToggle />
        <div className="content-layout__header-inner">{header}</div>
      </GradientBackground>

      <div className="content-layout__body">
        <Card variant="content">{children}</Card>
      </div>
    </div>
  )
}