import { useState } from "react";

export default function InputForm({ onGenerate }) {
  const [form, setForm] = useState({
    weight: "",
    goal: "fat_loss",
    budget: "",
    preference: "veg_egg",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onGenerate({
      ...form,
      weight: Number(form.weight),
      budget: Number(form.budget),
    });
  };

  return (
    <div className="bg-surface-card border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/20">
      <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 text-sm">⚡</span>
        Configure Your Plan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Weight */}
        <label className="block">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 block">Weight</span>
          <input
            type="number"
            name="weight"
            placeholder="e.g. 70"
            value={form.weight}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-surface-elevated border border-slate-600/50 rounded-xl text-white placeholder-slate-500 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 transition-all duration-200"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">in kilograms</span>
        </label>

        {/* Budget */}
        <label className="block">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 block">Budget</span>
          <input
            type="number"
            name="budget"
            placeholder="e.g. 300"
            value={form.budget}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-surface-elevated border border-slate-600/50 rounded-xl text-white placeholder-slate-500 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 transition-all duration-200"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">daily budget in ₹</span>
        </label>

        {/* Goal */}
        <label className="block">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 block">Goal</span>
          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-surface-elevated border border-slate-600/50 rounded-xl text-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="fat_loss">🔥 Fat Loss</option>
            <option value="muscle_gain">💪 Muscle Gain</option>
          </select>
        </label>

        {/* Preference */}
        <label className="block">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 block">Preference</span>
          <select
            name="preference"
            value={form.preference}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-surface-elevated border border-slate-600/50 rounded-xl text-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="veg">🥦 Veg</option>
            <option value="veg_egg">🥦🥚 Veg + Egg</option>
          </select>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300 cursor-pointer active:scale-[0.98]"
      >
        Generate Meal Plan ✨
      </button>
    </div>
  );
}