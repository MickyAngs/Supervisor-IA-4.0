export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold';

export interface Database {
    public: {
        Tables: {
            organizations: {
                Row: {
                    id: string
                    name: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    created_at?: string
                }
                Relationships: []
            }
            projects: {
                Row: {
                    id: string
                    organization_id: string
                    name: string
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    organization_id: string
                    name: string
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    organization_id?: string
                    name?: string
                    status?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "projects_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    }
                ]
            }
            wbs_nodes: {
                Row: {
                    id: string
                    project_id: string
                    parent_id: string | null
                    name: string
                    code: string | null
                    embedding: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    project_id: string
                    parent_id?: string | null
                    name: string
                    code?: string | null
                    embedding?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    project_id?: string
                    parent_id?: string | null
                    name?: string
                    code?: string | null
                    embedding?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "wbs_nodes_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "wbs_nodes_parent_id_fkey"
                        columns: ["parent_id"]
                        isOneToOne: false
                        referencedRelation: "wbs_nodes"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// Helper types for use throughout the app
export type Organization = Database['public']['Tables']['organizations']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type WBSNode = Database['public']['Tables']['wbs_nodes']['Row']