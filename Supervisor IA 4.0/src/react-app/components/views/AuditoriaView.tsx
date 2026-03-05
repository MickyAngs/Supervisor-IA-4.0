import { useState } from 'react';
import { AlertTriangle, CheckCircle, FileBox, Crosshair, Clock, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'sonner';

// --- Static Fake Data ---
const MOCK_SCANS = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    created_at: new Date().toISOString(),
    status: 'PENDING_PROCESSING',
    project_id: '11111111-1111-1111-1111-111111111111',
    metadata: { originalName: 'Sector_B_Losa_Nivel_2.obj' },
    obj_file_url: 'https://storage.googleapis.com/mock-models/losa_n2.obj'
  },
  {
    id: 'a12bc34d-56ef-78gh-90ij-1234567890kl',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'APPROVED',
    project_id: '11111111-1111-1111-1111-111111111111',
    metadata: { originalName: 'Columna_C15_Sotano.obj' },
    obj_file_url: 'https://storage.googleapis.com/mock-models/columna_c15.obj'
  }
];

const MOCK_REPORT = {
  id: 'rep-999',
  scan_id: 'a12bc34d-56ef-78gh-90ij-1234567890kl',
  status: 'APPROVED',
  deviation_metrics: {
    "volumen_teorico_m3": 2.50,
    "volumen_real_m3": 2.58,
    "desviacion_porcentual": 3.2,
    "alerta": "Dentro de la tolerancia (5%)"
  },
  ai_drafted_text: "Basado en el escaneo volumétrico de la Columna C15, se observa un volumen real de 2.58 m3 frente a los 2.50 m3 de los planos (RFI-042). Esta desviación del 3.2% cumple con los márgenes de tolerancia establecidos en la Norma E.060 para elementos estructurales verticales. Se recomienda procedar con el encofrado superior."
};

// --- Main View (HARD RESET) ---
export default function AuditoriaView() {
  const [scans, setScans] = useState(MOCK_SCANS);
  const [activeScan, setActiveScan] = useState(MOCK_SCANS[0]);
  const [auditReport, setAuditReport] = useState<any | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Load fake report if clicking the approved one
  const handleSelectScan = (scan: any) => {
    setActiveScan(scan);
    if (scan.status === 'APPROVED') {
      setAuditReport(MOCK_REPORT);
    } else {
      setAuditReport(null);
    }
  };

  // Safe n8n Trigger Button
  const handleSimularIngesta = async () => {
    setIsSimulating(true);

    // 1. Check if the environment variable exists
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      toast.error('Error de Configuración', {
        description: 'VITE_N8N_WEBHOOK_URL no está definida en .env',
        duration: 5000,
      });
      alert("⚠️ ALERTA DE DESARROLLO:\n\nLa variable VITE_N8N_WEBHOOK_URL no ha sido encontrada.\nAgrega esta línea a tu archivo .env.local o .env:\n\nVITE_N8N_WEBHOOK_URL=tu_url_de_n8n");
      setIsSimulating(false);
      return;
    }

    // 2. Wrap fetch in try/catch to guarantee NO crashes
    try {
      toast.info('Simulando Ingesta...', { description: `Enviando POST a ${webhookUrl.substring(0, 30)}...` });

      const payload = {
        record: {
          id: activeScan.id,
          tenant_id: activeScan.project_id
        }
      };

      console.log("[SIMULADOR] Payload a enviar:", payload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('¡Orquestador Disparado!', {
          description: 'n8n ha recibido el JSON correctamente.',
          icon: <Zap className="text-yellow-400" />
        });

        // Falsely update local state just to show the UI change
        setScans(prev => prev.map(s => s.id === activeScan.id ? { ...s, status: 'DRAFT' } : s));
        setActiveScan(prev => ({ ...prev, status: 'DRAFT' }));

      } else {
        throw new Error(`n8n respondió con estado: ${response.status}`);
      }

    } catch (error: any) {
      console.error("[SIMULADOR] Error en el fetch:", error);
      toast.error('Fallo en la conexión HTTP', {
        description: error.message || 'El webhook de n8n no pudo ser contactado. Verifica si el túnel está activo.',
        duration: 8000
      });
      alert(`⚠️ FALLO DE CONEXIÓN HTTP\n\nNo se pudo llegar a n8n.\n\nError: ${error.message}\n\nAsegúrate de que n8n esté corriendo y que tu URL del webhook sea pública/accesible.`);
    } finally {
      setIsSimulating(false);
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
    <div className="flex flex-col h-[calc(100vh-8rem)] text-white overflow-hidden">

      {/* Top Banner indicating Test Mode */}
      <div className="bg-orange-500/20 border border-orange-500/50 text-orange-400 p-3 rounded-xl mb-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="animate-pulse" />
          <span className="font-bold uppercase tracking-wider">MODO A PRUEBA DE FALLOS ACTIVO</span>
          <span className="text-sm opacity-80">- Conexión DB Desactivada. Datos UI Simulados.</span>
        </div>
        <button
          onClick={handleSimularIngesta}
          disabled={isSimulating}
          className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-1.5 px-4 rounded-lg flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
        >
          {isSimulating ? <Clock className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4" />}
          SIMULAR INGESTA (n8n POST)
        </button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden no-print">
        {/* Left Panel: Fake Scan List */}
        <div className="w-1/3 bg-slate-900 border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-gray-800 bg-slate-950/50">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Crosshair className="text-cyan-500" /> Escaneos (Mock)
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {scans.map(scan => (
              <div
                key={scan.id}
                onClick={() => handleSelectScan(scan)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${activeScan?.id === scan.id
                  ? 'bg-cyan-900/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-950 border-gray-800 hover:border-gray-600'
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm truncate pr-2">
                    {scan.metadata.originalName}
                  </h3>
                  {getStatusBadge(scan.status)}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-mono">
                  ID: {scan.id.substring(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Visor and Verdict */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">

          {/* Top: 3D Visor (FAKE FULL SCREEN) */}
          <div className="flex-[3] bg-slate-950 border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl min-h-0 flex flex-col items-center justify-center">

            <div className="w-32 h-32 border-4 border-dashed border-gray-600 rounded-full flex items-center justify-center mb-6">
              <FileBox className="text-gray-500 w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold text-gray-400 tracking-wider mb-2">
              VISOR 3D
            </h2>
            <p className="text-gray-600 border border-gray-800 bg-black/50 px-4 py-2 rounded-full uppercase tracking-widest text-sm">
              Temporalmente simulado para depuración
            </p>

            <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-600 max-w-sm">
              <span className="opacity-50">Archivo seleccionado:</span><br />
              <span className="text-cyan-700">{activeScan?.obj_file_url}</span>
            </div>

          </div>

          {/* Bottom: Verdict Panel */}
          <div className="flex-[2] bg-slate-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col min-h-0">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2 flex-shrink-0">
              <ShieldCheck className="text-orange-safety" /> Informe de Auditoría (Mock)
            </h2>

            {auditReport ? (
              <div className="flex flex-col h-full overflow-hidden">
                <div className="grid grid-cols-2 gap-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Métricas Simuladas</h4>
                    <pre className="bg-slate-950 p-3 rounded-lg text-xs text-orange-400 font-mono border border-gray-800 flex-1 overflow-auto">
                      {JSON.stringify(auditReport.deviation_metrics, null, 2)}
                    </pre>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Borrador Simulado</h4>
                    <div className="bg-slate-950 p-3 rounded-lg text-sm text-gray-300 border border-gray-800 flex-1 overflow-auto whitespace-pre-wrap leading-relaxed">
                      {auditReport.ai_drafted_text}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                <Clock size={32} className="mb-4 text-gray-600" />
                <h3 className="text-md font-bold text-gray-400 mb-2">A la espera de la Inteligencia Artificial</h3>
                <p className="text-center max-w-sm">Haz clic en "SIMULAR INGESTA" arriba a la derecha para empujar el JSON a tu orquestador n8n local.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
