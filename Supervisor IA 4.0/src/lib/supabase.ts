import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import type { Database } from '../shared/types';

// Singleton instance
let supabaseInstance: SupabaseClient<Database> | null = null;

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation logs - System does NOT crash, just logs and sets flag
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Critical: Environment variables missing');
    console.warn('⚠️ [Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set.');
}

// Configuration check - exported for components to check before operations
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const isConfigured = isSupabaseConfigured; // Alias for TestSprite compatibility

/**
 * Get Supabase client singleton instance.
 * TRL 7: Typed client with Auth support for RLS.
 */
export function getSupabaseClient(): SupabaseClient<Database> {
    if (!isSupabaseConfigured) {
        throw new Error('Supabase no configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
    }

    if (!supabaseInstance) {
        supabaseInstance = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
            },
            db: {
                schema: 'public',
            },
        });
    }

    return supabaseInstance;
}

// Export singleton
export const supabase = isSupabaseConfigured ? getSupabaseClient() : null;

/**
 * Get current authenticated user.
 * Returns null if not logged in.
 */
export async function getCurrentUser(): Promise<User | null> {
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Get current session.
 * Returns null if not logged in.
 */
export async function getSession(): Promise<Session | null> {
    if (!supabase) return null;

    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Check if user is authenticated.
 * TRL 7: Required for RLS enforcement.
 */
export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}

/**
 * Connection test - now requires authentication for RLS.
 */
export async function testConnection(): Promise<{ success: boolean; error?: string; requiresAuth?: boolean }> {
    if (!supabase) {
        return { success: false, error: 'Cliente Supabase no inicializado' };
    }

    try {
        // First check if user is authenticated
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                error: 'Acceso Denegado: Usuario no autenticado',
                requiresAuth: true
            };
        }

        // Test connection with RLS active
        const { error } = await supabase.from('organizations').select('id').limit(1);
        if (error) {
            // Check for RLS policy violation
            if (error.code === '42501' || error.message.includes('policy')) {
                return {
                    success: false,
                    error: '🔒 Error de Permisos: No tienes acceso a esta organización'
                };
            }
            return { success: false, error: error.message };
        }
        return { success: true };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'Error desconocido' };
    }
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
    if (!supabase) return;
    await supabase.auth.signOut();
}
