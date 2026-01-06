import { useState, useEffect } from 'react';
import { Upload, Eye, AlertTriangle, CheckCircle, X, FileWarning, Shield } from 'lucide-react';

interface Detection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  type: 'error' | 'safe';
  norma?: string;
  descripcion?: string;
  accion?: string;
}

const mockDetections: Detection[] = [
  { 
    id: 1, 
    x: 25, 
    y: 30, 
    width: 20, 
    height: 25, 
    label: 'Riesgo Alto: Varilla expuesta sin capuchón', 
    confidence: 94, 
    type: 'error',
    norma: 'G.050 Seguridad durante la construcción',
    descripcion: 'Se detectó varilla de acero expuesta sin protección de capuchón, representando un riesgo de lesión para el personal.',
    accion: 'Notificar al Residente de Obra inmediatamente. Colocar capuchones de seguridad en todas las varillas expuestas antes de continuar trabajos en la zona.'
  },
  { 
    id: 2, 
    x: 65, 
    y: 25, 
    width: 22, 
    height: 20, 
    label: 'Conforme: Casco de seguridad detectado', 
    confidence: 98, 
    type: 'safe',
    norma: 'G.050 Seguridad durante la construcción',
    descripcion: 'Personal utilizando correctamente equipo de protección personal (EPP) requerido.',
    accion: 'Continuar con las prácticas de seguridad actuales.'
  },
];

type ScanState = 'idle' | 'uploading' | 'scanning' | 'complete';

const scanningMessages = [
  'Inicializando análisis de imagen...',
  'Analizando geometría estructural...',
  'Detectando EPP (Equipos de Protección)...',
  'Verificando cumplimiento RNE G.050...',
  'Identificando riesgos potenciales...',
  'Procesando resultados finales...',
];

export default function InteractiveVisionScanner() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const constructionImage = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800';

  useEffect(() => {
    if (scanState === 'scanning') {
      const messageInterval = setInterval(() => {
        setCurrentMessage((prev) => {
          if (prev >= scanningMessages.length - 1) {
            clearInterval(messageInterval);
            setTimeout(() => setScanState('complete'), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 500);

      return () => clearInterval(messageInterval);
    }
  }, [scanState]);

  const handleUpload = () => {
    setUploadedImage(constructionImage);
    setScanState('uploading');
    setTimeout(() => {
      setScanState('scanning');
      setCurrentMessage(0);
    }, 800);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload();
  };

  const handleReset = () => {
    setScanState('idle');
    setUploadedImage(null);
    setSelectedDetection(null);
    setCurrentMessage(0);
  };

  const handleDetectionClick = (detection: Detection) => {
    if (detection.type === 'error') {
      setSelectedDetection(detection);
    }
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Main Area */}
      <div className="flex-1 glass rounded-[20px] p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-electric/20 rounded-lg">
              <Eye className="text-cyan-electric" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Escaneo de Obra con IA</h2>
              <p className="text-sm text-gray-400">Análisis visual automatizado</p>
            </div>
          </div>
          {scanState !== 'idle' && (
            <button
              onClick={handleReset}
              className="px-4 py-2 glass rounded-lg hover:bg-orange-safety/20 border border-orange-safety/30 text-orange-safety transition-all flex items-center gap-2"
            >
              <X size={16} />
              Nuevo escaneo
            </button>
          )}
        </div>

        {/* Upload Area */}
        {scanState === 'idle' && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUpload}
            className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragging
                ? 'border-cyan-electric bg-cyan-electric/10 scale-[0.98]'
                : 'border-cyan-electric/30 hover:border-cyan-electric/60 hover:bg-cyan-electric/5'
            }`}
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-electric/20 to-orange-safety/20 rounded-2xl flex items-center justify-center">
                <Upload size={48} className="text-cyan-electric" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Cargar evidencia fotográfica</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Arrastra una imagen aquí o haz clic para seleccionar un archivo
                </p>
                <p className="text-sm text-cyan-electric mt-2 font-mono">
                  Formatos soportados: JPG, PNG • Max 10MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scanning/Complete Area */}
        {(scanState === 'uploading' || scanState === 'scanning' || scanState === 'complete') && (
          <div className="flex-1 relative">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-electric/30">
              <img 
                src={uploadedImage || constructionImage} 
                alt="Análisis de construcción" 
                className="w-full h-full object-cover"
              />
              
              {/* Scanning Overlay */}
              {scanState === 'scanning' && (
                <div className="absolute inset-0 bg-slate-deep/60 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-cyan-electric/5" />
                  
                  {/* Laser Scan Line */}
                  <div className="scan-laser" />
                  
                  {/* Terminal Messages */}
                  <div className="absolute top-4 left-4 right-4 space-y-2">
                    {scanningMessages.slice(0, currentMessage + 1).map((msg, index) => (
                      <div 
                        key={index}
                        className="glass px-4 py-2 rounded-lg border border-cyan-electric/30 font-mono text-sm text-cyan-electric animate-pulse"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="text-orange-safety mr-2">{'>'}</span>
                        {msg}
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass px-4 py-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-mono text-gray-400">Procesando...</span>
                        <span className="text-sm font-mono text-cyan-electric">
                          {Math.min(((currentMessage + 1) / scanningMessages.length) * 100, 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-electric to-orange-safety transition-all duration-500"
                          style={{ width: `${((currentMessage + 1) / scanningMessages.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detection Boxes */}
              {scanState === 'complete' && mockDetections.map((detection) => (
                <div
                  key={detection.id}
                  onClick={() => handleDetectionClick(detection)}
                  className={`absolute group cursor-pointer ${detection.type === 'error' ? 'hover:scale-105' : ''} transition-transform`}
                  style={{
                    left: `${detection.x}%`,
                    top: `${detection.y}%`,
                    width: `${detection.width}%`,
                    height: `${detection.height}%`,
                  }}
                >
                  <div 
                    className={`w-full h-full border-2 rounded-lg ${
                      detection.type === 'error' 
                        ? 'border-orange-safety shadow-lg shadow-orange-safety/50' 
                        : 'border-cyan-electric shadow-lg shadow-cyan-electric/30'
                    } ${selectedDetection?.id === detection.id ? 'animate-pulse' : ''}`}
                  />
                  <div className={`absolute -top-2 left-0 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                    detection.type === 'error'
                      ? 'bg-orange-safety text-white'
                      : 'bg-cyan-electric text-slate-deep'
                  }`}>
                    {detection.type === 'error' ? (
                      <AlertTriangle size={12} className="inline mr-1" />
                    ) : (
                      <CheckCircle size={12} className="inline mr-1" />
                    )}
                    {detection.confidence}%
                  </div>
                </div>
              ))}
            </div>

            {/* Detection Summary */}
            {scanState === 'complete' && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="glass rounded-lg p-4 border-l-2 border-orange-safety hover:bg-orange-safety/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-orange-safety" size={28} />
                    <div>
                      <p className="text-sm text-gray-400">Riesgos Detectados</p>
                      <p className="text-3xl font-bold font-mono text-orange-safety">
                        {mockDetections.filter(d => d.type === 'error').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass rounded-lg p-4 border-l-2 border-cyan-electric hover:bg-cyan-electric/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-cyan-electric" size={28} />
                    <div>
                      <p className="text-sm text-gray-400">Elementos Conformes</p>
                      <p className="text-3xl font-bold font-mono text-cyan-electric">
                        {mockDetections.filter(d => d.type === 'safe').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <style>{`
          .scan-laser {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, #00E5FF, transparent);
            box-shadow: 0 0 20px #00E5FF;
            animation: scan-down 3s ease-in-out;
          }

          @keyframes scan-down {
            0% { top: 0; }
            100% { top: 100%; }
          }
        `}</style>
      </div>

      {/* Side Drawer - Risk Details */}
      {selectedDetection && (
        <div className="w-96 glass rounded-[20px] p-6 animate-slide-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-safety/20 rounded-lg">
                <FileWarning className="text-orange-safety" size={20} />
              </div>
              <h3 className="text-lg font-bold">Detalles del Riesgo</h3>
            </div>
            <button
              onClick={() => setSelectedDetection(null)}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Risk Label */}
            <div className="bg-orange-safety/10 border border-orange-safety/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-orange-safety flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-bold text-orange-safety mb-1">Riesgo Detectado</p>
                  <p className="text-sm">{selectedDetection.label}</p>
                </div>
              </div>
            </div>

            {/* Norma */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="text-cyan-electric" size={18} />
                <h4 className="font-semibold">Norma Vulnerada</h4>
              </div>
              <div className="glass rounded-lg p-3 border border-cyan-electric/30">
                <p className="text-cyan-electric font-mono text-sm">{selectedDetection.norma}</p>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h4 className="font-semibold mb-2">Descripción</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {selectedDetection.descripcion}
              </p>
            </div>

            {/* Acción Sugerida */}
            <div>
              <h4 className="font-semibold mb-2">Acción Sugerida</h4>
              <div className="bg-cyan-electric/10 border border-cyan-electric/30 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  {selectedDetection.accion}
                </p>
              </div>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Nivel de Confianza IA</span>
                <span className="text-sm font-bold font-mono text-orange-safety">
                  {selectedDetection.confidence}%
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-safety rounded-full"
                  style={{ width: `${selectedDetection.confidence}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <button className="w-full px-4 py-3 bg-orange-safety text-white rounded-lg hover:bg-orange-safety/90 transition-colors font-semibold">
                Notificar al Residente
              </button>
              <button className="w-full px-4 py-3 glass rounded-lg hover:bg-gray-800/50 transition-colors">
                Generar Reporte
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
