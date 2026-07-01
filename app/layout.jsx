import localFont from "next/font/local";
import Link from "next/link";
import Icon from "@/components/Icon";
import ShareButton from "@/components/ShareButton";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const syne = localFont({
  src: "../fonts/Syne.ttf",
  variable: "--font-syne",
  display: "swap"
});

const inter = localFont({
  src: "../fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap"
});

const akira = localFont({
  src: "../fonts/AkiraExpanded-SuperBold.ttf",
  variable: "--font-akira-expanded",
  display: "swap"
});

const siteURL = "https://cpa-pengauthor.vercel.app";

export const metadata = {
  title: "Pengauthor",
  description: "CPA Media Department's premier writing tool",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icons/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/icons/favicon.ico"
  },
  openGraph: {
    title: "Pengauthor",
    description: "CPA Media Department's premier writing tool! Built for Reporters at Club Penguin Armies, you can create, research, and refine using Pengauthor.",
    url: siteURL,
    siteName: "CPA Media Department",
    images: [
      {
        url: "/icons/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Pengauthor logo",
      },
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary"
  },
  metadataBase: new URL(siteURL)
};

const LISTED_PAGES = [
  { label: "Overview", href: "/overview", icon: "overview" },
  { label: "Generate", href: "/generate", icon: "generate" },
  { label: "Research", href: "/research", icon: "research" },
  { label: "Colorize", href: "/colorize", icon: "colorize" },
  { label: "Checkup", href: "/checkup", icon: "checkup" }
];

const EXTERNAL_PAGES = [
  { label: "Website", href: "https://cparmies.org/" },
  { label: "Posts Dashboard", href: "https://cparmies.org/wp-admin/edit.php" },
  { label: "Add New Post", href: "https://cparmies.org/wp-admin/post-new.php?post_title=Untitled+Post&content=Replace+this+paragraph+with+real+content.+Try+using+Pengauthor%27s+boilerplate+generator%21" },
  { label: "Reporting Guide", href: "https://cparmies.org/reporting-guide" },
  { label: "References", href: "https://docs.google.com/spreadsheets/d/1SlH7i96flqBZwUM7CM1hj5MjzTLiTeuAtyTEfyJX_fA/edit?usp=sharing" }
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

              <hr className="my-3 border-edge" />

              <ul className="space-y-1">
                {EXTERNAL_PAGES.map((item) => (
                  <li key={item.href + item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-faint transition-all hover:bg-panel-raised hover:text-ink"
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
                  <ShareButton />
                </li>
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

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
