import { useState } from "react";
import Hero from "./components/Hero";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import LoadingState from "./components/LoadingState";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [phase, setPhase] = useState("landing"); // landing, form, loading, results
  const [result, setResult] = useState(null);

  const startAudit = () => setPhase("form");

  const generatePlan = async (formData) => {
    setPhase("loading");

    let apiResult = null;
    let isMinTimeElapsed = false;

    // Transition helper
    const finalize = () => {
      if (apiResult && isMinTimeElapsed) {
        setResult(apiResult);
        setPhase("results");
      }
    };

    // Enforce 3s minimum time
    setTimeout(() => {
      isMinTimeElapsed = true;
      finalize();
    }, 1000);

    try {
      const res = await fetch(`${API_URL}/api/meals/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      apiResult = await res.json();
      finalize();
    } catch (err) {
      console.error(err);
      setPhase("form");
    }
  };

  const reset = () => {
    setResult(null);
    setPhase("landing");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Dynamic Navigation/Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            onClick={reset}
            className="font-serif text-2xl text-slate-900 cursor-pointer tracking-tight"
          >
            MealMind<span className="text-emerald-500">.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hidden sm:block">
              {phase === 'results' ? 'Protocol Analysis' : 'Optimization Tool'}
            </span>
            {phase === 'results' && (
              <button
                onClick={startAudit}
                className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                New Audit
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className={`flex-1 pt-20 flex flex-col ${phase === 'landing' ? 'justify-center' : ''}`}>
        {phase === "landing" && <Hero onStart={startAudit} />}

        {phase === "form" && (
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center">
            <InputForm onGenerate={generatePlan} loading={false} />
          </div>
        )}

        {phase === "loading" && <div className="flex-1 flex items-center justify-center"><LoadingState /></div>}

        {phase === "results" && result && (
          <div className="flex-1 overflow-hidden">
            <Result result={result} />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className={`py-8 border-t border-slate-50 ${phase === 'landing' ? 'bg-white' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            © 2026 MealMind AI — High-Fidelity Nutrition
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest cursor-pointer hover:text-slate-500">Protocol</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest cursor-pointer hover:text-slate-500">Security</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest cursor-pointer hover:text-slate-500">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}