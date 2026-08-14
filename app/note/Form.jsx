"use client";

import { useState } from "react";
import { REPORTERS } from "@/config";
import { notes } from "@/lib/supabase";
import { encodeNote } from "@/lib/notes";
import PiP from "./pip";
import { openPiP, updatePiP, isPiPOpen } from "@/lib/pip";
import MonacoEditor from "@/components/MonacoEditor";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default function Form({
  initialNote,
  initialIdentifier,
  initialShortCode
}) {
  const [note, setNote] = useState(initialNote);
  const [copied, setCopied] = useState(false);
  const [shortCode, setShortCode] = useState(
    initialShortCode
      ? initialIdentifier
      : null
  );
  const [hash, setHash] = useState(() => encodeNote(initialNote));
  const displayedUrl = shortCode
    ? `https://cpa-pengauthor.vercel.app/note/${shortCode}`
    : `https://cpa-pengauthor.vercel.app/note/${hash}`;

  function updateNote(changes) {
    const updated = {
      ...note,
      ...changes,
      date: new Date().toISOString()
    };
    const nextHash = encodeNote(updated);
    setNote(updated);
    setHash(nextHash);
    setShortCode(null);
    window.history.replaceState(null, "", `/note/${nextHash}`);
    if (isPiPOpen()) updatePiP(PiP, {
      note: updated
    });
  }

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-8">
      <div className="flex gap-6">
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            placeholder="Note title"
            value={note.title}
            onChange={(event) => updateNote({ title: event.target.value })}
            className="w-full rounded-xl border border-edge bg-panel px-4 py-2 text-ink outline-none"
          />
        </div>
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium">
            Author
          </label>
          <input
            list="reporterName"
            type="text"
            placeholder="Note author"
            value={note.author}
            onChange={(event) => updateNote({ author: event.target.value })}
            className="w-full rounded-xl border border-edge bg-panel px-4 py-2 text-ink outline-none"
          />
          <datalist id="reporterName">
            {REPORTERS.map((reporter) => (
              <option key={reporter} value={reporter} />
            ))}
          </datalist>
        </div>
      </div>

      <p className="text-sm">
        <Icon name="clock" className="mr-2" />
        Last updated: <strong>{new Date(note.date).toLocaleString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })}</strong>
      </p>

      <div
        className="overflow-hidden rounded-xl border border-edge"
        style={{ height: "32rem" }}
      >
        <MonacoEditor
          language="markdown"
          value={note.content}
          onChange={(value) => updateNote({ content: value ?? "" })}
        />
      </div>

      <div className="flex w-full items-center gap-4 pt-4">
        <code
          className={`truncate rounded-xl border border-edge bg-panel px-3 py-2 text-sm  ${
            shortCode ? "flex-[2]" : "flex-[4]"
          }`}
        >
          {displayedUrl}
        </code>

        <Button
          icon="copy"
          onClick={async () => {
            await navigator.clipboard.writeText(
              displayedUrl.replace("cpa-pengauthor…", "https://cpa-pengauthor.vercel.app")
            );
            setCopied(true);
            setTimeout(() => { setCopied(false); }, 1000);
          }}
        >
          {copied ? "Copied!" : "Copy link"}
        </Button>

        {!shortCode && (
          <Button
            icon="publish"
            onClick={async () => {
              const code = await notes.createShortLink(encodeNote(note));
              setShortCode(code);
              window.history.replaceState(null, "", `/note/${code}`);
            }}
          >
            Shorten link
          </Button>
        )}
      </div>

      <Button
        className="w-full"
        icon="pictureInPicture"
        onClick={() => openPiP(PiP, {
          width: 300,
          height: 200,
          props: { note }
        })}
      >
        Overlay this note
      </Button>
    </main>
  );
}
