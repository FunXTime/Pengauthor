"use client";

import MonacoEditor from "@/components/MonacoEditor";

export default function PiP({
  note
}) {
  return (
    <main className="flex h-screen flex-col bg-base p-4">
      <div className="mb-2">
        <h4>
          {note.title || "Untitled note"}
        </h4>

        <p className="text-sm text-faint">
          by {note.author || "Unknown author"}
        </p>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-edge">
        <MonacoEditor
          language="markdown"
          value={note.content}
          readOnly
        />
      </div>
    </main>
  );
}