"use client";

import Infobox from "@/components/Infobox";
import { SPOT_THE_ERROR_POSTS } from "@/config";
import Link from "next/link";

export default function SpotTheErrorPage() {
  return (
    <div className="space-y-6 p-8">
      <h1>Spot The Error</h1>

      <p>
        Start a challenge by picking a sample post which you would like to edit. Your task is to find and correct as many errors as possible in a WordPress-like editor, and you'll see the results after. Posts may have different difficulty levels.
      </p>

      <Infobox type="WARNING">
        This feature is currently experimental. Feedback is always appreciated!
      </Infobox>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SPOT_THE_ERROR_POSTS.map((challenge) => (
          <Link
            key={challenge.id}
            href={`/spot-the-error/${challenge.id}`}
            className="button group relative isolate overflow-hidden rounded-2xl border border-edge bg-panel-raised pt-25 transition duration-100 select-none hover:scale-[1.02] hover:border-edge-strong"
          >
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-20 blur-1xl"
              style={{ backgroundImage: `url(${challenge.thumbnail.src})` }}
            />
            <div className="absolute inset-0 bg-panel/70" />
            <span
              className={`absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl border-b border-l border-edge px-3 py-1 text-[0.65rem] uppercase tracking-wide text-white ${
                challenge.difficulty == "easy" ? "bg-green-500/80"
              : challenge.difficulty == "medium" ? "bg-amber-500/80"
              : challenge.difficulty == "hard" ? "bg-red-500/80" : ""
              }`}
            >
              {challenge.difficulty}
            </span>

            <div className="relative z-10 p-5">
              <h3 className="text-lg">
                {challenge.title}
              </h3>
              <p className="mt-3 text-sm">
                {challenge.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
