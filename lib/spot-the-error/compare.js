export function compare(input, expected) {
  const normalizedExpected = normalizeExpected(expected);
  return diff(input, normalizedExpected);
}

function normalizeExpected(value) {
  if (Array.isArray(value)) return value.map(normalizeExpected);
  if (value && typeof value === "object") {
    if (
      value.type === "interview" &&
      Array.isArray(value.questions)
    ) {
      return {
        ...value,
        questions: value.questions.map(
          (question) => ({
            ...question,
            question: `<strong>${question.question ?? ""}</strong>`,
            answer:
              `<p style="text-align: center;">`
            + `${question.answer ?? ""}`
            + `</p>`
          })
        )
      };
    }
    return Object.fromEntries(
      Object.entries(value).map(
        ([key, child]) => [key, normalizeExpected(child)]
      )
    );
  }
  return value;
}

function diff(input, expected) {
  const differences = [];
  if (Array.isArray(input) || Array.isArray(expected)) {
    const inputArray = Array.isArray(input)
      ? input
      : [];
    const expectedArray = Array.isArray(expected)
      ? expected
      : [];
    const length = Math.max(
      inputArray.length,
      expectedArray.length
    );
    for (let i = 0; i < length; i++) {
      const inputElement = inputArray[i];
      const expectedElement = expectedArray[i];
      if (inputElement === undefined || expectedElement === undefined) {
        differences.push({
          input: inputElement,
          expected: expectedElement,
          ...(expectedElement?.feedback
            ? { feedback: expectedElement.feedback }
            : {})
        });
        continue;
      }
      if (isElementObject(inputElement) && isElementObject(expectedElement)) {
        differences.push(
          ...compareElementProperties(inputElement, expectedElement)
        );
        continue;
      }
      if (!deepEqual(inputElement, expectedElement)) {
        differences.push({
          input: inputElement,
          expected: expectedElement
        });
      }
    }
    return differences;
  }
  if (
    isElementObject(input) &&
    isElementObject(expected)
  ) return compareElementProperties(input, expected);
  if (!deepEqual(input, expected)) differences.push({
    input,
    expected
  });
  return differences;
}

function compareElementProperties(input, expected) {
  const differences = [];
  const keys = new Set([
    ...Object.keys(input ?? {}),
    ...Object.keys(expected ?? {})
  ]);
  keys.delete("feedback");
  for (const key of keys) {
    const inputValue = input?.[key];
    const expectedValue = expected?.[key];
    if (deepEqual(inputValue, expectedValue)) continue;
    const feedback = getPropertyFeedback(input, expected, key);
    differences.push({
      input,
      expected,
      ...(feedback
        ? { feedback }
        : {}
      )
    });
  }
  return differences.filter(
    (difference) => difference.expected?.feedback
  );
}

function getPropertyFeedback(input, expected, property) {
  const feedback = expected?.feedback;
  if (!feedback) return undefined;
  if (property === "content") {
    if (
      input?.content !==
      expected?.content
    ) return feedback.content;
    return undefined;
  }
  if (property === "settings") {
    const settingsFeedback = {};
    for (const setting of Object.keys(feedback.settings ?? {})) {
      if (
        input?.settings?.[setting] !==
        expected?.settings?.[setting]
      ) settingsFeedback[setting] = feedback.settings[setting];
    }
    return Object.keys(settingsFeedback).length > 0
      ? settingsFeedback
      : undefined;
  }
  if (
    input?.[property] !==
    expected?.[property]
  ) return feedback[property];
  return undefined;
}

function isElementObject(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.type === "string"
  );
}

export function normalizeHtml(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/<br\s*\/?>/gi, "<br />")
    .replace(/&#160;|&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function deepEqual(a, b) {
  if (typeof a === "string" && typeof b === "string") {
    return normalizeHtml(a) === normalizeHtml(b);
  }
  if (a === b) return true;
  if (
    typeof a !== typeof b ||
    a === null ||
    b === null
  ) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every(
      (value, index) => deepEqual(value, b[index])
    );
  }
  if (typeof a === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(b, key) &&
        deepEqual(a[key], b[key])
    );
  }
  return false;
}
