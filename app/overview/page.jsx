import Infobox from "@/components/Infobox";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="space-y-6 p-8">
      <h1>Overview</h1>
      <p className="text-faint">
        <strong>Pengauthor is the premier reporting utility at Club Penguin Armies, designed for making the work of Media Department members easier!</strong> Pengauthor is a utilitarian suite of various tools that simplifies journalism and add uniformity. Developed in the summer of 2026, Pengauthor is actively curated by <strong>Editor-in-Chief Fun X Time</strong>. Through this powerful utility, CPA aims to make posts more structured and well-formatted.
      </p>

      <Infobox
        type="SUCCESS"
        text="As of July 12, 2026, Pengauthor 1.0.0 is officially live! Go through this Overview page first, then head to the Guide page using the sidebar on the left of your screen. Happy exploring! 🎉"
      />

      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <section className="w-2/3">
            <h2>Create posts</h2>
            <p className="mt-3 text-faint">
              Use the <strong>boilerplate generator</strong> to create perfectly-formatted, well-structured articles blazingly fast. Why spend time over formatting when Pengauthor does that for you?
            </p>
            <Link href="/generate" className="text-sm">Use this tool now</Link>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/create-posts.png"
          />
        </div>
        <div className="flex flex-row-reverse gap-6">
          <section className="w-2/3">
            <h2>Start a research</h2>
            <p className="mt-3 text-faint">
              Initiate a research using the <strong>Research</strong> tool for your post. Get relevant posts from credible organizations, including those from the past. Just pick the right keyword and set some filters, and we'll do the rest!
            </p>
            <Link href="/generate" className="text-sm">Use this tool now</Link>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/start-a-research.png"
          />
        </div>
        <div className="flex flex-row gap-6">
          <section className="w-2/3">
            <h2>Complete checkups</h2>
            <p className="mt-3 text-faint">
              Why lose valuable score on a hard-worked post simply because you missed some simple things? Perform this super-quick checkup before finishing your post as a self-test. Get a list of improvements and an out-of-12 score after the checkup.
            </p>
            <Link href="/generate" className="text-sm">Use this tool now</Link>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/complete-checkups.png"          
          />
        </div>
      </div>
      <p className="text-center">
        The <strong>Refine</strong>, <strong>Colorize</strong>, and <strong>Score Calculator</strong> tools may arrive on a later date. However, there is no guarantee for these tools to truly make it to Pengauthor. If you have any feedback, please feel free to share them on the <strong>CPA Staff</strong> Discord server!
      </p>
    </div>
  );
}
