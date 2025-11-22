import React, { useState } from 'react';
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
    <div className="min-h-screen bg-[#2c2c2c] p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-4 border-[#555] pb-4">
          <h1 className="text-3xl text-yellow-400">PANEL DE ADMIN - CONFIRMADOS</h1>
          <Button onClick={onLogout} variant="danger" className="text-sm px-4 py-2">
            <LogOut className="w-4 h-4 mr-2 inline" /> SALIR
          </Button>
        </div>

        <div className="bg-[#1a1a1a] border-4 border-[#000] p-4 shadow-xl">
          {guests.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No hay invitados confirmados aún.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#3C8527] text-white">
                    <th className="p-3 border-2 border-black">Nombre</th>
                    <th className="p-3 border-2 border-black">Dirección</th>
                    <th className="p-3 border-2 border-black">WhatsApp</th>
                    <th className="p-3 border-2 border-black">Fecha</th>
                    <th className="p-3 border-2 border-black">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    <tr key={guest.id} className="bg-[#383838] hover:bg-[#444] border-b-2 border-black">
                      <td className="p-3 border-r-2 border-black font-bold">{guest.fullName}</td>
                      <td className="p-3 border-r-2 border-black">{guest.address}</td>
                      <td className="p-3 border-r-2 border-black font-mono">
                         <a href={`https://wa.me/${guest.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-400 hover:underline">
                            {guest.whatsapp}
                         </a>
                      </td>
                      <td className="p-3 border-r-2 border-black text-sm text-gray-400">
                        {new Date(guest.confirmedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                         <button onClick={() => onDelete(guest.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 size={20} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-right text-gray-500 text-sm">
           Total Confirmados: {guests.length}
        </div>
      </div>
    </div>
  );
};