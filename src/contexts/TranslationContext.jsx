// src/contexts/TranslationContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import translationService from '../services/translationService';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { language, setLanguage } = useAppStore();

  useEffect(() => {
    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translationService.isLanguageSupported(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.lang = language;
    document.documentElement.dir = translationService.getLanguageDirection(language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    translate: (key) => translationService.translate(key, language),
    translateDynamic: (text, target) => translationService.translateDynamic(text, target || language),
    getSupportedLanguages: () => translationService.getSupportedLanguages()
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within TranslationProvider');
  }
  return context;
};
