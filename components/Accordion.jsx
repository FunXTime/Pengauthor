"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export default function Accordion({
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-panel">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-panel-raised"
      >
        <span className="font-semibold select-none">
          {title}
        </span>
        <Icon
          name="chevronDown"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-edge px-4 py-3 text-sm leading-6">
          {children}
        </div>
      )}
    </div>
  );
}
