import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <section className="flex w-full max-w-3xl flex-col items-center text-center unboxed">
        <Icon
          name="notFound"
          className="mb-6 h-24 w-24"
        />
        <h1 className="font-akira text-3xl text-ink">
          404 NOT FOUND
        </h1>
        <p className="mt-4 max-w-xl text-faint">
          <strong>The page you are looking for does not exist!</strong> Use the sidebar on the left to navigate through Pengauthor instead. If you are unable to search for something, contact a Reporting Head.
        </p>
      </section>
    </div>
  );
}
