import { AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';

interface LogEntry {
  time: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'system';
}

const logs: LogEntry[] = [
  { time: '14:32', message: 'Sistema IA iniciado correctamente', type: 'system' },
  { time: '14:28', message: 'Columna C-12: Curado insuficiente detectado', type: 'error' },
  { time: '14:15', message: 'Encofrado verificado en Sector B-3', type: 'success' },
  { time: '13:52', message: 'Refuerzo expuesto en viga V-8', type: 'error' },
  { time: '13:30', message: 'Nivelación correcta confirmada', type: 'success' },
  { time: '13:15', message: 'Análisis BIM completado', type: 'info' },
  { time: '12:48', message: 'Nueva imagen procesada (IMG_2847)', type: 'info' },
  { time: '12:30', message: 'Sincronización con n8n exitosa', type: 'system' },
  { time: '12:10', message: 'Alerta: Falta de EPP detectada', type: 'error' },
  { time: '11:55', message: 'Inspección de calidad completada', type: 'success' },
];

export default function ActivityLog() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'system': return Zap;
      default: return Info;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'error': return 'border-orange-safety text-orange-safety bg-orange-safety/10';
      case 'success': return 'border-cyan-electric text-cyan-electric bg-cyan-electric/10';
      case 'system': return 'border-purple-400 text-purple-400 bg-purple-400/10';
      default: return 'border-gray-600 text-gray-400 bg-gray-800/30';
    }
  };

  return (
    <div className="glass rounded-[20px] p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
        <Zap className="text-cyan-electric" size={20} />
        <h3 className="text-lg font-bold">Registro de Actividad</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {logs.map((log, index) => {
          const Icon = getIcon(log.type);
          const colors = getColors(log.type);
          
          return (
            <div 
              key={index}
              className={`p-3 rounded-lg border-l-2 ${colors} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-2">
                <Icon size={16} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-gray-500 mb-1">{log.time}</p>
                  <p className="text-sm leading-tight">{log.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
