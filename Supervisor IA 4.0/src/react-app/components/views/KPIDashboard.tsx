import { Target, Clock, Leaf } from 'lucide-react';

interface KPIDashboardProps {
    scansCount: number;
    approvedCount: number;
}

export default function KPIDashboard({ scansCount, approvedCount }: KPIDashboardProps) {
    // Simulated calculations for ROI and business value
    const retrabajoEvitado = approvedCount * 2500;
    const horasAhorradas = scansCount * 4;
    const co2Evitado = scansCount * 12.5; // kg CO2 per site visit avoided

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0 no-print">
            <div className="bg-slate-900 border border-gray-800 rounded-2xl p-5 shadow-lg flex items-center gap-4 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Target size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">Retrabajo Evitado (ROI)</p>
                    <h3 className="text-2xl font-bold text-white">${retrabajoEvitado.toLocaleString()} <span className="text-xs text-gray-500 font-normal">USD</span></h3>
                </div>
            </div>

            <div className="bg-slate-900 border border-gray-800 rounded-2xl p-5 shadow-lg flex items-center gap-4 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">Horas Inspectivas Ahorradas</p>
                    <h3 className="text-2xl font-bold text-white">{horasAhorradas} <span className="text-xs text-gray-500 font-normal">hrs</span></h3>
                </div>
            </div>

            <div className="bg-slate-900 border border-gray-800 rounded-2xl p-5 shadow-lg flex items-center gap-4 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                    <Leaf size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">Impacto Green AI (Sostenible)</p>
                    <h3 className="text-2xl font-bold text-white">{co2Evitado.toLocaleString()} <span className="text-xs text-gray-500 font-normal">kg CO₂</span></h3>
                </div>
            </div>
        </div>
    );
}
