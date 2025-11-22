import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Check } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

interface MiniGameProps {
  onFinish: () => void;
}

type BlockType = 'dirt' | 'stone' | 'diamond' | 'tnt' | 'air';

interface Block {
  id: number;
  type: BlockType;
  isOpen: boolean;
}

export const MiniGame: React.FC<MiniGameProps> = ({ onFinish }) => {
  const { config } = useConfig();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [msg, setMsg] = useState("¡Minar para entrar!");

  const playSound = (type: 'win' | 'explode' | 'click') => {
    try {
      let src = '';
      if (type === 'win') src = config.winSound;
      if (type === 'explode') src = config.loseSound;
      if (type === 'click') src = config.buttonSound;

      const audio = new Audio(src);
      audio.volume = 0.6;
      audio.play().catch(e => console.log("Audio play failed", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  // Initialize Grid
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const newBlocks: Block[] = [];
    for (let i = 0; i < 16; i++) {
      // Chance: 20% Diamond, 20% TNT, 60% Dirt/Stone
      const rand = Math.random();
      let type: BlockType = 'dirt';
      if (rand < 0.2) type = 'diamond';
      else if (rand < 0.4) type = 'tnt';
      else if (rand < 0.7) type = 'stone';

      newBlocks.push({ id: i, type, isOpen: false });
    }
    setBlocks(newBlocks);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setMsg("¡Encuentra 3 Diamantes!");
  };

  const handleBlockClick = (id: number) => {
    if (gameOver || gameWon) return;

    setBlocks(prev => prev.map(b => {
      if (b.id === id && !b.isOpen) {
        return { ...b, isOpen: true };
      }
      return b;
    }));

    const block = blocks.find(b => b.id === id);
    if (!block || block.isOpen) return;

    if (block.type === 'tnt') {
      playSound('explode');
      setGameOver(true);
      setMsg("¡BOOM! Perdiste.");
      // Reveal all
      setBlocks(prev => prev.map(b => ({ ...b, isOpen: true })));
    } else if (block.type === 'diamond') {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore >= 3) {
        playSound('win');
        setGameWon(true);
        setMsg("¡GANASTE! Asistencia Confirmada.");
        // Reveal all
        setBlocks(prev => prev.map(b => ({ ...b, isOpen: true })));
      } else {
        playSound('click');
      }
    } else {
      // Empty block sound
      playSound('click');
    }
  };

  const getBlockColor = (type: BlockType) => {
    switch (type) {
      case 'dirt': return 'bg-[#5c4033]'; // Brown
      case 'stone': return 'bg-[#757575]'; // Gray
      case 'diamond': return 'bg-[#00ffff]'; // Cyan
      case 'tnt': return 'bg-red-600'; // Red
      default: return 'bg-transparent';
    }
  };

  const renderContent = (type: BlockType) => {
    if (type === 'diamond') return <div className="animate-bounce text-2xl">💎</div>;
    if (type === 'tnt') return <div className="text-xl font-bold text-black">TNT</div>;
    return null;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6 z-10">
        <h2 className={`text-4xl mb-2 ${gameOver ? 'text-red-500' : 'text-yellow-400'}`}>
          {msg}
        </h2>
        <div className="text-2xl text-white">Diamantes: {score}/3</div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-8 bg-[#373737] p-2 border-4 border-[#7e7e7e]">
        {blocks.map((block) => (
          <button
            key={block.id}
            onClick={() => handleBlockClick(block.id)}
            disabled={block.isOpen || gameOver || gameWon}
            className={`
              w-16 h-16 sm:w-20 sm:h-20 
              border-4 
              flex items-center justify-center
              transition-all duration-100
              ${block.isOpen 
                ? `${getBlockColor(block.type)} border-black/20 inner-shadow` 
                : 'bg-[#5c4033] border-[#3e2b22] hover:bg-[#6d4c3d]'
              }
            `}
            style={!block.isOpen ? {
               backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM1YzQwMzMiLz48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjNmQ0YzNkIi8+PC9zdmc+')`,
               backgroundSize: '100% 100%',
               imageRendering: 'pixelated'
            } : {}}
          >
            {block.isOpen && renderContent(block.type)}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="animate-bounce">
            <Button onClick={onFinish} variant="primary">
               IR AL INICIO <Check className="inline ml-2"/>
            </Button>
        </div>
      )}

      {gameOver && (
        <Button onClick={initGame} variant="secondary">
          INTENTAR DE NUEVO
        </Button>
      )}

      {!gameOver && !gameWon && (
        <div className="text-gray-500 text-sm mt-4">
          Cuidado con la TNT...
        </div>
      )}
    </div>
  );
};