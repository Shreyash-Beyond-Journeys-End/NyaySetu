import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, MicOff, Volume2, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from '../../hooks/useTranslation';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useGemini } from '../../hooks/useGemini';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SmartSearch = () => {
  const { t } = useTranslation();
  const { language, searchResults, setSearchResults } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [translatedResults, setTranslatedResults] = useState(null);
  const { transcript, listening, startListening, stopListening, resetTranscript } = useVoiceSearch();
  const { speak } = useTextToSpeech();
  const { searchLegal, loading } = useGemini();

  // Translate search results when they change or language changes
  useEffect(() => {
    if (searchResults && Object.keys(searchResults).length > 0) {
      const translateResults = async () => {
        try {
          const translated = {
            ...searchResults,
            legalDomain: t(searchResults.legalDomain),
            summary: searchResults.summary ? t(searchResults.summary) : '',
            urgencyLevel: searchResults.urgencyLevel ? t(searchResults.urgencyLevel) : '',
            possibleComplaints: searchResults.possibleComplaints?.map(complaint => t(complaint)) || [],
            userRights: searchResults.userRights?.map(right => t(right)) || [],
            relevantLaws: searchResults.relevantLaws?.map(law => t(law)) || [],
            recommendedSteps: searchResults.recommendedSteps?.map(step => t(step)) || [],
            additionalInfo: searchResults.additionalInfo ? t(searchResults.additionalInfo) : ''
          };
          setTranslatedResults(translated);
        } catch (error) {
          console.error('Translation error:', error);
          setTranslatedResults(searchResults);
        }
      };
      translateResults();
    }
  }, [searchResults, language, t]);

  React.useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) {
      toast.error(t('search.error.empty'));
      return;
    }

    try {
      const results = await searchLegal(query);
      if (results) {
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error(t('search.error.failed'));
    }
  };

  const speakResults = (text) => {
    speak(text);
  };

  const getUrgencyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900';
    }
  };

  // Use searchResults directly for display
  const displayResults = searchResults;

  console.log(t('features.ai_search_title'));

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('app.title')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('app.subtitle')}
          </p>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={listening ? stopListening : startListening}
                  variant={listening ? 'danger' : 'outline'}
                  className="px-6 py-4"
                >
                  {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <Button
                  onClick={() => handleSearch()}
                  disabled={loading || !searchQuery.trim()}
                  className="px-8 py-4"
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    t('search.button')
                  )}
                </Button>
              </div>
            </div>

            {listening && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    {t('search.listening')}
                  </span>
                </div>
                {transcript && (
                  <p className="mt-2 text-blue-800 dark:text-blue-200">{transcript}</p>
                )}
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {displayResults && Object.keys(displayResults).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('search.results')}
              </h2>

              {/* Legal Domain & Urgency */}
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {displayResults.legalDomain}
                    </h3>
                    {displayResults.summary && (
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {displayResults.summary}
                      </p>
                    )}
                  </div>
                  {displayResults.urgencyLevel && (
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getUrgencyColor(displayResults.urgencyLevel)}`}>
                      {displayResults.urgencyLevel.toUpperCase()} {t('search.priority')}
                    </span>
                  )}
                </div>
              </Card>

              {/* Possible Complaints */}
              {Array.isArray(displayResults.possibleComplaints) && displayResults.possibleComplaints.length > 0 && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      {t('search.possibleComplaints')}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {displayResults.possibleComplaints.map((complaint, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 dark:text-gray-300">{complaint}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* User Rights */}
              {Array.isArray(displayResults.userRights) && displayResults.userRights.length > 0 && (
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {t('search.userRights')}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speakResults(displayResults.userRights.join('. '))}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <ul className="space-y-3">
                    {displayResults.userRights.map((right, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 dark:text-gray-300">{right}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Relevant Laws */}
              {Array.isArray(displayResults.relevantLaws) && displayResults.relevantLaws.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('search.relevantLaws')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {displayResults.relevantLaws.map((law, index) => (
                      <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <span className="text-blue-800 dark:text-blue-200 font-medium">{law}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Recommended Steps */}
              {Array.isArray(displayResults.recommendedSteps) && displayResults.recommendedSteps.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('search.recommendedSteps')}
                  </h3>
                  <ol className="space-y-3">
                    {displayResults.recommendedSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              )}

              {/* Additional Info */}
              {displayResults.additionalInfo && (
                <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        {t('search.additionalInfo')}
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        {displayResults.additionalInfo}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SmartSearch;
