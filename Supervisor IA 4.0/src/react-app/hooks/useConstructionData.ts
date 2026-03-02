import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, testConnection } from '@/lib/supabase';
import type { Database } from '@/shared/types';

// Tipos derivados de la base de datos
type Organization = Database['public']['Tables']['organizations']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];
type WBSNode = Database['public']['Tables']['wbs_nodes']['Row'];

// Estado del hook
interface ConstructionDataState {
    organizations: Organization[];
    projects: Project[];
    wbsNodes: WBSNode[];
    isLoading: boolean;
    isSeeding: boolean;
    error: string | null;
    connectionStatus: 'checking' | 'connected' | 'disconnected' | 'unconfigured';
}

// Retorno del hook
interface UseConstructionDataReturn extends ConstructionDataState {
    seedInitialData: () => Promise<void>;
    refreshData: () => Promise<void>;
}

/**
 * Hook principal para gestionar datos de construcción.
 * TRL 6: Maneja estados de conexión, errores y seed de datos iniciales.
 */
export function useConstructionData(): UseConstructionDataReturn {
    const [state, setState] = useState<ConstructionDataState>({
        organizations: [],
        projects: [],
        wbsNodes: [],
        isLoading: true,
        isSeeding: false,
        error: null,
        connectionStatus: isSupabaseConfigured ? 'checking' : 'unconfigured',
    });

    // Función para cargar todos los datos
    const loadData = useCallback(async () => {
        if (!supabase) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                connectionStatus: 'unconfigured',
                error: 'Supabase no está configurado. Revisa las variables de entorno.',
            }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // Verificar conexión primero
            const connectionTest = await testConnection();
            if (!connectionTest.success) {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    connectionStatus: 'disconnected',
                    error: `Error de conexión: ${connectionTest.error}`,
                }));
                return;
            }

            // Cargar organizaciones
            const { data: orgs, error: orgsError } = await supabase
                .from('organizations')
                .select('id, name, created_at')
                .order('created_at', { ascending: false });

            if (orgsError) throw orgsError;

            // Cargar proyectos
            const { data: projects, error: projectsError } = await supabase
                .from('projects')
                .select('id, organization_id, name, status, created_at')
                .order('created_at', { ascending: false });

            if (projectsError) throw projectsError;

            // Cargar nodos WBS
            const { data: wbsNodes, error: wbsError } = await supabase
                .from('wbs_nodes')
                .select('id, project_id, parent_id, name, code, embedding, created_at')
                .order('created_at', { ascending: true });

            if (wbsError) throw wbsError;

            setState({
                organizations: orgs || [],
                projects: projects || [],
                wbsNodes: wbsNodes || [],
                isLoading: false,
                isSeeding: false,
                error: null,
                connectionStatus: 'connected',
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar datos';
            setState(prev => ({
                ...prev,
                isLoading: false,
                connectionStatus: 'disconnected',
                error: errorMessage,
            }));
        }
    }, []);

    /**
     * Seed de datos iniciales para demostración.
     * TRL 6: Permite inicializar el sistema sin datos previos.
     */
    const seedInitialData = useCallback(async () => {
        if (!supabase) {
            setState(prev => ({ ...prev, error: 'Supabase no configurado' }));
            return;
        }

        setState(prev => ({ ...prev, isSeeding: true, error: null }));

        try {
            // 1. Crear organización demo
            const { data: org, error: orgError } = await supabase
                .from('organizations')
                .insert({ name: 'Demo Constructora S.A.C.' })
                .select()
                .single();

            if (orgError) throw orgError;

            // 2. Crear proyecto demo
            const { data: project, error: projectError } = await supabase
                .from('projects')
                .insert({
                    organization_id: org.id,
                    name: 'Residencial Altos de Trujillo',
                    status: 'active',
                })
                .select()
                .single();

            if (projectError) throw projectError;

            // 3. Crear estructura WBS jerárquica
            // Nivel 0: Proyecto raíz
            const { data: rootNode, error: rootError } = await supabase
                .from('wbs_nodes')
                .insert({
                    project_id: project.id,
                    parent_id: null,
                    name: 'Residencial Altos de Trujillo',
                    code: '00',
                })
                .select()
                .single();

            if (rootError) throw rootError;

            // Nivel 1: Torres
            const { data: torreA, error: torreAError } = await supabase
                .from('wbs_nodes')
                .insert({
                    project_id: project.id,
                    parent_id: rootNode.id,
                    name: 'Torre A',
                    code: '01',
                })
                .select()
                .single();

            if (torreAError) throw torreAError;

            const { error: torreBError } = await supabase
                .from('wbs_nodes')
                .insert({
                    project_id: project.id,
                    parent_id: rootNode.id,
                    name: 'Torre B',
                    code: '02',
                });

            if (torreBError) throw torreBError;

            // Nivel 2: Pisos de Torre A
            const pisos = [
                { name: 'Sótano 2', code: '01.01' },
                { name: 'Sótano 1', code: '01.02' },
                { name: 'Piso 1', code: '01.03' },
                { name: 'Piso 2', code: '01.04' },
                { name: 'Piso 3', code: '01.05' },
            ];

            for (const piso of pisos) {
                const { data: pisoNode, error: pisoError } = await supabase
                    .from('wbs_nodes')
                    .insert({
                        project_id: project.id,
                        parent_id: torreA.id,
                        name: piso.name,
                        code: piso.code,
                    })
                    .select()
                    .single();

                if (pisoError) throw pisoError;

                // Nivel 3: Partidas por piso (solo para Sótano 1 como ejemplo)
                if (piso.code === '01.02') {
                    const partidas = [
                        { name: 'Excavación', code: '01.02.01' },
                        { name: 'Encofrado', code: '01.02.02' },
                        { name: 'Acero de Refuerzo', code: '01.02.03' },
                        { name: 'Vaciado de Concreto', code: '01.02.04' },
                        { name: 'Curado', code: '01.02.05' },
                    ];

                    for (const partida of partidas) {
                        const { error: partidaError } = await supabase
                            .from('wbs_nodes')
                            .insert({
                                project_id: project.id,
                                parent_id: pisoNode.id,
                                name: partida.name,
                                code: partida.code,
                            });

                        if (partidaError) throw partidaError;
                    }
                }
            }

            // Recargar datos después del seed
            await loadData();

            console.log('✅ Datos iniciales creados exitosamente');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al crear datos iniciales';
            setState(prev => ({
                ...prev,
                isSeeding: false,
                error: errorMessage,
            }));
            console.error('Error en seed:', err);
        }
    }, [loadData]);

    // Cargar datos al montar el componente
    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        ...state,
        seedInitialData,
        refreshData: loadData,
    };
}
