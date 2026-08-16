import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'compact' | 'horizontal' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function TomLeeLogo({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}: LogoProps) {
  // Teal colors: Primary #127485, Light #1997AC, Dark #0A4E5A
  // Lime accent: #7CB342, Light #9CCC65, Dark #558B2F
  // Charcoal text: #1E293B, Light #FFFFFF

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subTextSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  // Custom refined vector mark matching the uploaded logo:
  // Teal cross + caring hand silhouette + lime green vitality orb
  const renderIcon = (customSize?: string) => (
    <svg
      viewBox="0 0 100 100"
      className={`${customSize || iconSizes[size]} shrink-0 transition-transform duration-200 group-hover:scale-105`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TomLee Home Care Logo Icon"
    >
      {/* Lime Green Human/Vitality Head Orb */}
      <circle cx="36" cy="18" r="9" fill="#7CB342" />

      {/* Modern Teal Cross & Curved Care Hand Silhouette */}
      {/* Horizontal Cross Left Bar */}
      <path
        d="M12 50 H32 V62 H12 Z"
        fill="#127485"
        rx="2"
      />
      
      {/* Vertical Cross Bottom Bar */}
      <path
        d="M26 62 H40 V82 H26 Z"
        fill="#127485"
        rx="2"
      />

      {/* Main Fluid Care Hand & Quadrant Cross Wing */}
      <path
        d="M26 50 C26 38 34 28 42 22 C40 28 42 36 37 44 C42 42 50 38 52 32 C50 42 46 48 38 52 C46 51 55 48 60 42 C56 50 48 56 38 58 C46 57 58 55 64 48 C60 56 52 64 40 68 V62 H32 V50 Z"
        fill="#168B9D"
      />

      {/* Right Cross Wing Quad */}
      <path
        d="M36 44 H62 C62 44 62 64 40 64 V44 Z"
        fill="#127485"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{renderIcon()}</div>;
  }

  const isDark = theme === 'dark';
  const primaryTextColor = isDark ? 'text-white' : 'text-slate-900';
  const secondaryTextColor = isDark ? 'text-slate-300' : 'text-slate-700';
  const dividerColor = isDark ? 'bg-slate-700' : 'bg-slate-300';

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {renderIcon()}
      <div className={`h-8 w-[1.5px] ${dividerColor}`} />
      <div className="flex flex-col leading-tight">
        <span
          className={`font-semibold tracking-tight ${textSizes[size]} ${primaryTextColor} font-sans`}
        >
          Tomlee
        </span>
        <span
          className={`font-medium tracking-normal ${subTextSizes[size]} ${secondaryTextColor} font-sans -mt-0.5`}
        >
          Home Care
        </span>
      </div>
    </div>
  );
}

export function LogoLink({
  theme = 'light',
  className = '',
  size = 'md',
}: {
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <Link
      href="/"
      id="brand-logo-link"
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#127485] rounded-md transition-opacity hover:opacity-95"
      aria-label="TomLee Home Care Homepage"
    >
      <TomLeeLogo theme={theme} className={className} size={size} />
    </Link>
  );
}
