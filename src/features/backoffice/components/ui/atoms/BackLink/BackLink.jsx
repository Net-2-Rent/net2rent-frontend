import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './BackLink.scss';

export default function BackLink({
    to,
    onClick,
    children = 'Volver',
    className = '',
    ...rest
}) {
    const classes = ['back-link', className].filter(Boolean).join(' ');

    const content = (
        <>
            <ArrowLeft size={18} aria-hidden="true" />
            <span>{children}</span>
        </>
    );

    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" className={classes} onClick={onClick} {...rest}>
            {content}
        </button>
    );
}