import localFont from "next/font/local";
import Sidebar from "@/components/Sidebar";
import { GlobalShortcuts, Telemetry, Ping, GlobalToast } from "@/components/global";
import "./globals.css";

const syne = localFont({
  src: "../public/fonts/Syne.ttf",
  variable: "--font-syne",
  display: "swap"
});

const inter = localFont({
  src: "../public/fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap"
});

const akira = localFont({
  src: "../public/fonts/AkiraExpanded-SuperBold.ttf",
  variable: "--font-akira-expanded",
  display: "swap"
});

const burbank = localFont({
  src: [
    {
      path: "../public/fonts/BurbankSmall-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/BurbankSmall-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-burbank",
});

const dashicons = localFont({
  src: "../public/fonts/dashicons.woff2",
  variable: "--font-dashicons",
  display: "swap"
});

const siteURL = "https://cpa-pengauthor.vercel.app";

export const viewport = {
  themeColor: "#ff6900"
};

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
  { label: "Guide", href: "/guide", icon: "guide" },
  { label: "Generate", href: "/generate", icon: "generate" },
  { label: "Research", href: "/research", icon: "research" },
  { label: "Refine", href: "/refine", icon: "refine" },
  { label: "Colorize", href: "/colorize", icon: "colorize" },
  { label: "Post Checkup", href: "/checkup", icon: "checkup" },
  { label: "Spot The Error", href: "/spot-the-error", icon: "spotTheError" },
  { label: "Score Calculator", href: "/calculate-score", icon: "calculateScore" }
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
      <body className={`${syne.variable} ${inter.variable} ${akira.variable} ${burbank.variable} ${dashicons.variable} antialiased`}>
        <div className="flex h-screen overflow-hidden bg-base">
          <Sidebar pages={{ LISTED_PAGES, EXTERNAL_PAGES }} />
          <main className="min-w-0 flex-1 overflow-y-auto pt-14 lg:pt-0">
            {children}
          </main>
        </div>

        <GlobalShortcuts />
        <Telemetry />
        <Ping />
        <GlobalToast />
      </body>
    </html>
  );
}
