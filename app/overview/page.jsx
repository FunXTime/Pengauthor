"use client";

import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    title: "Create posts",
    description: (
      <>
        Use the <strong>boilerplate generator</strong> to create
        perfectly-formatted, well-structured articles blazingly fast. Why
        spend time over formatting when Pengauthor does that for you?
      </>
    ),
    image: "/overview/create-posts.png",
    href: "/generate",
    reverse: false,
  },
  {
    title: "Start a research",
    description: (
      <>
        Initiate a research using the <strong>Research</strong> tool for your
        post. Get relevant posts from credible organizations, including those
        from the past. Just pick the right keyword and set some filters, and
        we'll do the rest!
      </>
    ),
    image: "/overview/start-a-research.png",
    href: "/research",
    reverse: true,
  },
  {
    title: "Complete checkups",
    description: (
      <>
        Why lose valuable score on a hard-worked post simply because you missed
        some simple things? Perform this super-quick checkup before finishing
        your post as a self-test. Get a list of improvements and an
        out-of-12 score after the checkup.
      </>
    ),
    image: "/overview/complete-checkups.png",
    href: "/checkup",
    reverse: false,
  },
];

export default function OverviewPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 p-6 sm:p-8">
      <div className="space-y-3">
        <h1>Overview</h1>
        <p>
          <strong>Pengauthor is the premier reporting utility at Club Penguin Armies, designed for making the work of Media Department members easier!</strong> Pengauthor is a utilitarian suite of various tools that simplifies journalism and adds uniformity. Developed in the summer of 2026, Pengauthor is actively curated by <strong>Editor-in-Chief Fun X Time</strong>. Through this powerful utility, CPA aims to make posts more structured and well-formatted.
        </p>
      </div>

      <div className="space-y-8">
        {FEATURES.map((feature) => (
          <section
            key={feature.title}
            className={`grid items-center gap-6 ${
              feature.reverse ? "lg:grid-cols-[1fr_2fr]" : "lg:grid-cols-[2fr_1fr]"
            }`}
          >
            <div
              className={`space-y-4 ${
                feature.reverse ? "lg:order-2" : ""
              }`}
            >
              <div className="space-y-2">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
              <Link
                href={feature.href}
                className="inline-block text-sm font-medium"
              >
                Use this tool now
              </Link>
            </div>

            <div
              className={`w-full overflow-hidden rounded-xl ${
                feature.reverse ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={feature.image}
                alt=""
                width={1000}
                height={500}
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="h-auto w-full"
              />
            </div>
          </section>
        ))}
      </div>

      <p className="text-center">
        The <strong>Refine</strong>, <strong>Colorize</strong>, and <strong>Score Calculator</strong> tools may arrive on a later date. However, there is no guarantee for these tools to truly make it to Pengauthor. If you have any feedback, please feel free to share them on the <strong>CPA Staff</strong> Discord server!
      </p>
    </div>
  );
}
