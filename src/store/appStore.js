import { create } from 'zustand';

const getInitialTheme = () => {
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

// Initialize theme immediately
const initialTheme = getInitialTheme();
const html = document.querySelector('html');
if (initialTheme === 'dark') {
  html.classList.add('dark');
} else {
  html.classList.remove('dark');
}

export const useAppStore = create((set) => ({
  // Theme
  theme: initialTheme,
  setTheme: (theme) => {
    const html = document.querySelector('html');
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      html.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
    } else {
      html.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
    
    set({ theme });
  },
  
  // Language
  language: localStorage.getItem('language') || 'en',
  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  },
  
  // UI State
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  // Chatbot State
  chatbotOpen: false,
  setChatbotOpen: (open) => set({ chatbotOpen: open }),
  
  // Search
  searchResults: [],
  searchLoading: false,
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchLoading: (loading) => set({ searchLoading: loading }),
  
  // Location for emergency services
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));
