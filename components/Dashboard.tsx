import React, { useMemo } from 'react';
import { NodeData, WeatherData, ForecastHour } from '../types';
import NodeMap from './NodeMap';
import NodeManager from './NodeManager';

interface Props {
  nodes: NodeData[];
  selectedNodeId: string;
  setSelectedNodeId: (id: string) => void;
  weather: WeatherData;
  forecast: ForecastHour[];
  onAddNode: (name: string) => void;
  onDeleteNode: (id: string) => void;
  onRenameNode: (id: string, newName: string) => void;
}

const Dashboard: React.FC<Props> = ({ 
  nodes, 
  selectedNodeId, 
  setSelectedNodeId, 
  weather, 
  forecast,
  onAddNode,
  onDeleteNode,
  onRenameNode
}) => {
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Generate dynamic suggestions based on node data
  const suggestions = useMemo(() => {
    if (!selectedNode) return [];

    const msgs = [];
    
    // Soil Moisture Logic
    if (selectedNode.soilMoisture < 40) {
      msgs.push({ type: 'critical', text: "URGENT: Soil moisture is critically low. Initiate irrigation immediately." });
    } else if (selectedNode.soilMoisture > 85) {
      msgs.push({ type: 'warning', text: "High soil moisture. Ensure drainage channels are open." });
    } else {
      msgs.push({ type: 'success', text: "Soil moisture levels are optimal." });
    }

    // Temp Logic
    if (selectedNode.temp > 32) {
      msgs.push({ type: 'warning', text: "High ambient temperature. Monitor crops for heat stress." });
    }

    // Battery Logic
    if (selectedNode.battery < 20) {
      msgs.push({ type: 'warning', text: "Low battery. Check solar panel or replace battery." });
    } else if (selectedNode.battery === 100) {
      msgs.push({ type: 'success', text: "Power levels are excellent." });
    }

    return msgs;
  }, [selectedNode]);

  const SummaryCard = ({ label, value, icon, subtext, colorClass }: { label: string, value: string | number, icon: React.ReactNode, subtext?: string, colorClass?: string }) => (
    <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-100 dark:border-dark-border shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
        <p className={`text-lg font-bold mt-1 ${colorClass || 'text-gray-900 dark:text-white'}`}>{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400">
        {icon}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Node Manager Controls */}
      <NodeManager 
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        onNodeChange={setSelectedNodeId}
        onAddNode={onAddNode}
        onDeleteNode={onDeleteNode}
        onRenameNode={onRenameNode}
        onRefresh={() => alert("Data refreshed from sensors!")}
      />

      {/* Sensor Overview Cards (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2.69l5.74 5.74c4.38 4.38 3.97 11.97-1.67 15.19A9 9 0 0 1 3 17.5c-1-5 2.5-9 9-14.81z"/><path d="M12 16a4 4 0 0 0 0-8"/></svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Soil Moisture</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{selectedNode?.soilMoisture}</span>
            <span className="text-xl text-gray-500">%</span>
          </div>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-1000 ${selectedNode?.soilMoisture < 40 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${selectedNode?.soilMoisture}%` }}></div>
          </div>
          <p className={`text-xs mt-2 ${selectedNode?.soilMoisture < 40 ? 'text-red-500 font-bold' : 'text-green-500'}`}>
            {selectedNode?.soilMoisture < 40 ? 'Low Moisture - Water Needed!' : 'Optimal Level'}
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Humidity</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{selectedNode?.humidity}</span>
            <span className="text-xl text-gray-500">%</span>
          </div>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="h-2 rounded-full bg-cyan-500 transition-all duration-1000" style={{ width: `${selectedNode?.humidity}%` }}></div>
          </div>
          <p className="text-xs mt-2 text-gray-500">Air Condition</p>
        </div>

        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Temperature</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{selectedNode?.temp}</span>
            <span className="text-xl text-gray-500">°C</span>
          </div>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="h-2 rounded-full bg-orange-500 transition-all duration-1000" style={{ width: `${(selectedNode?.temp / 50) * 100}%` }}></div>
          </div>
           <p className="text-xs mt-2 text-gray-500">Local Ambient</p>
        </div>
      </div>

      {/* Node Insight & Summary (Card Format) */}
      {selectedNode && (
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-card dark:to-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-agri-100 dark:bg-agri-900/30 p-2 rounded-lg text-agri-600 dark:text-agri-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-800 dark:text-white">Node Summary</h3>
               <p className="text-xs text-gray-500 dark:text-gray-400">Detailed insights for {selectedNode.name}</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
             <SummaryCard 
               label="Status" 
               value={selectedNode.status} 
               icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
               colorClass={selectedNode.status === 'Active' ? 'text-green-600' : 'text-red-600'}
             />
             <SummaryCard 
               label="Location" 
               value={`${selectedNode.location.lat.toFixed(3)}, ${selectedNode.location.lng.toFixed(3)}`} 
               icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>}
             />
             <SummaryCard 
               label="Battery" 
               value={`${selectedNode.battery}%`} 
               icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>}
               subtext="Solar Charged"
               colorClass={selectedNode.battery < 20 ? 'text-red-500' : 'text-green-600'}
             />
             <SummaryCard 
               label="Last Update" 
               value={selectedNode.lastUpdate} 
               icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
             />
          </div>

          <div>
             <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Live Suggestions</h4>
             <div className="grid grid-cols-1 gap-3">
                {suggestions.map((suggestion, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border flex items-start gap-3 ${
                    suggestion.type === 'critical' 
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50 text-red-800 dark:text-red-200' 
                      : suggestion.type === 'warning'
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/50 text-orange-800 dark:text-orange-200'
                      : 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/50 text-green-800 dark:text-green-200'
                  }`}>
                    <div className="mt-0.5">
                       {suggestion.type === 'critical' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>}
                       {suggestion.type === 'warning' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>}
                       {suggestion.type === 'success' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                    </div>
                    <span className="text-sm font-medium">{suggestion.text}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Predictions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Alerts */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-500"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
            AI Predictions & Alerts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-xl">
               <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase">Next Watering</p>
               <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">In 3 Hours</p>
               <p className="text-xs text-gray-500 mt-1">Based on evaporation rate</p>
             </div>
             <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-xl">
               <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Crop Stress</p>
               <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">Low (12%)</p>
               <p className="text-xs text-gray-500 mt-1">Optimal conditions</p>
             </div>
             <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl">
               <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">Precipitation</p>
               <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">45% Chance</p>
               <p className="text-xs text-gray-500 mt-1">Light rain expected</p>
             </div>
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 p-4 rounded-xl">
               <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">Growth Rate</p>
               <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">Stable</p>
               <p className="text-xs text-gray-500 mt-1">On track for harvest</p>
             </div>
          </div>
        </div>

        {/* Forecast Timeline */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">24-Hour Forecast Timeline</h3>
          <div className="flex-1 overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {forecast.map((item, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-50 dark:bg-dark-bg p-3 rounded-xl border border-gray-200 dark:border-dark-border w-24">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{item.hour}</span>
                  <div className="space-y-2 text-center w-full">
                    <div className="flex items-center justify-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                      <span className="text-xs font-medium dark:text-gray-400">{item.temp}°</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2.69l5.74 5.74c4.38 4.38 3.97 11.97-1.67 15.19A9 9 0 0 1 3 17.5c-1-5 2.5-9 9-14.81z"/><path d="M12 16a4 4 0 0 0 0-8"/></svg>
                      <span className="text-xs font-medium dark:text-gray-400">{item.soilMoisture}%</span>
                    </div>
                     <div className={`text-[10px] font-bold px-1 rounded ${item.stressLevel > 20 ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
                      {item.stressLevel > 20 ? 'Stress' : 'OK'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Node Map */}
      <div className="h-96">
        <NodeMap nodes={nodes} />
      </div>

    </div>
  );
};

export default Dashboard;