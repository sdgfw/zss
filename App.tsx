
import React, { useState, useMemo } from 'react';
import { AppTab, Participant } from './types';
import Header from './components/Header';
import NameManager from './components/NameManager';
import LuckyDraw from './components/LuckyDraw';
import TeamGrouping from './components/TeamGrouping';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.LIST);
  const [names, setNames] = useState<string[]>([]);

  // Derived participants with duplicate detection
  const participants = useMemo(() => {
    const counts = names.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return names.map((name, index) => ({
      id: `${name}-${index}`,
      name,
      isDuplicate: counts[name] > 1
    }));
  }, [names]);

  const handleUpdateNames = (newNames: string[]) => {
    // Trim and filter empty
    setNames(newNames.map(n => n.trim()).filter(n => n !== ''));
  };

  const removeDuplicates = () => {
    const unique = Array.from(new Set(names));
    setNames(unique);
  };

  const loadMockData = () => {
    const mock = [
      "陳小明", "王大同", "李志豪", "張雅婷", 
      "林佳穎", "黃博文", "趙雲", "關羽",
      "周杰倫", "蔡依林", "王力宏", "張惠妹",
      "陳小明", // Intentional duplicate
      "劉德華", "張學友", "郭富城", "黎明",
      "金城武", "梁朝偉", "周星馳", "吳孟達"
    ];
    setNames(mock);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {activeTab === AppTab.LIST && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-700">
                <i className="fas fa-users-cog mr-2 text-indigo-500"></i>
                名單管理
              </h2>
              <div className="space-x-2">
                <button 
                  onClick={loadMockData}
                  className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                >
                  載入範例名單
                </button>
                <button 
                  onClick={removeDuplicates}
                  disabled={!participants.some(p => p.isDuplicate)}
                  className="px-4 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-broom mr-2"></i>
                  移除重複名單
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 text-slate-600">匯入參與者</h3>
                <NameManager onUpdate={handleUpdateNames} initialNames={names} />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 text-slate-600">
                  名單預覽 ({participants.length} 人)
                </h3>
                <div className="max-h-[500px] overflow-y-auto rounded-lg border border-slate-100 bg-slate-50 p-2">
                  {participants.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                      <i className="fas fa-clipboard-list text-4xl mb-2"></i>
                      <p>尚未新增任何參與者</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {participants.map((p) => (
                        <div 
                          key={p.id}
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            p.isDuplicate 
                              ? 'bg-rose-50 border border-rose-200 text-rose-700' 
                              : 'bg-white border border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="truncate">{p.name}</span>
                          {p.isDuplicate && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-200 px-1.5 py-0.5 rounded">
                              重複
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === AppTab.DRAW && (
          <LuckyDraw participants={names} />
        )}

        {activeTab === AppTab.GROUPING && (
          <TeamGrouping participants={names} />
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        <p>&copy; 2024 HR 專業工具箱。提升員工參與度的專業套件。</p>
      </footer>
    </div>
  );
};

export default App;
