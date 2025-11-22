import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const MusicPlayer: React.FC = () => {
  const { config } = useConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Lower volume for background
      // Update src if it changes dynamically
      if (audioRef.current.src !== config.bgMusic) {
          const wasPlaying = !audioRef.current.paused;
          audioRef.current.src = config.bgMusic;
          if (wasPlaying) audioRef.current.play().catch(console.error);
      }
    }
  }, [config.bgMusic]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        // Attempt autoplay after first interaction
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((e) => {
            console.warn("Audio autoplay failed even after interaction:", e);
          });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [hasInteracted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error("Play failed:", e));
        setIsPlaying(true);
        setHasInteracted(true);
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce-slow">
      <button 
        onClick={togglePlay}
        className={`
            minecraft-btn flex items-center justify-center
            w-12 h-12
            border-4 border-black
            ${isPlaying ? 'bg-[#3C8527]' : 'bg-[#7E7E7E]'}
            text-white
            shadow-lg
            hover:brightness-110
            transition-all
        `}
        title={isPlaying ? "Silenciar música" : "Reproducir música"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
      />
    </div>
  );
};