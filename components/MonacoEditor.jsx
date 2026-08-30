"use client";

import Editor from "@monaco-editor/react";

export default function MonacoEditor({
  className,
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
        "editor.background": "#0a0603",
        "editor.lineHighlightBackground": "#140c06",
        "editorCursor.foreground": "#e2e2e2",
        "editor.selectionBackground": "#784426"
      }
    });
    monaco.editor.setTheme("pengauthor");
    editor.updateOptions({
      automaticLayout: true,
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
      readOnlyMessage: {
        value: "Edit this note in Pengauthor, not here!",
        isTrusted: true
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
        className={className}
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
