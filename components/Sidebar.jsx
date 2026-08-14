"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { usePathname } from "next/navigation";
import { DEFAULT_NOTE_HASH } from "@/config";
import packageData from "../package.json";

export default function Sidebar({ pages }) {
  const { LISTED_PAGES, EXTERNAL_PAGES } = pages;
  const pathname = usePathname();
  const version = packageData.version;

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
    <aside className="flex h-screen w-56 shrink-0 flex-col overflow-y-auto border-r border-edge bg-[#0d0d0d] select-none">
      <div
        className="relative overflow-hidden border-b border-edge px-5 py-5"
        style={{
          background: "radial-gradient(circle at top center, rgba(255, 140, 0, 0.15), transparent 70%)"
        }}
      >
        <p className="font-akira text-lg tracking-wide text-ink">
          Pengauthor
        </p>
        <p className="mt-1 text-xs font-burbank">
          Built for CPA's Reporting Team
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {LISTED_PAGES.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all ${
                  isActive
                    ? "bg-panel-raised text-ink"
                    : "hover:bg-panel-raised hover:text-ink"
                }`}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            </li>
          )})}
        </ul>
        <hr className="my-3 border-edge" />
        <ul className="space-y-1">
          {EXTERNAL_PAGES.map((item) => (
            <li key={item.href + item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all hover:bg-panel-raised hover:text-ink"
              >
                <Icon name="arrowUpRight" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <hr className="my-3 border-edge" />
        <ul className="space-y-1">
          <li>
            {(() => {
              const isActive = pathname === "/note" || pathname.startsWith("/note/");
              return (
                <Link
                  type="button"
                  href={`/note/${DEFAULT_NOTE_HASH}`}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all ${isActive
                      ? "bg-panel-raised text-ink"
                      : "hover:bg-panel-raised hover:text-ink"}`}
                >
                  <Icon name="share" />
                  <span>Share a note</span>
                </Link>
              );
            })()}
          </li>

          <li>
            <button
              type="button"
              onClick={handleClick}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all hover:bg-panel-raised hover:text-ink"
            >
              <Icon name="share" />
              <span>Share this page</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="border-t border-edge px-5 py-4 text-xs">
        <p><strong>Dashboard curated by</strong></p>
        <p>Editor-in-Chief Fun X Time</p>
        <p><a href="https://github.com/FunXTime/Pengauthor/commits/main/" target="_blank">Version {version}</a></p>
      </div>
    </aside>
  );
}
