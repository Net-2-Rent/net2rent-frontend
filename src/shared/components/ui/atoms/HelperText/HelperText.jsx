import './HelperText.scss';

export default function HelperText({ id, children }) {
  return (
    <p id={id} className="helper-text">{children}</p>
  );
}