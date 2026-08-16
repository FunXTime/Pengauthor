"use client";

import { useEffect, useState } from "react";
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

let toastHandler = null;

export function showToast(
  message,
  type = "INFO",
  icon,
  timeout
) {
  toastHandler?.({
    message,
    type,
    icon,
    timeout
  });
}

export function hideToast() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("toast-hide")
  );
}

export function Toast({
  children,
  type = "INFO",
  hidden = false,
  icon
}) {
  const [toast, setToast] = useState(null);
  const [dismissed, setDismissed] = useState(hidden);

  useEffect(() => {
    toastHandler = setToast;
    return () => toastHandler = null;
  }, []);

  useEffect(() => {
    if (!toast) return;
    setDismissed(false);
    if (toast.timeout === undefined) return;
    const timer = setTimeout(
      () => setDismissed(true),
      toast.timeout
    );
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setDismissed(hidden);
  }, [hidden]);

  useEffect(() => {
    function handleToast(event) {
      setToast(event.detail);
      setDismissed(false);
    }
    function handleHideToast() {
      setDismissed(true);
    }
    window.addEventListener("toast", handleToast);
    window.addEventListener("toast-hide", handleHideToast);
    return () => {
      window.removeEventListener("toast", handleToast);
      window.removeEventListener("toast-hide", handleHideToast);
    };
  }, []);

  const activeType = toast?.type ?? type;
  const selectedType = TYPES[activeType] ?? TYPES.INFO;
  const activeIcon = toast?.icon ?? icon ?? selectedType.icon;
  const content = toast?.message ?? children;

  if (dismissed || !content) return null;

  return (
    <div
      onClick={() => setDismissed(true)}
      className={`fixed bottom-5 right-5 z-50 flex min-h-12 w-[calc(100vw/3)] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${selectedType.border} ${selectedType.background} ${selectedType.text}`}
    >
      <Icon
        name={activeIcon}
        className="h-5 w-5 shrink-0"
      />
      <div className="min-w-0 flex-1">
        {content}
      </div>
    </div>
  );
}
