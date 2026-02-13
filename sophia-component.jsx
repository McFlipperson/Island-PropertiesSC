import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic, MicOff, MessageCircle } from 'lucide-react';

const Sophia = ({ propertyData, isVisible = false, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const audioRef = useRef(null);

  // Sophia's knowledge base integration
  const sophiaKnowledge = {
    greeting: "Hi, I'm Sophia, your personal property consultant. I see you're interested in this stunning property. What would you like to know - the luxury features, investment potential, or the legal ownership structures we can arrange for international buyers?",
    
    propertyDetails: (property) => `This ${property?.type || 'luxury property'} offers exceptional value. Let me highlight the key features that make this special...`,
    
    legalStructures: "For foreign buyers, we specialize in secure ownership structures. I can explain how Filipino corporations or long-term leases provide legal pathways to property ownership here in Bohol.",
    
    investment: "Bohol's property market is experiencing strong growth due to the new international airport and eco-tourism development. This property offers both lifestyle and investment returns."
  };

  // Initialize conversation with greeting
  useEffect(() => {
    if (isVisible && conversation.length === 0) {
      setConversation([{
        id: 1,
        sender: 'sophia',
        message: sophiaKnowledge.greeting,
        timestamp: new Date()
      }]);
    }
  }, [isVisible]);

  // Voice synthesis function (placeholder for ElevenLabs integration)
  const speakMessage = async (text) => {
    try {
      setIsPlaying(true);
      
      // TODO: Replace with actual ElevenLabs API call
      // const response = await fetch('/api/elevenlabs/tts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     text, 
      //     voice_id: 'filipino-sophia-voice',
      //     model_id: 'eleven_multilingual_v2'
      //   })
      // });
      
      // For now, use browser speech synthesis as fallback
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
    }
  };

  // Handle user input processing
  const processUserMessage = (userInput) => {
    const userMsg = {
      id: conversation.length + 1,
      sender: 'user',
      message: userInput,
      timestamp: new Date()
    };

    // Simple keyword-based responses (will be replaced with GPT-4)
    let sophiaResponse = "I understand your interest. Let me provide some insights about this property and the investment opportunities in Bohol.";
    
    const input = userInput.toLowerCase();
    
    if (input.includes('legal') || input.includes('ownership') || input.includes('foreign')) {
      sophiaResponse = sophiaKnowledge.legalStructures;
    } else if (input.includes('investment') || input.includes('return') || input.includes('profit')) {
      sophiaResponse = sophiaKnowledge.investment;
    } else if (input.includes('property') || input.includes('house') || input.includes('villa')) {
      sophiaResponse = sophiaKnowledge.propertyDetails(propertyData);
    }

    const sophiaMsg = {
      id: conversation.length + 2,
      sender: 'sophia',
      message: sophiaResponse,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMsg, sophiaMsg]);
    
    // Auto-speak Sophia's response
    setTimeout(() => speakMessage(sophiaResponse), 500);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      processUserMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-emerald-50 to-cream-50 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden border border-emerald-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-emerald-900">S</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Sophia</h3>
                <p className="text-emerald-200 text-sm">Luxury Property Consultant</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-emerald-200 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {conversation.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm border'
              }`}>
                <p className="text-sm leading-relaxed">{msg.message}</p>
                {msg.sender === 'sophia' && (
                  <button 
                    onClick={() => speakMessage(msg.message)}
                    className="mt-2 text-emerald-600 hover:text-emerald-700 text-xs flex items-center space-x-1"
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    <span>{isPlaying ? 'Playing...' : 'Listen'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-emerald-100 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Sophia about this property..."
              className="flex-1 px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button 
              onClick={handleSendMessage}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sophia;