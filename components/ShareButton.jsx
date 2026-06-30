"use client";

import Icon from "@/components/Icon";

export default function ShareButton() {
  async function handleClick() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Access the Pengauthor utility at this link.",
          url: window.location.href
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <a
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-faint transition-all hover:bg-panel-raised hover:text-ink cursor-pointer"
    >
      <Icon name="share" />
      <span>Share this site</span>
    </a>
  );
}