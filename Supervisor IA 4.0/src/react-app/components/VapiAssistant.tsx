import { useState } from 'react';
import { Mic } from 'lucide-react';

export default function VapiAssistant() {
  const [isActive, setIsActive] = useState(true); // Default to active for "listening" state

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsActive(!isActive)}
        className={`group relative transition-all duration-300 ${
          isActive ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Outer glow rings - enhanced with continuous pulse */}
        <div className="absolute inset-0 rounded-full bg-cyan-electric/30 blur-xl animate-pulse-soft" />
        <div className="absolute inset-0 rounded-full bg-cyan-electric/20 blur-2xl animate-pulse-glow" />
        
        {/* Main button */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-electric to-cyan-electric/80 shadow-2xl shadow-cyan-electric/50 flex items-center justify-center">
          {/* Pulse effect when active */}
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full bg-cyan-electric animate-ping opacity-40" />
              <div className="absolute inset-0 rounded-full bg-cyan-electric animate-pulse opacity-60" />
            </>
          )}
          
          {/* Icon */}
          <Mic className="text-slate-deep relative z-10" size={32} strokeWidth={2.5} />
        </div>

        {/* Label */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className={`backdrop-blur-sm px-3 py-1.5 rounded-lg ${
            isActive 
              ? 'bg-cyan-electric/90 animate-pulse-soft' 
              : 'bg-gray-800/90'
          }`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${
              isActive ? 'text-slate-deep' : 'text-gray-400'
            }`}>
              {isActive ? 'Escuchando...' : 'Asistente VAPI'}
            </p>
          </div>
        </div>

        {/* Waveform animation when active */}
        {isActive && (
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-electric rounded-full shadow-lg shadow-cyan-electric/50"
                style={{
                  height: '4px',
                  animation: `wave 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </button>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 24px; }
        }

        @keyframes pulse-soft {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
