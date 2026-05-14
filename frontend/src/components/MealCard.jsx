import React from 'react';
import { Utensils } from 'lucide-react';

export default function MealCard({ title, items }) {
    const images = {
        breakfast: "/images/egg_soya.png",
        lunch: "/images/protein_bowl.png",
        dinner: "/images/grains_dal.png"
    };

    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 group">
            {/* Meal Image */}
            <div className="h-64 overflow-hidden bg-slate-100 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                    src={images[title.toLowerCase()] || images.breakfast} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
            </div>

            <div className="p-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-10 flex items-center gap-3">
                    <Utensils className="w-4 h-4 text-emerald-500" />
                    {title}
                </h3>

            <div className="space-y-10">
                {items.map((item, i) => (
                    <div key={i} className="group/item">
                        <div className="flex justify-between items-baseline mb-2">
                            <p className="text-2xl font-serif text-slate-900 group-hover/item:text-emerald-700 transition-colors leading-tight">
                                {item.name}
                            </p>
                            <span className="text-sm font-black text-emerald-600 tracking-tight">₹{item.cost}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-slate-400 font-black mb-4">
                            <span className="text-slate-900">{item.protein}g Protein</span>
                            <span className="h-1 w-1 rounded-full bg-slate-200"></span>
                            <span>Audit Verified</span>
                        </div>

                        {item.reason && (
                            <ul className="space-y-1.5 border-l-2 border-slate-50 pl-4">
                                {item.reason.map((r, i) => (
                                    <li key={i} className="text-xs text-slate-500 font-light leading-relaxed">
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
          </div>
        </div>
    );
}