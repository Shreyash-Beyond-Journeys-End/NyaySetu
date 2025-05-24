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
import './i18n';
import './styles/globals.css';

function App() {
  const { theme, sidebarOpen } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
        <Header />
        
        <motion.div 
          className="flex"
          animate={{ marginLeft: sidebarOpen ? '280px' : '0px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Sidebar />
          
          <main className="flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </motion.div>

        <LegalChatbot />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
