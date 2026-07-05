"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeNote } from "@/lib/notes";
import MonacoEditor from "@/components/MonacoEditor";

export default function Form({
  initialNote
}) {
  const router = useRouter();
  const [note, setNote] = useState({
    ...initialNote,
    date: initialNote.date || new Date().toISOString()
  });
  const [copied, setCopied] = useState(false);

  function updateNote(changes) {
    const updated = {
      ...note,
      ...changes,
      date: new Date().toISOString()
    };
    setNote(updated);
    const hash = encodeNote(updated);
    window.history.replaceState(null, "", `/note/${hash}`);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-8">
      <div className="flex gap-6">
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-faint">
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
          <label className="block text-sm font-medium text-faint">
            Author
          </label>
          <input
            type="text"
            placeholder="Author"
            value={note.author}
            onChange={(event) => updateNote({ author: event.target.value })}
            className="w-full rounded-xl border border-edge bg-panel px-4 py-2 text-ink outline-none"
          />
        </div>
      </div>

      <p className="text-sm text-faint">
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

      <div className="flex justify-center pt-4">
        <button
          type="button"
          className="w-1/2 rounded-xl border border-edge bg-panel px-4 py-2 text-sm font-medium text-ink transition hover:bg-panel-raised cursor-pointer"
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => { setCopied(false); }, 1000);
          }}
        >
          {copied ? "Copied!" : "Copy note link"}
        </button>
      </div>
    </main>
  );
}
