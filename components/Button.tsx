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
  let bgClass = 'bg-[#E52521] text-white'; // Mario Red
  if (variant === 'secondary') bgClass = 'bg-[#43B047] text-white'; // Luigi Green
  if (variant === 'danger') bgClass = 'bg-[#000000] text-white'; // Bullet Bill Black

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
        mario-btn 
        px-6 py-4
        text-sm md:text-base 
        font-bold
        uppercase tracking-wider
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