import React, { useState } from 'react';
import { RETAILERS, BUTUAN_BARANGAYS } from '../constants';

interface Retailer {
  name: string;
  barangay: string;
  items: string;
}

const RetailerLocator: React.FC = () => {
  const [retailers, setRetailers] = useState<Retailer[]>(RETAILERS);
  const [selectedBarangay, setSelectedBarangay] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newRetailer, setNewRetailer] = useState<Retailer>({
    name: '',
    barangay: BUTUAN_BARANGAYS[0],
    items: ''
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRetailer.name.trim() || !newRetailer.items.trim()) return;
    
    setRetailers(prev => [newRetailer, ...prev]); // Add to top
    setNewRetailer({
      name: '',
      barangay: BUTUAN_BARANGAYS[0],
      items: ''
    });
    setIsAddOpen(false);
  };

  const filteredRetailers = retailers.filter(retailer => {
    const matchesBarangay = selectedBarangay === 'All' || retailer.barangay === selectedBarangay;
    const matchesSearch = retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          retailer.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBarangay && matchesSearch;
  });

  // Calculate stats
  const totalShops = filteredRetailers.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-600"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
              Nearby Farm Retailers
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Find seeds, fertilizers, and equipment in Butuan City.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
             <button
              onClick={() => setIsAddOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-agri-600 hover:bg-agri-700 text-white rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add Retailer
            </button>

            {/* Search Input */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search shops or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-500 text-gray-800 dark:text-white"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>

            {/* Barangay Filter */}
            <select
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-500 text-gray-800 dark:text-white cursor-pointer"
            >
              <option value="All">All Barangays</option>
              {BUTUAN_BARANGAYS.map(brgy => (
                <option key={brgy} value={brgy}>{brgy}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center gap-2 mb-4">
           <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
             Showing {totalShops} result{totalShops !== 1 ? 's' : ''}
           </span>
           {selectedBarangay !== 'All' && (
             <span className="px-2 py-0.5 bg-agri-100 dark:bg-agri-900/30 text-agri-700 dark:text-agri-300 text-xs rounded-full font-medium">
               in {selectedBarangay}
             </span>
           )}
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRetailers.map((shop, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
              </div>

              <div className="flex items-start justify-between mb-3">
                 <div className="bg-agri-100 dark:bg-agri-900/30 p-2.5 rounded-lg text-agri-600 dark:text-agri-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                 </div>
                 <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Retailer</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-agri-600 transition-colors">{shop.name}</h3>
              
              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                 <span className="text-sm">{shop.barangay}, Butuan City</span>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-3">
                 <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Available Items:</p>
                 <div className="flex flex-wrap gap-2">
                    {shop.items.split(', ').map((item, i) => (
                       <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded font-medium">
                          {item}
                       </span>
                    ))}
                 </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-end">
                <a 
                   href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.barangay + ' Butuan City')}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-sm font-medium text-agri-600 hover:text-agri-700 flex items-center gap-1"
                >
                   Get Directions 
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </a>
              </div>
            </div>
          ))}

          {filteredRetailers.length === 0 && (
             <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <p>No retailers found matching your criteria.</p>
                <button 
                  onClick={() => {setSelectedBarangay('All'); setSearchQuery('');}}
                  className="mt-2 text-agri-600 hover:underline font-medium"
                >
                  Clear filters
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Add Retailer Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 transform transition-all scale-100">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add Farm Retailer</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Share a local farm shop to help other farmers.</p>
              
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Retailer Name</label>
                  <input 
                    type="text" 
                    value={newRetailer.name}
                    onChange={(e) => setNewRetailer({...newRetailer, name: e.target.value})}
                    placeholder="e.g., Juan's Farm Supply"
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Barangay Location</label>
                  <select
                    value={newRetailer.barangay}
                    onChange={(e) => setNewRetailer({...newRetailer, barangay: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-500 focus:outline-none"
                  >
                    {BUTUAN_BARANGAYS.map(brgy => (
                      <option key={brgy} value={brgy}>{brgy}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Available Items</label>
                  <textarea 
                    value={newRetailer.items}
                    onChange={(e) => setNewRetailer({...newRetailer, items: e.target.value})}
                    placeholder="e.g., Seeds, Fertilizer, Pesticides, Shovels"
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-agri-500 focus:outline-none h-24 resize-none"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Separate items with commas</p>
                </div>
                
                <div className="pt-2 flex justify-end gap-2">
                  <button 
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-agri-600 hover:bg-agri-700 rounded-lg transition-colors"
                  >
                    Save Retailer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerLocator;