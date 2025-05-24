import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = useAppStore();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setLanguage(languageCode);
    localStorage.setItem('language', languageCode);
  };

  const getCurrentLanguage = () => i18n.language;

  return {
    changeLanguage,
    getCurrentLanguage,
    supportedLanguages: ['en', 'hi', 'mr']
  };
};
