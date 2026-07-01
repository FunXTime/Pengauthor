export default function OverviewPage() {
  return (
    <div className="space-y-6 p-8">
      <h1>Overview</h1>
      <p className="text-faint">
        <strong>Pengauthor is the premier reporting utility at Club Penguin Armies, designed for making the work of Media Department members easier!</strong> Pengauthor is a utilitarian suite of various tools that simplifies journalism and add uniformity. Developed in the summer of 2026, Pengauthor is actively curated by Editor-in-Chief Fun X Time. Through this powerful utility, CPA aims to make posts more structured and well-formatted.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <section className="w-2/3">
            <h2>Create Posts</h2>
            <p className="mt-3 text-faint">
              Use the <strong>boilerplate generator</strong> to create perfectly-formatted, well-structured articles blazingly fast. Why spend time over formatting when Pengauthor does that for you?
            </p>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/create-posts.png"
          />
        </div>
        <div className="flex flex-row-reverse gap-6">
          <section className="w-2/3">
            <h2>Start a Research</h2>
            <p className="mt-3 text-faint">
              Initiate a research using the <strong>Research</strong> tool for your post. Get relevant posts from credible organizations, including those from the past. Just pick the right keyword and set some filters, and we'll do the rest!
            </p>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/start-a-research.png"
          />
        </div>
        <div className="flex gap-6">
          <section className="w-2/3">
            <h2>Use the Colorizer</h2>
            <p className="mt-3 text-faint">
              Coming soon.
              <br />
              <br />
              <br />
            </p>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/use-the-colorizer.png"
          />
        </div>
        <div className="flex flex-row-reverse gap-6">
          <section className="w-2/3">
            <h2>Complete Checkups</h2>
            <p className="mt-3 text-faint">
              Why lose valuable score on a hard-worked post simply because you missed some simple things? Perform this super-quick checkup before finishing your post as a self-test. Get a list of improvements and an out-of-12 score after the checkup.
            </p>
          </section>
          <img
            className="w-1/3 rounded-xl"
            src="overview/complete-checkups.png"          
          />
        </div>
      </div>
    </div>
  );
}
