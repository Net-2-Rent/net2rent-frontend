import './InlineError.scss';

export default function InlineError({ id, children }) {
  return (
    <p id={id} className="inline-error" role="alert">
      <span className="inline-error__icon" aria-hidden="true">!</span>
      <span>{children}</span>
    </p>
  );
}