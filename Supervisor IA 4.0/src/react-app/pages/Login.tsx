import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, LogIn, AlertCircle, Loader2, Building2 } from 'lucide-react';

export default function LoginView() {
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        // ... (existing email login logic remains the same, I will keep it in the ReplacementContent if I were replacing the whole file, but I should try to target specific blocks or replace the whole component if it's cleaner. Given the structure, I'll replace the top part and then the button part in separate chunks or maybe one big chunk if they are close. They are somewhat close but the imports are at the top).
        // Let's redefine the whole component to be safe and clean.

        e.preventDefault();

        if (!supabase) {
            setError('Error de configuración: Supabase no está inicializado');
            return;
        }

        if (!email || !password) {
            setError('Por favor ingresa tu correo y contraseña');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                if (authError.message.includes('Invalid login credentials')) {
                    setError('Credenciales inválidas. Verifica tu correo y contraseña.');
                } else if (authError.message.includes('Email not confirmed')) {
                    setError('Correo no confirmado. Revisa tu bandeja de entrada.');
                } else {
                    setError(authError.message);
                }
                return;
            }

            if (data.user) {
                console.log('✅ Login successful:', data.user.email);
                navigate('/');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginClick = async () => {
        setGoogleLoading(true);
        setError(null);

        try {
            await signInWithGoogle();
        } catch (err) {
            console.error(err); // Log for debugging
            // Check for 401 or config errors (generic catch-all related to config often comes here if redirect blocked or immediate failure)
            // The prompt asks to show "Configuración de Google pendiente..." for 401/invalid_client.
            // Often "invalid_client" is the error message.
            const errMsg = err instanceof Error ? err.message : String(err);
            if (errMsg.includes('401') || errMsg.includes('invalid_client') || errMsg.includes('configuration')) {
                setError('Configuración de Google pendiente. Contacte al administrador.');
            } else {
                setError('Error al iniciar con Google. Intente nuevamente.');
            }
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/20">
                        <Building2 className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Supervisor IA 4.0</h1>
                    <p className="text-gray-400 mt-2">Plataforma de Gestión de Obras</p>
                </div>

                {/* Login Card */}
                <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <LogIn className="w-5 h-5 text-cyan-400" />
                        Iniciar Sesión
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@empresa.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                    disabled={loading || googleLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                    disabled={loading || googleLoading}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || googleLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-xl text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Ingresar
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-slate-900 px-2 text-gray-500">O continuar con</span>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLoginClick}
                        disabled={loading || googleLoading}
                        className="w-full py-3.5 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {googleLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                                <span className="text-gray-600">Cargando...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </>
                        )}
                    </button>

                    {/* Footer Links */}
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-gray-500">
                            ¿No tienes cuenta?{' '}
                            <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                                Contacta al administrador
                            </a>
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" />
                        Conexión segura con cifrado SSL
                    </p>
                </div>
            </div>
        </div>
    );
}
