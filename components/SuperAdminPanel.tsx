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
    setMsg('¡Configuración guardada exitosamente!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm("¿Estás seguro de restaurar los valores por defecto?")) {
        resetConfig();
        setTempConfig(config); // Sync local state might need a refresh or just rely on effect, but here we manually sync after reset
        window.location.reload(); // Simple reload to ensure clean state
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b-4 border-[#555] pb-4">
          <h1 className="text-3xl text-purple-400">SUPER ADMIN - CONFIG</h1>
          <Button onClick={onLogout} variant="danger" className="text-sm px-4 py-2">
            <LogOut className="w-4 h-4 mr-2 inline" /> SALIR
          </Button>
        </div>

        <div className="minecraft-panel p-1 bg-[#C6C6C6]">
          <div className="border-4 border-[#373737] p-6 bg-[#C6C6C6]">
             
             {msg && (
                 <div className="bg-green-500 text-white p-2 mb-4 border-2 border-black text-center animate-bounce">
                     {msg}
                 </div>
             )}

             <form onSubmit={handleSave} className="space-y-4">
                
                <div className="space-y-2">
                   <label className="block text-lg font-bold text-[#373737]">Imagen de Portada (URL)</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.coverImage}
                      onChange={e => handleChange('coverImage', e.target.value)}
                   />
                   {tempConfig.coverImage && (
                       <div className="h-20 w-full overflow-hidden border-2 border-black">
                           <img src={tempConfig.coverImage} alt="Preview" className="h-full w-full object-cover" />
                       </div>
                   )}
                </div>

                <hr className="border-[#7e7e7e] my-4" />
                <h3 className="text-xl font-bold text-[#373737]">Sonidos (URLs)</h3>

                <div className="space-y-2">
                   <label className="block text-sm text-[#555]">Música de Fondo</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.bgMusic}
                      onChange={e => handleChange('bgMusic', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-sm text-[#555]">Escribir (Madera)</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.typingSound}
                      onChange={e => handleChange('typingSound', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-sm text-[#555]">Botones (Click)</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.buttonSound}
                      onChange={e => handleChange('buttonSound', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-sm text-[#555]">Victoria (Juego)</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.winSound}
                      onChange={e => handleChange('winSound', e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="block text-sm text-[#555]">Derrota / Explosión (Juego)</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.loseSound}
                      onChange={e => handleChange('loseSound', e.target.value)}
                   />
                </div>
                
                 <div className="space-y-2">
                   <label className="block text-sm text-[#555]">Éxito Formulario (Aldeano/LevelUp)</label>
                   <input 
                      type="text"
                      className="minecraft-input w-full p-2 border-2 border-black"
                      value={tempConfig.submitSound}
                      onChange={e => handleChange('submitSound', e.target.value)}
                   />
                </div>

                <div className="pt-6 flex gap-4">
                    <Button type="submit" fullWidth>
                        <Save className="inline mr-2 w-5 h-5" /> GUARDAR
                    </Button>
                </div>
             </form>

             <div className="mt-4 pt-4 border-t-2 border-[#7e7e7e]">
                 <Button variant="danger" onClick={handleReset} fullWidth className="text-sm">
                    <RotateCcw className="inline mr-2 w-4 h-4" /> RESTAURAR VALORES POR DEFECTO
                 </Button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};