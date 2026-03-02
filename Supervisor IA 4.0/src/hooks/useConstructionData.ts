import { useState, useEffect, useCallback } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, testConnection, isAuthenticated } from '../lib/supabase';
import type { Database, Organization, Project, WBSNode, ProjectStatus } from '../shared/types';

interface UseConstructionDataReturn {
    projects: Project[];
    organizations: Organization[];
    wbsNodes: WBSNode[];
    loading: boolean;
    error: string | null;
    connectionStatus: 'checking' | 'connected' | 'disconnected' | 'unconfigured' | 'unauthenticated';
    seedSystem: () => Promise<void>;
    isSeeding: boolean;
    refreshData: () => Promise<void>;
    requiresAuth: boolean;
}

/**
 * Hook for construction data management.
 * TRL 7: Real Supabase connection with RLS enforcement.
 */
export function useConstructionData(): UseConstructionDataReturn {
    const [projects, setProjects] = useState<Project[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [wbsNodes, setWbsNodes] = useState<WBSNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requiresAuth, setRequiresAuth] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected' | 'unconfigured' | 'unauthenticated'>(
        isSupabaseConfigured ? 'checking' : 'unconfigured'
    );

    const loadData = useCallback(async () => {
        if (!supabase) {
            setLoading(false);
            setConnectionStatus('unconfigured');
            setError('Supabase no configurado');
            return;
        }

        setLoading(true);
        setError(null);
        setRequiresAuth(false);

        try {
            // TRL 7: Check authentication before loading any data
            const authenticated = await isAuthenticated();
            if (!authenticated) {
                setLoading(false);
                setConnectionStatus('unauthenticated');
                setRequiresAuth(true);
                setError('Acceso Denegado: Usuario no autenticado');
                return;
            }

            const connectionTest = await testConnection();
            if (!connectionTest.success) {
                setLoading(false);
                if (connectionTest.requiresAuth) {
                    setConnectionStatus('unauthenticated');
                    setRequiresAuth(true);
                } else {
                    setConnectionStatus('disconnected');
                }
                setError(connectionTest.error || 'Error de conexión');
                return;
            }

            const { data: orgsData, error: orgsError } = await supabase
                .from('organizations')
                .select('*')
                .order('created_at', { ascending: false });

            if (orgsError) {
                // Check for RLS policy violation
                if (orgsError.code === '42501' || orgsError.message.includes('policy')) {
                    throw new Error('🔒 Error de Permisos: No tienes acceso a esta organización');
                }
                throw orgsError;
            }

            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (projectsError) throw projectsError;

            const { data: wbsData, error: wbsError } = await supabase
                .from('wbs_nodes')
                .select('*')
                .order('created_at', { ascending: true });

            if (wbsError) throw wbsError;

            setOrganizations(orgsData || []);
            setProjects(projectsData || []);
            setWbsNodes(wbsData || []);
            setLoading(false);
            setConnectionStatus('connected');
            console.log('TESTSPRITE_STATUS: DATABASE_READY');
        } catch (err) {
            setLoading(false);
            setConnectionStatus('disconnected');
            const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
            // Detect permission errors
            if (errorMsg.includes('Permisos') || errorMsg.includes('policy') || errorMsg.includes('403')) {
                setError('🔒 Error de Permisos: No tienes acceso a esta organización');
            } else {
                setError(errorMsg);
            }
        }
    }, []);

    /**
     * Idempotent seed system - Find First, Create Second.
     */
    const seedSystem = useCallback(async () => {
        if (!supabase) {
            setError('Supabase no configurado');
            return;
        }

        // Force strict typing locally with double cast to ensure TS picks it up
        const client = supabase as unknown as SupabaseClient<Database>;

        setIsSeeding(true);
        setError(null);

        try {
            console.info('🚀 [Seed] Starting idempotent seed process...');

            // 1. Organization
            console.info('📍 [Seed] Step 1: Organization "Demo GARES"');
            let orgId: string;

            const { data: existingOrg } = await client
                .from('organizations')
                .select('id')
                .eq('name', 'Demo GARES')
                .maybeSingle();

            if (existingOrg) {
                console.info('✅ [Seed] Organization found, using ID:', existingOrg.id);
                orgId = existingOrg.id;
            } else {
                console.info('➕ [Seed] Creating Organization "Demo GARES"');
                const orgInsert: Database['public']['Tables']['organizations']['Insert'] = { name: 'Demo GARES' };
                const { data: newOrg, error: newOrgError } = await client
                    .from('organizations')
                    .insert(orgInsert)
                    .select('id')
                    .single();

                if (newOrgError) throw newOrgError;
                if (!newOrg) throw new Error('Failed to create organization');
                orgId = newOrg.id;
            }

            // 2. Project
            console.info('📍 [Seed] Step 2: Project "Altos de Trujillo"');
            let projectId: string;

            const { data: existingProject } = await client
                .from('projects')
                .select('id')
                .eq('name', 'Altos de Trujillo')
                .eq('organization_id', orgId)
                .maybeSingle();

            if (existingProject) {
                console.info('✅ [Seed] Project found, using ID:', existingProject.id);
                projectId = existingProject.id;
            } else {
                console.info('➕ [Seed] Creating Project "Altos de Trujillo"');
                const projectStatus: ProjectStatus = 'active';
                const projectInsert: Database['public']['Tables']['projects']['Insert'] = {
                    organization_id: orgId,
                    name: 'Altos de Trujillo',
                    status: projectStatus,
                };
                const { data: newProject, error: newProjectError } = await client
                    .from('projects')
                    .insert(projectInsert)
                    .select('id')
                    .single();

                if (newProjectError) throw newProjectError;
                if (!newProject) throw new Error('Failed to create project');
                projectId = newProject.id;
            }

            // 3. WBS Helper
            const ensureWBSNode = async (parentId: string | null, name: string, code: string): Promise<string> => {
                let query = client
                    .from('wbs_nodes')
                    .select('id')
                    .eq('project_id', projectId)
                    .eq('code', code);

                if (parentId) {
                    query = query.eq('parent_id', parentId);
                } else {
                    query = query.is('parent_id', null);
                }

                const { data: existing } = await query.maybeSingle();

                if (existing) {
                    console.info(`  ✓ Found WBS node "${name}"`);
                    return existing.id;
                }

                console.info(`  + Creating WBS node "${name}"`);
                const nodeInsert: Database['public']['Tables']['wbs_nodes']['Insert'] = {
                    project_id: projectId,
                    parent_id: parentId,
                    name,
                    code,
                };
                const { data: newNode, error: nodeError } = await client
                    .from('wbs_nodes')
                    .insert(nodeInsert)
                    .select('id')
                    .single();

                if (nodeError) throw nodeError;
                if (!newNode) throw new Error(`Failed to create node ${name}`);
                return newNode.id;
            };

            // 4. Create Structure
            console.info('📍 [Seed] Step 3: WBS Structure');
            const rootId = await ensureWBSNode(null, 'Altos de Trujillo', '00');
            const torreAId = await ensureWBSNode(rootId, 'Torre A', '01');
            const cimId = await ensureWBSNode(torreAId, 'Cimentación', '01.01');

            const partidas = [
                { name: 'Excavación', code: '01.01.01' },
                { name: 'Solado', code: '01.01.02' },
                { name: 'Acero', code: '01.01.03' },
                { name: 'Vaciado', code: '01.01.04' },
            ];

            for (const p of partidas) {
                await ensureWBSNode(cimId, p.name, p.code);
            }

            console.info('🎉 [Seed] Completed successfully');
            console.log('🚀 TESTSPRITE_SIGNAL: SEED_SUCCESS');
            console.log('TEST_STATUS: SEED_COMPLETE_SUCCESS');
            console.log('TESTSPRITE_CONTROL: SEED_SUCCESS');
            console.info('🏁 STATUS_SIGNAL: READY_FOR_AUDIT');
            await loadData();

        } catch (err) {
            console.error('DEBUG_SEED_ERROR:', err);

            let msg = 'Error desconocido en seed';
            if (err instanceof Error) {
                msg = `Error: ${err.message}`;
            } else if (typeof err === 'object' && err !== null && 'message' in err) {
                // Handle Supabase error objects like PostgrestError
                const pgErr = err as any;
                msg = `Supabase Error [${pgErr.code || 'UNKNOWN'}]: ${pgErr.message}`;
                if (pgErr.details) msg += ` | Details: ${pgErr.details}`;
                if (pgErr.hint) msg += ` | Hint: ${pgErr.hint}`;
            } else {
                msg = String(err);
            }

            // Even if error, try to reload data to show what we have
            await loadData();
            setError(msg);
        } finally {
            setIsSeeding(false);
        }
    }, [loadData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        projects,
        organizations,
        wbsNodes,
        loading,
        error,
        connectionStatus,
        seedSystem,
        isSeeding,
        refreshData: loadData,
        requiresAuth,
    };
}
