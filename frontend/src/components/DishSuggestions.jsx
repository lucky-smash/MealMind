import React from 'react';
import { ChefHat, Info } from 'lucide-react';

const SUGGESTED_DISHES = [
    {
        name: "High-Protein Soya Pulao",
        desc: "A nitrogen-dense grain bowl engineered for muscle recovery.",
        protein: "24g",
        calories: "450",
        image: "/images/protein_bowl.png",
        tags: ["Protein Focused", "Low Cost"]
    },
    {
        name: "Lacto-Ovo Vitality Mix",
        desc: "Smashed eggs and marinated soya chunks with trace minerals.",
        protein: "28g",
        calories: "380",
        image: "/images/egg_soya.png",
        tags: ["Circadian Friendly", "Audit Verified"]
    },
    {
        name: "Whole Wheat protocol",
        desc: "Slow-burn carbohydrates paired with high-fiber dal synthesis.",
        protein: "12g",
        calories: "320",
        image: "/images/grains_dal.png",
        tags: ["Gut Health", "Budget Optimized"]
    }
];

export default function DishSuggestions() {
    return (
        <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
                <div className="p-2 bg-emerald-500 rounded-xl">
                    <ChefHat className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-serif text-slate-900 leading-none mb-1">Recommended Protocols</h2>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Dish Simulations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SUGGESTED_DISHES.map((dish, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all group">
                        <div className="h-40 overflow-hidden relative">
                            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                {dish.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/90 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest rounded-md text-slate-900 shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-lg font-serif text-slate-900 mb-2">{dish.name}</h4>
                            <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">{dish.desc}</p>
                            
                            <div className="flex justify-between items-center py-4 border-t border-slate-50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Protein</span>
                                    <span className="text-sm font-serif text-emerald-600">{dish.protein}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Calories</span>
                                    <span className="text-sm font-serif text-slate-900">{dish.calories} kcal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
