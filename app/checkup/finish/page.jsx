"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

export default function FinishPage() {
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    const scores = JSON.parse(sessionStorage.getItem("checkupScores") ?? "{}");
    const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
    setScore(total);
    const answered = JSON.parse(sessionStorage.getItem("checkupQuestionsAnswered") ?? "[]");
    setQuestionsAnswered(answered.length);
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <section className="flex w-full max-w-3xl flex-col items-center text-center">
        <Icon
          name="checkupHero"
          className="mb-6 h-24 w-24"
        />

        <h1 className="text-3xl font-bold text-ink">
          Checkup complete!
        </h1>

        <p className="mt-4 text-faint">
          You've reached the end of the manual post checkup.</p>

        <p className="mt-8 text-sm text-faint">
          Your checkup score
        </p>

        <p className="mt-1 text-6xl font-bold text-ink">
          {score} / {questionsAnswered}
        </p>

        <p className="mt-4 max-w-xl text-faint">
          A higher score generally means that your post is less likely to contain common mistakes. Give your work one final review before publishing.
        </p>

        <Link
          href="/checkup/question-1"
          onClick={() => sessionStorage.removeItem("checkupScores")}
          className="mt-10 rounded-xl border border-edge bg-panel-raised px-6 py-3 font-semibold text-ink transition-all hover:scale-105 hover:bg-panel"
        >
          Run again
        </Link>
      </section>
    </div>
  );
}
