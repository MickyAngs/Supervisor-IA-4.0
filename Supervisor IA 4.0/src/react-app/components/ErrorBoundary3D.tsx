import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary3D extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error no controlado en visor 3D:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-red-500/30 rounded-2xl p-6 text-center">
                    <div className="bg-red-500/10 p-4 rounded-full mb-4">
                        <AlertTriangle className="w-12 h-12 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Error en Motor Gráfico</h3>
                    <p className="text-slate-400 mb-6 max-w-sm">
                        No se pudo cargar la malla volumétrica 3D. El visor ha sido deshabilitado para proteger el sistema.
                    </p>
                    <button
                        onClick={this.handleReset}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl border border-slate-700 transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Reintentar Renderizado
                    </button>

                    {this.state.error && (
                        <div className="mt-8 w-full max-w-md bg-black/40 p-3 rounded text-left text-xs text-red-300 font-mono overflow-auto max-h-32 border border-red-900/30">
                            {this.state.error.message}
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
