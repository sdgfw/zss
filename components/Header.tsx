
import React from 'react';
import { AppTab } from '../types';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <i className="fas fa-gift text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            HR 專業 <span className="text-indigo-600">工具箱</span>
          </h1>
        </div>
        
        <nav className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => onTabChange(AppTab.LIST)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === AppTab.LIST 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-list-ul mr-2"></i>
            管理名單
          </button>
          <button
            onClick={() => onTabChange(AppTab.DRAW)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === AppTab.DRAW 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-trophy mr-2"></i>
            獎品抽獎
          </button>
          <button
            onClick={() => onTabChange(AppTab.GROUPING)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === AppTab.GROUPING 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-layer-group mr-2"></i>
            自動分組
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
