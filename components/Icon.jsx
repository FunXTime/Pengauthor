const defaultClassName = "h-4 w-4";
const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

export default function Icon({
  name,
  className = ""
}) {
  const svgClassName = className || defaultClassName;

  switch (name) {
    case "overview":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 3.5c.5 0 1 .2 1.4.6l6.5 6.5c.8.8.8 2 0 2.8l-6.5 6.5c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6l-6.5-6.5c-.8-.8-.8-2 0-2.8l6.5-6.5c.4-.4.9-.6 1.4-.6Z" />
        </svg>
      );

    case "generate":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      );

    case "colorizer":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="M11 7 6 2" />
          <path d="M18.992 12H2.041" />
          <path d="M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" />
          <path d="m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" />
        </svg>
      );

    case "checkup":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="M16 5H3" />
          <path d="M16 12H3" />
          <path d="M11 19H3" />
          <path d="m15 18 2 2 4-4" />
        </svg>
      );

    case "arrowUpRight":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      );

    case "chevronDown":
      return (
        <svg
          className={className}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.47 6.47a.75.75 0 0 1 1.06 0L8 8.94l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06Z" />
        </svg>
      );

    case "plus":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );

    case "magicWand":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
          <path d="m14 7 3 3" />
          <path d="M5 6v4" />
          <path d="M19 14v4" />
          <path d="M10 2v2" />
          <path d="M7 8H3" />
          <path d="M21 16h-4" />
          <path d="M11 3H9" />
        </svg>
      );

    case "x":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );

    case "checkupHero":
      return (
        <svg
          className={className || "h-4 w-4"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7" />
          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
          <path d="M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z" />
        </svg>
      );

    case "notFound":
      return (
        <svg
          className={svgClassName}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <circle
            cx="11"
            cy="11"
            r="8"
          />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 7v4" />
          <path d="M11 15h.01" />
        </svg>
      );

    default:
      return null;
  }
}
