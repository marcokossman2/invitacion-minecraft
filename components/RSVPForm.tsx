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
      audio.volume = 0.2; 
      audio.currentTime = 0;
      audio.play().catch(() => {}); 
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
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#000]">
      {/* Brick Pattern Background */}
       <div 
        className="absolute inset-0 z-0 opacity-100" 
        style={{
          backgroundColor: '#b33917',
          backgroundImage: `
            linear-gradient(335deg, rgba(0,0,0,0.3) 23px, transparent 23px),
            linear-gradient(155deg, rgba(0,0,0,0.3) 23px, transparent 23px),
            linear-gradient(335deg, rgba(0,0,0,0.3) 23px, transparent 23px),
            linear-gradient(155deg, rgba(0,0,0,0.3) 23px, transparent 23px)
          `,
          backgroundSize: '58px 58px',
          backgroundPosition: '0px 2px, 4px 35px, 29px 31px, 34px 6px'
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mario-panel p-8">
            
            <h2 className="text-2xl text-center mb-6 text-[#E52521] drop-shadow-sm">
                PLAYER SELECT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold text-black">Tu Nombre (Player 1)</label>
                <input
                  required
                  type="text"
                  className="mario-input w-full p-3 focus:outline-none focus:ring-4 focus:ring-[#FBD000]"
                  placeholder="Mario..."
                  value={formData.fullName}
                  onKeyDown={playTypingSound}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold text-black">Dirección</label>
                <input
                  required
                  type="text"
                  className="mario-input w-full p-3 focus:outline-none focus:ring-4 focus:ring-[#FBD000]"
                  placeholder="Castillo de Peach..."
                  value={formData.address}
                  onKeyDown={playTypingSound}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold text-black">WhatsApp</label>
                <input
                  required
                  type="tel"
                  className="mario-input w-full p-3 focus:outline-none focus:ring-4 focus:ring-[#FBD000]"
                  placeholder="11 1234 5678"
                  value={formData.whatsapp}
                  onKeyDown={playTypingSound}
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button type="submit" fullWidth className="bg-[#FBD000] text-black border-black">
                  LET'S GO!
                </Button>
                <Button type="button" variant="danger" fullWidth onClick={onBack}>
                  BACK
                </Button>
              </div>
            </form>

        </div>
      </div>
    </div>
  );
};