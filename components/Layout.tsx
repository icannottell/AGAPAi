import React from 'react';
import { Tab, Theme } from '../types';

interface Props {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  theme: Theme;
  toggleTheme: () => void;
  userEmail: string;
}

const Layout: React.FC<Props> = ({ children, activeTab, setActiveTab, theme, toggleTheme, userEmail }) => {
  
  const NavItem = ({ tab, label, icon }: { tab: Tab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 ${
        activeTab === tab
          ? 'bg-agri-600 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-agri-50 dark:hover:bg-agri-900/30'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-dark-text overflow-hidden transition-colors duration-200">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border">
        <div className="p-6">
          <h1 className="text-2xl font-black text-agri-600 tracking-tight flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            AGAPAi
          </h1>
          <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">Smart Farming Dashboard</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <NavItem 
            tab={Tab.DASHBOARD} 
            label="Dashboard" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>} 
          />
          <NavItem 
            tab={Tab.LEAF_DETECTOR} 
            label="Leaf Detector" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M12 2v20"/><path d="M12 6c3 0 5 2 5 5 0 1.5-1 3-5 3s-5-1.5-5-3c0-3 2-5 5-5Z"/><path d="M12 14c4 0 7 2 7 6v2H5v-2c0-4 3-6 7-6Z"/></svg>} 
          />
          <NavItem 
            tab={Tab.CHATBOT} 
            label="Chatbot" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>} 
          />
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Info</p>
          </div>
          <NavItem 
            tab={Tab.ABOUT} 
            label="About" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>} 
          />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-dark-border">
          <div className="bg-gray-50 dark:bg-dark-bg p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
               <div className="w-8 h-8 rounded-full bg-agri-600 flex items-center justify-center text-white text-xs font-bold">U</div>
               <div className="truncate">
                 <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as</p>
                 <p className="text-sm font-semibold truncate dark:text-gray-200">{userEmail}</p>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white dark:bg-dark-card h-16 border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-4 md:px-8 shadow-sm z-10">
          <div className="md:hidden flex items-center gap-2">
             <span className="font-black text-agri-600 text-lg">AGAPAi</span>
          </div>
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold dark:text-white">
              {activeTab === Tab.DASHBOARD && 'Farm Dashboard'}
              {activeTab === Tab.LEAF_DETECTOR && 'Leaf Disease AI'}
              {activeTab === Tab.CHATBOT && 'Agri Assistant'}
              {activeTab === Tab.ABOUT && 'About Information'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
               title="Toggle Theme"
             >
               {theme === 'light' ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
               )}
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {children}
        </div>
        
        {/* Mobile Bottom Nav */}
        <div className="md:hidden bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border flex justify-around p-2">
            <button onClick={() => setActiveTab(Tab.DASHBOARD)} className={`p-2 rounded-lg ${activeTab === Tab.DASHBOARD ? 'text-agri-600 bg-agri-50 dark:bg-agri-900/30' : 'text-gray-500 dark:text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            </button>
            <button onClick={() => setActiveTab(Tab.LEAF_DETECTOR)} className={`p-2 rounded-lg ${activeTab === Tab.LEAF_DETECTOR ? 'text-agri-600 bg-agri-50 dark:bg-agri-900/30' : 'text-gray-500 dark:text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M12 6c3 0 5 2 5 5 0 1.5-1 3-5 3s-5-1.5-5-3c0-3 2-5 5-5Z"/><path d="M12 14c4 0 7 2 7 6v2H5v-2c0-4 3-6 7-6Z"/></svg>
            </button>
             <button onClick={() => setActiveTab(Tab.CHATBOT)} className={`p-2 rounded-lg ${activeTab === Tab.CHATBOT ? 'text-agri-600 bg-agri-50 dark:bg-agri-900/30' : 'text-gray-500 dark:text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            </button>
             <button onClick={() => setActiveTab(Tab.ABOUT)} className={`p-2 rounded-lg ${activeTab === Tab.ABOUT ? 'text-agri-600 bg-agri-50 dark:bg-agri-900/30' : 'text-gray-500 dark:text-gray-400'}`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </button>
        </div>
      </main>
    </div>
  );
};

export default Layout;