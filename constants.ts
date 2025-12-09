
import { BlogPost, ForecastHour, NodeData, WeatherData } from "./types";

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

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Rice Yields in Wet Season",
    excerpt: "Learn the best practices for water management and fertilizer application during the heavy rain months in Caraga.",
    content: "Rice farming in the wet season presents unique challenges. Excessive water can lead to submerged crops and increased susceptibility to fungal diseases. Key strategies include: \n\n1. **Proper Drainage**: Ensure your paddy fields have well-maintained drainage channels to release excess water quickly during heavy downpours. \n2. **Nutrient Management**: Apply fertilizers in split dosages to prevent leaching. Avoid excessive nitrogen which can make plants susceptible to lodging. \n3. **Variety Selection**: Choose varieties that are flood-tolerant and resistant to blast disease, which is prevalent in humid conditions.",
    category: "Farming",
    author: "Dr. Maria Santos, Ag.E.",
    date: "Oct 15, 2023",
    imageUrl: "https://images.unsplash.com/photo-1536617621572-1d5f1e6269a0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "Maintenance Guide: Hand Tractors (Kuliglig)",
    excerpt: "A step-by-step guide to keeping your machinery in top shape to avoid breakdowns during the planting rush.",
    content: "Your hand tractor is the workhorse of the farm. Regular maintenance extends its life and saves money. \n\n**Daily Checks:**\n- Check oil levels and coolant water before starting.\n- Inspect V-belts for tension and wear.\n- Greasing of moving parts.\n\n**Weekly:**\n- Clean the air filter. Dust accumulation chokes the engine.\n- Check tire pressure and lug bolts.\n\n**Storage:**\nWhen not in use, store under a shed. prolonged exposure to rain and sun rusts the chassis quickly.",
    category: "Tools",
    author: "Engr. J. Dela Cruz",
    date: "Oct 10, 2023",
    imageUrl: "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Understanding Soil pH in Butuan",
    excerpt: "Why soil acidity matters and how using agricultural lime can double your production.",
    content: "Many farms in Agusan del Norte suffer from acidic soil (low pH), often due to continuous use of synthetic nitrogen fertilizers. \n\n**Why it matters:**\nAcidic soil locks up nutrients like Phosphorus and Magnesium, making them unavailable to plants even if you apply fertilizer. \n\n**The Solution:**\nTest your soil annually. If pH is below 5.5, apply Agricultural Lime (Apog) at least 3 weeks before planting. This neutralizes the acidity and unlocks the nutrients for your crops.",
    category: "Farming",
    author: "Agri-Tech Extension",
    date: "Sep 28, 2023",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Smart Sensors: The Future of Small Farms",
    excerpt: "How affordable IoT devices are changing the game for smallholder farmers in the Philippines.",
    content: "Technology is no longer just for big corporations. Low-cost sensors for moisture and temperature, like those used in the AGAPAi system, allow farmers to make data-driven decisions. \n\nInstead of guessing when to water, you can look at your dashboard. This saves water, fuel for pumps, and prevents root rot. The return on investment for a simple node system can be realized in just one cropping season through saved inputs and higher yields.",
    category: "Tech",
    author: "Kristel Jane Donan",
    date: "Nov 01, 2023",
    imageUrl: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Market Watch: Copra and Rice Prices",
    excerpt: "Weekly update on the buying prices in Langihan and major traders in the region.",
    content: "As of this week, the buying price for wet palay ranges from ₱19 to ₱22 per kilo depending on moisture content and variety. \n\nCopra prices remain steady at ₱25-₱28/kilo for mill gate delivery. \n\nDemand for fresh vegetables is high due to the upcoming holidays, with prices for Ampalaya and Eggplant seeing a 15% increase at the bagsakan.",
    category: "Market",
    author: "Butuan Market Watch",
    date: "Nov 05, 2023",
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800"
  }
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
