"use client";

import { useEffect } from "react";

export default function GlobalShortcuts() {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "F1") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (
          target.closest(".monaco-editor") ||
          target.matches("input, textarea, [contenteditable='true']")
        )
      ) return;
      event.preventDefault();
      window.open("https://cparmies.org/reporting-guide", "_blank", "noopener,noreferrer");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
