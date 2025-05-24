import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Scale, Search, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '../../store/appStore';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import VoiceSearch from './VoiceSearch';

const Header = () => {
  const { t } = useTranslation();
  const { setSidebarOpen, sidebarOpen } = useAppStore();

  return (
    <motion.header 
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border-b border-blue-200 dark:border-gray-700 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </button>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('app.title')}
              </h1>
            </motion.div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center space-x-4">
            <VoiceSearch />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
