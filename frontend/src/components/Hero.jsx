import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onStart }) {
  return (
    <section className="max-w-4xl mx-auto py-12 text-center px-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6 animate-fade-in">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Version 4.0 — Protocol Ready</span>
      </div>
      
      <h1 className="text-5xl sm:text-7xl font-serif text-slate-900 leading-[1.1] mb-6 tracking-tight">
        Stop guessing your <br />
        <span className="italic text-emerald-600">nutritional burn.</span>
      </h1>
      
      <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed font-light">
        A high-fidelity audit tool for data-driven nutrition. 
        Analyze your biological stack with precision.
      </p>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
      >
        Start Nutritional Audit
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-12 flex justify-center gap-12 opacity-30 grayscale contrast-125">
        <div className="font-serif text-xl italic font-semibold">StackWise</div>
        <div className="font-serif text-xl italic font-semibold">BioMetric</div>
        <div className="font-serif text-xl italic font-semibold">PeakOS</div>
      </div>
    </section>
  );
}
