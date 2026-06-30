import { notFound } from "next/navigation";
import questions from "../questions.json";
import Question from "@/components/CheckupPage/Question";
import {
  PALETTES,
  CURRENT_PALETTE
} from "@/config";

export default async function CheckupQuestionPage({
  params
}) {
  const { question } = await params;
  const match = question.match(/^question-(\d+)$/);
  if (!match) notFound();

  const questionNumber = Number(match[1]);
  let data = questions[questionNumber - 1];
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
