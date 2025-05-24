import { useAppStore } from '../store/appStore';
import translationService from '../services/translationService';

export const useTranslation = () => {
  const { language, setLanguage } = useAppStore();

  const t = (key, fallback = null) => {
    const translation = translationService.translate(key, language);
    return translation !== key ? translation : (fallback || key);
  };

  const translateDynamic = async (text, targetLanguage = null) => {
    const target = targetLanguage || language;
    return await translationService.translateDynamic(text, target);
  };

  const changeLanguage = (newLanguage) => {
    if (translationService.isLanguageSupported(newLanguage)) {
      setLanguage(newLanguage);
      // Update document language attribute
      document.documentElement.lang = newLanguage;
      // Update localStorage
      localStorage.setItem('language', newLanguage);
    } else {
      console.warn(`Language ${newLanguage} is not supported`);
    }
  };

  const getSupportedLanguages = () => {
    return translationService.getSupportedLanguages();
  };

  return {
    t,
    language,
    changeLanguage,
    translateDynamic,
    getSupportedLanguages,
    isSupported: translationService.isLanguageSupported,
    direction: translationService.getLanguageDirection(language)
  };
};
