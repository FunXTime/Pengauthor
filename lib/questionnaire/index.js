import questions from "./questions.json";

export function getQuestion(
  postType,
  usedQuestions = [],
  allowFallback = true
) {
  const availableQuestions =
    questions[postType] ??
    questions.default ??
    [];
  const nextQuestion =
    availableQuestions.find(
      (question) => !usedQuestions.includes(question)
    );

  if (nextQuestion) return nextQuestion;

  return allowFallback
    ? "I can't think of any other question!"
    : "";
}

export function getNextQuestion(
  postType,
  currentQuestion,
  usedQuestions = []
) {
  const availableQuestions =
    questions[postType] ??
    questions.Default ??
    [];

  if (availableQuestions.length === 0) return "I can't think of any other questions!";

  const currentIndex =
    availableQuestions.indexOf(
      currentQuestion
    );

  for (
    let i = 1;
    i <= availableQuestions.length;
    i++
  ) {
    const question =
      availableQuestions[
        (currentIndex + i) %
        availableQuestions.length
      ];
    if (
      question !== currentQuestion &&
      !usedQuestions.includes(question)
    ) {
      return question;
    }
  }

  return "I can't think of any other questions!";
}