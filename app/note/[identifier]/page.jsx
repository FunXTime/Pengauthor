import Link from "next/link";
import Form from "../Form";
import { decodeNote } from "@/lib/notes";
import { notes } from "@/lib/supabase";

export default async function NotePage({
  params
}) {
  const { identifier } = await params;
  const defaults = {
    title: "",
    content: "**Write a note here, then share it with anybody!** Markdown is supported.",
    author: "",
    date: new Date().toISOString()
  };
  let note = defaults;
  let initialShortCode = false;

  if (identifier) {
    note = decodeNote(identifier);
    if (note === null) {
      const hash = await notes.resolveCode(identifier);
      if (hash) {
        initialShortCode = true;
        note = decodeNote(hash);
      }
    }
    if (note === null) {
      return (
        <div className="mx-auto max-w-5xl p-8">
          <h1 className="text-2xl font-semibold text-ink">
            Oh no!
          </h1>
          <p className="mt-2 text-faint">
            You've been linked to an invalid note! The note hash or code mentioned in the URL does not map to a valid note. <Link href="/note" className="blue">Create a new note</Link>, or contact the person who tried sharing this faulty note.
          </p>
          <p className="mt-2 text-faint">
            By the way, a note expires 30 days after its creation!
          </p>
        </div>
      );
    }
    note = { ...defaults, ...note };
  }

  return (
    <Form
      initialNote={note}
      initialIdentifier={identifier ?? null}
      initialShortCode={initialShortCode}
    />
  );
}
