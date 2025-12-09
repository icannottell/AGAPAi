import React, { useState } from 'react';
import { NodeData } from '../types';

interface Props {
  nodes: NodeData[];
  selectedNodeId: string;
  onNodeChange: (id: string) => void;
  onAddNode: (name: string) => void;
  onDeleteNode: (id: string) => void;
  onRenameNode: (id: string, newName: string) => void;
  onRefresh: () => void;
}

const NodeManager: React.FC<Props> = ({
  nodes,
  selectedNodeId,
  onNodeChange,
  onAddNode,
  onDeleteNode,
  onRenameNode,
  onRefresh
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [renameName, setRenameName] = useState("");

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleAddSubmit = () => {
    if (!newNodeName.trim()) return;
    onAddNode(newNodeName.trim());
    setNewNodeName("");
    setIsAddOpen(false);
  };

  const handleDeleteSubmit = () => {
    onDeleteNode(selectedNodeId);
    setIsDeleteOpen(false);
  };

  const handleRenameSubmit = () => {
    if (!renameName.trim()) return;
    onRenameNode(selectedNodeId, renameName.trim());
    setIsRenameOpen(false);
  };

  const openRename = () => {
    if (selectedNode) {
        setRenameName(selectedNode.name);
        setIsRenameOpen(true);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border flex flex-wrap items-center gap-4">
      {/* Select Part */}
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block font-medium">
          Farm Node / Location
        </label>
        <div className="relative">
             <select
              value={selectedNodeId}
              onChange={(e) => onNodeChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-agri-500 font-medium transition-shadow cursor-pointer"
            >
              {nodes.map(node => (
                <option key={node.id} value={node.id}>{node.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
        </div>
      </div>

      {/* Buttons Toolbar */}
      <div className="flex items-center gap-2 mt-6">
        {/* Add Button */}
        <button
            onClick={() => setIsAddOpen(true)}
            className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Add Node"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>

         {/* Rename Button */}
         <button
            onClick={openRename}
            className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Rename Node"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>

        {/* Delete Button */}
        <button
            onClick={() => setIsDeleteOpen(true)}
            disabled={nodes.length <= 1}
            className={`p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors ${nodes.length <= 1 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200'}`}
            title="Delete Node"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>

        {/* Refresh Button */}
        <button
            onClick={onRefresh}
            className="p-2.5 rounded-lg bg-agri-600 text-white hover:bg-agri-700 shadow-sm transition-colors"
            title="Refresh Data"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
        </button>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 transform transition-all scale-100">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add New Node</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enter a name for your new farm node/location.</p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Node Name</label>
                <input 
                    type="text" 
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    placeholder="e.g., North Field Sector A"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-500 focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubmit()}
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
              <button 
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddSubmit}
                disabled={!newNodeName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-agri-600 hover:bg-agri-700 rounded-lg transition-colors disabled:opacity-50"
              >
                Add Node
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 transform transition-all scale-100">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Node</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-gray-200">"{selectedNode?.name}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
              <button 
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {isRenameOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 transform transition-all scale-100">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Rename Node</h3>
              <div className="space-y-2">
                <input 
                    type="text" 
                    value={renameName}
                    onChange={(e) => setRenameName(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-500 focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
                />
              </div>
            </div>
             <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
              <button 
                onClick={() => setIsRenameOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleRenameSubmit}
                disabled={!renameName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-agri-600 hover:bg-agri-700 rounded-lg transition-colors disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeManager;