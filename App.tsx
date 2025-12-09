
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeafDetector from './components/LeafDetector';
import Chatbot from './components/Chatbot';
import RetailerLocator from './components/RetailerLocator';
import Blogs from './components/Blogs';
import Login from './components/Login';
import { getForecastPrediction, getSensorNodes, getWeatherData } from './services/backend';
import { DEVELOPER_INFO } from './constants';
import { Tab, Theme, NodeData, ForecastHour, WeatherData } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [theme, setTheme] = useState<Theme>('light');
  
  // State data fetched from "Backend"
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastHour[]>([]);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Initial Data Fetch simulating Backend calls
    const n = getSensorNodes();
    setNodes(n);
    if (n.length > 0) setSelectedNodeId(n[0].id);

    const w = getWeatherData();
    setWeather(w);

    const f = getForecastPrediction(w);
    setForecast(f);

  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  // Node Management Handlers
  const handleAddNode = (name: string) => {
    const newNode: NodeData = {
      id: `N-${Date.now()}`,
      name: name,
      location: { lat: 8.9500 + (Math.random() * 0.01), lng: 125.5400 + (Math.random() * 0.01) },
      status: 'Active',
      soilMoisture: Math.floor(Math.random() * 40) + 40,
      temp: 28,
      humidity: 75,
      battery: 100,
      lastUpdate: 'Just now'
    };
    
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    setSelectedNodeId(newNode.id);
  };

  const handleDeleteNode = (id: string) => {
    if (nodes.length <= 1) {
      alert("Cannot delete the last node. At least one node is required.");
      return;
    }
    
    const newNodes = nodes.filter(n => n.id !== id);
    setNodes(newNodes);
    
    // If we deleted the currently selected node, switch to the first available one
    if (selectedNodeId === id) {
      setSelectedNodeId(newNodes[0].id);
    }
  };

  const handleRenameNode = (id: string, newName: string) => {
    const updatedNodes = nodes.map(n => 
      n.id === id ? { ...n, name: newName } : n
    );
    setNodes(updatedNodes);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Guard clause if data hasn't loaded yet
  if (!weather || nodes.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading System Core...</div>;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      theme={theme}
      toggleTheme={toggleTheme}
      userEmail={userEmail}
    >
      {activeTab === Tab.DASHBOARD && (
        <Dashboard 
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          weather={weather}
          forecast={forecast}
          onAddNode={handleAddNode}
          onDeleteNode={handleDeleteNode}
          onRenameNode={handleRenameNode}
        />
      )}

      {activeTab === Tab.LEAF_DETECTOR && (
        <LeafDetector weather={weather} nodes={nodes} />
      )}

      {activeTab === Tab.RETAILERS && (
        <RetailerLocator />
      )}

      {activeTab === Tab.BLOGS && (
        <Blogs />
      )}

      {activeTab === Tab.CHATBOT && (
         <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
            <Chatbot weather={weather} nodes={nodes} />
         </div>
      )}

      {activeTab === Tab.ABOUT && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* About Project */}
          <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border">
            <h2 className="text-3xl font-bold text-agri-700 mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              About AGAPAi
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p><strong>AGAPAi</strong> (derived from "Agapan" + "AI") is a comprehensive smart farming solution designed to empower smallholder farmers in Butuan City.</p>
              <p>Our mission is to democratize access to precision agriculture technology. By combining real-time IoT sensor data with Generative AI, we help farmers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monitor micro-climate conditions instantly.</li>
                <li>Detect and treat crop diseases early through computer vision.</li>
                <li>Find local retailers and resources easily.</li>
                <li>Receive personalized, actionable advice via a natural language chatbot.</li>
              </ul>
            </div>
          </div>

          {/* About Developer */}
          <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border">
            <h2 className="text-3xl font-bold text-agri-700 mb-6 flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               About the Developer
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-agri-100 dark:border-agri-900 shadow-lg flex-shrink-0">
                  <img 
                    src={DEVELOPER_INFO.imageUrl}
                    alt={DEVELOPER_INFO.name}
                    className="w-full h-full object-cover"
                  />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{DEVELOPER_INFO.name}</h3>
                  <p className="text-agri-600 font-medium">{DEVELOPER_INFO.course}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{DEVELOPER_INFO.school}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{DEVELOPER_INFO.location}</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Passionate about leveraging technology to solve real-world problems in agriculture. Developed AGAPAi to bridge the gap between traditional farming methods and modern engineering solutions.
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Chatbot Bubble (visible on Dashboard only) */}
      {activeTab === Tab.DASHBOARD && (
        <button 
          onClick={() => setActiveTab(Tab.CHATBOT)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-agri-600 hover:bg-agri-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-50"
          title="Open Agri Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
        </button>
      )}

    </Layout>
  );
};

export default App;
