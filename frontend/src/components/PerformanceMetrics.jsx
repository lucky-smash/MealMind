import React from 'react';
import { Zap, Target, Coins } from 'lucide-react';

export default function PerformanceMetrics({ result }) {
  const targetProtein = result.totalProtein || 0;
  const totalCost = result.totalCost || 0;
  const efficiency = Math.min(100, Math.round((targetProtein / totalCost) * 100));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
      {/* Target Protein */}
      <div className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 bg-emerald-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
            <Zap className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Macro Target</span>
        </div>
        <div className="text-6xl font-serif text-slate-900 mb-2 tracking-tighter">{targetProtein}<span className="text-2xl text-emerald-500 ml-1">g</span></div>
        <div className="text-sm text-slate-400 font-medium tracking-wide">Target Daily Protein</div>
      </div>

      {/* Efficiency Score */}
      <div className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 bg-amber-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
            <Target className="w-6 h-6 text-amber-500" />
          </div>
          <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Efficiency Rating</span>
        </div>
        <div className="text-6xl font-serif text-slate-900 mb-4 tracking-tighter">{efficiency}<span className="text-2xl text-emerald-500 ml-1">%</span></div>
        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 mb-4">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
            style={{ width: `${efficiency}%` }}
          ></div>
        </div>
        <div className="text-sm text-slate-400 font-medium tracking-wide">
          {efficiency >= 90 ? 'Optimized for Budget' : 'Value Enhancement Active'}
        </div>
      </div>

      {/* Protocol Burn */}
      <div className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-slate-900/5 transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
            <Coins className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Protocol Burn</span>
        </div>
        <div className="text-6xl font-serif text-slate-900 mb-2 tracking-tighter"><span className="text-2xl text-slate-300 mr-1">₹</span>{totalCost}</div>
        <div className="text-sm text-slate-400 font-medium tracking-wide">Daily Operating Cost</div>
      </div>
    </div>
  );
}
