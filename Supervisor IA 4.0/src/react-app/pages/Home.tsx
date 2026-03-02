import { useState } from 'react';
import Sidebar from '@/react-app/components/Sidebar';
import ActivityLog from '@/react-app/components/ActivityLog';
import VapiAssistant from '@/react-app/components/VapiAssistant';
import DashboardView from '@/react-app/components/views/DashboardView';
import BIMView from '@/react-app/components/views/BIMView';
import AuditoriaView from '@/react-app/components/views/AuditoriaView';
import ReportesView from '@/react-app/components/views/ReportesView';
import CerebroLegalView from '@/react-app/components/views/CerebroLegalView';
import IngestaView from '@/react-app/components/views/IngestaView';

export default function HomePage() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'ingesta':
        return <IngestaView />;
      case 'bim':
        return <BIMView />;
      case 'auditoria':
        return <AuditoriaView />;
      case 'reportes':
        return <ReportesView />;
      case 'cerebro':
        return <CerebroLegalView />;
      default:
        return <DashboardView />;
    }
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard General';
      case 'ingesta':
        return 'Ingesta de Verdad de Campo';
      case 'bim':
        return 'Modelo BIM 360';
      case 'auditoria':
        return 'Auditoría Visual con IA';
      case 'reportes':
        return 'Reportes del Proyecto';
      case 'cerebro':
        return 'Cerebro Legal Técnico';
      default:
        return 'Dashboard General';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-deep cad-pattern">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-800 bg-slate-deep/80 backdrop-blur-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {getViewTitle()}
                </h1>
                <p className="text-sm text-gray-400">
                  Proyecto: Mejoramiento Hospital Regional - Sector B
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 glass rounded-lg border border-cyan-electric/30">
                  <p className="text-xs text-gray-400">Auditor IA</p>
                  <p className="text-sm font-semibold text-cyan-electric">Activo</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-8">
            {renderView()}
          </div>

          {/* Right Panel - Activity Log (only show on dashboard and auditoria) */}
          {(activeView === 'dashboard' || activeView === 'auditoria') && (
            <div className="w-96 border-l border-gray-800 p-6 overflow-hidden">
              <ActivityLog />
            </div>
          )}
        </div>
      </main>

      <VapiAssistant />
    </div>
  );
}
