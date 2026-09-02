import React from 'react';

export function OpelLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="7" />
      <path d="M12 45L62 45L45 57L88 57L85 64L32 64L49 52L12 52Z" fill="currentColor" />
    </svg>
  );
}

export function PeugeotLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M50 5C30 5 18 18 18 38C18 62 38 88 50 95C62 88 82 62 82 38C82 18 70 5 50 5Z" stroke="currentColor" strokeWidth="4" />
      <path d="M38 32C42 26 48 24 55 24C60 24 64 26 66 28L63 34C61 32 58 30 54 30C50 30 46 32 44 35C48 35 52 36 56 38C62 41 66 46 66 53C66 62 58 68 48 68C40 68 34 64 32 58L38 54C40 58 43 61 48 61C53 61 58 57 58 52C58 47 54 44 48 42C43 40 38 32 38 32Z" fill="currentColor" />
      <path d="M42 78H58V84H42V78Z" fill="currentColor" />
    </svg>
  );
}

export function CitroenLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15 42L50 16L85 42L76 50L50 30L24 50L15 42Z" fill="currentColor" />
      <path d="M15 72L50 46L85 72L76 80L50 60L24 80L15 72Z" fill="currentColor" />
    </svg>
  );
}

export function ChevroletLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 38H36V18H64V38H92V62H64V82H36V62H8V38Z" fill="currentColor" />
    </svg>
  );
}

export function DsLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="50" y="70" textAnchor="middle" fontSize="56" fontWeight="900" fontFamily="serif" fill="currentColor">
        DS
      </text>
    </svg>
  );
}

export function getBrandLogo(brandName?: string | null, className = "w-6 h-6"): React.ReactNode {
  if (!brandName) return null;
  const n = brandName.toLowerCase();
  if (n.includes('opel')) return <OpelLogo className={className} />;
  if (n.includes('peugeot')) return <PeugeotLogo className={className} />;
  if (n.includes('citro')) return <CitroenLogo className={className} />;
  if (n.includes('chev')) return <ChevroletLogo className={className} />;
  if (n.includes('ds')) return <DsLogo className={className} />;
  return null;
}
