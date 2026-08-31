import GradientBackground from '../../atoms/GradientBackground/GradientBackground'
import Card from '../../atoms/Card/Card'
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle'
import './AuthLayout.scss'

export default function AuthLayout({ children }) {
  return (
    <GradientBackground className="auth-layout">
      <ThemeToggle />
      <Card variant="auth" className="auth-layout__card">
        {children}
      </Card>
    </GradientBackground>
  )
}