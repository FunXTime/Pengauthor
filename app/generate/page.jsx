"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_GENERATOR_DATA as DEFAULT_FORM_DATA,
  CURRENT_PALETTE,
  POST_TYPES,
  POST_CATEGORIES
} from "@/config";
import { getThumbnail } from "@/lib/thumbnails";
import getTemplate from "@/lib/boilerplate/getTemplate";
import compile from "@/lib/boilerplate/compile";
import GenerateForm from "./Form";
import GenerateEditor from "./Editor";

function getStoredGeneratorData() {
  if (typeof window === "undefined") return DEFAULT_FORM_DATA;
  const saved = localStorage.getItem("generatorData");
  if (!saved) return DEFAULT_FORM_DATA;
  try {
    const data = JSON.parse(saved);
    const postCategory = POST_CATEGORIES.includes(data.postCategory)
      ? data.postCategory
      : DEFAULT_FORM_DATA.postCategory;
    const postTypes = POST_TYPES[postCategory] ?? [];
    const postType = postTypes.includes(data.postType)
      ? data.postType
      : postTypes[0];
    return {
      ...DEFAULT_FORM_DATA,
      ...data,
      postCategory,
      postType,
      isBreakingNews: postCategory === "News" && data.isBreakingNews === true
    };
  } catch {
    return DEFAULT_FORM_DATA;
  }
}

export default function GeneratePage() {
  const [formData, setFormData] = useState(getStoredGeneratorData);
  const [palette, setPalette] = useState(CURRENT_PALETTE);
  const [boilerplate, setBoilerplate] = useState("");
  const thumbnail = getThumbnail(formData, palette);

  useEffect(() => {
    async function generateBoilerplate() {
      const template = await getTemplate(formData.postType);
      const html = compile(template, { ...formData, thumbnail });
      setBoilerplate(html);
    }
    generateBoilerplate();
  }, [formData, thumbnail]);

  useEffect(() => {
    const { interviewQuestions, ...persistedData } = formData;
    localStorage.setItem("generatorData", JSON.stringify(persistedData));
  }, [formData]);

  return (
    <div className="space-y-3 overflow-x-hidden p-4 sm:p-6 lg:p-8">
      <h1>Generate a boilerplate</h1>

      <p>
        Generate a basic structure for your post so you can easily get to writing. Tailor the boilerplate as per the details you provide.
      </p>

      <div className="mt-6 grid min-h-screen gap-8 xs:mt-8 xs:grid-cols-[1fr_auto_1fr] xs:gap-4 md:grid-cols-[1fr_auto_2fr]">
        <div className="min-w-0">
          <h2>1. Enter some details</h2>
          <GenerateForm
            formData={formData}
            setFormData={setFormData}
            palette={palette}
            setPalette={setPalette}
            thumbnail={thumbnail}
          />
        </div>

        <hr className="hidden h-full w-px border-0 bg-edge xs:block" />

        <div className="flex min-w-0 flex-col xs:min-h-0">
          <h2>2. Use this boilerplate</h2>
          <div className="mt-4 h-[calc(100dvh-2.5rem)] min-h-0 xs:mt-6 xs:h-auto xs:flex-1">
            <GenerateEditor
              className="w-1/2 md:w-full"
              value={boilerplate}
              onChange={setBoilerplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
