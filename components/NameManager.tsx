
import React, { useState, useEffect } from 'react';

interface NameManagerProps {
  initialNames: string[];
  onUpdate: (names: string[]) => void;
}

const NameManager: React.FC<NameManagerProps> = ({ initialNames, onUpdate }) => {
  const [inputText, setInputText] = useState(initialNames.join('\n'));

  useEffect(() => {
    setInputText(initialNames.join('\n'));
  }, [initialNames]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    const names = text.split(/[\n,]+/).map(n => n.trim()).filter(n => n !== '');
    onUpdate(names);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const names = content.split(/[\n\r,]+/).map(n => n.trim()).filter(n => n !== '');
      setInputText(names.join('\n'));
      onUpdate(names);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-2">
          貼上姓名（每行一個，或使用逗號分隔）
        </label>
        <textarea
          value={inputText}
          onChange={handleTextChange}
          placeholder="例如：陳大文, 李小華, 張三..."
          className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-700 bg-slate-50"
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-slate-500 mb-2">
          或上傳 CSV 檔案
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <i className="fas fa-file-csv text-slate-400 text-3xl mb-3"></i>
              <p className="mb-2 text-sm text-slate-500">
                <span className="font-semibold">點擊上傳</span> 或將檔案拖曳至此
              </p>
              <p className="text-xs text-slate-400">僅支援 CSV 或 純文字檔案</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".csv,.txt"
              onChange={handleFileUpload} 
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NameManager;
