export default function Tooltip({
  text,
  children
}) {
  return (
    <div className="tooltip">
      {children}

      <span className="tooltipText">
        {text}
      </span>
    </div>
  );
}