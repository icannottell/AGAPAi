import React from 'react';
import { NodeData } from '../types';

interface Props {
  nodes: NodeData[];
}

const NodeMap: React.FC<Props> = ({ nodes }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-full border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Field Node Map</h3>
      
      {/* Abstract Map Visualization */}
      <div className="relative w-full h-64 bg-amber-50 rounded-lg overflow-hidden border-2 border-dashed border-amber-200">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Mock River */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100 transform -skew-x-12 opacity-50"></div>

        {nodes.map((node, index) => {
          // Pseudorandom positioning for demo based on index
          const top = 20 + (index * 25);
          const left = 20 + (index * 30);
          
          return (
            <div 
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${node.status === 'Warning' ? 'bg-red-500 animate-pulse' : 'bg-agri-600'}`}></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {node.name} <br/> Moisture: {node.soilMoisture}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        {nodes.map(node => (
          <div key={node.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${node.status === 'Warning' ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-700">{node.name}</p>
                <p className="text-xs text-gray-500">Last update: {node.lastUpdate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-agri-700">{node.soilMoisture}% MST</p>
              <p className="text-xs text-gray-400">Bat: {node.battery}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeMap;