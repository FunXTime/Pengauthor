import { decodeNote } from "@/lib/notes";
import Link from "next/link";
import Form from "../Form";

export default async function NotePage({
  params
}) {
  const { hash } = await params;
  const note = hash
    ? decodeNote(hash)
    : {
        title: "",
        content: "",
        author: "",
        date: ""
      };

  if (hash && note === null) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <h1 className="text-2xl font-semibold text-ink">
          Oh no!
        </h1>
        <p className="mt-2 text-faint">
          This note link is invalid or corrupted! <Link href="/note" className="blue">Create a new note</Link>, or contact the person who shared this note link to you.
        </p>
      </main>
    );
  }

  return (
    <Form
      initialNote={note}
    />
  );
}
