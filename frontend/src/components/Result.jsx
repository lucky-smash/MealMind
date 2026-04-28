import MealCard from "./MealCard";
import InsightBox from "./InsightBox";
import AIExplanation from "./AIExplanation";

export default function Result({ result }) {
    return (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface-card border border-slate-700/50 rounded-2xl p-5 text-center">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Target Protein</p>
                    <p className="text-2xl font-bold text-brand-400">{result.targetProtein}<span className="text-sm text-slate-400 ml-0.5">g</span></p>
                </div>
                <div className="bg-surface-card border border-slate-700/50 rounded-2xl p-5 text-center">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Achieved Protein</p>
                    <p className="text-2xl font-bold text-emerald-400">{result.achievedProtein}<span className="text-sm text-slate-400 ml-0.5">g</span></p>
                </div>
                <div className="bg-surface-card border border-slate-700/50 rounded-2xl p-5 text-center">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Total Cost</p>
                    <p className="text-2xl font-bold text-amber-400">₹{result.totalCost}</p>
                </div>
            </div>

            {/* Meals */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 text-sm">🍽️</span>
                    Your Meal Plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(result.meals || {}).map(([meal, items]) => (
                        <MealCard key={meal} title={meal} items={items} />
                    ))}
                </div>
            </div>

            {/* Insight */}
            <InsightBox text={result.insight} />

            {/* AI Explanation */}
            <AIExplanation text={result.aiExplanation} />
        </div>
    );
}