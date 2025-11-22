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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Sky & Clouds Background */}
      <div className="absolute inset-0 z-0 bg-[#6b8cff]">
        {/* CSS Clouds */}
        <div className="absolute top-10 left-10 w-24 h-8 bg-white rounded-full opacity-80 animate-[float_10s_infinite_linear]" />
        <div className="absolute top-40 right-20 w-32 h-10 bg-white rounded-full opacity-60 animate-[float_15s_infinite_linear]" />
        <div className="absolute bottom-20 left-1/3 w-20 h-8 bg-white rounded-full opacity-70 animate-[float_12s_infinite_linear]" />
      </div>
      
      {/* Green Floor */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-[#009900] border-t-4 border-[#004400] z-0">
         <div className="w-full h-4 bg-[#99ff66] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up mt-[-2rem]">
        {/* Main Card */}
        <div className="mario-panel p-1 bg-[#FBD000]">
          <div className="border-4 border-dashed border-[#E52521] p-6 flex flex-col items-center text-center space-y-6 bg-white rounded-xl">
            
            {/* Header Image Area */}
            <div className="w-full h-48 bg-[#5C94FC] mb-2 border-4 border-black overflow-hidden relative group rounded-lg shadow-inner">
               <img 
                 src={config.coverImage} 
                 alt="Mario Party" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-2 right-2 text-white text-[10px] drop-shadow-md animate-bounce">
                  It's me, Tiago!
               </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl text-[#E52521] drop-shadow-[4px_4px_0_#000] leading-tight mb-2">
                TIAGO
              </h1>
              <h2 className="text-sm text-[#000] uppercase tracking-widest">
                Te invito a mi cumple
              </h2>
            </div>

            {/* Question Block Separator */}
            <div className="flex justify-center space-x-4 text-2xl">
               <span className="animate-bounce text-[#FBD000] drop-shadow-md">?</span>
               <span className="animate-bounce delay-75 text-[#FBD000] drop-shadow-md">?</span>
               <span className="animate-bounce delay-150 text-[#FBD000] drop-shadow-md">?</span>
            </div>

            <div className="space-y-4 text-sm w-full font-bold">
              <div className="flex items-center space-x-3 bg-gray-100 p-3 border-2 border-black rounded shadow-md transform -rotate-1">
                <Calendar className="w-6 h-6 text-[#E52521]" />
                <span>05/01/26</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-100 p-3 border-2 border-black rounded shadow-md transform rotate-1">
                <Clock className="w-6 h-6 text-[#E52521]" />
                <span>16:00 HS</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-100 p-3 border-2 border-black rounded shadow-md transform -rotate-1 text-left">
                <MapPin className="w-6 h-6 text-[#E52521] flex-shrink-0" />
                <span className="leading-tight">Damian Garat 1175</span>
              </div>
            </div>

            <div className="pt-4 w-full">
              <Button onClick={onRsvpClick} fullWidth className="animate-pulse bg-[#43B047]">
                PRESS START
              </Button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer / Admin Access */}
      <div className="absolute bottom-2 right-4 z-20">
         <button 
           onClick={onAdminClick}
           className="text-white hover:text-yellow-300 text-[10px] transition-colors drop-shadow-md"
         >
           Admin Warp Pipe
         </button>
      </div>
    </div>
  );
};