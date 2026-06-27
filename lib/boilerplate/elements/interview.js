import heading from "./heading";
import blockquote from "./blockquote";

export default function interview(
  element
) {
  const questions =
    element.questions ??
    (
      !element.question &&
      !element.answer
        ? [
            {
              question: "Question 1",
              answer: "Answer"
            },
            {
              question: "Question 2",
              answer: "Answer"
            },
            {
              question: "Question 3",
              answer: "Answer"
            }
          ]
        : [
            {
              question: element.question ?? "Question 1",
              answer: element.answer ?? "Answer"
            }
          ]
    );

  return questions
    .map((item, index) =>
      [
        heading({
          content: item.question ?? `Question ${index + 1}`,
          settings: {
            useAkira: false
          }
        }),
        blockquote({
          content: item.answer ?? "Answer"
        })
      ].join("\n")
    )
    .join("\n");
}
