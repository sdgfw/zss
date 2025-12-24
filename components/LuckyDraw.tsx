
import React, { useState, useEffect, useRef } from 'react';

interface LuckyDrawProps {
  participants: string[];
}

const LuckyDraw: React.FC<LuckyDrawProps> = ({ participants }) => {
  const [rolling, setRolling] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [winners, setWinners] = useState<string[]>([]);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [winnerFound, setWinnerFound] = useState(false);
  
  const rollIntervalRef = useRef<number | null>(null);

  const availableParticipants = allowRepeat 
    ? participants 
    : participants.filter(p => !winners.includes(p));

  const startDraw = () => {
    if (availableParticipants.length === 0) return;
    
    setRolling(true);
    setWinnerFound(false);
    
    let iterations = 0;
    const maxIterations = 30;
    const speed = 80;

    rollIntervalRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableParticipants.length);
      setCurrentName(availableParticipants[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
        const finalWinner = availableParticipants[randomIndex];
        finishDraw(finalWinner);
      }
    }, speed);
  };

  const finishDraw = (winner: string) => {
    setRolling(false);
    setWinnerFound(true);
    setCurrentName(winner);
    if (!allowRepeat) {
      setWinners(prev => [winner, ...prev]);
    } else {
      setWinners(prev => [winner, ...prev].slice(0, 10)); // Keep last 10 if repeats allowed
    }
  };

  const clearHistory = () => {
    setWinners([]);
    setCurrentName(null);
    setWinnerFound(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center text-center">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800">
            <i className="fas fa-star text-amber-400 mr-2"></i>
            獎品抽獎
          </h2>
          <p className="text-slate-500 mt-1">
            剩餘 {availableParticipants.length} 位參與者
          </p>
        </div>

        {/* The Display Area */}
        <div className="relative w-full max-w-md h-48 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner border-4 border-indigo-100">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 animate-pulse"></div>
          
          <div className={`transition-all duration-300 ${rolling ? 'scale-110 blur-[1px]' : 'scale-100'}`}>
            <span className={`text-4xl md:text-5xl font-black tracking-wider ${
              winnerFound ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'text-slate-100'
            }`}>
              {currentName || '準備好了嗎？'}
            </span>
          </div>

          {winnerFound && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-4 h-4 bg-amber-400 rounded-full animate-ping opacity-75"></div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center space-x-3 bg-slate-100 p-3 rounded-xl px-4">
            <input 
              type="checkbox" 
              id="repeat"
              checked={allowRepeat}
              onChange={(e) => setAllowRepeat(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="repeat" className="text-sm font-semibold text-slate-600 cursor-pointer select-none">
              允許重複中獎
            </label>
          </div>

          <button
            disabled={rolling || availableParticipants.length === 0}
            onClick={startDraw}
            className={`px-12 py-4 rounded-xl text-lg font-black tracking-widest transition-all transform active:scale-95 shadow-lg ${
              rolling || availableParticipants.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200'
            }`}
          >
            {rolling ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-bolt mr-2"></i>
            )}
            {rolling ? '抽取中...' : '開始抽獎'}
          </button>
        </div>

        {availableParticipants.length === 0 && participants.length > 0 && !allowRepeat && (
          <p className="mt-4 text-rose-500 font-bold">所有人皆已中獎！請清除歷史紀錄以重新開始。</p>
        )}
      </div>

      {/* History Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">
            得獎名單
          </h3>
          <button 
            onClick={clearHistory}
            className="text-sm text-slate-400 hover:text-rose-500 transition-colors"
          >
            清除紀錄
          </button>
        </div>
        
        {winners.length === 0 ? (
          <div className="text-center py-8 text-slate-300 italic">
            中獎者將顯示在此處...
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {winners.map((name, i) => (
              <div key={i} className="bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200 flex items-center gap-2 animate-slideUp">
                <i className="fas fa-medal text-amber-400"></i>
                <span className="font-semibold">{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyDraw;
