import React, { useMemo } from 'react';
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
  X
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from '../../hooks/useTranslation';

const Sidebar = () => {
  const { t, language } = useTranslation();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const menuItems = useMemo(() => [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/faq', icon: HelpCircle, label: t('nav.faq') },
    { path: '/about', icon: Info, label: t('nav.about') },
    { path: '/contact', icon: MessageSquare, label: t('nav.contact') }
  ], [t, language]);

  const toolItems = useMemo(() => [
    { path: '/#calculator', icon: Calculator, label: t('calculator.title'), scrollTo: 'calculator-section' },
    { path: '/#documents', icon: FileText, label: t('documents.title'), scrollTo: 'documents' },
    { path: '/#emergency', icon: Phone, label: t('emergency.title'), scrollTo: 'emergency' }
  ], [t, language]);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const handleScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSidebarOpen(false);
    }
  };

  const MenuItem = ({ item, isActive }) => (
    <motion.div whileHover={{ x: 8 }} whileTap={{ scale: 0.95 }}>
      {item.scrollTo ? (
        <button
          onClick={() => handleScrollTo(item.scrollTo)}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      ) : (
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
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
          />

          {/* Sidebar */}
          <motion.aside
            key="sidebar-aside"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-xl z-40 overflow-y-auto border-r border-gray-200 dark:border-gray-700"
          >
            <div className="p-4">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

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
                      isActive={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
