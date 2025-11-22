import React from 'react';
import { Guest } from '../types';
import { Button } from './Button';
import { Trash2, LogOut } from 'lucide-react';

interface AdminPanelProps {
  guests: Guest[];
  onLogout: () => void;
  onDelete: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ guests, onLogout, onDelete }) => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-4 border-white pb-4">
          <h1 className="text-xl md:text-3xl text-[#FBD000] uppercase font-bold tracking-wider drop-shadow-md" style={{ fontFamily: "'Press Start 2P'" }}>
            Admin World 1-1
          </h1>
          <Button onClick={onLogout} variant="danger" className="text-[10px] px-2 py-2">
            <LogOut className="w-3 h-3 mr-2 inline" /> EXIT
          </Button>
        </div>

        <div className="mario-panel p-4 bg-white text-black">
          {guests.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-bold">
              NO GUESTS FOUND IN THIS CASTLE.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#E52521] text-white uppercase text-xs">
                    <th className="p-3 border-2 border-black">Name</th>
                    <th className="p-3 border-2 border-black">Address</th>
                    <th className="p-3 border-2 border-black">WhatsApp</th>
                    <th className="p-3 border-2 border-black">Date</th>
                    <th className="p-3 border-2 border-black">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm font-sans">
                  {guests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-yellow-100 border-b-2 border-black">
                      <td className="p-3 border-r-2 border-black font-bold">{guest.fullName}</td>
                      <td className="p-3 border-r-2 border-black">{guest.address}</td>
                      <td className="p-3 border-r-2 border-black font-mono">
                         <a href={`https://wa.me/${guest.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline font-bold">
                            {guest.whatsapp}
                         </a>
                      </td>
                      <td className="p-3 border-r-2 border-black text-gray-600">
                        {new Date(guest.confirmedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                         <button onClick={() => onDelete(guest.id)} className="text-red-500 hover:scale-110 transition-transform">
                            <Trash2 size={16} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-right text-white text-xs uppercase">
           Score: {guests.length}00
        </div>
      </div>
    </div>
  );
};