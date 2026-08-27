import './FormField.scss';

export default function FormField({
                                      id,
                                      label,
                                      error,
                                      optional = false,
                                      hint,
                                      counter,
                                      children,
                                  }) {
    return (
        <div className="form-field">
            <label className="form-field__label" htmlFor={id}>
                {label}
                {optional && <span className="form-field__optional"> (opcional)</span>}
            </label>

            {children}

            <div className="form-field__footer">
                {error ? (
                    <p className="form-field__error" id={`${id}-error`} role="alert">
                        {error}
                    </p>
                ) : (
                    hint && (
                        <p className="form-field__hint" id={`${id}-hint`}>
                            {hint}
                        </p>
                    )
                )}
                {counter != null && (
                    <span className="form-field__counter">{counter}</span>
                )}
            </div>
        </div>
    );
}