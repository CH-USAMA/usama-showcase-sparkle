// PrismLight with the languages the posts use, not the full Prism build. The
// full build bundled and registered all ~300 refractor grammars: a 227 kB
// (gzipped) chunk on every post with a code block, and the longest task on
// the page while it registered them. A fence in any other language renders
// as plain text (refractor throws, the highlighter falls back). To highlight
// a new language, import it here and register it.
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import ini from "react-syntax-highlighter/dist/esm/languages/prism/ini";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import nginx from "react-syntax-highlighter/dist/esm/languages/prism/nginx";
import php from "react-syntax-highlighter/dist/esm/languages/prism/php";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

// Each grammar also registers its own aliases: ts, js, shell, py, yml, html,
// xml, dockerfile.
const LANGUAGES = { bash, css, docker, ini, javascript, json, jsx, markup, nginx, php, python, sql, tsx, typescript, yaml };
for (const [name, grammar] of Object.entries(LANGUAGES)) SyntaxHighlighter.registerLanguage(name, grammar);

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => (
  <SyntaxHighlighter
    language={language}
    style={vscDarkPlus}
    customStyle={{ borderRadius: '8px', fontSize: '14px', lineHeight: '1.5', margin: '1.5rem 0' }}
    showLineNumbers
  >
    {code}
  </SyntaxHighlighter>
);

export default CodeBlock;
