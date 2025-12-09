import React from 'react';
import { WeatherData } from '../types';

interface Props {
  data: WeatherData;
}

const WeatherWidget: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">Butuan City</h2>
          <p className="text-blue-100 text-sm">Agri-Weather Station</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{data.temp}°C</p>
          <p className="text-blue-100">{data.condition}</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/20 rounded-lg p-2">
          <p className="text-xs text-blue-100">Humidity</p>
          <p className="font-semibold">{data.humidity}%</p>
        </div>
        <div className="bg-white/20 rounded-lg p-2">
          <p className="text-xs text-blue-100">Rainfall</p>
          <p className="font-semibold">{data.rainfall}mm</p>
        </div>
        <div className="bg-white/20 rounded-lg p-2">
          <p className="text-xs text-blue-100">Wind</p>
          <p className="font-semibold">12km/h</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
        <p className="text-sm italic">"{data.forecast}"</p>
      </div>
    </div>
  );
};

export default WeatherWidget;