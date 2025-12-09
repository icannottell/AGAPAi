import { ForecastHour, NodeData, WeatherData } from '../types';
import { sendToGemini } from './geminiService';
import { MOCK_NODES, MOCK_WEATHER } from '../constants';

// ==========================================
// CLOUD BACKEND SIMULATION
// ==========================================
// This service simulates the "Flask-based API Computational Core" 
// described in the system architecture.

// 1. Forecasting Model (Simulates XGBoost Logic)
// Generates predictive data based on current environment variables
export const getForecastPrediction = (baseWeather: WeatherData = MOCK_WEATHER): ForecastHour[] => {
  const baseTemp = baseWeather.temp;
  const baseHumidity = baseWeather.humidity;
  
  // Logic: Simulating a regression model output
  const forecast: ForecastHour[] = [];
  const hours = ['+1h', '+2h', '+3h', '+4h', '+5h', '+6h', '+12h', '+24h'];

  let temp = baseTemp;
  let moisture = 65; // Starting moisture baseline

  hours.forEach((h, i) => {
    const isDay = i < 6; 
    
    // Simulate XGBoost feature weights
    const tempChange = isDay ? (Math.random() * 1.5) : -(Math.random() * 1.5);
    const humidityChange = isDay ? -(Math.random() * 2) : (Math.random() * 2);
    const moistureLoss = (temp / 35) * 2; // Higher temp = faster drying

    temp += tempChange;
    moisture = Math.max(20, moisture - moistureLoss);
    
    // Rule-based Stress Detection (Simulating Model Classification)
    let stress = 0;
    if (moisture < 40) stress += (40 - moisture) * 2;
    if (temp > 33) stress += (temp - 33) * 5;

    forecast.push({
      hour: h,
      temp: Math.round(temp),
      humidity: Math.round(baseHumidity + (i * humidityChange)),
      soilMoisture: Math.round(moisture),
      stressLevel: Math.min(100, Math.round(stress))
    });
  });

  return forecast;
};

// 2. Detection Model (Wraps AI Call simulating CNN/Llama)
export const detectPlantDisease = async (
  image: string,
  weather: WeatherData,
  nodes: NodeData[]
): Promise<string> => {
  // Acts as the API endpoint for the detection model
  const prompt = `
    Act as an specialized agricultural AI model (simulating a CNN leaf disease detector). 
    Analyze this crop image.
    
    REQUIRED OUTPUT FORMAT:
    **Disease:** [Name of disease or 'Healthy']
    **Confidence:** [0-100]%
    **Action:** [Specific treatment or recommendation]
    
    [Brief explanation of symptoms observed]
  `;
  
  return await sendToGemini(prompt, [], image, weather, nodes);
};

// 3. Data Storage / Acquisition Layer
export const getSensorNodes = (): NodeData[] => {
  // Simulates fetching latest node data from database
  return MOCK_NODES;
};

export const getWeatherData = (): WeatherData => {
  return MOCK_WEATHER;
};
