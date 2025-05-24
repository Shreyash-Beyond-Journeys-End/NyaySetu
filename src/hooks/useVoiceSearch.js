import { useState, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

export const useVoiceSearch = () => {
  const { i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = useCallback(() => {
    if (!browserSupportsSpeechRecognition) return;
    
    setIsListening(true);
    SpeechRecognition.startListening({
      language: i18n.language === 'hi' ? 'hi-IN' : i18n.language === 'mr' ? 'mr-IN' : 'en-IN',
      continuous: false
    });
  }, [i18n.language, browserSupportsSpeechRecognition]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  }, []);

  return {
    transcript,
    listening,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};
