"use client";

import Icon from "@/components/Icon";

const TYPES = {
  INFO: {
    icon: "info",
    border: "border-sky-500/40",
    background: "bg-sky-500/10",
    text: "text-sky-100"
  },
  SUCCESS: {
    icon: "success",
    border: "border-emerald-500/40",
    background: "bg-emerald-500/10",
    text: "text-emerald-100"
  },
  WARNING: {
    icon: "warning",
    border: "border-amber-500/40",
    background: "bg-amber-500/10",
    text: "text-amber-100"
  },
  DANGER: {
    icon: "danger",
    border: "border-red-500/40",
    background: "bg-red-500/10",
    text: "text-red-100"
  }
};

export default function Infobox({ type = "INFO", text }) {
  const style = TYPES[type] ?? TYPES.INFO;

  return (
    <div
      className={[
        "flex w-full items-start gap-4 rounded-xl border px-4 py-3",
        style.border,
        style.background,
        style.text
      ].join(" ")}
    >
      <Icon
        name={style.icon}
        className="mt-0.5 h-5 w-5 shrink-0"
      />

      <p className="text-sm leading-6">
        {text}
      </p>
    </div>
  );
}
