import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MenuIcon } from '@heroicons/react/outline';
import LanguageSelector from '../common/LanguageSelector';

const Header = ({ onMenuClick }) => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 hover:text-blue-500 focus:outline-none"
            aria-label="Menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          {/* Logo and Title */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {t('app.title')}
            </h1>
          </div>

          {/* Language Selector */}
          <div className="flex items-center">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
