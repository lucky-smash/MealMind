import React from 'react';
import MealCard from "./MealCard";
import AIExplanation from "./AIExplanation";
import PerformanceMetrics from "./PerformanceMetrics";
import DishSuggestions from "./DishSuggestions";
import { ListChecks, Sparkles } from 'lucide-react';

export default function Result({ result }) {
    // Mapping backend property names to common ones if needed
    const normalizedResult = {
        ...result,
        totalProtein: result.achievedProtein || result.targetProtein,
        totalCost: result.totalCost
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
            {/* 1. Performance Section */}
            <div className="animate-fade-in">
                <PerformanceMetrics result={normalizedResult} />
            </div>

            {/* 2. Meal Protocol Section */}
            <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-slate-900 rounded-xl shadow-lg shadow-slate-200">
                        <ListChecks className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif text-slate-900 leading-none mb-1">Meal Protocol</h2>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">3-Phase Optimization</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                        result.meals[mealType] && (
                            <MealCard
                                key={mealType}
                                title={mealType}
                                items={result.meals[mealType]}
                            />
                        )
                    ))}
                </div>
            </div>

            {/* 3. Recommended Dishes Section */}
            <div className="animate-fade-in-up">
                <DishSuggestions />
            </div>

            {/* 4. AI Analysis Section (Intelligence) */}
            <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-200">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif text-slate-900 leading-none mb-1">Intelligence</h2>
                        <p className="text-[11px] text-emerald-600 font-black uppercase tracking-[0.2em]">Bespoke Stack Analysis</p>
                    </div>
                </div>
                <AIExplanation text={result.aiExplanation} />
            </div>

            {/* Compact Footer */}
            <div className="py-12 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                    BioMetric Audit Protocol v4.0
                </p>
                <div className="flex gap-4">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Data Verified</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">|</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">End of Stack</span>
                </div>
            </div>
        </div>
    );
}