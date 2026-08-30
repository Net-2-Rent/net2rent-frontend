import { Info } from 'lucide-react';
import './NoticeBox.scss';

export default function NoticeBox({ children, className = '' }) {
    const classes = ['notice-box', className].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <Info className="notice-box__icon" size={18} aria-hidden="true" />
            <p className="notice-box__text">{children}</p>
        </div>
    );
}