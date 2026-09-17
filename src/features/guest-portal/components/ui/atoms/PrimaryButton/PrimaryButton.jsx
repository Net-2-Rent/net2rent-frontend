import './PrimaryButton.scss'

export default function PrimaryButton({
                                          children,
                                          type = 'button',
                                          isLoading = false,
                                          disabled = false,
                                          className = '',
                                          ...rest
                                      }) {
    const isBlocked = disabled || isLoading

    const classes = [
        'primary-button',
        isLoading && 'primary-button--loading',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            type={type}
            className={classes}
            disabled={isBlocked}
            aria-busy={isLoading || undefined}
            {...rest}
        >
            {isLoading && <span className="primary-button__spinner" aria-hidden="true" />}
            <span className="primary-button__label">{children}</span>
        </button>
    )
}