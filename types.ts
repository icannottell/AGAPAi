
export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall: number; // mm
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  forecast: string;
}

export interface NodeData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: 'Active' | 'Inactive' | 'Warning';
  soilMoisture: number; // percentage
  temp: number;
  humidity: number;
  battery: number; // percentage
  lastUpdate: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
  isError?: boolean;
  timestamp: number;
}

export interface ForecastHour {
  hour: string;
  temp: number;
  humidity: number;
  soilMoisture: number;
  stressLevel: number; // 0-100
}

export interface DetectionHistoryItem {
  id: string;
  disease: string;
  confidence: number;
  treatment: string;
  imageUrl: string;
  timestamp: number;
  rawResult: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Farming' | 'Tools' | 'Market' | 'Tech';
  author: string;
  date: string;
  imageUrl: string;
}

export enum Tab {
  DASHBOARD = 'DASHBOARD',
  LEAF_DETECTOR = 'LEAF_DETECTOR',
  RETAILERS = 'RETAILERS',
  BLOGS = 'BLOGS',
  CHATBOT = 'CHATBOT',
  ABOUT = 'ABOUT'
}

export type Theme = 'light' | 'dark';
