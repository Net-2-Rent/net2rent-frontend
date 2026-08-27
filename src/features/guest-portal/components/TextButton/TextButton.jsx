import { Link } from 'react-router-dom';
import './TextButton.scss';

export default function TextButton({
                                       children,
                                       to,
                                       type = 'button',
                                       className = '',
                                       ...rest
                                   }) {
    const classes = ['text-button', className].filter(Boolean).join(' ');

    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} {...rest}>
            {children}
        </button>
    );
}