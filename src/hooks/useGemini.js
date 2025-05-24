import { useState } from 'react';
import geminiService from '../services/geminiService';
import { useAppStore } from '../store/appStore';
import toast from 'react-hot-toast';

export const useGemini = () => {
  const { language } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLegal = async (query) => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.searchLegalQuery(query, language);
      return result;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to get legal information');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const chatWithAI = async (message, conversationHistory = []) => {
    if (!message.trim()) {
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await geminiService.chatResponse(message, language, conversationHistory);
      return response;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to get AI response');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchLegal,
    chatWithAI,
    loading,
    error,
    clearError: () => setError(null)
  };
};
