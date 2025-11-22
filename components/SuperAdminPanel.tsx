import React, { useState } from 'react';
import { Button } from './Button';
import { useConfig } from '../context/ConfigContext';
import { LogOut, RotateCcw, Save } from 'lucide-react';
import { AppConfig } from '../types';

interface SuperAdminPanelProps {
  onLogout: () => void;
}

export const SuperAdminPanel: React.FC<SuperAdminPanelProps> = ({ onLogout }) => {
  const { config, updateConfig, resetConfig } = useConfig();
  const [tempConfig, setTempConfig] = useState<AppConfig>(config);
  const [msg, setMsg] = useState('');

  const handleChange = (key: keyof AppConfig, value: string) => {
    setTempConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(tempConfig);
    setMsg('SAVED!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset to Factory Settings?")) {
        resetConfig();
        setTempConfig(config); 
        window.location.reload(); 
    }
  };

  return (
    <div className="min-h-screen bg-[#000] p-4 pb-20 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b-4 border-white pb-4">
          <h1 className="text-xl text-white font-bold" style={{ fontFamily: "'Press Start 2P'" }}>WARP ZONE (CONFIG)</h1>
          <Button onClick={onLogout} variant="danger" className="text-xs px-3 py-2">
            <LogOut className="w-3 h-3 mr-2 inline" /> QUIT
          </Button>
        </div>

        <div className="mario-panel p-6 bg-white border-4 border-white rounded-lg">
             
             {msg && (
                 <div className="bg-green-500 text-white p-2 mb-4 border-2 border-black text-center animate-bounce font-bold">
                     {msg}
                 </div>
             )}

             <form onSubmit={handleSave} className="space-y-4 text-xs">
                
                <div className="space-y-2">
                   <label className="block font-bold text-black uppercase">Cover Image (URL)</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-3 border-2 border-black bg-gray-100"
                      value={tempConfig.coverImage}
                      onChange={e => handleChange('coverImage', e.target.value)}
                   />
                   {tempConfig.coverImage && (
                       <div className="h-20 w-full overflow-hidden border-2 border-black mt-2 rounded">
                           <img src={tempConfig.coverImage} alt="Preview" className="h-full w-full object-cover" />
                       </div>
                   )}
                </div>

                <hr className="border-black/20 my-4" />
                <h3 className="text-sm font-bold text-red-600 uppercase">Audio Assets</h3>

                <div className="space-y-2">
                   <label className="block text-gray-600 uppercase">BGM (Music)</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-2 border-2 border-black bg-gray-100"
                      value={tempConfig.bgMusic}
                      onChange={e => handleChange('bgMusic', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-gray-600 uppercase">Type / Coin Sound</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-2 border-2 border-black bg-gray-100"
                      value={tempConfig.typingSound}
                      onChange={e => handleChange('typingSound', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-gray-600 uppercase">Jump / Click Sound</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-2 border-2 border-black bg-gray-100"
                      value={tempConfig.buttonSound}
                      onChange={e => handleChange('buttonSound', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-gray-600 uppercase">Stage Clear</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-2 border-2 border-black bg-gray-100"
                      value={tempConfig.winSound}
                      onChange={e => handleChange('winSound', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-gray-600 uppercase">Game Over / Hit</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-2 border-2 border-black bg-gray-100"
                      value={tempConfig.loseSound}
                      onChange={e => handleChange('loseSound', e.target.value)}
                   />
                </div>
                
                 <div className="space-y-2">
                   <label className="block text-gray-600 uppercase">1-Up / Success</label>
                   <input 
                      type="text"
                      className="mario-input w-full p-2 border-2 border-black bg-gray-100"
                      value={tempConfig.submitSound}
                      onChange={e => handleChange('submitSound', e.target.value)}
                   />
                </div>

                <div className="pt-6 flex gap-4">
                    <Button type="submit" fullWidth>
                        <Save className="inline mr-2 w-4 h-4" /> SAVE GAME
                    </Button>
                </div>
             </form>

             <div className="mt-4 pt-4 border-t-2 border-gray-200">
                 <Button variant="danger" onClick={handleReset} fullWidth className="text-xs">
                    <RotateCcw className="inline mr-2 w-3 h-3" /> RESET CARTRIDGE
                 </Button>
             </div>

        </div>
      </div>
    </div>
  );
};