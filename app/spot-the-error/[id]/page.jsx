import { notFound } from "next/navigation";
import { loadPost } from "@/lib/spot-the-error";
import compile from "@/lib/boilerplate/compile";
import { SPOT_THE_ERROR_POSTS } from "@/config";
import Form from "./Form";

export default async function SpotTheErrorPost({
  params
}) {
  const { id } = await params;
  const challenge = SPOT_THE_ERROR_POSTS.find(
    (post) => post.id === id
  );
  if (!challenge) notFound();
  const { unedited } = await loadPost(id);
  const initialValue = compile(unedited, {
    spotTheError: true,
    reporterName: "Fun X Time",
    reporterPosition: "Reporter",
    thumbnail: challenge.thumbnail
  });

  return (
    <div className="space-y-6 p-8">
      <h1>{challenge?.title ?? id}</h1>
      <Form
        id={id}
        initialValue={initialValue}
      />
    </div>
  );
}
