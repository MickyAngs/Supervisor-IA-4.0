import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { AlertTriangle, CheckCircle, FileBox, Crosshair, Clock, ShieldCheck, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

// --- Error Boundary ---
class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Viewer Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- 3D Model Component ---
function Model({ url }: { url: string }) {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj} />;
}

// --- Loading Component ---
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-2xl w-64 text-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
        <h3 className="text-cyan-400 font-bold tracking-widest text-sm uppercase">Cargando Malla Volumétrica...</h3>
        <p className="text-gray-400 text-xs mt-2">Inicializando renderizado espacial (TRL 6)</p>
      </div>
    </Html>
  );
}

// --- Main View ---
export default function AuditoriaView() {
  const [scans, setScans] = useState<any[]>([]);
  const [activeScan, setActiveScan] = useState<any | null>(null);
  const [auditReport, setAuditReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch scans
  useEffect(() => {
    async function fetchScans() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('spatial_scans')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setScans(data || []);
        if (data && data.length > 0) {
          setActiveScan(data[0]);
        }
      } catch (err: any) {
        toast.error('Error al cargar escaneos', { description: err.message });
      } finally {
        setIsLoading(false);
      }
    }
    fetchScans();
  }, []);

  // Fetch audit report when active scan changes
  useEffect(() => {
    async function fetchReport() {
      if (!supabase || !activeScan) return;
      setAuditReport(null);
      try {
        const { data, error } = await supabase
          .from('audit_reports')
          .select('*')
          .eq('scan_id', activeScan.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          // Ignore "row not found" as no report might mean it's still generating
          throw error;
        }
        setAuditReport(data);
      } catch (err: any) {
        console.error('Error fetching report:', err);
      }
    }
    fetchReport();
  }, [activeScan]);

  const handleApprove = async () => {
    if (!supabase || !auditReport) return;
    try {
      const { error } = await supabase
        .from('audit_reports')
        .update({ status: 'APPROVED' })
        .eq('id', auditReport.id);

      if (error) throw error;

      setAuditReport({ ...auditReport, status: 'APPROVED' });
      toast.success('Informe Aprobado', {
        description: 'El reporte PRCAL-006 ha sido ratificado para este scan.',
        icon: <CheckCircle className="text-green-500" />
      });
    } catch (err: any) {
      toast.error('Error al aprobar', { description: err.message });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING_PROCESSING':
        return <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/20 flex items-center gap-1"><Clock size={12} /> PENDIENTE</span>;
      case 'DRAFT':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md border border-blue-500/20 flex items-center gap-1"><FileBox size={12} /> BORRADOR</span>;
      case 'APPROVED':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md border border-green-500/20 flex items-center gap-1"><CheckCircle size={12} /> APROBADO</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 text-white overflow-hidden">
      {/* Left Panel: Scan List */}
      <div className="w-1/3 bg-slate-900 border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-800 bg-slate-950/50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Crosshair className="text-cyan-500" /> Registro de Escaneos
          </h2>
          <p className="text-xs text-gray-400 mt-1">Verdad de campo capturada por drones/LIDAR</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-800 rounded-xl" />)}
            </div>
          ) : scans.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <FileBox size={32} className="mx-auto mb-2 opacity-50" />
              No hay escaneos registrados.
            </div>
          ) : (
            scans.map(scan => (
              <div
                key={scan.id}
                onClick={() => setActiveScan(scan)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${activeScan?.id === scan.id
                    ? 'bg-cyan-900/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-950 border-gray-800 hover:border-gray-600'
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm truncate pr-2">
                    {scan.metadata?.originalName || `Malla Volumétrica ${scan.id.substring(0, 4)}`}
                  </h3>
                  {getStatusBadge(scan.status)}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  ID: {scan.id.substring(0, 8)}...
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(scan.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel: Visor and Verdict split vertical */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">

        {/* Top: 3D Visor */}
        <div className="flex-[3] bg-slate-950 border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl min-h-0">
          <div className="absolute top-4 left-4 z-10 glass px-3 py-1.5 rounded-lg border border-cyan-500/30 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-cyan-400">VISOR ESPACIAL ACTIVO</span>
          </div>

          {activeScan?.obj_file_url ? (
            <ErrorBoundary fallback={
              <div className="h-full flex flex-col items-center justify-center text-red-400 p-8 text-center gap-3">
                <AlertTriangle size={48} />
                <p>Error al renderizar el modelo 3D.<br />Verifica que el archivo .OBJ sea válido y esté disponible públicamente desde Storage.</p>
              </div>
            }>
              <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, 10, -10]} intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <Model url={activeScan.obj_file_url} />
                </Suspense>
                <OrbitControls makeDefault />
              </Canvas>
            </ErrorBoundary>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600">
              <FileBox size={48} className="mb-4 opacity-20" />
              <p>Selecciona un escaneo para visualizar la malla 3D.</p>
            </div>
          )}
        </div>

        {/* Bottom: Verdict Panel (Human-in-the-Loop) */}
        <div className="flex-[2] bg-slate-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col min-h-0">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2 flex-shrink-0">
            <ShieldCheck className="text-orange-safety" /> Veredicto de Inteligencia Artificial (Cerebro Legal)
          </h2>

          {auditReport ? (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="grid grid-cols-2 gap-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Métricas de Desviación</h4>
                  <pre className="bg-slate-950 p-3 rounded-lg text-xs text-orange-400 font-mono border border-gray-800 flex-1 overflow-auto">
                    {JSON.stringify(auditReport.deviation_metrics, null, 2)}
                  </pre>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Borrador Normativo</h4>
                  <div className="bg-slate-950 p-3 rounded-lg text-sm text-gray-300 border border-gray-800 flex-1 overflow-auto whitespace-pre-wrap leading-relaxed">
                    {auditReport.ai_drafted_text || 'Análisis en curso...'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800 flex justify-end gap-3 flex-shrink-0">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-colors border border-gray-700">
                  <RotateCcw size={16} /> Rechazar / Recalibrar
                </button>
                <button
                  onClick={handleApprove}
                  disabled={auditReport.status === 'APPROVED'}
                  className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 transition-colors ${auditReport.status === 'APPROVED'
                      ? 'bg-green-600/50 text-white/70 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20'
                    }`}
                >
                  <CheckCircle size={16} />
                  {auditReport.status === 'APPROVED' ? 'Informe Ratificado' : 'Aprobar Informe (PRCAL-006)'}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
              <Clock size={32} className="mb-2 opacity-30" />
              <p className="text-center max-w-sm">Esperando que n8n y la IA generen el reporte de auditoría (Pipeline OCR/Visión).</p>
              {activeScan && (
                <p className="text-xs mt-2 text-cyan-500/80 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Estado de Ingesta DB: {activeScan.status}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
