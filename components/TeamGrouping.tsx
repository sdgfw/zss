
import React, { useState } from 'react';
import { Group } from '../types';

interface TeamGroupingProps {
  participants: string[];
}

const TeamGrouping: React.FC<TeamGroupingProps> = ({ participants }) => {
  const [groupSize, setGroupSize] = useState<number>(3);
  const [groups, setGroups] = useState<Group[]>([]);

  const handleGroup = () => {
    if (participants.length === 0) return;

    // Shuffle
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const newGroups: Group[] = [];
    
    for (let i = 0; i < shuffled.length; i += groupSize) {
      newGroups.push({
        id: Math.floor(i / groupSize) + 1,
        members: shuffled.slice(i, i + groupSize)
      });
    }

    setGroups(newGroups);
  };

  const downloadCSV = () => {
    if (groups.length === 0) return;

    // Header
    let csvContent = "\uFEFF"; // Add BOM for Excel UTF-8 support
    csvContent += "組別,姓名\n";
    
    // Rows
    groups.forEach(group => {
      group.members.forEach(member => {
        // Handle potential commas in names by wrapping in quotes
        const safeName = member.includes(',') ? `"${member}"` : member;
        csvContent += `${group.id},${safeName}\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `分組結果_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-700 mb-4">
              <i className="fas fa-users-viewfinder text-indigo-500 mr-2"></i>
              分組設定
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">每組人數</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="2"
                    max={participants.length}
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 2)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-xs text-slate-400 mb-2 italic">
                  總人數：{participants.length}
                  {participants.length > 0 && ` (預計分成 ${Math.ceil(participants.length / groupSize)} 組)`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGroup}
              disabled={participants.length === 0}
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100 whitespace-nowrap"
            >
              <i className="fas fa-random mr-2"></i>
              開始自動分組
            </button>
            
            {groups.length > 0 && (
              <button
                onClick={downloadCSV}
                className="bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 whitespace-nowrap"
              >
                <i className="fas fa-download mr-2"></i>
                下載 CSV 紀錄
              </button>
            )}
          </div>
        </div>
      </div>

      {groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fadeIn">
              <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex justify-between items-center">
                <h4 className="font-black text-indigo-700">第 {group.id} 組</h4>
                <span className="text-xs font-bold text-indigo-400 uppercase">{group.members.length} 人</span>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {group.members.map((member, idx) => (
                    <li key={idx} className="flex items-center p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 text-sm">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 text-[10px] font-bold text-slate-400">
                        {idx + 1}
                      </div>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {groups.length === 0 && participants.length > 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
          <i className="fas fa-layer-group text-5xl mb-4"></i>
          <p>點擊「開始自動分組」來將名單分配到各組</p>
        </div>
      )}
    </div>
  );
};

export default TeamGrouping;
