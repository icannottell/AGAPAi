import React, { useState } from 'react';
import { DetectionHistoryItem } from '../types';

interface Props {
  history: DetectionHistoryItem[];
  onSelectItem?: (item: DetectionHistoryItem) => void;
}

const LeafDetectionHistory: React.FC<Props> = ({ history, onSelectItem }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleItemClick = (item: DetectionHistoryItem) => {
    setSelectedId(item.id);
    onSelectItem?.(item);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden flex flex-col h-full max-h-[600px]">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-600"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
           Detection History
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
             <div className="opacity-30 mb-2 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
             </div>
             <p>No detection history yet</p>
             <p className="text-xs">Analyze a leaf to start building history</p>
          </div>
        ) : (
          history.slice().reverse().map(item => (
            <div 
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-3 rounded-xl border cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selectedId === item.id 
                  ? 'border-agri-500 bg-agri-50 dark:bg-agri-900/20 ring-1 ring-agri-500' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg'
              }`}
            >
              <div className="flex gap-3">
                 <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-100 dark:border-gray-700">
                    <img src={item.imageUrl} alt="Leaf" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <h4 className={`font-semibold truncate pr-2 ${item.disease.includes('Healthy') ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>{item.disease}</h4>
                       <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${item.confidence > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.confidence}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                       {formatDate(item.timestamp)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{item.treatment}</p>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeafDetectionHistory;