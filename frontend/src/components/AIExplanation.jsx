import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIExplanation({ text }) {
  const isFailed = !text || text.toLowerCase().includes("failed") || text.toLowerCase().includes("error");

  const busyText = `### Protocol Status
AI is currently busy optimizing your biological protocol. Our intelligence stack is processing multiple data points to ensure maximum efficiency. 

Please initiate a new audit or refresh in a moment to view your verified optimization.`;

  const contentToRender = isFailed ? busyText : text;

  function renderInline(str) {
    const parts = str.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-bold text-slate-900">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  function renderLines() {
    const lines = contentToRender.split("\n");
    const elements = [];
    let listBuffer = [];

    function flushList() {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-3 mb-6">
            {listBuffer.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-light">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) { flushList(); continue; }

      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-8 mb-4 first:mt-0">
            {renderInline(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith("## ") || line.startsWith("# ")) {
        flushList();
        const content = line.startsWith("## ") ? line.slice(3) : line.slice(2);
        elements.push(
          <h2 key={i} className="text-xl font-serif text-slate-900 mt-10 mb-5 first:mt-0 leading-tight">
            {renderInline(content)}
          </h2>
        );
      } else if (/^[-*]\s/.test(line)) {
        listBuffer.push(line.slice(2));
      } else {
        flushList();
        elements.push(
          <p key={i} className="text-sm text-slate-500 leading-relaxed mb-6 font-light">
            {renderInline(line)}
          </p>
        );
      }
    }

    flushList();
    return elements;
  }

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 sm:p-10 animate-fade-in-up">
      {isFailed && (
        <div className="inline-flex items-center gap-2 px-2 py-1 bg-amber-50 border border-amber-100 rounded-md mb-8">
          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest">Intelligence Busy</span>
        </div>
      )}
      {renderLines()}
    </div>
  );
}
