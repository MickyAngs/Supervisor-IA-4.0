import { FileText, Download, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Report {
  id: number;
  nombre: string;
  fecha: string;
  tipo: string;
  estado: 'completado' | 'pendiente' | 'revision';
  tamano: string;
}

const reportes: Report[] = [
  {
    id: 1,
    nombre: 'Informe_Avance_Enero_2025.pdf',
    fecha: '24 Ene 2025',
    tipo: 'Avance Mensual',
    estado: 'completado',
    tamano: '2.4 MB'
  },
  {
    id: 2,
    nombre: 'Auditoria_Seguridad_Sector_B.pdf',
    fecha: '23 Ene 2025',
    tipo: 'Auditoría de Seguridad',
    estado: 'completado',
    tamano: '5.1 MB'
  },
  {
    id: 3,
    nombre: 'Cumplimiento_Normativo_RNE.pdf',
    fecha: '22 Ene 2025',
    tipo: 'Cumplimiento Normativo',
    estado: 'revision',
    tamano: '3.8 MB'
  },
  {
    id: 4,
    nombre: 'Deteccion_IA_Errores_Estructurales.pdf',
    fecha: '21 Ene 2025',
    tipo: 'Detección IA',
    estado: 'completado',
    tamano: '8.2 MB'
  },
  {
    id: 5,
    nombre: 'Control_Calidad_Semana_3.pdf',
    fecha: '20 Ene 2025',
    tipo: 'Control de Calidad',
    estado: 'pendiente',
    tamano: '1.9 MB'
  },
  {
    id: 6,
    nombre: 'Analisis_BIM_Coordinacion.pdf',
    fecha: '19 Ene 2025',
    tipo: 'Análisis BIM',
    estado: 'completado',
    tamano: '4.5 MB'
  },
];

export default function ReportesView() {
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completado': return CheckCircle;
      case 'pendiente': return Clock;
      case 'revision': return AlertTriangle;
      default: return FileText;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado': return 'text-cyan-electric border-cyan-electric bg-cyan-electric/10';
      case 'pendiente': return 'text-orange-safety border-orange-safety bg-orange-safety/10';
      case 'revision': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 border-gray-600 bg-gray-800/30';
    }
  };

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case 'completado': return 'Completado';
      case 'pendiente': return 'Pendiente';
      case 'revision': return 'En Revisión';
      default: return estado;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-[20px] p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-electric/20 rounded-lg">
            <FileText className="text-cyan-electric" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Reportes del Proyecto</h2>
            <p className="text-sm text-gray-400">Documentación e informes generados</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass px-4 py-2 rounded-lg border border-cyan-electric/30">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold font-mono text-cyan-electric">{reportes.length}</p>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reportes.map((reporte) => {
          const EstadoIcon = getEstadoIcon(reporte.estado);
          const estadoColor = getEstadoColor(reporte.estado);

          return (
            <div 
              key={reporte.id}
              className="glass rounded-[20px] p-6 hover:border-cyan-electric/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="p-4 bg-gradient-to-br from-cyan-electric/20 to-orange-safety/20 rounded-xl border border-cyan-electric/30">
                  <FileText className="text-cyan-electric" size={24} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1 truncate">{reporte.nombre}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="font-mono">{reporte.fecha}</span>
                    <span>•</span>
                    <span>{reporte.tipo}</span>
                    <span>•</span>
                    <span className="font-mono">{reporte.tamano}</span>
                  </div>
                </div>

                {/* Status */}
                <div className={`px-4 py-2 rounded-lg border ${estadoColor} flex items-center gap-2`}>
                  <EstadoIcon size={16} />
                  <span className="text-sm font-semibold">{getEstadoLabel(reporte.estado)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 glass rounded-lg hover:bg-cyan-electric/20 transition-colors" title="Ver">
                    <Eye size={18} className="text-cyan-electric" />
                  </button>
                  <button className="p-2 glass rounded-lg hover:bg-cyan-electric/20 transition-colors" title="Descargar">
                    <Download size={18} className="text-cyan-electric" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
