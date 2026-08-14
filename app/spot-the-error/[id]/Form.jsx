"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WPEditor from "@/components/WPEditor";
import Button from "@/components/Button";
import Infobox from "@/components/Infobox";

export default function Form({
  id,
  initialValue
}) {
  const router = useRouter();
  const [html, setHtml] = useState(initialValue);

  function finishEditing() {
    sessionStorage.setItem("spotTheErrorFinish", JSON.stringify({ id, html }));
    router.push("/spot-the-error/finish");
  }

  return (
    <>
      <Infobox type="WARNING">
        Unlike usual editing, you need to keep in mind the following for Spot The Error challenges:
        <br />
        • Do not create or remove elements like paragraphs, and do not reorder them
        <br />
        • Do not insert a Read More tag even if it appears missing
        <br />
        • Do not resize an image; image captions are not currently available
        <br />
        • Do not change the word choice or language
        <br />
        This is because Spot The Error is currently not compatible with such advanced edits. Instead, focus on just spelling, formatting, and punctuation, when you are completing a Spot The Error challenge.
      </Infobox>

      <WPEditor
        initialValue={initialValue}
        onChange={setHtml}
        height={500}
        hasMedia={false}
        useExtendStyles
      />

      <Button
        size="lg"
        icon="success"
        className="w-full"
        onClick={finishEditing}
      >
        Finish editing
      </Button>
    </>
  );
}
