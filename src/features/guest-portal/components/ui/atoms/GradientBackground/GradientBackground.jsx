import './GradientBackground.scss'

export default function GradientBackground({
  children,
  fullHeight = true,
  className = '',
  ...rest
}) {
  const classes = [
    'gradient-background',
    fullHeight && 'gradient-background--full-height',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}