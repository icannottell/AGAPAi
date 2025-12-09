import React, { useState, useRef, useEffect } from 'react';
import { Message, NodeData, WeatherData } from '../types';
import { sendToGemini } from '../services/geminiService';
import { BUTUAN_BARANGAYS } from '../constants';

interface Props {
  weather: WeatherData;
  nodes: NodeData[];
}

const Chatbot: React.FC<Props> = ({ weather, nodes }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm AGAPAi Bot. I can help you with farming suggestions, disease management, locating retailers in Butuan, or checking your node status. How can I assist you today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showBarangays, setShowBarangays] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showBarangays]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if ((!textToSend.trim() && !selectedImage) || isLoading) return;

    // Reset UI states
    setShowBarangays(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      image: selectedImage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(undefined);
    setIsLoading(true);

    const responseText = await sendToGemini(userMsg.text, messages, userMsg.image, weather, nodes);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const QuickChip = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 bg-white dark:bg-dark-card border border-agri-200 dark:border-gray-700 rounded-full text-xs font-medium text-agri-700 dark:text-agri-300 hover:bg-agri-50 dark:hover:bg-agri-900/20 transition-colors whitespace-nowrap shadow-sm"
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
      {/* Header */}
      <div className="bg-agri-700 p-4 text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
            AGAPAi Assistant
          </h2>
          <p className="text-xs text-agri-200">AI-Powered Support</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-bg relative">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-agri-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.image && (
                <img src={msg.image} alt="Upload" className="w-full max-w-xs rounded-lg mb-2 border border-white/30" />
              )}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                 {/* Basic formatting for bullet points which Gemini often returns */}
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">{line}</p>
                ))}
              </div>
              <p className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-agri-200' : 'text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-agri-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-agri-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-agri-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        
        {/* Barangay Selection UI Overlay */}
        {showBarangays && (
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-3 shadow-lg my-2 animate-fade-in w-full max-w-sm mx-auto">
             <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Select Barangay</p>
                <button onClick={() => setShowBarangays(false)} className="text-gray-400 hover:text-gray-600">✕</button>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
               {BUTUAN_BARANGAYS.map(brgy => (
                 <button 
                   key={brgy}
                   onClick={() => handleSend(`Find farm retailers in ${brgy}`)}
                   className="text-left text-xs p-2 rounded hover:bg-agri-50 dark:hover:bg-agri-900/20 text-gray-700 dark:text-gray-300 truncate"
                 >
                   {brgy}
                 </button>
               ))}
             </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-1">
           <QuickChip label="🏪 Find Retailers" onClick={() => setShowBarangays(true)} />
           <QuickChip label="🌦️ Weather Forecast" onClick={() => handleSend("What is the weather forecast for farming today?")} />
           <QuickChip label="🌾 Farming Tips" onClick={() => handleSend("Give me a farming tip for today's weather.")} />
           <QuickChip label="🦠 Identify Disease" onClick={() => fileInputRef.current?.click()} />
        </div>

        {selectedImage && (
          <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 dark:bg-dark-bg rounded-lg">
            <img src={selectedImage} alt="Preview" className="h-10 w-10 object-cover rounded" />
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1">Image attached</span>
            <button onClick={() => setSelectedImage(undefined)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
              ✕
            </button>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-500 dark:text-gray-400 hover:text-agri-600 hover:bg-agri-50 dark:hover:bg-agri-900/30 rounded-full transition-colors"
            title="Upload Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AGAPAi..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-agri-500 resize-none max-h-32 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark-bg placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              style={{ minHeight: '44px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || (!input && !selectedImage)}
              className="absolute right-2 bottom-2 p-1.5 bg-agri-600 text-white rounded-full hover:bg-agri-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;