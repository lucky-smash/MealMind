import { useState } from "react";
import { Target, Coins, Scale, Leaf } from "lucide-react";

export default function InputForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    weight: "",
    goal: "fat_loss",
    budget: "",
    preference: "veg_egg",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setPreference = (pref) => {
    setForm({ ...form, preference: pref });
  };

  const setGoal = (goal) => {
    setForm({ ...form, goal: goal });
  };

  const handleSubmit = async () => {
    if (!form.weight || !form.budget) return;
    await onGenerate({
      ...form,
      weight: Number(form.weight),
      budget: Number(form.budget),
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-slate-200/40 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-2">Nutritional Audit Form</h2>
        <p className="text-sm text-slate-500 font-medium">Configure your biological parameters for optimization.</p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {/* Core Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Scale className="w-4 h-4 text-emerald-500" />
              Weight (KG)
            </label>
            <input
              type="number"
              name="weight"
              placeholder="00.0"
              value={form.weight}
              onChange={handleChange}
              className="w-full text-3xl font-serif border-b-2 border-slate-50 py-2 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-100 text-slate-900"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Coins className="w-4 h-4 text-amber-500" />
              Daily Budget (₹)
            </label>
            <input
              type="number"
              name="budget"
              placeholder="000"
              value={form.budget}
              onChange={handleChange}
              className="w-full text-3xl font-serif border-b-2 border-slate-50 py-2 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-100 text-slate-900"
            />
          </div>
        </div>

        {/* Primary Protocol (Goal) */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Target className="w-4 h-4 text-slate-900" />
            Optimization Protocol
          </label>
          <div className="flex p-1.5 bg-slate-50/50 rounded-2xl border border-slate-100">
            {[
              { id: 'fat_loss', label: 'Fat Loss' },
              { id: 'muscle_gain', label: 'Muscle Gain' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setGoal(item.id)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  form.goal === item.id 
                    ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diet Preference */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Dietary Constraints
          </label>
          <div className="flex p-1.5 bg-slate-50/50 rounded-2xl border border-slate-100">
            {[
              { id: 'veg', label: 'Vegetarian' },
              { id: 'veg_egg', label: 'Veg + Egg' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPreference(item.id)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  form.preference === item.id 
                    ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.weight || !form.budget}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] transition-all hover:bg-black hover:shadow-2xl hover:shadow-slate-300 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed group overflow-hidden relative"
        >
          <span className="relative z-10">{loading ? "Optimizing..." : "Initiate Audit"}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
}