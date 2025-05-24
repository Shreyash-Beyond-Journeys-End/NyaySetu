import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // Theme
  theme: localStorage.getItem('theme') || 'light',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
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
  
  // Search
  searchResults: [],
  searchLoading: false,
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchLoading: (loading) => set({ searchLoading: loading }),
  
  // Location for emergency services
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));
