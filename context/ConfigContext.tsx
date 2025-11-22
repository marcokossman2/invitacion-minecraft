import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig } from '../types';

const DEFAULT_CONFIG: AppConfig = {
  // Mario Theme Cover
  coverImage: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1000&auto=format&fit=crop', 
  // Upbeat 8-bit platformer music
  bgMusic: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3', 
  // Coin sound for typing
  typingSound: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3', 
  // Jump sound for buttons
  buttonSound: 'https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3', 
  // Level Clear / Star power
  winSound: 'https://assets.mixkit.co/active_storage/sfx/1064/1064-preview.mp3', 
  // Game Over / Damage
  loseSound: 'https://assets.mixkit.co/active_storage/sfx/2043/2043-preview.mp3', 
  // 1-Up / Power Up
  submitSound: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3' 
};

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (newConfig: AppConfig) => void;
  resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const storedConfig = localStorage.getItem('tiago_party_config');
    if (storedConfig) {
      try {
        const parsed = JSON.parse(storedConfig);
        // Merge with default to ensure all keys exist if new ones were added
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      } catch (e) {
        console.error("Error loading config", e);
      }
    }
  }, []);

  const updateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('tiago_party_config', JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.setItem('tiago_party_config', JSON.stringify(DEFAULT_CONFIG));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};