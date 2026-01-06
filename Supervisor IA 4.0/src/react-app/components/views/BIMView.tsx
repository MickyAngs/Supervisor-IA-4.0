import { Box, Maximize2, RotateCw, ZoomIn, ZoomOut, Layers } from 'lucide-react';

export default function BIMView() {
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="glass rounded-[20px] p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-electric/20 rounded-lg">
            <Box className="text-cyan-electric" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Modelo BIM 360</h2>
            <p className="text-sm text-gray-400">Visualización 3D del proyecto</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Zoom In">
            <ZoomIn size={18} className="text-gray-400" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Zoom Out">
            <ZoomOut size={18} className="text-gray-400" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Rotar">
            <RotateCw size={18} className="text-gray-400" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Capas">
            <Layers size={18} className="text-gray-400" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Pantalla Completa">
            <Maximize2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* 3D Viewer Area */}
      <div className="flex-1 glass rounded-[20px] p-8 flex items-center justify-center relative overflow-hidden">
        {/* Grid background effect */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Placeholder content */}
        <div className="relative z-10 text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-electric/30 to-orange-safety/30 rounded-2xl flex items-center justify-center border border-cyan-electric/20 animate-pulse">
            <Box size={64} className="text-cyan-electric" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Visor BIM 3D</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Área reservada para integración con Autodesk BIM 360 o visualizador 3D
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <div className="glass px-4 py-2 rounded-lg border border-cyan-electric/30">
                <p className="text-xs text-gray-500">Elementos</p>
                <p className="text-lg font-bold font-mono text-cyan-electric">1,247</p>
              </div>
              <div className="glass px-4 py-2 rounded-lg border border-orange-safety/30">
                <p className="text-xs text-gray-500">Capas</p>
                <p className="text-lg font-bold font-mono text-orange-safety">18</p>
              </div>
              <div className="glass px-4 py-2 rounded-lg border border-green-400/30">
                <p className="text-xs text-gray-500">Nivel</p>
                <p className="text-lg font-bold font-mono text-green-400">B-2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corner indicators */}
        <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg">
          <p className="text-xs font-mono text-cyan-electric">X: 0.00 Y: 0.00 Z: 0.00</p>
        </div>
        <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-lg">
          <p className="text-xs font-mono text-gray-500">Escala 1:100</p>
        </div>
      </div>
    </div>
  );
}
