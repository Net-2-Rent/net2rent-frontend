import GradientBackground from '../GradientBackground/GradientBackground'
import Card from '../Card/Card'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
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