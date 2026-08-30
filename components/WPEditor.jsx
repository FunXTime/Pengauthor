"use client";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Icon from "./Icon";
import "./WPEditor/overrides.css";
import '../public/fonts/dashicons.woff2';

export default function WPEditor({
  initialValue = "",
  onChange,
  height = 380
}) {
  const editorRef = useRef(null);
  const [activeTab, setActiveTab] = useState("visual");
  const [editorContent, setEditorContent] = useState(initialValue);

  useEffect(() => {
    setEditorContent(initialValue);
  }, [initialValue]);

  function update(content) {
    setEditorContent(content);
    onChange?.(content);
  }

  function switchTab(tab) {
    setActiveTab(tab);
  }

  return (
    <div style={styles.editorWrap}>
      <div
        style={styles.header}
        className="flex flex-col items-stretch sm:flex-row sm:items-end sm:justify-between"
      >
        <div
          className="flex flex-row flex-wrap justify-start gap-2 sm:flex-nowrap sm:gap-[5px]"
          style={{ marginBottom: "15px" }}
        >
          <button
            id="btn-addmedia"
            type="button"
            style={styles.headerButton}
            onClick={() => alert("Media Library can't be accessed in Pengauthor! This button just exists here. It looks cool, doesn't it?")}
          >
            <span className="dashicons dashicons-admin-media"></span> Add Media
          </button>

          <button
            id="btn-addfa"
            type="button"
            style={styles.headerButton}
            onClick={() => alert("Font Awesome icons can't be accessed in Pengauthor! This button just exists here. It looks cool, doesn't it?")}
          >
            <Icon name="fontawesome" /> Add Font Awesome
          </button>
        </div>

        <div
          style={styles.tabs}
          className="flex w-full justify-center sm:w-auto sm:justify-end"
        >
          {["visual", "code"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => switchTab(tab)}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              className="min-w-0 flex-none"
            >
              {tab === "visual" ? "Visual" : "Code"}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.body}>
        {activeTab === "visual" ? (
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            onInit={(_, editor) => editorRef.current = editor}
            value={editorContent}
            onEditorChange={update}
            init={{
              height,
              skin: "lightgray",
              theme: "modern",
              menubar: false,
              branding: false,
              statusbar: true,
              elementpath: true,
              plugins: "lists link directionality hr textcolor paste charmap help wordcount",
              toolbar1: "formatselect bold italic bullist numlist blockquote alignleft aligncenter alignright link wp_more wp_adv",
              toolbar2: "styleselect strikethrough hr forecolor pastetext removeformat charmap outdent indent undo redo help",
              style_formats: [
                { title: 'Akira Font', inline: 'span', classes: 'font-akira' }
              ],
              textcolor_map: [
                "000000", "Black",      "993300", "Burnt orange",   "333300", "Dark olive",   "003300", "Dark green",
                "003366", "Dark azure", "000080", "Navy Blue",      "333399", "Indigo",       "333333", "Very dark gray",

                "800000", "Maroon",     "FF6600", "Orange",         "808000", "Olive",        "008000", "Green",
                "008080", "Teal",       "0000FF", "Blue",           "666699", "Grayish blue", "808080", "Gray",

                "FF0000", "Red",        "FF9900", "Amber",          "99CC00", "Light green",  "339966", "Medium green",
                "33CCCC", "Turquoise",  "3366FF", "Royal blue",     "800080", "Purple",       "999999", "Medium gray",

                "FF00FF", "Magenta",    "FFCC00", "Gold",           "FFFF00", "Yellow",       "00FF00", "Lime",
                "00FFFF", "Aqua",       "00CCFF", "Sky blue",       "993366", "Red violet",   "FFFFFF", "White",

                "FF99CC", "Pink",       "FFCC99", "Peach",          "FFFFCC", "Light yellow", "CCFFCC", "Pale green",
                "CCFFFF", "Pale cyan",  "99CCFF", "Light sky blue", "CC99FF", "Plum", "87d1ff", "Club Penguin Armies",

                "ca2244", "Club Penguin Army Judges"
              ],
              textcolor_cols: 8,
              textcolor_rows: 6,
              custom_colors: true,
              content_css: "/tinymce/content.css",
              setup: (editor) => {
                editor.addButton('wp_more', {
                  tooltip: 'Insert Read More Tag',
                  onclick: () => editor.insertContent('<!--more-->')
                });
                editor.addButton('wp_adv', {
                  tooltip: 'Toolbar Toggle',
                  onPostRender: function() {
                    this.active(true);
                  },
                  onclick: function () {
                    const container = editor.getContainer();
                    if (container) {
                      const rows = container.querySelectorAll('.mce-toolbar');
                      if (rows && rows[1]) {
                        const isHidden = rows[1].style.display === 'none';
                        rows[1].style.display = isHidden ? 'block' : 'none';
                        this.active(isHidden); 
                      }
                    }
                  }
                });
                editor.on('init', () => {
                  const container = editor.getContainer();
                  if (container) {
                    const rows = container.querySelectorAll('.mce-toolbar');
                    if (rows && rows[1]) rows[1].style.display = 'block';
                  }
                });
              }
            }}
          />
        ) : (
          <textarea
            value={editorContent}
            onChange={(e) => update(e.target.value)}
            style={styles.textarea}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  editorWrap: {
    width: "100%",
    background: "transparent",
    boxShadow: "0 1px 1px rgba(0,0,0,.04)",
    fontFamily: "var(--font-burbank)"
  },

  header: {
    alignItems: "flex-end",
    padding: "14px 10px 0",
    background: "transparent",
    select: "none"
  },

  headerButton: {
    background: "#f0f0f0",
    border: "1px solid #3858e9",
    color: "#3858e9",
    borderRadius: "2px",
    padding: "10px 7px 10px 5px",
    fontSize: "13px",
    cursor: "pointer"
  },

  tabs: {
    display: "flex",
    gap: "4px"
  },

  tab: {
    background: "#f0f0f0",
    padding: "7px 14px",
    fontSize: "13px",
    color: "#646970",
    cursor: "pointer",
    marginLeft: "4px",
    fontFamily: '"Burbank", sans-serif',
  },

  activeTab: {
    background: "#f9f6ef"
  },

  body: {
    background: "#fff"
  },

  textarea: {
    width: "100%",
    height: "426px",
    padding: "16px",
    display: "block",
    resize: "vertical",
    outline: "none",
    border: "none",
    background: "#fff",
    color: "#32373c",
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: "13px",
    lineHeight: "1.6"
  }
};
