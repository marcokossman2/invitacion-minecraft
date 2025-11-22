import React, { useState, useEffect } from 'react';
import { InvitationCard } from './components/InvitationCard';
import { RSVPForm } from './components/RSVPForm';
import { MiniGame } from './components/MiniGame';
import { AdminPanel } from './components/AdminPanel';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { Button } from './components/Button';
import { Guest, ViewState } from './types';
import { ConfigProvider } from './context/ConfigContext';

// Constants for credentials
const ADMIN_USER = "admincumple";
const ADMIN_PASS = "1234";

const SUPER_ADMIN_USER = "superadmin";
const SUPER_ADMIN_PASS = "super1234";

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('invitation');
  const [guests, setGuests] = useState<Guest[]>([]);
  
  // Admin Login State
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Load guests from localStorage on mount
  useEffect(() => {
    const storedGuests = localStorage.getItem('tiago_party_guests');
    if (storedGuests) {
      setGuests(JSON.parse(storedGuests));
    }
  }, []);

  const handleRSVP = (data: { fullName: string; address: string; whatsapp: string }) => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      ...data,
      confirmedAt: new Date().toISOString()
    };
    
    const updatedGuests = [...guests, newGuest];
    setGuests(updatedGuests);
    localStorage.setItem('tiago_party_guests', JSON.stringify(updatedGuests));
    
    // Redirect to game
    setView('game');
  };

  const handleDeleteGuest = (id: string) => {
      const updatedGuests = guests.filter(g => g.id !== id);
      setGuests(updatedGuests);
      localStorage.setItem('tiago_party_guests', JSON.stringify(updatedGuests));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Regular Admin
    if (adminUser === ADMIN_USER && adminPass === ADMIN_PASS) {
      setView('admin-panel');
      setLoginError(false);
      setAdminUser('');
      setAdminPass('');
      return;
    } 
    // Super Admin
    if (adminUser === SUPER_ADMIN_USER && adminPass === SUPER_ADMIN_PASS) {
      setView('super-admin-panel');
      setLoginError(false);
      setAdminUser('');
      setAdminPass('');
      return;
    }

    setLoginError(true);
  };

  return (
    <div className="min-h-screen w-full relative">
       {/* Background Music Player */}
       <MusicPlayer />

       {/* Global Scanlines Effect */}
       <div className="scanlines" />

       {view === 'invitation' && (
         <InvitationCard 
           onRsvpClick={() => setView('rsvp')}
           onAdminClick={() => setView('admin-login')}
         />
       )}

       {view === 'rsvp' && (
         <RSVPForm 
           onSubmit={handleRSVP}
           onBack={() => setView('invitation')}
         />
       )}

       {view === 'game' && (
         <MiniGame onFinish={() => setView('invitation')} />
       )}

       {view === 'admin-login' && (
         <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] p-4">
            <div className="minecraft-panel p-1 bg-[#C6C6C6]">
               <div className="border-4 border-[#373737] p-8 bg-[#C6C6C6] max-w-sm w-full">
                  <h2 className="text-2xl text-center mb-4 text-black">ADMIN LOGIN</h2>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                     <input 
                       type="text" 
                       placeholder="Usuario"
                       className="minecraft-input w-full p-2 border-2 border-black text-white"
                       value={adminUser}
                       onChange={e => setAdminUser(e.target.value)}
                     />
                     <input 
                       type="password" 
                       placeholder="Contraseña"
                       className="minecraft-input w-full p-2 border-2 border-black text-white"
                       value={adminPass}
                       onChange={e => setAdminPass(e.target.value)}
                     />
                     {loginError && <p className="text-red-600 text-sm">Credenciales incorrectas.</p>}
                     
                     <div className="flex gap-2 pt-2">
                        <Button type="submit" fullWidth>ENTRAR</Button>
                     </div>
                     <div className="mt-2">
                       <Button type="button" variant="secondary" fullWidth onClick={() => setView('invitation')}>
                         CANCELAR
                       </Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
       )}

       {view === 'admin-panel' && (
         <AdminPanel 
           guests={guests} 
           onLogout={() => setView('invitation')}
           onDelete={handleDeleteGuest}
         />
       )}

       {view === 'super-admin-panel' && (
         <SuperAdminPanel onLogout={() => setView('invitation')} />
       )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
};

export default App;