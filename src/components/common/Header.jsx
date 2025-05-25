import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Scale } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const { setSidebarOpen, sidebarOpen } = useAppStore();

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-blue-200 dark:border-gray-700 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </button>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white language-transition">
                    {t('app.title')}
                  </h1>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a 
              href="#search" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('nav.search')}
            </a>
            <a 
              href="#calculator" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('calculator.title')}
            </a>
            <a 
              href="#documents" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('documents.title')}
            </a>
            <a 
              href="#emergency" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('emergency.title')}
            </a>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
