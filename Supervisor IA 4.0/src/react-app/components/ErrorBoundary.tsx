import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Global Error Caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#0f172a', /* slate-900 */
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <h1 style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        ⚠️ Error Detectado en el Motor
                    </h1>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem', textAlign: 'center', maxWidth: '600px' }}>
                        A fatal UI exception occurred. The system has prevented a complete crash.
                    </p>
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #7f1d1d',
                        maxWidth: '800px',
                        width: '100%',
                        overflowX: 'auto'
                    }}>
                        <pre style={{ color: '#fca5a5', fontSize: '0.875rem', margin: 0 }}>
                            {this.state.error?.message || 'Unknown Error'}
                        </pre>
                        <pre style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                            {this.state.error?.stack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '2rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Reiniciar Sistema Módular
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
