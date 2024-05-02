import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "./index.css";

import { useEditorContext } from "../../lib";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

marked.use({
  async: false,
  pedantic: false,
  breaks: true,
  gfm: true,
});

const Preview = () => {
  const [value] = useEditorContext();
  const markedValue = marked.parse(value);

  return (
    <div
      id="hlog-editor"
      className="h-[90%] p-3"
      dangerouslySetInnerHTML={{
        __html: markedValue,
      }}
    />
  );
};

export default Preview;
