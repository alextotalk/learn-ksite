"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
}

function parseInline(text: string): React.ReactNode[] {
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index} className="md-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={index} className="md-inline-code">{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="md-link">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentList: { items: string[]; ordered: boolean } | null = null;
  let currentTable: string[] | null = null;
  let currentCode: { lang: string; lines: string[] } | null = null;

  const flushList = (key: number) => {
    if (currentList) {
      const ListTag = currentList.ordered ? "ol" : "ul";
      blocks.push(
        <ListTag key={`list-${key}`} className={`md-list ${currentList.ordered ? "md-ol" : "md-ul"}`}>
          {currentList.items.map((item, i) => (
            <li key={i} className="md-li">
              {parseInline(item)}
            </li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  const flushTable = (key: number) => {
    if (currentTable && currentTable.length > 0) {
      const rows = currentTable.map((r) =>
        r
          .split("|")
          .map((c) => c.trim())
          .filter((c, i, arr) => (i > 0 && i < arr.length - 1) || (arr.length <= 2 && c !== ""))
      );

      const headerRow = rows[0];
      const dataRows = rows.slice(2); // Skip header and separator

      blocks.push(
        <div key={`table-${key}`} className="md-table-wrapper">
          <table className="md-table">
            {headerRow && (
              <thead>
                <tr>
                  {headerRow.map((cell, i) => (
                    <th key={i}>{parseInline(cell)}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{parseInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  let idx = 0;
  while (idx < lines.length) {
    const line = lines[idx];
    const trimmed = line.trim();

    // Check Code blocks ```lang
    if (trimmed.startsWith("```")) {
      flushList(idx);
      flushTable(idx);

      if (currentCode) {
        blocks.push(
          <div key={`code-${idx}`} className="md-code-block">
            <div className="md-code-header">💻 {currentCode.lang || "code"}</div>
            <pre className="md-code-pre">
              <code>{currentCode.lines.join("\n")}</code>
            </pre>
          </div>
        );
        currentCode = null;
      } else {
        const lang = trimmed.slice(3).trim();
        currentCode = { lang, lines: [] };
      }
      idx++;
      continue;
    }

    if (currentCode) {
      currentCode.lines.push(line);
      idx++;
      continue;
    }

    // Check Table
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList(idx);
      if (!currentTable) currentTable = [];
      currentTable.push(trimmed);
      idx++;
      continue;
    } else if (currentTable) {
      flushTable(idx);
    }

    // Horizontal Rule
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushList(idx);
      blocks.push(<hr key={`hr-${idx}`} className="md-hr" />);
      idx++;
      continue;
    }

    // Headings
    if (trimmed.startsWith("#### ")) {
      flushList(idx);
      blocks.push(<h4 key={`h4-${idx}`} className="md-h4">{parseInline(trimmed.slice(5))}</h4>);
      idx++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushList(idx);
      blocks.push(<h3 key={`h3-${idx}`} className="md-h3">{parseInline(trimmed.slice(4))}</h3>);
      idx++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushList(idx);
      blocks.push(<h2 key={`h2-${idx}`} className="md-h2">{parseInline(trimmed.slice(3))}</h2>);
      idx++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushList(idx);
      blocks.push(<h1 key={`h1-${idx}`} className="md-h1">{parseInline(trimmed.slice(2))}</h1>);
      idx++;
      continue;
    }

    // Lists
    const ulMatch = trimmed.match(/^[*|-]\s+(.*)/);
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);

    if (ulMatch) {
      if (!currentList || currentList.ordered) {
        flushList(idx);
        currentList = { items: [], ordered: false };
      }
      currentList.items.push(ulMatch[1]);
      idx++;
      continue;
    }

    if (olMatch) {
      if (!currentList || !currentList.ordered) {
        flushList(idx);
        currentList = { items: [], ordered: true };
      }
      currentList.items.push(olMatch[2]);
      idx++;
      continue;
    }

    // Empty lines
    if (trimmed === "") {
      flushList(idx);
      idx++;
      continue;
    }

    // Paragraph
    flushList(idx);
    blocks.push(
      <p key={`p-${idx}`} className="md-p">
        {parseInline(trimmed)}
      </p>
    );
    idx++;
  }

  flushList(lines.length);
  flushTable(lines.length);

  return <div className="markdown-rendered">{blocks}</div>;
}
