export default function MealCard({ title, items }) {
    return (
        <div className="bg-surface-card border border-slate-700/50 rounded-2xl p-5 hover:border-brand-500/30 transition-all duration-300 group">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500 group-hover:scale-125 transition-transform duration-300"></span>
                {title}
            </h3>

            <div className="space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 text-base">🍽️</span>
                        <div>
                            <p className="text-white font-medium">{item.name}</p>
                            {item.reason && (
                                <ul className="text-xs text-gray-400 mt-1">
                                    {item.reason.map((r, i) => (
                                        <li key={i}>• {r}</li>
                                    ))}
                                </ul>
                            )}
                            <p className="text-slate-500 text-xs">
                                {item.protein}g protein · ₹{item.cost}
                            </p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}