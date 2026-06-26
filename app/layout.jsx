import localFont from "next/font/local";
import Link from "next/link";
import Icon from "@/components/Icon";
import "./globals.css";

const syne = localFont({
  src: "../fonts/Syne.ttf",
  variable: "--font-syne",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
});

const akira = localFont({
  src: "../fonts/AkiraExpanded-SuperBold.ttf",
  variable: "--font-akira-expanded",
  display: "swap",
});

export const metadata = {
  title: "Pengauthor",
  description: "Internal writing tools for the CPA Reporting Team",
};

const LISTED_PAGES = [
  {
    label: "Overview",
    href: "/overview",
    icon: "overview",
  },
  {
    label: "Generate",
    href: "/generate",
    icon: "generate",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} ${akira.variable} antialiased`}>
        <div className="flex h-screen overflow-hidden bg-base">
          <aside className="flex w-56 flex-col border-r border-edge bg-[#0d0d0d] select-none">

            <div className="border-b border-edge px-5 py-5">
              <p className="font-akira text-lg font-semibold tracking-wide text-ink">
                Pengauthor
              </p>
              <p className="mt-1 text-xs text-faint">Built for CPA's Reporting Team</p>
            </div>

            <nav className="flex-1 px-3 py-4">
              <ul className="space-y-1">
                {LISTED_PAGES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-faint transition-all hover:bg-panel-raised hover:text-ink"
                    >
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-edge px-5 py-4">
              <b className="text-xs text-faint">Dashboard curated by</b>
              <p className="text-xs text-faint">Editor-in-Chief Fun X Time</p>
            </div>

          </aside>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}