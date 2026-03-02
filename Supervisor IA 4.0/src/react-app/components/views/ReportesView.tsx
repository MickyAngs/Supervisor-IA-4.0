import { useState } from 'react';
import { FileText, Download, Eye, CheckCircle, Clock, AlertTriangle, Plus, Loader2, X } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Report {
  id: number;
  nombre: string;
  fecha: string;
  tipo: string;
  estado: 'completado' | 'pendiente' | 'revision';
  tamano: string;
  contenido?: string;
}

const reportesIniciales: Report[] = [
  {
    id: 1,
    nombre: 'Informe_Avance_Enero_2026.pdf',
    fecha: '24 Ene 2026',
    tipo: 'Avance Mensual',
    estado: 'completado',
    tamano: '2.4 MB',
    contenido: 'Resumen del avance mensual del proyecto Altos de Trujillo. Progreso: 65% completado.'
  },
  {
    id: 2,
    nombre: 'Auditoria_Seguridad_Sector_B.pdf',
    fecha: '23 Ene 2026',
    tipo: 'Auditoría de Seguridad',
    estado: 'completado',
    tamano: '5.1 MB',
    contenido: 'Auditoría SSOMA del Sector B. 2 observaciones menores detectadas. Cumplimiento: 94%'
  },
  {
    id: 3,
    nombre: 'Cumplimiento_Normativo_RNE.pdf',
    fecha: '22 Ene 2026',
    tipo: 'Cumplimiento Normativo',
    estado: 'revision',
    tamano: '3.8 MB',
    contenido: 'Verificación de cumplimiento según NTP E.060 y G.050. Pendiente revisión de detalles estructurales.'
  },
  {
    id: 4,
    nombre: 'Deteccion_IA_Errores_Estructurales.pdf',
    fecha: '21 Ene 2026',
    tipo: 'Detección IA',
    estado: 'completado',
    tamano: '8.2 MB',
    contenido: 'Análisis de visión computacional. 3 desviaciones detectadas en columnas del eje C.'
  },
  {
    id: 5,
    nombre: 'Control_Calidad_Semana_3.pdf',
    fecha: '20 Ene 2026',
    tipo: 'Control de Calidad',
    estado: 'pendiente',
    tamano: '1.9 MB',
    contenido: 'Control de calidad semanal. Ensayos de compresión de probetas pendientes de análisis.'
  },
  {
    id: 6,
    nombre: 'Analisis_BIM_Coordinacion.pdf',
    fecha: '19 Ene 2026',
    tipo: 'Análisis BIM',
    estado: 'completado',
    tamano: '4.5 MB',
    contenido: 'Coordinación BIM entre disciplinas. 12 interferencias resueltas esta semana.'
  },
];

export default function ReportesView() {
  const [reportes, setReportes] = useState<Report[]>(reportesIniciales);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState<Report | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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

  const generatePDF = (reporte: Report) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(10, 15, 26);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(0, 229, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SUPERVISOR IA 4.0', 20, 25);

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Supervisión Inteligente de Obras', 20, 33);

    // Report title
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(reporte.tipo, 20, 55);

    // Metadata
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${reporte.fecha}`, 20, 65);
    doc.text(`Estado: ${getEstadoLabel(reporte.estado)}`, 20, 72);
    doc.text(`ID: REP-${reporte.id.toString().padStart(4, '0')}`, 20, 79);

    // Divider
    doc.setDrawColor(0, 229, 255);
    doc.setLineWidth(0.5);
    doc.line(20, 85, pageWidth - 20, 85);

    // Content
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    const content = reporte.contenido || 'Contenido del reporte no disponible.';
    const splitContent = doc.splitTextToSize(content, pageWidth - 40);
    doc.text(splitContent, 20, 100);

    // Project info box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 120, pageWidth - 40, 40, 3, 3, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 229, 255);
    doc.text('INFORMACIÓN DEL PROYECTO', 25, 130);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text('Proyecto: Altos de Trujillo', 25, 140);
    doc.text('Organización: Demo GARES', 25, 148);
    doc.text('Ubicación: Trujillo, La Libertad, Perú', 25, 156);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generado automáticamente por Supervisor IA 4.0 - ${new Date().toLocaleString()}`,
      pageWidth / 2,
      285,
      { align: 'center' }
    );

    // Save
    doc.save(reporte.nombre);

    setNotification(`✅ PDF "${reporte.nombre}" descargado exitosamente`);
    setTimeout(() => setNotification(null), 3000);
  };

  const generateNewReport = async () => {
    setIsGenerating(true);

    // Simular generación
    await new Promise(resolve => setTimeout(resolve, 2000));

    const tipos = ['Avance Diario', 'Control de Calidad', 'Auditoría SSOMA', 'Análisis IA'];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const fecha = new Date();

    const nuevoReporte: Report = {
      id: reportes.length + 1,
      nombre: `${tipo.replace(/ /g, '_')}_${fecha.toISOString().split('T')[0]}.pdf`,
      fecha: fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
      tipo,
      estado: 'completado',
      tamano: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      contenido: `Reporte automático generado por Supervisor IA 4.0. Análisis del ${fecha.toLocaleDateString('es-PE')}.`
    };

    setReportes(prev => [nuevoReporte, ...prev]);
    setIsGenerating(false);
    setNotification(`✅ Nuevo reporte "${tipo}" generado exitosamente`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
          {notification}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8">
          <div className="glass rounded-[20px] p-8 max-w-2xl w-full border border-cyan-500/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{showPreview.tipo}</h3>
              <button
                onClick={() => setShowPreview(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 text-sm text-gray-400">
                <span>📅 {showPreview.fecha}</span>
                <span>📄 {showPreview.nombre}</span>
                <span>💾 {showPreview.tamano}</span>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-300">{showPreview.contenido}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    generatePDF(showPreview);
                    setShowPreview(null);
                  }}
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={18} />
                  Descargar PDF
                </button>
                <button
                  onClick={() => setShowPreview(null)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 font-semibold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="glass rounded-[20px] p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-electric/20 rounded-lg">
            <FileText className="text-cyan-electric" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Reportes del Proyecto
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                jsPDF
              </span>
            </h2>
            <p className="text-sm text-gray-400">Documentación e informes con generación automática de PDF</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded-lg border border-cyan-electric/30">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold font-mono text-cyan-electric">{reportes.length}</p>
          </div>
          <button
            onClick={generateNewReport}
            disabled={isGenerating}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-xl text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Plus size={18} />
                Nuevo Reporte
              </>
            )}
          </button>
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
                  <button
                    onClick={() => setShowPreview(reporte)}
                    className="p-2 glass rounded-lg hover:bg-cyan-electric/20 transition-colors"
                    title="Ver"
                  >
                    <Eye size={18} className="text-cyan-electric" />
                  </button>
                  <button
                    onClick={() => generatePDF(reporte)}
                    className="p-2 glass rounded-lg hover:bg-cyan-electric/20 transition-colors"
                    title="Descargar PDF"
                  >
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
