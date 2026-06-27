"use client";

import { useEffect, useState } from "react";
import { DEFAULT_GENERATOR_DATA as DEFAULT_FORM_DATA } from "@/config";
import GenerateForm from "@/components/GenerateForm";
import GenerateEditor from "@/components/GenerateEditor";
import getTemplate from "@/lib/boilerplate/getTemplate";
import compile from "@/lib/boilerplate/compile";

export default function GeneratePage() {
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_FORM_DATA;
    const saved = localStorage.getItem("generatorData");
    if (!saved) return DEFAULT_FORM_DATA;
    try {
      return { ...DEFAULT_FORM_DATA, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_FORM_DATA;
    }
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [boilerplate, setBoilerplate] = useState("");

  useEffect(() => {
    async function generateBoilerplate() {
      const template = await getTemplate(formData.postType);
      const html = compile(template, { ...formData, thumbnail });
      setBoilerplate(html);
    }
    generateBoilerplate();
  }, [formData, thumbnail]);

  return (
    <div className="space-y-6 p-8">
      <h1>Generate a Boilerplate</h1>
      <p className="text-faint">
        Generate a basic structure for your post so you can easily get to writing. Tailor the boilerplate as per the details you provide.
      </p>

      <div className="grid min-h-screen gap-4 md:grid-cols-[1fr_auto_2fr]">
        <div>
          <h2>1. Give us some details</h2>
          <GenerateForm
            formData={formData}
            setFormData={setFormData}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
          />
        </div>

        <hr className="hidden h-full w-px border-0 bg-edge xl:block" />

        <div className="flex min-h-0 flex-col">
          <h2>2. Use this boilerplate</h2>
          <div className="mt-6 flex-1 min-h-0">
            <GenerateEditor
              value={boilerplate}
              onChange={setBoilerplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
