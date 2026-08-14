"use client";

import { useRouter } from "next/navigation";
import { CHECKUP_QUESTIONS } from "@/config";
import { preloadMany } from "@/lib/preloader";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

export default function CheckupPage() {
  const router = useRouter();

  async function handleStart() {
    sessionStorage.removeItem("checkup");
    const screenshots = CHECKUP_QUESTIONS.map((_, index) => `/checkup/question-${index + 1}.png`);
    preloadMany(screenshots).catch(() => {});
    router.push("/checkup/question-1");
  }

  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <section className="flex w-full max-w-3xl flex-col items-center text-center unboxed">
        <Icon
          name="checkupHero"
          className="mb-6 h-24 w-24"
        />
        <h1 className="font-akira text-3xl">
          Post Checkup
        </h1>
        <p className="my-6 max-w-2xl">
          Before finishing your article, run through an interactive checkup to ensure that your post includes all the important details and avoids common mistakes that could lead to silly score loss!
        </p>
        <Button
          size="lg"
          onClick={handleStart}
        >
          Start the checkup
        </Button>
      </section>
    </div>
  );
}
