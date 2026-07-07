import Link from "next/link";
import Form from "../Form";
import Icon from "@/components/Icon";
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
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Icon
              name="invalidNote"
              className="mb-6 h-24 w-24 text-faint"
            />
            <h1 className="text-3xl font-akira text-ink">
              Oh no!
            </h1>
            <p className="mt-4 text-faint">
              You've been linked to an invalid note! The note hash or code in the
              URL does not map to a valid note. <Link href="/note" className="blue">Create a new note</Link>, or contact the person who shared this faulty note.
            </p>
            <p className="mt-4 text-faint">
              By the way, shortened note links automatically expire 30 days after
              they're created.
            </p>
          </div>
        </main>
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
