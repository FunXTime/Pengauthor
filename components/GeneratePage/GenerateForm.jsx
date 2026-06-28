"use client";

import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import Tooltip from "@/components/Tooltip";
import Icon from "@/components/Icon";
import reporters from "@/config/reporterList.json";
import { getQuestion, getNextQuestion } from "@/lib/questionnaire";
import getSuggestedTags from "@/lib/suggestedTags";
import {
  REPORTER_POSITIONS,
  POST_TYPES,
  POST_CATEGORIES,
  PALETTES,
  CURRENT_PALETTE,
  THUMBNAIL_MAPPINGS
} from "@/config";

export default function GenerateForm({
  formData,
  setFormData,
  thumbnail,
  setThumbnail
}) {
  const [palette, setPalette] = useState(CURRENT_PALETTE);
  const [thumbnailButtonText, setThumbnailButtonText] = useState("CLICK TO COPY FILENAME…");
  const [completedTags, setCompletedTags] = useState([]);
  const suggestedTags =
    getSuggestedTags(
      formData.postType,
      formData.hasInterview
    );

  useEffect(() => {
    const { interviewQuestions, ...persistedData } = formData;
    localStorage.setItem("generatorData", JSON.stringify(persistedData));
  }, [formData]);

  useEffect(() => {
    async function loadThumbnail() {
      const thumbnailsResponse = await fetch(`/thumbnails/${palette}.json`);
      const thumbnails = await thumbnailsResponse.json();
      const thumbnailName =
        formData.isBreakingNews
          ? "Breaking News"
          : THUMBNAIL_MAPPINGS[formData.postType];
      const selectedThumbnail =
        thumbnails.find((thumbnail) => thumbnail.for === thumbnailName) ?? {
          filename: "fallback.png",
          src: `/thumbnails/fallback/${palette}.png`,
          designer: "Unknown",
          fallback: true
        };
      setThumbnail(selectedThumbnail);
    }
    loadThumbnail();
  }, [
    palette,
    formData.postCategory,
    formData.postType,
    formData.isBreakingNews
  ]);

  const availablePostTypes = POST_TYPES[formData.postCategory];

  function handleInput(event) {
    const { name, value } = event.target;
    setFormData((current) => {
      const updated = { ...current, [name]: value };
      if (
        name === "postCategory" &&
        !POST_TYPES[value].includes(updated.postType)
      ) updated.postType = POST_TYPES[value][0];
      return updated;
    });
  }

  function handleCheckbox(event) {
    const { name, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: checked }));
  }

  useEffect(() => {
    if (
      formData.postCategory !== "News" &&
      formData.isBreakingNews
    ) setFormData((current) => ({ ...current, isBreakingNews: false }));
  }, [
    formData.postCategory,
    formData.isBreakingNews,
    setFormData
  ]);

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
        const question =
          getQuestion(
            current.postType,
            usedQuestions,
            false
          );
        if (!question) break;
        generatedQuestions.push(question);
        usedQuestions.push(question);
      }
      return {
        ...current,
        interviewQuestions:
          generatedQuestions.length > 0 ? generatedQuestions : [""]
      };
    });
  }, []);

  return (
    <form>
      <div className="mt-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm text-faint">
              About the reporter
            </label>
            <div className="mt-2 flex">
              <Dropdown
                name="reporterPosition"
                value={formData.reporterPosition}
                options={REPORTER_POSITIONS}
                onChange={handleInput}
                className="w-40 shrink-0 rounded-l-xl overflow-hidden"
              />
              <input
                list="reporters"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleInput}
                placeholder="Your name"
                className="-ml-px w-40 shrink-0 rounded-r-xl border border-edge bg-panel-raised px-4 py-3 text-[0.75rem] outline-none"
              />
              <datalist id="reporters">
                {reporters.map((reporter) => (
                  <option key={reporter} value={reporter} />
                ))}
              </datalist>
            </div>
            <div className="mt-4 flex">
              <div className="w-40 shrink-0">
                <label className="flex h-full items-center justify-center text-sm text-faint">
                  Sign-off color
                </label>
              </div>
              <div className="-ml-px flex w-40 shrink-0 items-center gap-3 rounded-r-xl border border-edge bg-panel-raised px-4 py-1">
                <input
                  type="color"
                  name="signOffColor"
                  value={formData.signOffColor}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, signOffColor: event.target.value }))
                  }
                  className="h-8 w-8 shrink-0 cursor-pointer rounded border border-edge"
                />
                <span className="text-xs uppercase tracking-wide text-faint">
                  {formData.signOffColor}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-faint">
            About the post
          </label>
          <div className="mt-2 flex">
            <Dropdown
              name="postCategory"
              value={formData.postCategory}
              options={POST_CATEGORIES}
              onChange={handleInput}
              className="w-40 shrink-0 rounded-l-xl overflow-hidden"
            />
            <Dropdown
              name="postType"
              value={formData.postType}
              options={availablePostTypes}
              onChange={handleInput}
              className="-ml-px w-40 shrink-0 rounded-r-xl overflow-hidden"
            />
          </div>
          <div className="mt-4">
            <Tooltip
              text="Only News posts can be Breaking News posts!"
              disabled={formData.postCategory === "News"}
            >
              <label
                className={`flex items-center gap-3 text-faint ${
                  formData.postCategory !== "News"
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  name="isBreakingNews"
                  checked={formData.isBreakingNews}
                  disabled={formData.postCategory !== "News"}
                  onChange={handleCheckbox}
                  className="h-4 w-4 accent-accent cursor-pointer"
                />
                <span className="text-sm text-faint">
                  Mark post as breaking news
                </span>
              </label>
            </Tooltip>
          </div>
        </div>

        <br />

        <div>
          <label className="block text-sm text-faint text-[1rem]">
            THUMBNAIL
          </label>
          <div className="mt-2 flex gap-3">
            <span className="text-xs font-medium tracking-wide text-faint select-none">
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
                  className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
                    palette === item.name ? "outline outline-2 outline-white outline-offset-2" : ""
                  }`}
                  style={{
                    backgroundColor: palette === item.name ? item.activeColor : item.inactiveColor
                  }}
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
                  setThumbnailButtonText("COPIED!");
                  setTimeout(() => setThumbnailButtonText("CLICK TO COPY FILENAME…"), 1000);
                }}
                className={`group relative mt-3 block overflow-hidden rounded-xl ${
                  thumbnail.fallback ? "" : "cursor-copy"
                }`}
              >
                <img
                  src={thumbnail.src}
                  alt={thumbnail.filename}
                  className="rounded-xl transition duration-200 group-hover:brightness-[25%]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-100 group-hover:opacity-100">
                  <span className="max-w-xs text-center text-sm font-bold tracking-wide text-white">
                    {thumbnail.fallback
                      ? "A thumbnail on this topic and for this palette was not found!"
                      : thumbnailButtonText}
                  </span>
                </div>
              </button>
              <p className="mt-2 text-center text-sm text-faint">
                {thumbnail.designer === "Unknown"
                  ? "Contact editors for the thumbnail"
                  : <>Designed by <strong>{thumbnail.designer}</strong></>
                }
              </p>
            </>
          )}

          <br />

          <div>
            <label className="block text-sm text-faint text-[1rem]">
              INTERVIEW
            </label>
            <label className="mt-2 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="hasInterview"
                checked={formData.hasInterview}
                onChange={handleCheckbox}
                className="h-4 w-4 accent-accent cursor-pointer"
              />
              <span className="text-sm text-ink">
                Add interview section
              </span>
            </label>
            <fieldset
              disabled={!formData.hasInterview}
              className={`mt-3 transition-opacity ${
                formData.hasInterview ? "opacity-100" : "opacity-25"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-faint">
                    Questions for the interview
                  </label>
                  <Tooltip
                    text={
                      (formData.interviewQuestions ?? []).length >= 10
                        ? "You can add up to only 10 questions"
                        : "Add a question"
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((current) => {
                          const questions = current.interviewQuestions ?? [];
                          if (questions.length >= 10) return current;
                          const generatedQuestion =
                            getQuestion(
                              current.postType,
                              questions,
                              false
                            );
                          return {
                            ...current,
                            interviewQuestions: [ ...questions, generatedQuestion || "" ]
                          };
                        })
                      }
                      disabled={(formData.interviewQuestions ?? []).length >= 10}
                      className={`text-lg transition cursor-pointer ${
                        (formData.interviewQuestions ?? [])
                          .length >= 10
                          ? "text-faint opacity-50 cursor-not-allowed"
                          : "text-faint hover:text-white"
                      }`}
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
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              interviewQuestions:
                                current.interviewQuestions.map(
                                  (item, i) => i === index ? event.target.value : item
                                )
                            }))
                          }
                          className="w-full rounded-xl border border-edge bg-panel-raised px-4 py-2 text-[0.75rem] outline-none"
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
                          onClick={() => {
                            setFormData((current) => {
                              const questions = current.interviewQuestions;
                              const currentQuestion = questions[index];
                              const usedQuestions = questions.filter((_, i) => i !== index);
                              const generatedQuestion =
                                getNextQuestion(
                                  current.postType,
                                  currentQuestion,
                                  usedQuestions
                                );
                              return {
                                ...current,
                                interviewQuestions:
                                  questions.map(
                                    (item, i) => i === index ? generatedQuestion : item,
                                  )
                              };
                            });
                          }}
                          className="shrink-0 text-faint transition hover:text-sky-400 cursor-pointer"
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
                          onClick={() =>
                            setFormData((current) => {
                              const updatedQuestions = current.interviewQuestions.filter((_, i) => i !== index);
                              return {
                                ...current,
                                interviewQuestions:
                                  updatedQuestions.length > 0 ? updatedQuestions : [""]
                              };
                            })
                          }
                          className="shrink-0 text-faint transition hover:text-red-400 cursor-pointer"
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
            <label className="text-sm font-medium">
              Suggested Tags
            </label>

            <div className="mt-2 flex flex-wrap gap-2">
              {suggestedTags.map((tag) => {
                const isCompleted = completedTags.includes(tag.name);
                return (
                  <Tooltip
                    key={tag.name}
                    text={tag.tip ?? "This is a universal tag"}
                    disabled={!tag.tip && !tag.isGlobal}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setCompletedTags(
                          (current) =>
                            current.includes(tag.name)
                              ? current.filter(
                                  (item) => item !== tag.name
                                )
                              : [
                                  ...current,
                                  tag.name
                                ]
                        )
                      }
                      className={`rounded-full border bg-panel-raised px-3 py-1 text-xs text-faint select-none transition-transform duration-150 cursor-pointer ${
                        tag.isItalic ? "italic" : ""
                      } ${
                        isCompleted
                          ? "border-[#8080A0] scale-95"
                          : "border-edge hover:scale-105"
                      }`}
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
