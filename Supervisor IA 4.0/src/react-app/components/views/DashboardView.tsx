import { useConstructionData } from '@/hooks/useConstructionData';
import { Database, RefreshCw, Building2, Layers, CheckCircle2, AlertTriangle, CloudOff, Lock, LogIn } from 'lucide-react';
import type { WBSNode } from '@/shared/types';

export default function DashboardView() {
    const {
        projects,
        organizations,
        wbsNodes,
        loading,
        error,
        connectionStatus,
        seedSystem,
        isSeeding,
        refreshData,
        requiresAuth,
    } = useConstructionData();

    // 0. TRL 7: Unauthenticated - No data access allowed
    if (connectionStatus === 'unauthenticated' || requiresAuth) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="glass rounded-2xl p-8 max-w-lg text-center border border-amber-500/30 shadow-xl shadow-amber-900/10">
                    <Lock className="w-20 h-20 text-amber-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-3">🔒 Acceso Restringido</h2>
                    <p className="text-gray-300 mb-6 font-medium">
                        Debes iniciar sesión para acceder al sistema.
                    </p>

                    {error && (
                        <div className="bg-amber-950/30 rounded-lg p-4 text-sm text-amber-200 mb-6 border border-amber-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={() => window.location.href = '/login'}
                        className="px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold transition-colors flex items-center gap-2 mx-auto"
                    >
                        <LogIn className="w-5 h-5" />
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    // 1. Critical Failure: Unconfigured or Disconnected
    if (connectionStatus === 'unconfigured' || connectionStatus === 'disconnected') {
        const isUnconfigured = connectionStatus === 'unconfigured';
        const isPermissionError = error?.includes('Permisos') || error?.includes('🔒');

        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className={`glass rounded-2xl p-8 max-w-lg text-center border shadow-xl ${isPermissionError ? 'border-amber-500/30 shadow-amber-900/10' : 'border-red-500/30 shadow-red-900/10'}`}>
                    {isPermissionError ? (
                        <Lock className="w-20 h-20 text-amber-500 mx-auto mb-6" />
                    ) : (
                        <CloudOff className="w-20 h-20 text-red-500 mx-auto mb-6" />
                    )}
                    <h2 className="text-2xl font-bold text-white mb-3">
                        {isPermissionError ? '🔒 Error de Permisos' : isUnconfigured ? '⚠️ Error de Configuración de Infraestructura' : '⚠️ Fallo de Motor'}
                    </h2>
                    <p className="text-gray-300 mb-6 font-medium">
                        {isPermissionError
                            ? "No tienes acceso a esta organización."
                            : isUnconfigured
                                ? "Variables de entorno no detectadas. Verifique la configuración."
                                : "Conectando con el centro de mando... verifique su señal."}
                    </p>

                    {isUnconfigured && (
                        <>
                            <div className="bg-red-950/40 rounded-lg p-3 text-red-300 text-sm mb-4 border border-red-500/30">
                                ⚠️ Error de Configuración de Infraestructura
                            </div>
                            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-left text-cyan-300 mb-6 border border-slate-700">
                                <p>VITE_SUPABASE_URL=...</p>
                                <p>VITE_SUPABASE_ANON_KEY=...</p>
                            </div>
                        </>
                    )}

                    {!isUnconfigured && error && !isPermissionError && (
                        <div className="bg-red-950/30 rounded-lg p-4 text-sm text-red-200 mb-6 border border-red-500/20">
                            {error}
                        </div>
                    )}

                    {!isUnconfigured && (
                        <button onClick={refreshData} className={`px-6 py-3 ${isPermissionError ? 'bg-amber-600 hover:bg-amber-500' : 'bg-red-600 hover:bg-red-500'} rounded-xl text-white font-bold transition-colors flex items-center gap-2 mx-auto`}>
                            <RefreshCw className="w-5 h-5" />
                            Reintentar Conexión
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // 2. Loading State
    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass rounded-xl p-6 border border-gray-800">
                            <div className="h-14 bg-gray-700 rounded-lg mb-2" />
                            <div className="h-4 bg-gray-600 rounded w-1/2" />
                        </div>
                    ))}
                </div>
                <div className="glass rounded-xl p-6 border border-gray-800">
                    <div className="h-8 bg-gray-700 rounded w-48 mb-6" />
                    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-800 rounded mb-3" />)}
                </div>
            </div>
        );
    }

    // 3. Empty State (Safe check for empty array)
    if (!projects || projects.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="glass rounded-3xl p-12 max-w-2xl text-center border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                        <Database className="w-12 h-12 text-cyan-400" />
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Base de Datos Conectada</h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
                        Motor de obra listo. No se encontraron proyectos activos en la base de datos.
                    </p>

                    <button
                        onClick={seedSystem}
                        disabled={loading || isSeeding || projects.length > 0}
                        id="seed-button"
                        data-testid="seed-button"
                        className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-cyan-600 rounded-2xl text-xl font-bold text-white shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="relative flex items-center gap-3">
                            {loading ? (
                                <><div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" /> ⏳ Conectando...</>
                            ) : isSeeding ? (
                                <><div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" /> 🏗️ Construyendo base...</>
                            ) : (
                                <>⚡ Iniciar Motor Real</>
                            )}
                        </div>
                    </button>

                    {error && (
                        <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 flex items-center gap-3 text-left">
                            <AlertTriangle className="w-10 h-10 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 4. Dashboard View (Safe Data)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 px-4 py-2 glass rounded-full border border-green-500/30 bg-green-500/5">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-sm font-semibold text-green-400 tracking-wide">SISTEMA ONLINE</span>
                </div>
                <button
                    onClick={refreshData}
                    className="p-2.5 glass rounded-xl hover:bg-white/5 transition-colors border border-white/10 group"
                    title="Recargar datos"
                >
                    <RefreshCw className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="Organizaciones" count={organizations?.length || 0} icon={Building2} color="cyan" />
                <KPICard title="Proyectos" count={projects?.length || 0} icon={Layers} color="orange" />
                <KPICard title="Nodos WBS" count={wbsNodes?.length || 0} icon={CheckCircle2} color="green" />
            </div>

            <div className="glass rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-orange-400" />
                        Proyectos Activos
                    </h3>
                </div>
                <div className="divide-y divide-white/5">
                    {projects.map(project => {
                        const org = organizations?.find(o => o.id === project.organization_id);
                        const nodes = wbsNodes?.filter(n => n.project_id === project.id) || [];

                        return (
                            <div key={project.id} className="p-6 hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                            {project.name}
                                        </h4>
                                        <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                                            {org ? <Building2 className="w-3 h-3" /> : null}
                                            {org?.name || 'Organización desconocida'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Estructura</p>
                                            <p className="text-2xl font-bold text-white font-mono">{nodes.length}</p>
                                        </div>
                                        <StatusBadge status={project.status} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="glass rounded-xl border border-white/10">
                <div className="p-6 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                        Desglose WBS
                    </h3>
                </div>
                <div className="p-6 overflow-x-auto">
                    <div className="min-w-[500px] space-y-2">
                        {wbsNodes
                            ?.filter(n => !n.parent_id)
                            .map(root => (
                                <WBSTree key={root.id} node={root} all={wbsNodes} level={0} />
                            ))}

                        {(!wbsNodes || wbsNodes.length === 0) && (
                            <p className="text-gray-500 italic text-center py-8">No hay estructura WBS definida</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Subcomponents for cleaner code
function KPICard({ title, count, icon: Icon, color }: { title: string, count: number, icon: React.ComponentType<{ className?: string }>, color: 'cyan' | 'orange' | 'green' }) {
    const colorClasses = {
        cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
        orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        green: 'text-green-400 bg-green-400/10 border-green-400/20',
    };

    return (
        <div className={`glass rounded-xl p-6 border ${colorClasses[color].split(' ').pop()}`}>
            <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${colorClasses[color].split(' ').slice(1).join(' ')}`}>
                    <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[0]}`} />
                </div>
                <div>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{title}</p>
                    <p className="text-3xl font-bold text-white">{count}</p>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = status === 'active'
        ? 'bg-green-500/10 text-green-400 border-green-500/30'
        : 'bg-gray-500/10 text-gray-400 border-gray-500/30';

    const label = status === 'active' ? 'Activo' : status;

    return (
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${styles}`}>
            {label}
        </span>
    );
}

function WBSTree({ node, all, level }: { node: WBSNode; all: WBSNode[]; level: number }) {
    const children = all.filter(n => n.parent_id === node.id);
    const hasChildren = children.length > 0;

    return (
        <div style={{ marginLeft: `${level * 24}px` }} className="relative">
            {level > 0 && (
                <div className="absolute left-[-16px] top-0 bottom-0 w-px bg-gray-800" />
            )}
            <div className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group ${level === 0 ? 'bg-white/5 mb-2' : ''}`}>
                <span className="font-mono text-xs text-cyan-500 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20 min-w-[60px] text-center">
                    {node.code || '---'}
                </span>
                <span className={`text-gray-300 font-medium ${level === 0 ? 'text-white text-base' : 'text-sm'}`}>
                    {node.name}
                </span>
                {hasChildren && (
                    <span className="text-[10px] text-gray-600 bg-gray-800 px-1.5 rounded-full">
                        {children.length}
                    </span>
                )}
            </div>
            {children.map(c => <WBSTree key={c.id} node={c} all={all} level={level + 1} />)}
        </div>
    );
}
