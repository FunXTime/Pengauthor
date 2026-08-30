const defaultClassName = "h-4 w-4 inline-block align-middle";
const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

function IconSVG({ name, className = "", variable }) {
  const svgClassName = `${defaultClassName} ${className}`.trim();

  switch (name) {
    case "sidebar":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </svg>
      );

    case "overview":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" />
        </svg>
      );

    case "guide":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M12 7v14" />
          <path d="M16 12h2" />
          <path d="M16 8h2" />
          <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
          <path d="M6 12h2" />
          <path d="M6 8h2" />
        </svg>
      );

    case "generate":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      );

    case "research":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M11 22H5.5a1 1 0 0 1 0-5h4.501" />
          <path d="m21 22-1.879-1.878" />
          <path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" />
          <circle cx="17" cy="18" r="3" />
        </svg>
      );

    case "refine":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="m6 16 6-12 6 12" />
          <path d="M8 12h8" />
          <path d="m16 20 2 2 4-4" />
        </svg>
      );

    case "colorize":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M11 7 6 2" />
          <path d="M18.992 12H2.041" />
          <path d="M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" />
          <path d="m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" />
        </svg>
      );

    case "checkup":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M16 5H3" />
          <path d="M16 12H3" />
          <path d="M11 19H3" />
          <path d="m15 18 2 2 4-4" />
        </svg>
      );

    case "spotTheError":
      return (
        <svg
          className={className || "h-4 w-4"}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="M17 3h4v4" />
          <path d="M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17" />
          <path d="M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05" />
          <path d="M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z" />
          <path d="M9.707 14.293 21 3" />
        </svg>
      );

    case "calculateScore":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <line x1="19" x2="5" y1="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );

    case "arrowUpRight":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      );

    case "share":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="m15 17 5-5-5-5" />
          <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
        </svg>
      );

    case "info":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );

    case "warning":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );

    case "danger":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="m15 9-6 6" />
          <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
          <path d="m9 9 6 6" />
        </svg>
      );

    case "success":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );

    case "options":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M10 8h4" />
          <path d="M12 21v-9" />
          <path d="M12 8V3" />
          <path d="M17 16h4" />
          <path d="M19 12V3" />
          <path d="M19 21v-5" />
          <path d="M3 14h4" />
          <path d="M5 10V3" />
          <path d="M5 21v-7" />
        </svg>
      );

    case "chevronDown":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M6.705 9.705a1.125 1.125 0 0 1 1.59 0L12 13.41l3.705-3.705a1.125 1.125 0 1 1 1.59 1.59l-4.5 4.5a1.125 1.125 0 0 1-1.59 0l-4.5-4.5a1.125 1.125 0 0 1 0-1.59Z" />
        </svg>
      );

    case "thumbnail":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      );

    case "interview":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
        </svg>
      );

    case "plus":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );

    case "magicWand":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
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
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );

    case "tag":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      );

    case "checkupHero":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7" />
          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
          <path d="M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z" />
        </svg>
      );

    case "numberedCircle":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <text x="12" y="12" textAnchor="middle" dominantBaseline="central" stroke="none" fill="currentColor" fontSize={String(variable).length > 1 ? "9" : "12"} fontWeight="900">
            {variable}
          </text>
        </svg>
      );

    case "checkedCircle":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      );

    case "search":
      return (
        <svg
          className={className || "h-4 w-4"}
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      );

    case "researchHero":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M10 10h4" />
          <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
          <path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" />
          <path d="M22 16H2" />
          <path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" />
          <path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
        </svg>
      );

     case "researchLoading":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <circle cx="12" cy="12" r="3" />
          <path d="m16 16-1.9-1.9" />
        </svg>
      );

    case "fontawesome":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path fill="#3659e9" d="M4.3 4.5c.7-.4 1.2-1.2 1.2-2.1C5.5 1.1 4.4 0 3 0S.5 1.1.5 2.4c0 .8.4 1.5 1 2v14.6H4v-2.7h18.1c.8 0 1.4-.6 1.4-1.4 0-.2 0-.4-.1-.6l-2.8-5.7 2.8-5.7c.1-.2.1-.4.1-.6 0-.8-.6-1.4-1.4-1.4H4.3z" />
        </svg>
      );

    case "clock":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );

    case "copy":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v10" />
        </svg>
      );

    case "publish":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="m15 6 2 2 4-4" />
          <path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" />
        </svg>
      );

    case "pictureInPicture":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M2 10h6V4" />
          <path d="m2 4 6 6" />
          <path d="M21 10V7a2 2 0 0 0-2-2h-7" />
          <path d="M3 14v2a2 2 0 0 0 2 2h3" />
          <rect x="12" y="14" width="10" height="7" rx="1" />
        </svg>
      );

    case "invalidNote":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M15 3v5a1 1 0 0 0 1 1h5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          <path d="m16 16 5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          <path d="M21 12V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          <path d="m21 16-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      );

    case "disconnected":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <path d="M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643" />
          <path d="M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929" />
          <path d="M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687" />
          <path d="M17.656 12H22" />
          <path d="M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45" />
          <path d="M2 12h10" />
          <path d="m2 2 20 20" />
        </svg>
      );

    case "notFound":
      return (
        <svg className={svgClassName} viewBox="0 0 24 24" {...svgProps}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 7v4" />
          <path d="M11 15h.01" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Icon(props) {
  if (props.inline == true) return (
    <span className="inline-flex items-center leading-none">
      <IconSVG {...props} className="inline-block align-middle translate-y-[3px]" />
    </span>
  );
  else return (
    <IconSVG {...props} />
  );
}
