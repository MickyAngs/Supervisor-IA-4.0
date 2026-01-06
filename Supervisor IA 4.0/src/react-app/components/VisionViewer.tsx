import { useState } from 'react';
import { Eye, AlertTriangle, CheckCircle, Scan } from 'lucide-react';

interface Detection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  type: 'error' | 'safe';
}

const mockDetections: Detection[] = [
  { id: 1, x: 15, y: 20, width: 30, height: 25, label: 'Columna sin curado', confidence: 94, type: 'error' },
  { id: 2, x: 55, y: 15, width: 35, height: 30, label: 'Encofrado correcto', confidence: 98, type: 'safe' },
  { id: 3, x: 25, y: 60, width: 25, height: 20, label: 'Refuerzo expuesto', confidence: 89, type: 'error' },
  { id: 4, x: 70, y: 55, width: 20, height: 25, label: 'Nivel verificado', confidence: 96, type: 'safe' },
];

export default function VisionViewer() {
  const [showDetections, setShowDetections] = useState(true);
  const constructionImage = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800';

  return (
    <div className="glass rounded-[20px] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-electric/20 rounded-lg">
            <Eye className="text-cyan-electric" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Análisis de Visión por Computadora</h2>
            <p className="text-sm text-gray-400">Detección en tiempo real con IA</p>
          </div>
        </div>
        <button
          onClick={() => setShowDetections(!showDetections)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            showDetections
              ? 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/30'
              : 'bg-gray-800/50 text-gray-400'
          }`}
        >
          <Scan size={16} />
          {showDetections ? 'Ocultar detecciones' : 'Mostrar detecciones'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <span className="text-sm font-medium text-gray-400">Imagen Original</span>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-700">
            <img 
              src={constructionImage} 
              alt="Construcción original" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Processed Image with Detections */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-electric rounded-full animate-pulse" />
            <span className="text-sm font-medium text-cyan-electric">Procesado con IA</span>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-cyan-electric/30">
            <img 
              src={constructionImage} 
              alt="Construcción procesada" 
              className="w-full h-full object-cover"
            />
            
            {/* Scanning effect */}
            {showDetections && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-cyan-electric/5" />
                <div className="scan-line" />
              </div>
            )}

            {/* Detection boxes */}
            {showDetections && mockDetections.map((detection) => (
              <div
                key={detection.id}
                className="absolute group"
                style={{
                  left: `${detection.x}%`,
                  top: `${detection.y}%`,
                  width: `${detection.width}%`,
                  height: `${detection.height}%`,
                }}
              >
                <div 
                  className={`w-full h-full border-2 ${
                    detection.type === 'error' 
                      ? 'border-orange-safety' 
                      : 'border-cyan-electric'
                  } rounded-lg animate-pulse`}
                />
                <div className={`absolute -top-8 left-0 px-2 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                  detection.type === 'error'
                    ? 'bg-orange-safety text-white'
                    : 'bg-cyan-electric text-slate-deep'
                }`}>
                  {detection.type === 'error' ? (
                    <AlertTriangle size={12} className="inline mr-1" />
                  ) : (
                    <CheckCircle size={12} className="inline mr-1" />
                  )}
                  {detection.label} ({detection.confidence}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detection Summary */}
      {showDetections && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="glass rounded-lg p-4 border-l-2 border-orange-safety">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-safety" size={24} />
              <div>
                <p className="text-sm text-gray-400">Errores Detectados</p>
                <p className="text-2xl font-bold font-mono text-orange-safety">
                  {mockDetections.filter(d => d.type === 'error').length}
                </p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-4 border-l-2 border-cyan-electric">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-electric" size={24} />
              <div>
                <p className="text-sm text-gray-400">Elementos Correctos</p>
                <p className="text-2xl font-bold font-mono text-cyan-electric">
                  {mockDetections.filter(d => d.type === 'safe').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00E5FF, transparent);
          animation: scan 3s linear infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
