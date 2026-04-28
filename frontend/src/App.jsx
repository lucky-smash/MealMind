import { useState } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result.jsx";

export default function App() {
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = async (formData) => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/api/meals/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          <span className="text-4xl">🧠</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            MealMind
          </h1>
        </div>
        {/* <p className="text-slate-400 text-sm sm:text-base tracking-wide">
          AI-powered meal plans tailored to your goals &amp; budget
        </p> */}
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto space-y-8">
        <InputForm onGenerate={generatePlan} loading={isGenerating} />
        {result && <Result result={result} />}
      </main>
    </div>
  );
}