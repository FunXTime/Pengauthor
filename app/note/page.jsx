import { redirect } from "next/navigation";
import { DEFAULT_NOTE_HASH } from "@/config";

export default function NotePage() {
  redirect(`/note/${DEFAULT_NOTE_HASH}`);
}
