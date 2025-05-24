import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import LegalChatbot from './components/chatbot/LegalChatbot';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';

import { useAppStore } from './store/appStore';

function App() {
  const { theme, language } = useAppStore();

  useEffect(() => {
    // Initialize theme
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Set document language
    document.documentElement.lang = language;
  }, [language]);

  return (
    <Router>
      <div className="stable-layout bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
        <Header />
        
        <motion.div 
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            <Sidebar />
            
            <main className="flex-1 min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
        </motion.div>

        <LegalChatbot />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === 'dark' ? '#374151' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#374151',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
