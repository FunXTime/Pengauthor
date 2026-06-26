export default function Icon({ name, className = "" }) {
  switch (name) {
    case "overview":
      return (
        <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3.5c.5 0 1 .2 1.4.6l6.5 6.5c.8.8.8 2 0 2.8l-6.5 6.5c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6l-6.5-6.5c-.8-.8-.8-2 0-2.8l6.5-6.5c.4-.4.9-.6 1.4-.6Z" />
        </svg>
      );

    case "generate":
      return (
        <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      );

    case "chevronDown":
      return (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          className={className}
        >
          <path d="M4.47 6.47a.75.75 0 0 1 1.06 0L8 8.94l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06Z" />
        </svg>
      );

    case "plus":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className || "h-4 w-4"}
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );

    case "magicWand":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className || "h-4 w-4"}
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
          className={className || "h-4 w-4"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );

    default:
      return null;
  }
}