import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig } from '../types';

const DEFAULT_CONFIG: AppConfig = {
  coverImage: 'https://images.unsplash.com/photo-1599009434802-ca1dd09895e7?q=80&w=1000&auto=format&fit=crop',
  // Stable 8-bit background music from Internet Archive
  bgMusic: 'https://ia800504.us.archive.org/11/items/OneStop_8bit/03_OneStop_8bit_Pop.mp3',
  // Wood tap sound for typing (Mixkit)
  typingSound: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  // UI Click sound (Mixkit)
  buttonSound: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  // Win/Success Arcade sound (Mixkit)
  winSound: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  // 8-bit Explosion (Mixkit)
  loseSound: 'https://assets.mixkit.co/active_storage/sfx/1698/1698-preview.mp3',
  // Magical Success / Level Up style (Mixkit)
  submitSound: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'
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