import { forwardRef } from 'react';
import './TextField.scss';

const TextField = forwardRef(function TextField(
    { id, type = 'text', invalid = false, className = '', ...rest },
    ref,
) {
    const classes = ['text-field', invalid && 'text-field--invalid', className]
        .filter(Boolean)
        .join(' ');

    return (
        <input
            id={id}
            ref={ref}
            type={type}
            className={classes}
            aria-invalid={invalid || undefined}
            {...rest}
        />
    );
});

export default TextField;