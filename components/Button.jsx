import Icon from "@/components/Icon";
import Link from "next/link";

const variants = {
  default: [
    "bg-panel-raised text-ink",
    "border border-edge",
    "hover:bg-panel",
    "hover:border-edge-strong",
    "hover:scale-[1.01]",
    "active:scale-[1.02]",
    "focus-visible:scale-[1.02]"
  ].join(" "),

  danger: [
    "bg-panel-raised text-ink",
    "border border-edge-strong",
    "hover:bg-edge",
    "hover:border-red-400",
    "hover:text-red-400",
    "hover:scale-[1.01]",
    "active:scale-[1.02]",
    "focus-visible:scale-[1.02]"
  ].join(" "),
};

const sizes = {
  sm: "h-8 px-3 text-sm rounded-lg",
  md: "h-10 px-6 text-base rounded-xl",
  lg: "h-12 px-8 text-lg rounded-xl"
};

export default function Button({
  children,
  variant = "default",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
  target,
  rel,
  ...props
}) {
  const isDisabled = disabled || loading;
  const classes = [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "font-medium",
    "font-sans",
    "whitespace-nowrap",
    "select-none",
    "transition-all",
    "duration-100",
    "ease-out",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-accent",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-base",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    variants[variant] ?? variants.default,
    sizes[size] ?? sizes.md,
    fullWidth ? "w-full" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (icon && iconPosition === "left" && (
        <Icon
          name={icon}
          className="size-4 shrink-0"
        />
      ))}

      <span>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <Icon
          name={icon}
          aria-hidden="true"
          className="size-4 shrink-0"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`button ${classes}`}
        disabled={isDisabled}
        target={target}
        rel={rel}
        onClick={(event) => {
          if (isDisabled) event.preventDefault();
          else onClick?.(event);
        }}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </button>
  );
}
