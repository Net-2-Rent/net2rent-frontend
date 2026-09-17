import { forwardRef } from 'react';
import './TextArea.scss';

const TextArea = forwardRef(function TextArea(
    { id, rows = 5, invalid = false, className = '', ...rest },
    ref,
) {
    const classes = ['text-area', invalid && 'text-area--invalid', className]
        .filter(Boolean)
        .join(' ');

    return (
        <textarea
            id={id}
            ref={ref}
            rows={rows}
            className={classes}
            aria-invalid={invalid || undefined}
            {...rest}
        />
    );
});

export default TextArea;