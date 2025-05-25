import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/outline';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'te', name: 'తెలుగు' }
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-500 focus:outline-none"
        aria-label="Select Language"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span className="hidden md:inline">
          {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              i18n.language === language.code ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
