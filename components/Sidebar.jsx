"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { DEFAULT_NOTE_HASH } from "@/config";
import packageData from "../package.json";

export default function Sidebar({ pages }) {
  const { LISTED_PAGES, EXTERNAL_PAGES } = pages;
  const pathname = usePathname();
  const version = packageData.version;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Access the Pengauthor utility at this link.",
          url: window.location.href,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-panel-raised text-ink shadow-lg transition-all hover:bg-panel-hover lg:hidden"
      >
        <Icon name="sidebar" />
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-56 max-w-[calc(100vw-1rem)] shrink-0 flex-col overflow-hidden border-r border-edge bg-[#0d0d0d] select-none transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="relative overflow-hidden border-b border-edge px-5 py-5"
          style={{
            background: "radial-gradient(circle at top center, rgba(255, 140, 0, 0.15), transparent 70%)",
          }}
        >
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-akira text-lg tracking-wide text-ink">
                Pengauthor
              </p>
              <p className="mt-1 break-words text-xs font-burbank">
                Built for CPA's Reporting Team
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-panel-raised lg:hidden"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {LISTED_PAGES.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex min-w-0 items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all ${isActive
                      ? "bg-panel-raised text-ink"
                      : "hover:bg-panel-raised hover:text-ink"}`}
                  >
                    <Icon name={item.icon} />
                    <span className="min-w-0 break-words">{item.label}</span>
                  </Link>
                </li>
              );
            })}
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
                  <span className="min-w-0 break-words">{item.label}</span>
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
                    href={`/note/${DEFAULT_NOTE_HASH}`}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all ${
                      isActive
                        ? "bg-panel-raised text-ink"
                        : "hover:bg-panel-raised hover:text-ink"
                    }`}
                  >
                    <Icon name="share" />
                    <span className="min-w-0 break-words">Share a note</span>
                  </Link>
                );
              })()}
            </li>

            <li>
              <button
                type="button"
                onClick={handleShare}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-all hover:bg-panel-raised hover:text-ink"
              >
                <Icon name="share" />
                <span className="min-w-0 break-words">Share this page</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="shrink-0 border-t border-edge px-5 py-4 text-xs">
          <p>
            <strong>Dashboard curated by</strong>
          </p>
          <p>Editor-in-Chief Fun X Time</p>
          <p>
            <a
              href="https://github.com/FunXTime/Pengauthor/commits/main/"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all"
            >
              Version {version}
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
