-- [INICIO DEL CÓDIGO SQL A INYECTAR EN supabase_schema.sql]
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    role VARCHAR(50) NOT NULL CHECK (role IN ('superadmin', 'project_manager', 'supervisor_campo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    ifc_model_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ar_anchors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id),
    marker_code VARCHAR(100) NOT NULL,
    x_coord NUMERIC NOT NULL,
    y_coord NUMERIC NOT NULL,
    z_coord NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spatial_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    obj_file_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING_PROCESSING',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE legal_knowledge_vectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    norm_reference VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID NOT NULL REFERENCES spatial_scans(id),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    deviation_metrics JSONB NOT NULL,
    cited_norm_id UUID REFERENCES legal_knowledge_vectors(id),
    ai_drafted_text TEXT,
    status VARCHAR(50) DEFAULT 'DRAFT',
    approved_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE spatial_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION get_user_tenant_id() RETURNS UUID AS $$
    SELECT tenant_id FROM users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE POLICY "Tenant Isolation: Projects" ON projects FOR ALL USING (tenant_id = get_user_tenant_id());
CREATE POLICY "Tenant Isolation: Scans" ON spatial_scans FOR ALL USING (project_id IN (SELECT id FROM projects WHERE tenant_id = get_user_tenant_id()));
CREATE POLICY "Tenant Isolation: Audits" ON audit_reports FOR ALL USING (tenant_id = get_user_tenant_id());
-- [FIN DEL CÓDIGO SQL]
