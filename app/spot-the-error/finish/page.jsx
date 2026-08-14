"use client";

import { useEffect, useState } from "react";
import { SPOT_THE_ERROR_POSTS } from "@/config";
import { finishSpotTheError } from "@/lib/spot-the-error/finish";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";

export default function FinishPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [challengeId, setChallengeId] = useState(null);
  const [completedImprovements, setCompletedImprovements] = useState([]);

  const challenge = SPOT_THE_ERROR_POSTS.find(
    (post) => post.id === challengeId
  );
  const differenceList = result?.differences ?? [];
  const differences = differenceList.length;
  const maxDifferences = result?.maxDifferences ?? 0;
  let score = maxDifferences > 0
    ? Math.round(
      ((maxDifferences - differences) / maxDifferences ) * 100)
    : 100;

  useEffect(() => {
    async function processSubmission() {
      const stored = sessionStorage.getItem("spotTheErrorFinish");
      if (!stored) {
        setError("You need to complete a challenge to visit the result page. If you reloaded the result page, your results were lost!");
        return;
      }
      try {
        const { id, html } = JSON.parse(stored);
        if (!id || !html) throw new Error("Invalid Spot The Error submission.");
        setChallengeId(id);
        const response = await finishSpotTheError(id, html);
        setResult(response);
        sessionStorage.removeItem("spotTheErrorFinish");
      } catch (error) {
        console.error(error);
        setError(error.message || "Bad news! The server failed to process your submission.");
      }
    }
    processSubmission();
  }, []);

  function toggleImprovement(index) {
    setCompletedImprovements(
      (current) => current.includes(index)
        ? current.filter(
          (item) => item !== index
        )
        : [...current, index]
    );
  }

  function clearSubmission() {
    sessionStorage.removeItem("spotTheErrorFinish");
  }

  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center p-8">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <Icon
            name="error"
            className="h-20 w-20"
          />
          <h1 className="text-3xl font-bold text-ink">
            Oh no!
          </h1>
          <p>
            {error}
          </p>
          <Button
            href="/spot-the-error"
            onClick={clearSubmission}
          >
            Try a new challenge
          </Button>
        </div>
      </div>
    );
  }

  if (!result) return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="flex flex-col items-center text-center">
        <Icon
          name="checkupHero"
          className="mb-6 h-24 w-24"
        />
        <h1 className="text-3xl font-bold text-ink">
          On it…
        </h1>
        <p className="mt-4">
          We are processing your submission and identifying the differences!
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <section className="flex flex-col items-center text-center">
          <Icon
            name="checkupHero"
            className="mb-6 h-24 w-24"
          />
          <h1 className="text-3xl font-bold text-ink">
            Challenge complete!
          </h1>
          <p className="mt-4">
            You finished the sample post <strong className="text-ink font-burbank">{challenge?.title ?? challengeId}</strong>.
          </p>

          <p className="mt-8 text-sm">
            <strong>Your editing score was...</strong>
          </p>

          <p className="mt-1 text-6xl font-bold font-burbank text-ink">
            {Math.max(score, 0)}%
          </p>
          <span>
            {Math.max(maxDifferences - differences, 0)} out of {maxDifferences}
          </span>

          <p className="my-6 max-w-xl">
            A higher score generally means that your editing is less likely to contain common oversights. Always keep your attention to detail.
          </p>

          <div className="flex flex-row gap-5">
            <Button
              href="/spot-the-error"
              onClick={clearSubmission}
            >
              Try a new challenge
            </Button>

            <Button
              href={`/spot-the-error/${challengeId}`}
              onClick={clearSubmission}
            >
              Retry
            </Button>
          </div>
        </section>

        <section className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-ink">
            Improvements
          </h2>

          {differences > 0 ? (
            <div className="mt-6 flex w-full max-w-2xl flex-col gap-4">
              {differenceList.map(
                (improvement, index) => {
                  const completed = completedImprovements.includes(index);
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => toggleImprovement(index)}
                      className={`flex w-full items-start gap-4 rounded-xl border border-edge bg-panel-raised p-4 text-left transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[1.03] focus-visible:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                        completed ? "scale-[0.98] opacity-50" : ""
                      }`}
                    >
                      <Icon
                        name={completed ? "checkedCircle" : "numberedCircle"}
                        variable={index + 1}
                        className="h-6 w-6 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p>
                          {improvement.expected.feedback}
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          ) : (
            <p className="mt-4 max-w-2xl">
              Excellent work! No improvements were identified.
            </p>
          )}
        </section>

        <Accordion title="View computed differences in JSON format">
          <pre className="overflow-x-auto whitespace-pre-wrap break-words text-left">
            {JSON.stringify(differenceList, null, 2)}
          </pre>
        </Accordion>

      </div>
    </div>
  );
}
