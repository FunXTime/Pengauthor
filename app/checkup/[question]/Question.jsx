"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CHECKUP_QUESTIONS } from "@/config";
import Image from "next/image";
import Button from "@/components/Button";

export default function Question({
  question,
  note,
  answers = [],
  showScreenshot = true
}) {
  const pathname = usePathname();
  const router = useRouter();
  const imageRef = useRef(null);
  const [showImage, setShowImage] = useState(showScreenshot);
  const [visible, setVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const questionSlug = useMemo(() => {
    const match = pathname.match(/question-\d+$/);
    return match?.[0] ?? null;
  }, [pathname]);
  const questionNumber = useMemo(() => {
    const match = questionSlug?.match(/\d+$/);
    return match ? Number(match[0]) : null;
  }, [questionSlug]);
  const screenshotSrc = questionSlug ? `/checkup/${questionSlug}.png` : "";

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [questionSlug]);

  useEffect(() => {
    setImageLoaded(false);
    if (imageRef.current?.complete) setImageLoaded(true);
  }, [questionSlug]);

  async function navigateToNext(destination) {
    setVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (destination) {
      router.push(destination);
      return;
    }
    const nextQuestionNumber = questionNumber + 1;
    router.push(
      nextQuestionNumber <= CHECKUP_QUESTIONS.length
        ? `/checkup/question-${nextQuestionNumber}`
        : "/checkup/finish"
    );
  }

  async function handleAnswer(answer) {
    const checkup = JSON.parse(sessionStorage.getItem("checkup") ?? '{"answers":{}}');
    checkup.answers ??= {};
    checkup.answers[questionSlug] = {
      label: answer.label,
      score: answer.score
    };
    sessionStorage.setItem("checkup", JSON.stringify(checkup));
    if (answer.onClick) {
      answer.onClick();
      return;
    }
    await navigateToNext(answer.href ?? (
      answer.shortcut ? `/checkup/question-${answer.shortcut}` : null
    ));
  }

  return (
    <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
      <section
        className={`w-full max-w-3xl text-center transition-opacity duration-200 unboxed ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-6 flex h-[clamp(12rem,45vh,24rem)] w-full items-center justify-center sm:mb-8">
          {showImage && (
            <div className="relative h-full w-full max-w-[90%] sm:max-w-[75%]">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse rounded-xl bg-panel-raised" />
              )}
              <Image
                ref={imageRef}
                src={screenshotSrc}
                alt="Question screenshot"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 75vw, 48rem"
                className={`rounded-xl object-contain transition-opacity duration-200 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setShowImage(false);
                  setImageLoaded(true);
                }}
                priority
              />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          {question}
        </h1>

        {note && (
          <p className="mt-3">
            {note}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
          {answers.map(
            (answer, index) => (
              <Button
                key={index}
                className="w-full max-w-xs"
                onClick={() => handleAnswer(answer)}
              >
                {answer.label}
              </Button>
            )
          )}
        </div>
      </section>
    </div>
  );
}
