"use client";

import Editor from "@monaco-editor/react";

export default function MonacoEditor({
  value,
  onChange,
  language = "html",
  readOnly = false
}) {
  function handleMount(editor, monaco) {
    monaco.editor.defineTheme("pengauthor", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0f0f10",
        "editor.lineHighlightBackground": "#17181a",
        "editorCursor.foreground": "#e6edf3",
        "editor.selectionBackground": "#264f78"
      }
    });
    monaco.editor.setTheme("pengauthor");
    editor.updateOptions({
      automaticLayout: false,
      autoIndent: "full",
      bracketPairColorization: {
        enabled: true
      },
      cursorSmoothCaretAnimation: "on",
      folding: true,
      fontFamily: "Consolas, Monaco, monospace",
      fontSize: 14,
      formatOnPaste: false,
      formatOnType: true,
      guides: {
        bracketPairs: true,
        indentation: true
      },
      insertSpaces: true,
      minimap: {
        enabled: true,
        showSlider: "always"
      },
      padding: {
        top: 8
      },
      renderLineHighlight: "all",
      renderWhitespace: "boundary",
      roundedSelection: true,
      scrollbar: {
        verticalScrollbarSize: 5
      },
      scrollBeyondLastLine: true,
      smoothScrolling: true,
      tabSize: 2,
      wordWrap: "on"
    });
  }

  return (
    <div className="monacoEditorWrapper">
      <Editor
        language={language}
        value={value}
        onChange={onChange}
        height="100%"
        theme="pengauthor"
        options={{ readOnly }}
        onMount={handleMount}
      />
    </div>
  );
}