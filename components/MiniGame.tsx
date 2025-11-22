import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Star } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

interface MiniGameProps {
  onFinish: () => void;
}

type BlockType = 'brick' | 'question' | 'coin' | 'goomba' | 'empty';

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
  const [msg, setMsg] = useState("¡Hit the Blocks!");

  const playSound = (type: 'win' | 'lose' | 'hit' | 'coin') => {
    try {
      let src = '';
      if (type === 'win') src = config.winSound;
      if (type === 'lose') src = config.loseSound;
      if (type === 'hit') src = config.buttonSound; // Jump sound
      if (type === 'coin') src = config.typingSound; // Coin sound

      const audio = new Audio(src);
      audio.volume = 0.5;
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
      // Chance: 20% Coin, 20% Goomba, 60% Brick/Question
      const rand = Math.random();
      let type: BlockType = 'brick';
      if (rand < 0.2) type = 'coin';
      else if (rand < 0.4) type = 'goomba';
      else if (rand < 0.7) type = 'question';

      newBlocks.push({ id: i, type, isOpen: false });
    }
    setBlocks(newBlocks);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setMsg("Find 3 Coins!");
  };

  const handleBlockClick = (id: number) => {
    if (gameOver || gameWon) return;

    const block = blocks.find(b => b.id === id);
    if (!block || block.isOpen) return;

    // Play jump sound immediately
    playSound('hit');

    setBlocks(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, isOpen: true };
      }
      return b;
    }));

    if (block.type === 'goomba') {
      setTimeout(() => playSound('lose'), 200);
      setGameOver(true);
      setMsg("Oh no! Goomba!");
      // Reveal all
      setBlocks(prev => prev.map(b => ({ ...b, isOpen: true })));
    } else if (block.type === 'coin') {
      setTimeout(() => playSound('coin'), 100);
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore >= 3) {
        setTimeout(() => playSound('win'), 500);
        setGameWon(true);
        setMsg("COURSE CLEAR!");
        // Reveal all
        setBlocks(prev => prev.map(b => ({ ...b, isOpen: true })));
      }
    }
  };

  const renderContent = (type: BlockType) => {
    if (type === 'coin') return <div className="animate-bounce text-2xl text-yellow-400 drop-shadow-md">🟡</div>; // Coin
    if (type === 'goomba') return <div className="text-2xl text-amber-900">🍄</div>; // Goomba lookalike
    if (type === 'question' || type === 'brick') return <div className="text-gray-400 text-xs">EMPTY</div>;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#5C94FC] flex flex-col items-center justify-center p-4">
      
      {/* Header UI */}
      <div className="flex justify-between w-full max-w-md mb-8 px-4 text-white uppercase font-bold drop-shadow-md text-xl">
        <div>SCORE</div>
        <div className="text-yellow-300">x {score}</div>
        <div>TIME</div>
        <div>∞</div>
      </div>

      <div className="text-center mb-6 z-10">
        <h2 className={`text-2xl mb-2 bg-black/20 p-2 rounded ${gameOver ? 'text-red-600' : 'text-white'}`}>
          {msg}
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-8 bg-black/10 p-4 rounded-xl">
        {blocks.map((block) => (
          <button
            key={block.id}
            onClick={() => handleBlockClick(block.id)}
            disabled={block.isOpen || gameOver || gameWon}
            className={`
              w-16 h-16 sm:w-20 sm:h-20 
              border-4 border-black
              flex items-center justify-center
              transition-all duration-100
              rounded-lg
              ${!block.isOpen ? 'shadow-[4px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none' : ''}
              ${block.isOpen 
                ? 'bg-[#bcafa5]' 
                : 'bg-[#FBD000]'
              }
            `}
          >
            {!block.isOpen ? (
                <div className="text-3xl font-bold text-[#b39200] animate-pulse">?</div>
            ) : (
                renderContent(block.type)
            )}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="animate-bounce">
            <Button onClick={onFinish} variant="primary" className="bg-green-500 border-white">
               FINISH LEVEL <Star className="inline ml-2 w-4 h-4"/>
            </Button>
        </div>
      )}

      {gameOver && (
        <Button onClick={initGame} variant="danger">
          TRY AGAIN
        </Button>
      )}

      {!gameOver && !gameWon && (
        <div className="text-white text-[10px] mt-4 animate-pulse">
          Watch out for Goombas!
        </div>
      )}
    </div>
  );
};