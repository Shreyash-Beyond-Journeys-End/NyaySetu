import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

const VoiceSearch = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useVoiceSearch();

  const { speak, speaking } = useTextToSpeech();

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
      handleSearch(transcript);
    }
  }, [transcript]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    // Simulate legal search results
    const mockResults = [
      {
        id: 1,
        title: t('search.results.domesticViolence'),
        content: t('search.results.domesticViolenceContent'),
        category: 'Family Law'
      },
      {
        id: 2,
        title: t('search.results.workerRights'),
        content: t('search.results.workerRightsContent'),
        category: 'Labor Law'
      }
    ];
    
    setShowResults(true);
    toast.success(t('search.resultsFound'));
  };

  const speakResult = (text) => {
    speak(text);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-sm text-gray-500">
        {t('search.notSupported')}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-64 px-4 py-2 pl-10 pr-12 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <motion.button
          onClick={listening ? stopListening : startListening}
          className={`p-2 rounded-full transition-colors ${
            listening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t('search.listening')}
              </span>
            </div>
            {transcript && (
              <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                {transcript}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceSearch;
