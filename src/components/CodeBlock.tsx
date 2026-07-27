import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
