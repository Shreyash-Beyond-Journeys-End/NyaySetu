import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  HelpCircle, 
  Info, 
  MessageSquare, 
  Calculator, 
  FileText, 
  Phone, 
  BookOpen,
  Newspaper,
  Settings,
  Shield,
  Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const menuItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/faq', icon: HelpCircle, label: t('nav.faq') },
    { path: '/about', icon: Info, label: t('nav.about') },
    { path: '/contact', icon: MessageSquare, label: t('nav.contact') }
  ];

  const toolItems = [
    { path: '/calculator', icon: Calculator, label: t('nav.calculator') },
    { path: '/documents', icon: FileText, label: t('nav.documents') },
    { path: '/emergency', icon: Phone, label: t('nav.emergency') },
    { path: '/quiz', icon: BookOpen, label: 'Legal Quiz' },
    { path: '/news', icon: Newspaper, label: 'Legal News' }
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: -280,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40
      }
    }
  };

  const MenuItem = ({ item, isActive }) => (
    <motion.div
      whileHover={{ x: 8 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={item.path}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
        }`}
      >
        <item.icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    </motion.div>
  );

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-70 bg-white dark:bg-gray-800 shadow-lg z-40 overflow-y-auto"
      >
        <div className="p-6">
          {/* Main Navigation */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>

          {/* Legal Tools */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Legal Tools
            </h3>
            <div className="space-y-2">
              {toolItems.map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Shield className="h-5 w-5" />
                <span>Privacy Policy</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Users className="h-5 w-5" />
                <span>Community</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
