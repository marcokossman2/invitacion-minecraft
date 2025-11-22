import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from './Button';
import { useConfig } from '../context/ConfigContext';

interface InvitationCardProps {
  onRsvpClick: () => void;
  onAdminClick: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ onRsvpClick, onAdminClick }) => {
  const { config } = useConfig();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background with Dirt Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-50" 
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/cube-coat.png')`,
          backgroundColor: '#3f2812' // Dirt color
        }}
      />
      
      {/* Grass Top Border */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[#5f9e2e] border-b-4 border-[#416e1c] z-10" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Main Card */}
        <div className="minecraft-panel p-1">
          <div className="border-4 border-[#373737] p-6 flex flex-col items-center text-center space-y-6 bg-[#C6C6C6] text-[#373737]">
            
            {/* Header Image Area */}
            <div className="w-full h-48 bg-black mb-2 border-4 border-black overflow-hidden relative group">
               <img 
                 src={config.coverImage} 
                 alt="Minecraft Party" 
                 className="w-full h-full object-cover pixelated"
               />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
               <div className="absolute bottom-2 right-2 text-white text-xs drop-shadow-md animate-bounce">
                  Creeper? Aww man!
               </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl text-[#3C8527] drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] leading-none mb-2">
                TIAGO
              </h1>
              <h2 className="text-2xl text-[#373737]">
                TE INVITO A MI CUMPLE
              </h2>
            </div>

            <div className="w-full h-1 bg-[#373737] opacity-20" />

            <div className="space-y-4 text-xl w-full">
              <div className="flex items-center space-x-3 bg-white/50 p-2 border-2 border-[#7e7e7e]">
                <Calendar className="w-6 h-6 text-[#3C8527]" />
                <span>05/01/26</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/50 p-2 border-2 border-[#7e7e7e]">
                <Clock className="w-6 h-6 text-[#3C8527]" />
                <span>16:00 HS</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/50 p-2 border-2 border-[#7e7e7e] text-left">
                <MapPin className="w-6 h-6 text-[#3C8527] flex-shrink-0" />
                <span className="leading-tight">Damian Garat 1175</span>
              </div>
            </div>

            <div className="pt-4 w-full">
              <Button onClick={onRsvpClick} fullWidth className="animate-pulse">
                CONFIRMAR ASISTENCIA
              </Button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer / Admin Access */}
      <div className="absolute bottom-4 right-4 z-20">
         <button 
           onClick={onAdminClick}
           className="text-white/20 hover:text-white hover:underline text-sm transition-colors"
         >
           Admin Login
         </button>
      </div>
    </div>
  );
};