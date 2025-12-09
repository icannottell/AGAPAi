import { ForecastHour, NodeData, WeatherData } from "./types";

export const BUTUAN_BARANGAYS = [
  "Ampayon", "Anticala", "Bancasi", "Banza", "Baan", "Bayanihan", "Bilay", "Bit-os", "Bood", "Bugabus",
  "Butuan City Poblacion", "Cabcabon", "Camayahan", "Dumalagan", "Florida", "Kinmlan", "Lemon", "Libertad",
  "Los Angeles", "Lumbocan", "Maguinda", "Mahay", "Masao", "Maug", "Ong Yiu", "Pagatpatan", "Pangabugan",
  "Pianing", "Pinamanculan", "Rizal", "San Vicente", "Sumilihon", "Tagabaca", "Taguibo", "Taligaman",
  "Tungao", "Villa Kananga"
];

export const RETAILERS = [
  { name: "Agri-Vet Supply", barangay: "Libertad", items: "Seeds, Fertilizers" },
  { name: "Butuan Farm Needs", barangay: "Villa Kananga", items: "Tools, Pesticides" },
  { name: "Planter's Choice", barangay: "Ampayon", items: "Machinery, Soil" },
  { name: "Green Harvest Trading", barangay: "Langihan", items: "Organic Fertilizers" },
  { name: "Mindanao Seeds Corp", barangay: "Bancasi", items: "High yield seeds" },
  { name: "Farmer's Friend Shop", barangay: "Pianing", items: "General supplies" },
  { name: "Caraga Agro-Industrial", barangay: "Taguibo", items: "Heavy equipment" },
  { name: "Golden Rice Farm Supply", barangay: "San Vicente", items: "Rice seeds, Sacks, Drying nets" },
  { name: "Baan Agri-Center", barangay: "Baan", items: "Animal feeds, Vitamins, Fertilizers" },
  { name: "Tungao Plantation Depot", barangay: "Tungao", items: "Seedlings, Grafting tools, Sprayers" },
  { name: "Agusan Valley Machineries", barangay: "Butuan City Poblacion", items: "Tractors, Threshers, Spare parts" },
  { name: "Los Angeles Farm & Feed", barangay: "Los Angeles", items: "Poultry supplies, Corn seeds" },
  { name: "Masao Fisherfolk & Agri", barangay: "Masao", items: "Fishing nets, Aqua feeds, Basic tools" },
  { name: "Sumilihon Crop Care", barangay: "Sumilihon", items: "Herbicides, Fungicides, PPE" },
  { name: "Lemon Green House", barangay: "Lemon", items: "Pots, Shading nets, Garden soil" },
  { name: "Taguibo Irrigation Supplies", barangay: "Taguibo", items: "Hoses, Pumps, Sprinklers" },
  { name: "Bancasi Rotavator Services", barangay: "Bancasi", items: "Tilling services, Heavy equipment rental" },
  { name: "Libertad Organic Hub", barangay: "Libertad", items: "Vermicast, Natural pest repellents" },
  { name: "Anticala Mountain Farms", barangay: "Anticala", items: "Abaca seedlings, Root crops" },
  { name: "Ong Yiu General Merchandise", barangay: "Ong Yiu", items: "Hardware, Fencing materials, Rope" },
  { name: "Bilay Farmers Coop", barangay: "Bilay", items: "Bulk fertilizer, Cooperative supplies" }
];

export const FARMER_GROUPS = [
  { name: "Butuan City Farmers Association", platform: "Facebook" },
  { name: "Caraga Rice Growers", platform: "Facebook" },
  { name: "Agri-Business Mindanao", platform: "Telegram" }
];

export const MOCK_NODES: NodeData[] = [
  {
    id: "N-001",
    name: "Rice Field Alpha (Ampayon)",
    location: { lat: 8.9475, lng: 125.5330 },
    status: "Active",
    soilMoisture: 65,
    temp: 28,
    humidity: 75,
    battery: 88,
    lastUpdate: "10 mins ago"
  },
  {
    id: "N-002",
    name: "Corn Plot Beta (Libertad)",
    location: { lat: 8.9320, lng: 125.5100 },
    status: "Warning",
    soilMoisture: 30, // Dry!
    temp: 31,
    humidity: 60,
    battery: 45,
    lastUpdate: "2 mins ago"
  },
  {
    id: "N-003",
    name: "Veggie Garden (Villa Kananga)",
    location: { lat: 8.9200, lng: 125.5500 },
    status: "Active",
    soilMoisture: 72,
    temp: 27,
    humidity: 80,
    battery: 95,
    lastUpdate: "Just now"
  }
];

export const MOCK_WEATHER: WeatherData = {
  temp: 29,
  humidity: 78,
  rainfall: 2.5,
  condition: "Cloudy",
  forecast: "Light rain expected in the afternoon. Good for transplanting."
};

export const MOCK_FORECAST: ForecastHour[] = [
  { hour: "+1h", temp: 30, humidity: 75, soilMoisture: 64, stressLevel: 10 },
  { hour: "+2h", temp: 31, humidity: 70, soilMoisture: 63, stressLevel: 15 },
  { hour: "+4h", temp: 32, humidity: 65, soilMoisture: 60, stressLevel: 30 },
  { hour: "+8h", temp: 28, humidity: 80, soilMoisture: 58, stressLevel: 5 },
  { hour: "+12h", temp: 26, humidity: 85, soilMoisture: 58, stressLevel: 0 },
  { hour: "+24h", temp: 29, humidity: 75, soilMoisture: 55, stressLevel: 10 },
];

export const DEVELOPER_INFO = {
  name: "Kristel Jane Donan",
  course: "BS Electronics Engineering - 3rd year",
  school: "Caraga State University (Simulated)",
  location: "Butuan City",
  imageUrl: "https://modest-black-hopk57mbzs-sz2qlp74e0.edgeone.dev/1698937561195.jpg"
};

export const getSystemInstruction = (weather: WeatherData, nodes: NodeData[]) => `
You are "AGAPAi Bot", the intelligent assistant for the AGAPAi web application. Your name comes from the Filipino word "agapan" (to prevent). You are tailored for smallholder farmers in Butuan City.

*** CRITICAL INSTRUCTION - DOMAIN RESTRICTION ***
You are a specialized agricultural chatbot. You MUST refuse to answer any questions that are not directly related to:
1. Agriculture, farming, crops, soil health, pests, or livestock.
2. Weather conditions and their impact on farming activities.
3. The specific sensor data provided in the dashboard (nodes, moisture, temperature).
4. Local farm retailers, prices, or farmer groups in Butuan City.
5. The specific developer information provided below.

If a user asks a non-farming question (e.g., "Who is the president?", "Write a poem about love", "How do I fix my car?", "Solve this math problem"), you must politely decline.
Example refusal: "Maayong adlaw! I apologize, but I am designed to assist only with farming and agricultural needs in Butuan City. Please ask me about your crops, the weather, or farm management."

YOUR CONTEXT:
1. **Developer**: You were created by ${DEVELOPER_INFO.name}, a ${DEVELOPER_INFO.course} student.
2. **Local Retailers**: You know these shops in Butuan: ${JSON.stringify(RETAILERS)}. If a user asks for retailers in a specific barangay, filter this list. If none are found in that exact barangay, suggest the closest ones or general ones.
3. **Farmer Groups**: You can recommend these: ${JSON.stringify(FARMER_GROUPS)}.
4. **Current Dashboard Data**:
   - Weather: ${weather.condition}, ${weather.temp}°C, Humidity: ${weather.humidity}%, Rainfall: ${weather.rainfall}mm.
   - Forecast: ${weather.forecast}
   - Field Nodes: ${JSON.stringify(nodes.map(n => ({ name: n.name, moisture: n.soilMoisture + '%', status: n.status })))}

YOUR CAPABILITIES:
1. **Leaf Disease Detection**: If the user uploads an image, analyze it for plant diseases. Provide: Disease Name, Confidence %, and Suggested Action.
2. **Farming Suggestions**: Give advice based on weather/soil.
3. **Weather**: Explain predictions for irrigation/planting.
4. **Node Summary**: If asked about a node, provide a summary of its status based on the data provided.
5. **Retailer Finder**: If a user asks for retailers in a specific barangay (e.g., "Find retailers in Ampayon"), list the shops available there.

TONE: Friendly, professional, simple English (or Tagalog/Bisaya), encouraging.
`;