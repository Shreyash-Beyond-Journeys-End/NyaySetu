import { create } from 'zustand';

export const useAppStore = create((set) => ({
  theme: 'light',
  language: 'en',
  sidebarOpen: false,
  searchResults: [],
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSearchResults: (results) => set({ searchResults: results })
}));
