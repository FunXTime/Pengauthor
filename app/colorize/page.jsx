"use client";

import { useState } from "react";
import Button from "@/components/Button";
import MonacoEditor from "@/components/MonacoEditor";
import { colorizeArmies } from "@/lib/colorize";
import Infobox from "@/components/Infobox";

export default function ColorizePage() {
  const [html, setHtml] = useState(
    `<!--\n`
  + `\n`
  + `  You can automatically colorize the names of certain entities in your post using this tool! To do so, just follow these simple steps…\n`
  + `\n`
  + `  1. Open your post on the Club Penguin Armies WordPress editor\n`
  + `  2. Switch from the "Visual" section to "Code"\n`
  + `  3. Select and copy all of the code contents; you can switch back to "Visual" after\n`
  + `  4. Erase all of this text that you are reading right now\n`
  + `  5. Paste what you copied\n`
  + `\n`
  + `-->`
  );

  function colorize() {
    setHtml(colorizeArmies(html));
  }

  return (
    <div className="space-y-6 p-8 pb-12">
      <div className="shrink-0">
        <h1>Colorize your post</h1>
        <p className="mt-2">
          Automatically color the names of armies using this tool. Coloring organization and tournament names could be possible in the future.
        </p>
      </div>

      <div>
        <div className="h-[calc(100vh-18rem)] min-h-[300px]">
          <MonacoEditor
            value={html}
            onChange={setHtml}
            language="html"
          />
        </div>

        <div className="mt-4">
          <Button
            className="w-full"
            icon="colorize"
            onClick={colorize}
          >
            Colorize this post
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Infobox type="INFO">
          This colorization tool will…
          <br />
          • Color and bold the first mention of each recognized army after the Read More tag
          <br />
          • Correct the capitalization of the army names throughout the post
          <br />
          • Correct the color of an army that has already been colored incorrectly
          <br />
          • Remove coloring and bolding from subsequent mentions of an army
        </Infobox>

        <Infobox type="WARNING">
          Cross-check whether the coloring was done successfully after the process. If you made a spelling error in your original post or used a variant army name, the army may not be recognized by the tool.
        </Infobox>
      </div>
    </div>
  );
}
