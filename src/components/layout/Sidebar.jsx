import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalculatorIcon,
  DocumentTextIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  MailIcon
} from '@heroicons/react/outline';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      icon: HomeIcon,
      label: t('nav.home')
    },
    {
      path: '/calculator',
      icon: CalculatorIcon,
      label: t('nav.calculator')
    },
    {
      path: '/documents',
      icon: DocumentTextIcon,
      label: t('nav.documents')
    },
    {
      path: '/emergency',
      icon: PhoneIcon,
      label: t('nav.emergency')
    },
    {
      path: '/faq',
      icon: QuestionMarkCircleIcon,
      label: t('nav.faq')
    },
    {
      path: '/about',
      icon: InformationCircleIcon,
      label: t('nav.about')
    },
    {
      path: '/contact',
      icon: MailIcon,
      label: t('nav.contact')
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {t('app.title')}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={onClose}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-sm text-gray-500 text-center">
              {t('app.copyright')}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
