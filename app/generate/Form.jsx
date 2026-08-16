"use client";

import { useState, useRef, useEffect } from "react";
import { getQuestion, getNextQuestion } from "@/lib/questionnaire";
import getSuggestedTags from "@/lib/suggestedTags";
import {
  REPORTERS,
  REPORTER_POSITIONS,
  POST_TYPES,
  POST_CATEGORIES,
  PALETTES
} from "@/config";
import Dropdown from "@/components/Dropdown";
import Tooltip from "@/components/Tooltip";
import Icon from "@/components/Icon";
import ColorPicker from "@/components/ColorPicker";
import Image from "next/image";

export default function GenerateForm({
  formData,
  setFormData,
  palette,
  setPalette,
  thumbnail
}) {
  const [thumbnailButtonText, setThumbnailButtonText] = useState("CLICK TO COPY FILENAME…");
  const [completedTags, setCompletedTags] = useState([]);
  const availablePostTypes = POST_TYPES[formData.postCategory];
  const copyTimeout = useRef(null);
  const suggestedTags = getSuggestedTags(formData.postType, formData.hasInterview);

  useEffect(() => {
    setFormData((current) => {
      const questions = current.interviewQuestions ?? [];
      if (
        questions.length > 0 &&
        questions.some((question) => question !== "")
      ) return current;
      const generatedQuestions = [];
      const usedQuestions = [];
      for (let i = 0; i < 3; i++) {
        const question = getQuestion(current.postType, usedQuestions, false);
        if (!question) break;
        generatedQuestions.push(question);
        usedQuestions.push(question);
      }
      return {
        ...current,
        interviewQuestions: generatedQuestions.length > 0 ? generatedQuestions : [""]
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  useEffect(() => {
    setThumbnailButtonText("CLICK TO COPY FILENAME…");
  }, [ thumbnail.filename, thumbnail.src, thumbnail.fallback ]);

  function handleInput(event) {
    const { name, value } = event.target;
    setFormData((current) => {
      const updated = { ...current, [name]: value};
      if (name === "postCategory") {
        if (
          !POST_TYPES[value].includes(updated.postType)
        ) updated.postType = POST_TYPES[value][0];
        if (value !== "News") updated.isBreakingNews = false;
      }
      return updated;
    });
  }

  function handleCheckbox(event) {
    const { name, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: checked }));
  }

  return (
    <form>
      <div className="mt-6 space-y-2">
        <span className="block font-bold text-sm text-ink text-[1rem]">
          <Icon name="options" inline={true} /> GENERAL OPTIONS
        </span>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <span className="font-bold block text-sm">
              About the reporter
            </span>
            <div className="mt-2 flex">
              <Dropdown
                name="reporterPosition"
                className="w-40 shrink-0 rounded-l-xl overflow-hidden"
                value={formData.reporterPosition}
                options={REPORTER_POSITIONS}
                onChange={handleInput}
              />
              <input
                name="reporterName"
                className="-ml-px w-40 shrink-0 rounded-r-xl border border-edge bg-panel-raised px-4 py-3 text-[0.75rem] outline-none"
                value={formData.reporterName}
                list="reporters"
                placeholder="Your name"
                onChange={handleInput}
              />
              <datalist id="reporters">
                {REPORTERS.map((reporter) => (
                  <option key={reporter} value={reporter} />
                ))}
              </datalist>
            </div>
            <div className="mt-4 flex">
              <div className="w-40 shrink-0">
                <label className="flex h-full items-center justify-center text-sm">
                  Sign-off color
                </label>
              </div>
              <div className="-ml-px flex w-40 shrink-0 items-center gap-3 rounded-r-xl border border-edge bg-panel-raised px-4 py-1">
                <ColorPicker
                  value={formData.signOffColor}
                  onChange={(color) => setFormData((current) => ({
                    ...current,
                    signOffColor: color
                  }))}
                />
                <span className="text-xs uppercase tracking-wide">
                  <input
                    type="text"
                    value={formData.signOffColor}
                    maxLength={7}
                    onInput={(event) => {
                      const input = event.currentTarget;
                      const hex = input.value
                        .replace(/^#/, "")
                        .replace(/[^0-9a-fA-F]/g, "")
                        .toLowerCase()
                        .slice(0, 6);
                      setFormData((current) => ({
                        ...current,
                        signOffColor: `#${hex}`
                      }));
                    }}
                    className="w-20 bg-transparent text-xs uppercase tracking-wide outline-none"
                    aria-label="Sign-off color hex value"
                    spellCheck={false}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="font-bold block text-sm">
            About the post
          </span>
          <div className="mt-2 flex">
            <Dropdown
              name="postCategory"
              className="w-40 shrink-0 rounded-l-xl overflow-hidden"
              value={formData.postCategory}
              options={POST_CATEGORIES}
              onChange={handleInput}
            />
            <Dropdown
              name="postType"
              className="-ml-px w-40 shrink-0 rounded-r-xl overflow-hidden"
              value={formData.postType}
              options={availablePostTypes}
              onChange={handleInput}
            />
          </div>
          <div className="mt-4">
            <Tooltip
              text="Only News posts can be Breaking News posts!"
              disabled={formData.postCategory === "News"}
            >
              <span
                className={`flex items-center gap-3 ${
                  formData.postCategory !== "News" ? "opacity-50" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id="isBreakingNews"
                  name="isBreakingNews"
                  checked={formData.isBreakingNews}
                  disabled={formData.postCategory !== "News"}
                  onChange={handleCheckbox}
                  className="h-4 w-4 accent-accent"
                />
                <label htmlFor="isBreakingNews" className="text-sm">
                  Mark post as Breaking News
                </label>
              </span>
            </Tooltip>
          </div>
        </div>

        <br />

        <div>
          <span className="block font-bold text-sm text-ink text-[1rem]">
            <Icon name="thumbnail" inline={true} /> THUMBNAIL
          </span>
          <div className="mt-2 flex gap-3">
            <span className="text-xs font-medium tracking-wide select-none">
              PALETTE
            </span>
            {PALETTES.map((item) => (
              <Tooltip
                key={item.name}
                text={item.label}
              >
                <button
                  type="button"
                  onClick={() => { setPalette(item.name) }}
                  className={`h-3.5 w-3.5 rounded-full transition-colors ${
                    palette === item.name ? "outline outline-2 outline-white outline-offset-2" : ""
                  }`}
                  style={{ backgroundColor: palette === item.name ? item.activeColor : item.inactiveColor }}
                />
              </Tooltip>
            ))}
          </div>
          {thumbnail && (
            <>
              <button
                type="button"
                onClick={() => {
                  if (thumbnail.fallback) return;
                  navigator.clipboard.writeText(thumbnail.filename);
                  if (copyTimeout.current) clearTimeout(copyTimeout.current);
                  setThumbnailButtonText("COPIED!");
                  copyTimeout.current = setTimeout(() => {
                    setThumbnailButtonText("CLICK TO COPY FILENAME…");
                    copyTimeout.current = null;
                  }, 1000);
                }}
                className={`group relative mt-3 block overflow-hidden rounded-xl ${
                  thumbnail.fallback ? "" : "cursor-copy"
                }`}
              >
                <div className="overflow-hidden rounded-xl bg-panel-raised">
                  <Image
                    src={thumbnail.previewSrc}
                    alt={thumbnail.filename}
                    width={thumbnail.width ?? 500}
                    height={thumbnail.height}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-auto w-full rounded-xl transition duration-200 group-hover:brightness-[25%]"
                    onError={(event) => event.currentTarget.src = thumbnail.src}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-200 group-hover:opacity-100">
                  <span className="max-w-xs text-center text-sm font-bold tracking-wide text-white">
                    {thumbnail.fallback
                      ? "A thumbnail on this topic and for this palette was not found!"
                      : thumbnailButtonText
                    }
                  </span>
                </div>
              </button>
              <p className="mt-2 text-center text-sm font-burbank">
                {thumbnail.designer === "Unknown"
                  ? "Contact Reporting Heads for the thumbnail"
                  : <>Designed by <strong className="text-ink">{thumbnail.designer}</strong></>
                }
              </p>
            </>
          )}

          <br />

          <div>
            <span className="block font-bold text-sm text-ink text-[1rem]">
              <Icon name="interview" inline={true} /> INTERVIEW
            </span>
            <label className="mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                name="hasInterview"
                className="h-4 w-4 accent-accent"
                checked={formData.hasInterview}
                onChange={handleCheckbox}
              />
              <span className="text-sm">
                Add interview section
              </span>
            </label>
            <fieldset
              className={`mt-3 transition-opacity ${
                formData.hasInterview ? "opacity-100" : "opacity-25"
              }`}
              disabled={!formData.hasInterview}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">
                    List of questions
                  </label>
                  <Tooltip
                    text={(formData.interviewQuestions ?? []).length >= 10
                      ? "You can add up to only 10 questions"
                      : "Add a question"
                    }
                  >
                    <button
                      type="button"
                      className={`text-lg transition ${
                        (formData.interviewQuestions ?? []).length >= 10
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:text-white"
                      }`}
                      disabled={(formData.interviewQuestions ?? []).length >= 10}
                      onClick={() => setFormData((current) => {
                        const questions = current.interviewQuestions ?? [];
                        if (questions.length >= 10) return current;
                        const generatedQuestion = getQuestion(
                          current.postType, questions, false
                        );
                        return {
                          ...current,
                          interviewQuestions: [ ...questions, generatedQuestion || "" ]
                        };
                      })}
                    >
                      <Icon
                        name="plus"
                        className="h-4 w-4"
                      />
                    </button>
                  </Tooltip>
                </div>
                {(formData.interviewQuestions ?? [""]).map(
                  (question, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <div className="group relative flex-1">
                        <input
                          type="text"
                          placeholder={`Question ${index + 1}`}
                          value={question}
                          className="w-full rounded-xl border border-edge bg-panel-raised px-4 py-2 text-[0.75rem] outline-none"
                          onChange={(event) => setFormData((current) => ({
                            ...current,
                            interviewQuestions: current.interviewQuestions.map(
                              (item, i) => i === index ? event.target.value : item
                            )
                          }))}
                        />
                        {question && (
                          <div className="pointer-events-none absolute bottom-full left-0 z-[9999] mb-2 hidden max-w-md rounded-lg border border-edge bg-panel px-3 py-2 text-xs text-white shadow-xl group-hover:block group-focus-within:hidden">
                            {question}
                          </div>
                        )}
                      </div>
                      <Tooltip text="Generate a question">
                        <button
                          type="button"
                          className="shrink-0 transition hover:text-sky-400"
                          onClick={() => { setFormData((current) => {
                            const questions = current.interviewQuestions;
                            const currentQuestion = questions[index];
                            const usedQuestions = questions.filter((_, i) => i !== index);
                            const generatedQuestion = getNextQuestion(
                              current.postType, currentQuestion, usedQuestions
                            );
                            return {
                              ...current,
                              interviewQuestions: questions.map((item, i) => i === index
                                ? generatedQuestion
                                : item
                              )
                            }
                          })}}
                        >
                          <Icon
                            name="magicWand"
                            className="h-4 w-4"
                          />
                        </button>
                      </Tooltip>
                      <Tooltip text="Remove this question">
                        <button
                          type="button"
                          className="shrink-0 transition hover:text-red-400"
                          onClick={() =>
                            setFormData((current) => {
                              const updatedQuestions = current.interviewQuestions.filter(
                                (_, i) => i !== index
                              );
                              return {
                                ...current,
                                interviewQuestions: updatedQuestions.length > 0
                                  ? updatedQuestions : [""]
                              };
                            })
                          }
                        >
                          <Icon
                            name="x"
                            className="h-4 w-4"
                          />
                        </button>
                      </Tooltip>
                    </div>
                  )
                )}
              </div>
            </fieldset>
          </div>

          <br />

          <div className="space-y-2">
            <span className="block font-bold text-sm text-ink text-[1rem]">
              <Icon name="tag" inline={true} /> SUGGESTED TAGS
            </span>
            <small>You should use these tags for your post.</small>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestedTags.map((tag) => {
                const isCompleted = completedTags.includes(tag.name);
                return (
                  <Tooltip
                    key={tag.name}
                    text={tag.tip ?? "This is an evergreen tag"}
                    disabled={!tag.tip && !tag.isGlobal}
                  >
                    <button
                      type="button"
                      className={`rounded-full border bg-panel-raised px-3 py-1 text-xs select-none transition-transform duration-150 ${
                        tag.isItalic ? "italic" : ""
                      } ${
                        isCompleted ? "border-[#8080A0] scale-95" : "border-edge hover:scale-105"
                      }`}
                      onClick={() => setCompletedTags(
                        (current) => current.includes(tag.name)
                          ? current.filter((item) => item !== tag.name)
                          : [...current, tag.name]
                      )}
                    >
                      {tag.name}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
