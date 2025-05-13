import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-16 h-16 mr-4 transform hover:scale-105 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
        <img
          src="/inspirex-nobg.png"
          alt="InspireX Logo"
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mix-blend-luminosity brightness-125 contrast-125"
          style={{
            filter: 'brightness(1.2) contrast(1.2)',
            mixBlendMode: 'luminosity',
            WebkitFilter: 'brightness(1.2) contrast(1.2)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-sm mix-blend-overlay"></div>
      </div>
      <div className="flex flex-col">
        <div className="relative overflow-hidden">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-orbitron tracking-wider animate-gradient-x">
            AcademiX
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>
        <div className="flex items-center text-sm text-gray-300 mt-2">
          by{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text font-semibold ml-1 tracking-wide font-orbitron animate-text-shimmer">
            InspireX
          </span>
        </div>
      </div>
    </div>
  );
};
