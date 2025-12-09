import React from 'react';
import { ForecastHour } from '../types';

interface Props {
  data: ForecastHour[];
}

const ForecastChart: React.FC<Props> = ({ data }) => {
  if (!data.length) return null;

  const height = 200;
  const width = 600; // Viewbox width
  const padding = 30;
  
  // Scales
  const maxTemp = Math.max(...data.map(d => d.temp)) + 2;
  const minTemp = Math.min(...data.map(d => d.temp)) - 2;
  
  const getX = (index: number) => padding + (index * (width - 2 * padding) / (data.length - 1));
  const getY = (temp: number) => height - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding);
  const getYMoisture = (m: number) => height - padding - (m / 100) * (height - 2 * padding);

  // Path generators
  const tempPoints = data.map((d, i) => `${getX(i)},${getY(d.temp)}`).join(' ');
  const moisturePoints = data.map((d, i) => `${getX(i)},${getYMoisture(d.soilMoisture)}`).join(' ');

  // Area under moisture
  const moistureArea = `${getX(0)},${height-padding} ${moisturePoints} ${getX(data.length-1)},${height-padding}`;

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-[600px] h-[250px] relative">
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible font-sans">
            {/* Grid & Axis */}
            <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#e5e7eb" strokeWidth="1" />
            
            {/* Legend */}
            <g transform={`translate(${padding}, 0)`}>
               <text x="0" y="10" fontSize="12" fontWeight="bold" fill="#374151">Environmental Forecast (XGBoost Model)</text>
               <g transform="translate(400, 0)">
                  <line x1="0" y1="5" x2="20" y2="5" stroke="#f97316" strokeWidth="2"/>
                  <text x="25" y="9" fontSize="10" fill="#6b7280">Temp (°C)</text>
                  <line x1="80" y1="5" x2="100" y2="5" stroke="#3b82f6" strokeWidth="2"/>
                  <text x="105" y="9" fontSize="10" fill="#6b7280">Moisture (%)</text>
               </g>
            </g>

            {/* Moisture Chart (Blue) */}
            <path d={`M ${moistureArea} Z`} fill="url(#blueGradient)" opacity="0.2" />
            <polyline points={moisturePoints} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Temp Chart (Orange) */}
            <polyline points={tempPoints} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data Points */}
            {data.map((d, i) => (
               <g key={i}>
                  {/* Temp Point */}
                  <circle cx={getX(i)} cy={getY(d.temp)} r="3" fill="#fff" stroke="#f97316" strokeWidth="2" />
                  <text x={getX(i)} y={getY(d.temp) - 10} textAnchor="middle" fontSize="10" fill="#f97316" fontWeight="bold">{d.temp}°</text>
                  
                  {/* X Axis Labels */}
                  <text x={getX(i)} y={height - padding + 15} textAnchor="middle" fontSize="10" fill="#6b7280">{d.hour}</text>
                  
                  {/* Stress Indicator */}
                  {d.stressLevel > 25 && (
                      <circle cx={getX(i)} cy={height - padding + 28} r="3" fill="#ef4444" />
                  )}
               </g>
            ))}
            
            {/* Gradients */}
            <defs>
              <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
         </svg>
      </div>
    </div>
  );
};

export default ForecastChart;