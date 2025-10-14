import React from 'react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code?: string;
  language?: string;
  children?: string;
}

export default function CodeBlock({ code, language = 'javascript', children }: CodeBlockProps) {
  const codeContent = code || children || '';

  return (
    <pre className={styles.codeBlock}>
      <code className={styles.code}>
        {codeContent}
      </code>
    </pre>
  );
}