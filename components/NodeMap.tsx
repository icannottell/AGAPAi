import React, { useEffect, useRef } from 'react';
import { NodeData } from '../types';

// Declare L global for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

interface Props {
  nodes: NodeData[];
}

const NodeMap: React.FC<Props> = ({ nodes }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);

  useEffect(() => {
    // Wait for container and Leaflet to be ready
    if (!mapContainerRef.current || !window.L) return;

    // Initialize Map only once
    if (!mapInstanceRef.current) {
      // Default center (Butuan City Coordinates)
      const centerLat = 8.9475;
      const centerLng = 125.5330;
      
      const map = window.L.map(mapContainerRef.current, {
        zoomControl: false // We'll add it in a custom position if needed, or stick to defaults
      }).setView([centerLat, centerLng], 13);

      window.L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Add OpenStreetMap Tile Layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = window.L.layerGroup().addTo(map);
    }

    // Update markers whenever nodes change
    const layerGroup = markersLayerRef.current;
    if (layerGroup) {
        layerGroup.clearLayers();

        nodes.forEach((node) => {
          const color = node.status === 'Warning' ? '#ef4444' : '#16a34a'; // Red or Green
          
          // Create Circle Marker
          const marker = window.L.circleMarker([node.location.lat, node.location.lng], {
            radius: 10,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          });

          // Create Popup Content
          const popupContent = `
            <div style="font-family: inherit; padding: 4px; min-width: 150px;">
              <h4 style="font-weight: bold; margin-bottom: 4px; color: #111827;">${node.name}</h4>
              <div style="display: flex; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 10px; background: ${node.status === 'Warning' ? '#fecaca' : '#bbf7d0'}; color: ${node.status === 'Warning' ? '#b91c1c' : '#166534'}; padding: 2px 6px; border-radius: 99px;">${node.status}</span>
                <span style="font-size: 10px; color: #6b7280;">Bat: ${node.battery}%</span>
              </div>
              <div style="font-size: 12px; color: #374151;">
                 <div>Moisture: <strong>${node.soilMoisture}%</strong></div>
                 <div>Temp: <strong>${node.temp}°C</strong></div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          layerGroup.addLayer(marker);
        });

        // Fit map bounds to show all nodes if we have nodes
        if (nodes.length > 0) {
           const bounds = window.L.latLngBounds(nodes.map((n) => [n.location.lat, n.location.lng]));
           mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }

    // Cleanup on unmount (optional for this simple case, but good practice)
    return () => {
        // We typically don't destroy the map in a tabbed view if we want to preserve state, 
        // but if we did: mapInstanceRef.current.remove();
    };

  }, [nodes]);

  // Function to fly to a node
  const focusNode = (node: NodeData) => {
      if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([node.location.lat, node.location.lng], 16, {
              duration: 1.5
          });
      }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Live Field Map
        </h3>
        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full animate-pulse font-medium">
            Live
        </span>
      </div>
      
      {/* Map Container */}
      <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative z-0 min-h-[300px]">
        <div ref={mapContainerRef} className="w-full h-full bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Quick Jump Controls */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
         {nodes.map(node => (
             <button 
               key={node.id}
               onClick={() => focusNode(node)}
               className="text-left text-xs p-2 rounded-lg bg-gray-50 dark:bg-dark-bg hover:bg-agri-50 dark:hover:bg-agri-900/20 border border-gray-200 dark:border-gray-700 flex items-center gap-3 transition-colors group"
             >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${node.status === 'Warning' ? 'bg-red-500' : 'bg-agri-500'}`}></span>
                <div className="truncate">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 block truncate">{node.name}</span>
                    <span className="text-gray-500 text-[10px]">Tap to locate</span>
                </div>
             </button>
         ))}
      </div>
    </div>
  );
};

export default NodeMap;