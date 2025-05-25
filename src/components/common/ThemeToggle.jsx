import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore();

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      // Only update if user hasn't manually set a theme
      if (!localStorage.getItem('theme')) {
        setTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Force update body class and background
    const html = document.querySelector('html');
    if (newTheme === 'dark') {
      html.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
    } else {
      html.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-colors ${
        theme === 'light'
          ? 'bg-gray-100 hover:bg-gray-200'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0.8 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-gray-600" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
