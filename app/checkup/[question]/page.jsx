import { notFound } from "next/navigation";
import { CHECKUP_QUESTIONS } from "@/config";
import Question from "./Question";
import { PALETTES, CURRENT_PALETTE } from "@/config";

export default async function CheckupQuestionPage({
  params
}) {
  const { question } = await params;
  const match = question.match(/^question-(\d+)$/);
  if (!match) notFound();

  const questionNumber = Number(match[1]);
  let data = CHECKUP_QUESTIONS[questionNumber - 1];
  if (!data) notFound();

  const currentPaletteName = PALETTES.find((palette) =>
    palette.name === CURRENT_PALETTE
  )?.label ?? CURRENT_PALETTE;
  data = {
    ...data,
    note: data.note?.replaceAll("{{CURRENT_PALETTE}}", currentPaletteName)
  };

  return (
    <Question
      {...data}
    />
  );
}
