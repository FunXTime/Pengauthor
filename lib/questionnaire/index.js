import { QUESTIONNAIRE } from "@/config";

export function getQuestion(
  postType,
  usedQuestions = [],
  allowFallback = true
) {
  let availableQuestions = QUESTIONNAIRE[postType] ?? QUESTIONNAIRE.default
  if (availableQuestions.length == 0) availableQuestions = QUESTIONNAIRE.default;
  const nextQuestion = availableQuestions.find(
    (question) => !usedQuestions.includes(question)
  );
  if (nextQuestion) return nextQuestion;
  return allowFallback ? "I can't think of any other question!" : "";
}

export function getNextQuestion(
  postType,
  currentQuestion,
  usedQuestions = []
) {
  let availableQuestions = QUESTIONNAIRE[postType] ?? QUESTIONNAIRE.default
  if (availableQuestions.length == 0) availableQuestions = QUESTIONNAIRE.default;
  if (availableQuestions.length === 0) return "I can't think of any other questions!";

  const currentIndex = availableQuestions.indexOf(currentQuestion);

  for (let i = 1; i <= availableQuestions.length; i++) {
    const question = availableQuestions[
      (currentIndex + i) % availableQuestions.length
    ];
    if (
      question !== currentQuestion &&
      !usedQuestions.includes(question)
    ) return question;
  }

  return "I can't think of any other questions!";
}
