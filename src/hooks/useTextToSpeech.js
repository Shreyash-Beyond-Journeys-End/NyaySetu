import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useTextToSpeech = () => {
  const { i18n } = useTranslation();
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.lang = i18n.language === 'hi' ? 'hi-IN' : 
                      i18n.language === 'mr' ? 'mr-IN' : 'en-IN';
      
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  }, [i18n.language]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking };
};
