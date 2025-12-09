import React, { useState, useRef } from 'react';
import { sendToGemini } from '../services/geminiService';
import { NodeData, WeatherData, DetectionHistoryItem } from '../types';
import LeafDetectionHistory from './LeafDetectionHistory';

interface Props {
  weather: WeatherData;
  nodes: NodeData[];
}

const LeafDetector: React.FC<Props> = ({ weather, nodes }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<DetectionHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const parseResult = (text: string, imageUrl: string): DetectionHistoryItem => {
    // Attempt to extract structured data from Gemini response
    // Expected format from prompt: **Disease:** [Name] \n **Confidence:** [Number]% \n **Action:** [Remedy]
    
    const diseaseMatch = text.match(/\*\*Disease:\*\*\s*(.+)/i);
    const confidenceMatch = text.match(/\*\*Confidence:\*\*\s*(\d+)/i);
    const actionMatch = text.match(/\*\*Action:\*\*\s*(.+)/i);
    
    return {
      id: Date.now().toString(),
      disease: diseaseMatch ? diseaseMatch[1].trim() : "Analysis Complete",
      confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 0,
      treatment: actionMatch ? actionMatch[1].trim() : "Check details below",
      imageUrl: imageUrl,
      timestamp: Date.now(),
      rawResult: text
    };
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    const prompt = "Please analyze this image for any plant diseases. Provide the output in this strict format: \n\n**Disease:** [Name]\n**Confidence:** [Number]%\n**Action:** [Remedy]\n\nThen provide a brief detailed explanation.";
    
    try {
      const response = await sendToGemini(prompt, [], selectedImage, weather, nodes);
      
      setResult(response);
      
      const historyItem = parseResult(response, selectedImage);
      // Only add to history if we got a somewhat valid response (length check or something)
      if (response && response.length > 20) {
         setHistory(prev => [...prev, historyItem]);
      }
      
    } catch (error) {
      console.error("Analysis failed", error);
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHistorySelect = (item: DetectionHistoryItem) => {
    setSelectedImage(item.imageUrl);
    setResult(item.rawResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Detector Area - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-dark-border text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Leaf Disease AI Detector</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Upload a clear photo of a crop leaf to detect potential diseases instantly using Gemini AI.</p>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-10 cursor-pointer hover:border-agri-500 hover:bg-agri-50 dark:hover:bg-agri-900/10 transition-all flex flex-col items-center justify-center min-h-[300px]"
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="max-h-64 rounded-lg shadow-md object-contain" />
              ) : (
                <>
                  <div className="bg-agri-100 dark:bg-agri-900/30 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-600"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Click to Upload or Capture</p>
                  <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG</p>
                </>
              )}
              <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <button 
                onClick={analyzeImage}
                disabled={!selectedImage || isAnalyzing}
                className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${!selectedImage || isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-agri-600 hover:bg-agri-700 shadow-lg hover:shadow-xl'}`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing...
                  </span>
                ) : "Analyze Leaf Health"}
              </button>
              
              {selectedImage && (
                 <button 
                  onClick={() => { setSelectedImage(null); setResult(null); }}
                  disabled={isAnalyzing}
                  className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {result && (
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-md border border-gray-100 dark:border-dark-border animate-fade-in">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 mb-4">
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">Analysis Result</h3>
                 <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">AI Confidence</span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                  {result.split('\n').map((line, i) => (
                    <p key={i} className={`mb-2 ${line.startsWith('**') ? 'font-semibold text-agri-700 dark:text-agri-400' : ''}`}>
                      {/* Simple rendering of markdown-like bold syntax from Gemini */}
                      {line.replace(/\*\*(.*?)\*\*/g, '$1')} 
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - History */}
        <div className="lg:col-span-1">
          <LeafDetectionHistory history={history} onSelectItem={handleHistorySelect} />
        </div>
        
      </div>
    </div>
  );
};

export default LeafDetector;