import React from 'react';
import { useConfig } from '../context/ConfigContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  playSound?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  playSound = true,
  onClick,
  ...props 
}) => {
  const { config } = useConfig();
  let bgClass = 'bg-[#7E7E7E] text-white'; // Default gray
  if (variant === 'primary') bgClass = 'bg-[#3C8527] text-white'; // Green
  if (variant === 'danger') bgClass = 'bg-[#AA0000] text-white'; // Red

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playSound) {
      try {
        const audio = new Audio(config.buttonSound);
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch (e) {}
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`
        minecraft-btn 
        px-6 py-3 
        text-xl md:text-2xl 
        border-4 border-black 
        active:translate-y-1
        transition-transform
        uppercase tracking-widest
        ${bgClass}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};