"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import questions from "./questions.json";
import { preloadMany } from "@/lib/preloader";

export default function CheckupPage() {
  const router = useRouter();

  async function handleStart() {
    sessionStorage.removeItem("checkup");
    const screenshots = questions.map((_, index) => `/checkup_shots/question-${index + 1}.png`);
    preloadMany(screenshots).catch(() => {});
    router.push("/checkup/question-1");
  }

  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <section className="flex w-full max-w-3xl flex-col items-center text-center">
        <Icon
          name="checkupHero"
          className="mb-6 h-24 w-24"
        />
        <h1 className="font-akira text-3xl text-ink">
          Post Checkup
        </h1>
        <p className="mt-4 max-w-2xl text-faint">
          Before publishing your article, run through an interactive checkup to ensure that your post includes all the important details and avoids common mistakes that could lead to silly score loss!
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="mt-8 rounded-xl border border-edge bg-panel-raised px-6 py-3 font-semibold text-ink transition-all hover:scale-105 hover:bg-panel cursor-pointer"
        >
          Start
        </button>
      </section>
    </div>
  );
}
