import { useState, useCallback, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export const useTextToSpeech = () => {
  const { language } = useAppStore();
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const getVoiceForLanguage = useCallback((lang) => {
    const languageMap = {
      'en': ['en-IN', 'en-US', 'en-GB'],
      'hi': ['hi-IN', 'hi'],
      'mr': ['mr-IN', 'mr'],
      'te': ['te-IN', 'te']
    };

    const preferredLanguages = languageMap[lang] || ['en-IN'];
    
    for (const prefLang of preferredLanguages) {
      const voice = voices.find(v => v.lang.startsWith(prefLang));
      if (voice) return voice;
    }
    
    // Fallback to any English voice
    return voices.find(v => v.lang.startsWith('en')) || voices[0];
  }, [voices]);

  const speak = useCallback((text, customLanguage = null) => {
    if (!text || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLanguage = customLanguage || language;
    
    // Set voice
    const voice = getVoiceForLanguage(targetLanguage);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Set language
    const langMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'mr': 'mr-IN',
      'te': 'te-IN'
    };
    utterance.lang = langMap[targetLanguage] || 'en-IN';
    
    // Set speech parameters
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    speechSynthesis.speak(utterance);
  }, [language, getVoiceForLanguage]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const pause = useCallback(() => {
    speechSynthesis.pause();
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
  }, []);

  return { 
    speak, 
    stop, 
    pause, 
    resume, 
    speaking, 
    voices,
    isSupported: 'speechSynthesis' in window
  };
};
