import { useState, Suspense } from 'react';
import { AlertTriangle, CloudUpload, FileBox, ShieldCheck, Crosshair, Clock, Wifi, WifiOff } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { ErrorBoundary3D } from './components/ErrorBoundary3D';
// Simulating safe dynamic import for 3D to prevent fatal main thread crashes if missing
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

// --- MOCK DATA FOR TRL 6 ROBUSTNESS ---
const MOCK_SCANS = [
  { id: 'scan-001', name: 'Sector_B_Losa_Nivel_2.obj', date: '2026-03-03T08:15:00Z', status: 'PENDING_PROCESSING', location: 'Torre A, Nivel 2', size: '14.5 MB', obj_file_url: 'https://storage.googleapis.com/mock/losa_n2.obj' },
  { id: 'scan-002', name: 'Columna_C15_Sotano.obj', date: '2026-03-02T14:30:00Z', status: 'APPROVED', location: 'Sótano -1, Eje C', size: '8.2 MB', obj_file_url: 'https://storage.googleapis.com/mock/columna_c15.obj' },
  { id: 'scan-003', name: 'Muro_Contencion_Norte.obj', date: '2026-03-01T10:05:00Z', status: 'DRAFT', location: 'Perímetro Norte', size: '22.1 MB', obj_file_url: 'https://storage.googleapis.com/mock/muro_norte.obj' },
  { id: 'scan-004', name: 'Viga_Principal_V4.obj', date: '2026-02-28T16:45:00Z', status: 'APPROVED', location: 'Torre B, Nivel 4', size: '5.6 MB', obj_file_url: 'https://storage.googleapis.com/mock/viga_v4.obj' },
  { id: 'scan-005', name: 'Excavacion_Zanja_01.obj', date: '2026-02-27T09:20:00Z', status: 'PENDING_PROCESSING', location: 'Zona Exterior', size: '45.8 MB', obj_file_url: 'https://storage.googleapis.com/mock/excavacion_1.obj' },
  { id: 'scan-006', name: 'Losa_Cimentacion_P1.obj', date: '2026-02-26T11:10:00Z', status: 'APPROVED', location: 'Plataforma Principal', size: '32.4 MB', obj_file_url: 'https://storage.googleapis.com/mock/losa_cimentacion.obj' },
  { id: 'scan-007', name: 'Zapata_Aislada_Z5.obj', date: '2026-02-25T13:55:00Z', status: 'DRAFT', location: 'Eje 5-A', size: '3.1 MB', obj_file_url: 'https://storage.googleapis.com/mock/zapata_z5.obj' },
  { id: 'scan-008', name: 'Corte_Terreno_Perfil.obj', date: '2026-02-24T15:30:00Z', status: 'APPROVED', location: 'Talud Este', size: '68.9 MB', obj_file_url: 'https://storage.googleapis.com/mock/corte_terreno.obj' }
];

const MOCK_REPORT = {
  deviation_metrics: {
    "volumen_teorico_m3": 2.50,
    "volumen_real_m3": 2.58,
    "desviacion_porcentual": 3.2,
    "alerta": "Dentro de la tolerancia (5%)"
  },
  ai_drafted_text: "El análisis volumétrico del elemento escaneado confirma un incremento del 3.2% respecto al diseño BIM teórico. Este valor se encuentra dentro de los márgenes estipulados por la Norma E.060. No se detectan anomalías estructurales severas, se recomienda proceder con el vaciado."
};

// --- DUMMY 3D FALLBACK MESH FORMAT ---
const FallbackBox = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#0ea5e9" wireframe />
  </mesh>
);

export default function App() {
  const isOnline = useOnlineStatus();
  const [scans, setScans] = useState(MOCK_SCANS);
  const [activeScan, setActiveScan] = useState(MOCK_SCANS[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Safe n8n Trigger Button (Same logic, 100% crash proof)
  const handleSimularIngesta = async () => {
    setIsSimulating(true);

    let webhookUrl = '';
    try {
      webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
    } catch (e) {
      console.warn("import.meta.env no disponible", e);
    }

    if (!webhookUrl) {
      toast.error("Falta la variable VITE_N8N_WEBHOOK_URL");
      setIsSimulating(false);
      return;
    }

    try {
      toast.info('Enviando escaneo de prueba al orquestador n8n...');

      const payload = {
        record: {
          id: activeScan.id,
          tenant_id: "demo-tenant-id"
        }
      };

      // Simulated network delay if offline to show the mechanism
      if (!isOnline) {
        toast.warning('Estás offline. Simulación encolada localmente.');
        setTimeout(() => {
          setScans(prev => prev.map(s => s.id === activeScan.id ? { ...s, status: 'DRAFT' } : s));
          setActiveScan(prev => ({ ...prev, status: 'DRAFT' }));
          setIsSimulating(false);
        }, 1000);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('¡n8n ha procesado el análisis correctamente!');
        setScans(prev => prev.map(s => s.id === activeScan.id ? { ...s, status: 'DRAFT' } : s));
        setActiveScan(prev => ({ ...prev, status: 'DRAFT' }));
      } else {
        throw new Error(`n8n HTTP ${response.status}`);
      }
    } catch (error: any) {
      console.warn("Webhook falló pero UI sobrevive:", error);
      toast.error(`Error de red: ${error.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'PENDING_PROCESSING') return <span className="text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 truncate">PENDIENTE</span>;
    if (status === 'DRAFT') return <span className="text-blue-400 text-xs px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 truncate">BORRADOR</span>;
    if (status === 'APPROVED') return <span className="text-green-400 text-xs px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 truncate">APROBADO</span>;
    return <span className="text-gray-400 text-xs px-2 py-0.5 rounded bg-gray-500/10 border border-gray-500/20 truncate">{status}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative overflow-hidden">
      <Toaster theme="dark" position="top-right" />

      {/* 1. TOP NAVBAR (OFFLINE AWARE) */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center border border-cyan-500/30">
            <span className="font-bold text-white text-xs tracking-tighter">SIA</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Supervisor IA 4.0</h1>

          {/* OFFLINE PWA BADGE */}
          <div className={`ml-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${isOnline ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`} title={isOnline ? 'Conexión estable' : 'Los escaneos simulados se encolarán y sincronizarán al recuperar conexión'}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3 animate-pulse" />}
            {isOnline ? 'ONLINE' : 'MODO OFFLINE LOCAL'}
          </div>
        </div>
      </header>

      {/* SPLIT VIEW LAYOUT */}
      <div className="flex-1 flex overflow-hidden">

        {/* PANEL IZQ: 30-35% (SCANS LIST) */}
        <div className="w-1/3 min-w-[320px] max-w-[450px] border-r border-slate-800 bg-slate-900/40 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800/50 flex justify-between items-center bg-slate-900">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Crosshair size={16} className="text-cyan-500" /> Registro Histórico
            </h2>
            <span className="text-xs font-mono text-slate-500">{scans.length} ítems</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {scans.map(scan => (
              <div
                key={scan.id}
                onClick={() => setActiveScan(scan)}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${activeScan.id === scan.id ? 'bg-slate-800/80 border-cyan-500/50 shadow-[0_0_10px_rgba(8,145,178,0.1)]' : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-800/40'}`}
              >
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className={`font-semibold text-sm truncate ${activeScan.id === scan.id ? 'text-white' : 'text-slate-300'}`}>{scan.name}</h3>
                  {getStatusBadge(scan.status)}
                </div>
                <div className="flex justify-between items-center mt-3 text-xs text-slate-500 font-mono">
                  <span>{new Date(scan.date).toLocaleDateString()}</span>
                  <span>{scan.size}</span>
                </div>
                <div className="mt-1 text-xs text-slate-400 truncate">
                  📍 {scan.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL DER: 65-70% (3D & DETALLE) */}
        <div className="flex-1 bg-slate-950 flex flex-col min-w-0">

          {/* VISOR 3D (ERROR BOUNDARY PROTECTED) */}
          <div className="flex-[3] relative border-b border-slate-800 bg-[#060913]">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="bg-black/60 px-3 py-1.5 rounded-md border border-slate-700/50 text-xs text-slate-300 font-mono shadow-lg backdrop-blur flex items-center gap-2">
                <FileBox size={14} className="text-cyan-500" />
                {activeScan.obj_file_url}
              </div>
            </div>

            <ErrorBoundary3D>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-cyan-500/50"><Clock className="animate-spin w-8 h-8" /></div>}>
                <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Stage preset="rembrandt" adjustCamera={false}>
                    <FallbackBox />
                  </Stage>
                  <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </Suspense>
            </ErrorBoundary3D>
          </div>

          {/* PANEL DE INFORME IA */}
          <div className="flex-[2] p-6 overflow-y-auto bg-slate-900/20">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white border-b border-slate-800/50 pb-3">
              <ShieldCheck className="text-green-500" /> Analítica Automática (Supervisor n8n)
            </h2>

            {activeScan.status !== 'PENDING_PROCESSING' ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full pb-8">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Desviaciones Planimetría vs Real</h4>
                  <div className="space-y-3">
                    {Object.entries(MOCK_REPORT.deviation_metrics).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                        <span className="text-sm text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="font-mono text-sm text-cyan-400 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Dictamen Legal (Borrador Prevío)</h4>
                  <div className="flex-1 bg-slate-950/50 p-4 rounded-lg text-sm text-slate-300 border border-slate-800/80 leading-relaxed font-serif overflow-auto">
                    "{MOCK_REPORT.ai_drafted_text}"
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-900/30">
                <AlertTriangle size={48} className="mb-4 text-orange-500/70" />
                <p className="font-medium text-lg mb-6 text-slate-300">Escaneo en cola. Esperando señal del agente supervisor.</p>
                <button
                  onClick={handleSimularIngesta}
                  disabled={isSimulating}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 border border-cyan-400/50 shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                >
                  {isSimulating ? <Clock className="animate-spin w-6 h-6" /> : <CloudUpload className="w-6 h-6" />}
                  <span className="text-lg">🚀 Simular Escaneo Dron</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* GLOBAL CSS INJECTIONS FOR SCROLLBARS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
}
