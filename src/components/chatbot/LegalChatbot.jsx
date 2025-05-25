import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Volume2, Loader, User, Bot } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from '../../hooks/useTranslation';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useGemini } from '../../hooks/useGemini';
import toast from 'react-hot-toast';

const LegalChatbot = () => {
  const { t, language } = useTranslation();
  const { chatbotOpen, setChatbotOpen } = useAppStore();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { speak } = useTextToSpeech();
  const { chatWithAI, loading } = useGemini();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    if (chatbotOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [chatbotOpen, language]);

  const getWelcomeMessage = () => {
    switch (language) {
      case 'hi':
        return 'नमस्ते! मैं आपका कानूनी सहायक हूँ। आपके अधिकारों के बारे में कोई भी प्रश्न पूछें।';
      case 'mr':
        return 'नमस्कार! मी तुमचा कायदेशीर सहाय्यक आहे। तुमच्या हक्कांबद्दल काहीही विचारा.';
      case 'te':
        return 'నమస్కారం! నేను మీ న్యాయ సహాయకుడను. మీ హక్కుల గురించి ఏదైనా అడగండి.';
      default:
        return 'Hello! I\'m your legal assistant. Ask me anything about your rights under Indian law.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const response = await chatWithAI(
        userMessage.text,
        messages.slice(-10) // Last 10 messages for context
      );

      if (response) {
        const botMessage = {
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: getErrorMessage(),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const getErrorMessage = () => {
    switch (language) {
      case 'hi':
        return 'क्षमा करें, कुछ गलत हुआ है। कृपया पुनः प्रयास करें।';
      case 'mr':
        return 'माफ करा, काहीतरी चूक झाली आहे. कृपया पुन्हा प्रयत्न करा.';
      case 'te':
        return 'క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.';
      default:
        return 'Sorry, something went wrong. Please try again.';
    }
  };

  const speakMessage = (text) => {
    speak(text);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      text: getWelcomeMessage(),
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {chatbotOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {chatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-40 flex flex-col border border-gray-200 dark:border-gray-600 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t('chatbot.title')}</h3>
                  <p className="text-sm text-blue-100">AI-powered legal assistant</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-blue-700 rounded-lg transition-colors text-xs"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setChatbotOpen(false)}
                    className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex items-start space-x-2 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      message.sender === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600'
                    }`}>
                      {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    {/* Message bubble */}
                    <div className={`p-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200 dark:border-gray-600'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.sender === 'user' 
                            ? 'text-blue-100' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'bot' && (
                          <button
                            onClick={() => speakMessage(message.text)}
                            className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <Volume2 className="h-3 w-3 text-gray-500" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200 dark:border-gray-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={language === 'hi' ? 'अपना सवाल लिखें...' :
                             language === 'mr' ? 'तुमचा प्रश्न लिहा...' :
                             language === 'te' ? 'మీ ప్రశ్న రాయండి...' :
                             'Type your question...'}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || loading}
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LegalChatbot;
