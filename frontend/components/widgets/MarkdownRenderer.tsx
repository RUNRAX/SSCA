'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-body text-sm leading-relaxed text-white/90 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* ── Headings ── */
          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-white mt-4 mb-2 first:mt-0 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-white mt-3.5 mb-1.5 first:mt-0 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-white/95 mt-3 mb-1 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-medium text-white/90 mt-2.5 mb-1 first:mt-0">
              {children}
            </h4>
          ),

          /* ── Paragraphs ── */
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
          ),

          /* ── Code ── */
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="bg-white/10 text-cyan-300/90 px-1.5 py-0.5 rounded text-[0.8em] font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            const language = className?.replace('language-', '') || '';
            return (
              <code className={`block font-mono text-xs ${className}`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-black/30 backdrop-blur-sm rounded-lg p-3 my-2 overflow-x-auto border border-white/5 text-[0.8em]">
              {children}
            </pre>
          ),

          /* ── Lists ── */
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-0.5 marker:text-white/40">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-0.5 marker:text-white/40">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-white/85 leading-relaxed">{children}</li>
          ),

          /* ── Links ── */
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-400/30 hover:decoration-cyan-300/60 transition-colors"
            >
              {children}
            </a>
          ),

          /* ── Blockquote ── */
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-cyan-400/40 pl-3 my-2 text-white/70 italic">
              {children}
            </blockquote>
          ),

          /* ── Horizontal Rule ── */
          hr: () => (
            <hr className="border-white/10 my-3" />
          ),

          /* ── Tables ── */
          table: ({ children }) => (
            <div className="overflow-x-auto my-2 rounded-lg border border-white/10">
              <table className="w-full text-xs">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5 border-b border-white/10">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.03] transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-1.5 text-left font-medium text-white/80 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-1.5 text-white/70 whitespace-nowrap">{children}</td>
          ),

          /* ── Strong & Emphasis ── */
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-white/80">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
