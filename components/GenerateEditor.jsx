"use client";

import MonacoEditor from "@/components/MonacoEditor";

const DEFAULT_CODE = `<!--

  Set some options first, and you'll see your boilerplate here!

  • The boilerplate will update as you set options on the left
  • To paste the boilerplate code, go to your post's editor and switch the editing mode from Visual to Code; revert back to Visual once after pasting
  • Always review the generated boilerplate contents, and make amends as needed
  • Your options are saved in your browser for next time
  • You can edit the boilerplate code in this editor, but changing the options will undo the edits you make
  • This Visual Studio Code-like editor has some interesting abilities; press F1 for all commands and keybinds

-->`;

export default function GenerateEditor({
  value,
  onChange
}) {
  return (
    <MonacoEditor
      value={value || DEFAULT_CODE}
      onChange={(value) => onChange(value ?? "")}
      language="html"
    />
  );
}