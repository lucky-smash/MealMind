export default function AIExplanation({ text }) {
  if (!text) return null;

  // Parse bold **text** into spans
  function renderInline(str) {
    const parts = str.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-white">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  // Split text into lines and render each based on type
  function renderLines() {
    const lines = text.split("\n");
    const elements = [];
    let listBuffer = [];

    function flushList() {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-1.5 mb-3">
            {listBuffer.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
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

      if (!line) {
        flushList();
        continue;
      }

      // Headings
      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={i} className="text-base font-semibold text-brand-300 mt-5 mb-2 first:mt-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
            {renderInline(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={i} className="text-lg font-semibold text-white mt-5 mb-2 first:mt-0">
            {renderInline(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <h1 key={i} className="text-xl font-bold text-white mt-5 mb-3 first:mt-0">
            {renderInline(line.slice(2))}
          </h1>
        );
      }
      // Horizontal rule
      else if (line === "---" || line === "***") {
        flushList();
        elements.push(
          <hr key={i} className="my-4 border-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        );
      }
      // List items (-, *, or numbered like 1.)
      else if (/^[-*]\s/.test(line)) {
        listBuffer.push(line.slice(2));
      } else if (/^\d+\.\s/.test(line)) {
        listBuffer.push(line.replace(/^\d+\.\s/, ""));
      }
      // Regular paragraph
      else {
        flushList();
        elements.push(
          <p key={i} className="text-sm text-slate-300 leading-relaxed mb-3">
            {renderInline(line)}
          </p>
        );
      }
    }

    flushList();
    return elements;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#1a1f3e] to-[#151929]">
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-indigo-500/15 bg-white/[0.02]">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 shadow-lg shadow-brand-500/25">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </span>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">AI Analysis</h3>
          <p className="text-[11px] text-slate-500">Powered by Gemini</p>
        </div>
      </div>

      {/* Body */}
      <div className="relative px-6 py-5">
        {renderLines()}
      </div>
    </div>
  );
}
