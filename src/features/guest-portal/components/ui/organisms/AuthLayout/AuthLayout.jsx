import GradientBackground from '../../atoms/GradientBackground/GradientBackground'
import Card from '../../atoms/Card/Card'
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle'
import './AuthLayout.scss'
import Logo from '../../atoms/Logo/Logo'

export default function AuthLayout({ children }) {
  return (
    <GradientBackground className="auth-layout">
      <ThemeToggle />
      <Logo className="auth-layout__logo" />
      <Card variant="auth" className="auth-layout__card">
        {children}
      </Card>
    </GradientBackground>
  )
}