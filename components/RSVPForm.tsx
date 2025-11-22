import React, { useState } from 'react';
import { Button } from './Button';
import { Guest } from '../types';
import { useConfig } from '../context/ConfigContext';

interface RSVPFormProps {
  onSubmit: (guest: Omit<Guest, 'id' | 'confirmedAt'>) => void;
  onBack: () => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit, onBack }) => {
  const { config } = useConfig();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    whatsapp: ''
  });

  const playTypingSound = () => {
    try {
      const audio = new Audio(config.typingSound);
      audio.volume = 0.3; 
      // Randomize pitch slightly for variety
      audio.playbackRate = 0.9 + Math.random() * 0.4; 
      audio.play().catch(() => {}); // Ignore auto-play errors if rapid typing
    } catch (e) {
      // Silent fail
    }
  };

  const playSubmitSound = () => {
    try {
      const audio = new Audio(config.submitSound);
      audio.volume = 0.6;
      audio.play().catch(e => console.log("Audio play failed", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.whatsapp) {
      playSubmitSound();
      // Delay slightly for the sound to be heard
      setTimeout(() => {
        onSubmit(formData);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a1a1a]">
      {/* Bedrock Pattern Background */}
       <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #444 25%, transparent 25%, transparent 75%, #444 75%, #444), repeating-linear-gradient(45deg, #444 25%, #222 25%, #222 75%, #444 75%, #444)`,
          backgroundPosition: '0 0, 10px 10px',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="minecraft-panel p-1 bg-[#C6C6C6]">
          <div className="border-4 border-[#373737] p-6 bg-[#C6C6C6]">
            
            <h2 className="text-3xl text-center mb-6 text-[#373737]">CONFIRMACIÓN</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xl text-[#555]">Nombre y Apellido</label>
                <input
                  required
                  type="text"
                  className="minecraft-input w-full p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[#3C8527] border-4 border-[#555]"
                  placeholder="Steve..."
                  value={formData.fullName}
                  onKeyDown={playTypingSound}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xl text-[#555]">Dirección</label>
                <input
                  required
                  type="text"
                  className="minecraft-input w-full p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[#3C8527] border-4 border-[#555]"
                  placeholder="Calle Falsa 123..."
                  value={formData.address}
                  onKeyDown={playTypingSound}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xl text-[#555]">WhatsApp</label>
                <input
                  required
                  type="tel"
                  className="minecraft-input w-full p-3 text-xl focus:outline-none focus:ring-4 focus:ring-[#3C8527] border-4 border-[#555]"
                  placeholder="11 1234 5678"
                  value={formData.whatsapp}
                  onKeyDown={playTypingSound}
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button type="submit" fullWidth>
                  ENVIAR Y JUGAR
                </Button>
                <Button type="button" variant="secondary" fullWidth onClick={onBack}>
                  VOLVER
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};