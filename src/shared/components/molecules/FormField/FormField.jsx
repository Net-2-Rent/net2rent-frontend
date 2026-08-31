import { Children, cloneElement, isValidElement } from 'react';
import InlineError from '../../../../shared/components/atoms/InlineError/InlineError';
import HelperText from '../../../../shared/components/atoms/HelperText/HelperText';
import './FormField.scss';

export default function FormField({
  id,
  label,
  error,
  helper,
  required = false,
  className = '',
  children,
}) {
  const fieldId = id;
  const messageId = error || helper ? `${fieldId}-message` : undefined;

  const control = Children.only(children);
  const decorated = isValidElement(control)
    ? cloneElement(control, {
        id: fieldId,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': messageId,
      })
    : control;

  const classes = ['form-field', error ? 'form-field--error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className="form-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="form-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <div className="form-field__control">{decorated}</div>
      {error ? (
        <InlineError id={messageId}>{error}</InlineError>
      ) : helper ? (
        <HelperText id={messageId}>{helper}</HelperText>
      ) : null}
    </div>
  );
}