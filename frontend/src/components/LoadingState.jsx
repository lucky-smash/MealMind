import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  const [step, setStep] = useState(0);
  const messages = [
    "Analyzing your biological stack...",
    "Cross-referencing market prices...",
    "Optimizing amino profiles...",
    "Calibrating protocol efficiency..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>
        <Loader2 className="w-12 h-12 text-slate-900 animate-spin relative z-10" />
      </div>
      
      <h2 className="text-2xl font-serif text-slate-900 mb-3 transition-all duration-500">
        {messages[step]}
      </h2>
      
      <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed font-light">
        Our engine is calculating the optimal balance between cost-efficiency 
        and high-fidelity nutrition metrics.
      </p>

      <div className="mt-12 flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i}
            className={`h-1 w-8 rounded-full transition-all duration-700 ${
              i === step ? 'bg-slate-900 w-12' : 'bg-slate-100'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
