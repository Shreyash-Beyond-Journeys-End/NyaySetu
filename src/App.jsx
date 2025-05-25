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
    const root = document.documentElement;
    const html = document.querySelector('html');
    
    // Set data-theme attribute
    root.setAttribute('data-theme', theme);
    
    // Set dark class on html element
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Set color scheme meta tag
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', theme);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'color-scheme';
      meta.content = theme;
      document.head.appendChild(meta);
    }

    // Set body background color
    document.body.style.backgroundColor = theme === 'dark' ? '#111827' : '#ffffff';
  }, [theme]);

  useEffect(() => {
    // Set document language
    document.documentElement.lang = language;
  }, [language]);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <Header />
        
        <Sidebar />
        <main className="min-h-screen pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

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
