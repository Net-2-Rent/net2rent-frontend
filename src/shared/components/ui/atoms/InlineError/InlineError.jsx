import "./InlineError.scss";

export default function InlineError({ children }) {
  return (
    <p className="inline-error" role="alert">
      {children}
    </p>
  );
}
