import './Card.scss';

export default function Card({ children, variant = 'content', className = '', ...rest }) {
  const classes = ['card', `card--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}