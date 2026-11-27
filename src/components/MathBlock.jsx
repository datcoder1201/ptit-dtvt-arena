import React, { useMemo } from 'react';
import katex from 'katex';

function renderInlineFormatting(text, keyPrefix) {
  if (!text) return null;
  // Parse **bold** and `code` cleanly inside non-math segments
  const fmtRegex = /(\*\*[^*\n]+?\*\*|`[^`\n]+?`)/g;
  const out = [];
  let last = 0;
  let m;
  let idx = 0;
  while ((m = fmtRegex.exec(text)) !== null) {
    if (m.index > last) {
      out.push(<React.Fragment key={`${keyPrefix}-t-${idx++}`}>{text.slice(last, m.index)}</React.Fragment>);
    }
    const raw = m[0];
    if (raw.startsWith('**')) {
      out.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-bold text-[var(--text-primary)]">
          {raw.slice(2, -2)}
        </strong>
      );
    } else {
      out.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-[0.88em] text-cyan-400"
        >
          {raw.slice(1, -1)}
        </code>
      );
    }
    last = fmtRegex.lastIndex;
  }
  if (last < text.length) {
    out.push(<React.Fragment key={`${keyPrefix}-t-${idx++}`}>{text.slice(last)}</React.Fragment>);
  }
  return out;
}

/**
 * Renders display ($$...$$), inline ($...$) LaTeX, plus **bold** and `code` inside Vietnamese prose.
 */
export function RichMath({ text = '', className = '' }) {
  const parts = useMemo(() => {
    if (!text) return [];
    const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
    const tokens = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) });
      }
      const raw = match[0];
      if (raw.startsWith('$$')) {
        tokens.push({ type: 'display', value: raw.slice(2, -2).trim() });
      } else {
        tokens.push({ type: 'inline', value: raw.slice(1, -1).trim() });
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      tokens.push({ type: 'text', value: text.slice(lastIndex) });
    }
    return tokens;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part.type === 'text') {
          return <React.Fragment key={idx}>{renderInlineFormatting(part.value, `p${idx}`)}</React.Fragment>;
        }
        try {
          const html = katex.renderToString(part.value, {
            displayMode: part.type === 'display',
            throwOnError: false,
            strict: false,
          });
          if (part.type === 'display') {
            return (
              <span
                key={idx}
                className="block my-2 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          return (
            <span
              key={idx}
              className="inline-block align-baseline mx-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx}>{part.value}</code>;
        }
      })}
    </span>
  );
}

export function FormulaBlock({ latex, display = true, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, display]);

  return (
    <span
      className={`${display ? 'block overflow-x-auto' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
