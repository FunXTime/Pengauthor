"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import questions from "../questions.json";

export default function FinishPage() {
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [improvements, setImprovements] = useState([]);
  const [completedImprovements, setCompletedImprovements] = useState([]);

  console.log(questions);
  console.log(questions.length);

  useEffect(() => {
    const checkup = JSON.parse(sessionStorage.getItem("checkup") ?? '{"answers":{}}');
    const improvements = Object.entries(checkup.answers ?? {})
      .filter(([, answer]) => answer.score == 0)
      .map(([slug]) => {
        const questionNumber = Number(slug.match(/\d+$/)?.[0]) - 1;
        return questions[questionNumber]?.feedback;
      })
      .filter(Boolean);
    setScore(
      Object.values(checkup.answers ?? {})
        .reduce((sum, answer) => sum + answer.score, 0)
    );
    setQuestionsAnswered(Object.keys(checkup.answers ?? {}).length);
    setImprovements(improvements);
  }, []);

  function toggleImprovement(index) {
    setCompletedImprovements((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index]
    );
  }

  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <section className="flex flex-col items-center text-center">
          <Icon
            name="checkupHero"
            className="mb-6 h-24 w-24"
          />

          <h1 className="text-3xl font-bold text-ink">
            Checkup complete!
          </h1>

          <p className="mt-4 text-faint">
            You've reached the end of the manual post checkup.
          </p>

          <p className="mt-8 text-sm text-faint">
            Your checkup score
          </p>

          <p className="mt-1 text-6xl font-bold text-ink">
            {score} / {questions.length}
          </p>

          <p className="mt-4 max-w-xl text-faint">
            A higher score generally means that your post is less likely to contain common mistakes. Give your work one final review before publishing.
          </p>

          <Link
            href="/checkup/question-1"
            onClick={() => sessionStorage.removeItem("checkup")}
            className="mt-10 rounded-xl border border-edge bg-panel-raised px-6 py-3 font-semibold text-ink transition-all hover:scale-105 hover:bg-panel"
          >
            Run again
          </Link>
        </section>

        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-ink">
            Improvements
          </h2>
          {improvements.length ? (
            <div className="mt-6 flex w-full max-w-2xl flex-col gap-4">
              {improvements.map((improvement, index) => {
                const completed = completedImprovements.includes(index);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleImprovement(index)}
                    className={`flex items-start gap-4 rounded-xl border border-edge bg-panel-raised p-4 text-left transition-all cursor-pointer ${
                      completed ? "scale-95" : "hover:scale-[1.02]"
                    }`}
                  >
                    <Icon
                      name={completed ? "checkedCircle" : "numberedCircle"}
                      variable={index + 1}
                      className="h-6 w-6 shrink-0"
                    />
                    <p className="text-faint">
                      {improvement}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 max-w-2xl text-faint">
              Excellent work! No improvements were identified during this checkup.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
