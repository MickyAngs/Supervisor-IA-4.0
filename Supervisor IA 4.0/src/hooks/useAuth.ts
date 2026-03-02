import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getCurrentUser, getSession, signOut as supabaseSignOut } from '@/lib/supabase';

interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        session: null,
        loading: true,
        isAuthenticated: false,
    });

    useEffect(() => {
        // Initial session check
        const checkSession = async () => {
            if (!supabase) {
                setAuthState(prev => ({ ...prev, loading: false }));
                return;
            }

            try {
                const session = await getSession();
                const user = await getCurrentUser();

                setAuthState({
                    user,
                    session,
                    loading: false,
                    isAuthenticated: !!user,
                });
            } catch (error) {
                console.error('Error checking session:', error);
                setAuthState(prev => ({ ...prev, loading: false }));
            }
        };

        checkSession();

        // Listen for auth changes
        if (supabase) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
                const user = session?.user ?? null;
                setAuthState({
                    user,
                    session,
                    loading: false,
                    isAuthenticated: !!user,
                });
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, []);

    const signOut = async () => {
        await supabaseSignOut();
        setAuthState({
            user: null,
            session: null,
            loading: false,
            isAuthenticated: false,
        });
    };

    const signInWithGoogle = async () => {
        if (!supabase) {
            console.error('⚠️ AUTH_ERROR: Supabase client not initialized');
            throw new Error('Supabase client not initialized');
        }

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin,
                },
            });

            if (error) {
                console.error('⚠️ AUTH_ERROR:', error.message, error);
                throw error;
            }
        } catch (err) {
            console.error('⚠️ AUTH_ERROR: Unexpected error during Google Sign In', err);
            throw err;
        }
    };

    return {
        ...authState,
        signOut,
        signInWithGoogle,
    };
}
