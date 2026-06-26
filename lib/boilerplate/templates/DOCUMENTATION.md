# Templates

To create a template for a certain post type, create a JSON file in this directory with the post type key and the trailing `.json` extension. By default, all post types rely on `default.json`, but creating a new JSON file can override the boilerplate template.

Remember, a template is an ordered array of objects. Each of these objects define an element. The order in which these objects are placed in the array will affect the order in which the elements are placed.

## Elements

Below are the elements that can be inserted into a template's JSON configuration. All options for each element are shown with their default values, as well as their meanings in comments. Unless otherwise stated for an option, if an option is not set, the default value will be taken. However, the "type" option is required in all cases.

### Blockquote

The blockquote object offers the following options…

```json
{
  "type": "blockquote",         // Defines a blockquote
  "content": "Blockquoted text" // Sets the paragraph of the blockquote
}
```

### Heading

```json
{
  "type": "heading",            // Defines a heading
  "content": "Section Heading", // Sets the text of the heading
  "settings": {
    "level": 3,                 // Sets the level of the heading
    "useAkira": true            // Sets the font ("format") of the heading
  }
}
```

**Note:** useAkira is forced to be `true` for Heading 3, unless it has been explicitly set to `false`.

### Horizontal Rule

```json
{
  "type": "horizontalRule"    // Defines a horizontal rule
}
```

### Image

```json
{
  "type": "image",             // Defines an image
  "attachmentId": 00000,       // Required if non-helper; the WordPress attachment ID for the image
  "src": "",                   // Required if non-helper; the complete URL of the image
  "height": 000,               // Required if non-helper; the image's height when it is 500 pixels wide
  "caption": "",               // Useless if helper; the caption text for the image
  "helperText": ""             // Sets helper text
}
```

**Note:** If `src` is set to `"thumbnail"`, then `attachmentId`, `src`, `caption`, and `height` are auto-determined. If that is the case, then providing these four properties is not required.

**Note:** A helper image means that there is a paragraph-like placeholder in the place of where an image should be. This is used to give helper text to reporters when they are expected to add images on their own.

**Note:** If both, `attachmentId` and `src`, are not provided, then a paragraph containing the `helperText` will be used. Otherwise, `helperText` has no use.

### Interview
An interview can be one of two formats…

1. Single-question interview
2. Multi-question interview

Single-question interview uses the following format, and supports just one question per interview section:

```json
{
  "type": "interview",         // Defines an interview section
  "question": "Question 1",    // Sets the question as a heading
  "answer": "Answer"           // Sets the answer in a blockquote
}
```

Multi-question interview instead uses an array of question objects, and it can also be used as a replacement for a single-question interview:

```json
{
  "type": "interview",         // Defines an interview section
  "questions": [
    {
      "question": "Question 1", // Sets question 1
      "answer": "Answer"        // Sets answer to question 1
    },
    {
      "question": "Question 2", // Sets question 1
      "answer": "Answer"        // Sets answer to question 1
    },
    {
      "question": "Question 3", // Sets question 1
      "answer": "Answer"        // Sets answer to question 1
    },
    // …
  ]
}
```

**Note:** Setting `questions` to `"generatedQuestions"` will auto-determine the questions based on the questions set in the Generator page's form data.

**Note:** Providing the `answer` field is optional. Not providing the `answer` field will automatically result in `"Answer"` being set as the value of `answer`.

### Paragraph
A paragraph can be one of two formats…

1. PLAIN
2. SIGNOFF
3. PRE-INTERVIEW

```json
{
  "type": "paragraph",         // Defines a paragraph
  "content": "[Paragraph]",    // Sets the paragraph text
  "settings": {
    "type": "PLAIN",           // Sets the paragraph format: "PLAIN", "SIGNOFF", or "PRE-INTERVIEW"
    "align": "center"          // Aligns the paragraph text: "left", "center", "right", or "justify"
  }
}
```

**Note:** SIGNOFF is context-driven since it needs data about the reporter from the Generator page's form. This means that the sign-off color, the name of the reporter, and the reporter's position are passed to the paragraph through the compiler.

### Read More Tag

```json
{
  "type": "readMore"    // Defines the read more tag
}
```
