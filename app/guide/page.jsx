import Accordion from "@/components/Accordion";
import Icon from "@/components/Icon";
import Infobox from "@/components/Infobox";

export default function OverviewPage() {
  return (
    <div className="space-y-6 p-8">
      <h1>Guide</h1>
      <p>
        <strong>I am Editor-in-Chief Fun X Time, and I'll guide you through how Pengauthor works!</strong> Personally, I'm quite fond of my own creation, and I bet its users will end up liking it as well. Let's dive into how you can make the most out of this powerful tool.
      </p>

      <Accordion title="What is Pengauthor?">
        Pengauthor is a <strong>suite of tools or utilities</strong>. It is a dashboard created for members of the Media Department, with tools that help write posts seamlessly.
      </Accordion>

      <Accordion title="Am I required to use Pengauthor for a post?">
        Nope! There is no compulsion to use Pengauthor regardless of what your position in the Media Department is. If you are confident with the traditional way of writing posts, you are free to do so! However, it is encouraged to use Pengauthor to minimize errors and follow consistency.
      </Accordion>

      <hr className="my-6 border-edge" />

      <h2 className="text-center">Generate a boilerplate</h2>
      <Accordion title="What does a boilerplate mean?">
        In the context of the Media Department, a boilerplate refers to a standardized, reusable template that can be used repeatedly across multiple posts without significant changes in formatting. It saves time and ensures consistency, allowing you to avoid starting from scratch for something standardized!
      </Accordion>

      <section className="content">
        <p>
          <strong>1.</strong> To create a boilerplate, open the <a href="/generate" target="_blank">boilerplate generation tool</a> in a new tab. You can also visit this page by clicking the <strong><Icon name="generate" inline={true} /> Generate</strong> button in the sidebar on the left of your screen.
        </p>
        <img src="/guide/generator-on-the-sidebar.png" />
        <p>
          <strong>2.</strong> Fill in some details about yourself — <strong>your position</strong>, your <strong>reporter name</strong>, and choose a <strong>sign-off color</strong>. These details are used to generate the sign-off in your post.
        </p>
        <img src="/guide/reporter-details.png" />
        <p>
          <strong>3.</strong> Select the <strong>kind of post</strong> you're writing. This detail is used to tailor the boilerplate based on the post. Mark your News post as Breaking News if you have been asked to; it will update the thumbnail.
        </p>
        <img src="/guide/post-details.png" />
        <p>
          <strong>4.</strong> If your post includes <strong>an interview section</strong>, you can write or generate up to 10 interview questions. Usually, an interview has very few questions. Question generation will produce commonly asked questions based on the kind of post you're writing, with the most common or relevant being generated first. If you don't wish to include an interview section, simply uncheck the <strong>Add interview section</strong> option.
        </p>
        <img src="/guide/interview-options.png" />
        <p>
          <strong>5.</strong> Tags are suggested based on your post configuration. Follow the tag suggestions as appropriate! Some tags can be hovered to see a related tip. You can also click a tag to "mark it as done," so you don't accidentally miss a tag.
        </p>
        <img src="/guide/suggested-tags.png" />

        <p>
          <strong>And, your boilerplate is ready!</strong> That was easy. Copy the code snippet that has been generated for you on the right side of your screen, and paste it in your post's Code editor. Once you have pasted the snippet into the Code editor, you can switch back to Visual mode to see the results!
        </p>
      </section>

      <Infobox type="WARNING">
        Although the boilerplate generator has the ability to create questions for you, it is usually recommended to think of some questions yourself. These unique questions should be personalized or tailored for a certain topic.
      </Infobox>

      <Infobox type="WARNING">
        While the boilerplate generator is able to suggest tags, it will not be able to suggest all of them. Please remember to add any other tags that are appropriate for your post apart from the suggested tags.
      </Infobox>

      <Infobox type="SUCCESS">
        The boilerplate generator makes your post structure error-free. The traditional way of manually organizing the post and formatting it would have the chance of causing error.
      </Infobox>

      <Infobox type="SUCCESS">
        Some of the data you pass to the generator is saved locally on your browser.
      </Infobox>

      <hr className="my-6 border-edge" />

      <h2 className="text-center">Start a research</h2>

      <section className="content">
        <p>
          <strong>1.</strong> To begin a research, open the <a href="/research" target="_blank">research tool</a> in a new tab. You can also visit this page by clicking the <strong><Icon name="research" inline={true} /> Research</strong> button in the sidebar on the left of your screen.
        </p>
        <img src="/guide/research-on-the-sidebar.png" />
        <p>
          <strong>2.</strong> Enter your search query. Try using keywords that you most likely expect in the kind of posts you're searching for. You can set a lookback year, which will limit the search results to only those posts that were made in that year or later. You can also filter among eight organizations. Uncheck <strong>Search for Top Ten posts</strong> if you don't want Top Ten posts to clutter the results.
        </p>
        <img src="/guide/research-query.png" />
        <p>
          <strong>3.</strong> Run the search. It may take a few moments for the results to appear. If you want to see results being fetched in real-time, you can open the browser console if available.
        </p>
        <img src="/guide/research-loading.png" />
        <p>
          <strong>4.</strong> Once the results load, the data is all yours!
        </p>
        <img src="/guide/research-results.png" />

        <p>
          <strong>This is a shorthand to doing research on each site!</strong> At the moment, the Research tool is not very accurate and might not be useful. However, it's good if you need to perform an intense search.
        </p>
      </section>

      <Accordion title="What websites does the research tool search from?">
        The research tool currently searches across seven well-known organizations from the past, as well as from the present-day Club Penguin Armies league. The other seven organizations include <strong>Club Penguin Army Central</strong> and <strong>Club Penguin Army Hub</strong>, which are recommended sources for writing at CPA. You can filter out organizations from your search by changing your selection.
      </Accordion>

      <Accordion title="How exactly does the search feature work?">
        The research utility uses the same search technology as the search boxes present on army organization sites. The research utility connects with a WordPress API based on the organization it is searching in. One by one, requests are sent to WordPress to fetch posts based on the given query. However, the searches you make are not sorted by relevance but by date on Pengauthor. Sorting by relevance is not currently possible with this tool.
      </Accordion>

      <Infobox type="WARNING">
        The research utility is incomplete and is not very accurate. While it is better than traditionally searching through websites, it currently has many flaws. You can use this tool to get information, but you won't get all the information that is available in the public domain.
      </Infobox>

      <Infobox type="SUCCESS">
        The search results are saved in your browser until you start a new search, or close the browser entirely.
      </Infobox>

      <hr className="my-6 border-edge" />

      <h2 className="text-center">Proofreading posts</h2>

      <section className="content">
        <p>Before finishing your post, you might want to complete a quick checkup! This short and interactive checkup can save you from accidentally losing points. We strongly encourage you complete this checkup before turning your post in.</p>
        <img src="/guide/post-checkup.png" />
      </section>

      <Accordion title="How many questions are there?">
        There are 12 questions in total. However, you might not need to answer some of them, depending on how you answer certain questions! For example, if you used the boilerplate generator, you can answer the first question in affirmative to directly jump to question 7!
      </Accordion>

      <Accordion title="Do I get a summary?">
        Yes! At the end of a checkup, you'll get a brief summary of what to improve on your post. You also receive a score on your checkup, which you can use for self-assessment sake. If you care, you can also share your checkup score to Reporting Heads as a flex!
      </Accordion>

      <hr className="my-6 border-edge" />

      <h2 className="text-center">Sharing notes</h2>

      <section className="content">
        <p>A note is an informal short document that can be used to pass paragraphs of text. In the Media Department, we use notes to provide instructions for writing a post. A note can also be used to provide other large blocks of text. Interestingly, notes support <strong>markdown</strong>, which is the same formatting technology used in Discord messages, but with more features.</p>
        <p>You can share a note by sending its link. A link can contain a permanent long hash or a temporary short code, which resembles the note.</p>
        <img src="/guide/sample-note.png" />
        <p>You can find relevant options under the editor! These options make your note truly useful.</p>
        <img src="/guide/note-options.png" />
      </section>

      <Accordion title="The note link is too long! How can I shorten it?">
        The hashed note link is indeed very lengthy. To shorten it, simply use the <strong>Shorten URL</strong> button next to the note link. This will save your note on an internal database temporarily, and your link will be shortened to just a four-digit code.
      </Accordion>

      <Accordion title="How long is a note saved for?">
        If you share a note using its super-lengthy hashed link, the note's contents are stored in this hash and hence the link is permanent. On the other hand, a four-digit code of a shortened link expires after 30 days from its creation. It may take up to 15 minutes to complete the deletion on the 30th day of a note.
      </Accordion>

      <Accordion title="Can I overlay the note across windows on my device?">
        Of course! On most devices and browsers, picture-in-picture technology is supported. If it is, you'll be able to use the <strong>Overlay this note</strong> button under a note to make the note stick to your screen. This feature is useful if you want to see the contents of a note while you're writing!
      </Accordion>

      <Accordion title="Can I edit the contents of a note?">
        If you edit the contents of a note, a new note link is generated regardless of whether the note had a shortened URL. Once a note's URL is shortened, its contents cannot be changed. If you edit the contents of such a note, you'll need to shorten the URL again. In other words, you'll need to regenerate a new note code if you make a change to such a note.
      </Accordion>

    </div>
  );
}
