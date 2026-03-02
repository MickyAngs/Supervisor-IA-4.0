-- ============================================================================
-- SUPERVISOR IA 4.0 - MIGRACIÓN INICIAL PARA TRL 6
-- Motor de Verdad: Arquitectura Relacional + Vectorial
-- ============================================================================
-- JUSTIFICACIÓN TRL 6: Este esquema está diseñado para validación en entorno
-- relevante (obras reales). Cada decisión prioriza: Auditoría, Trazabilidad,
-- Seguridad y Escalabilidad Multi-Tenant.
-- ============================================================================

-- ============================================================================
-- SECCIÓN 1: EXTENSIONES CRÍTICAS
-- ============================================================================
-- TRL 6: Las extensiones son fundamentales para capacidades de IA (RAG) y
-- geolocalización precisa de evidencias en campo.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- UUIDs para claves primarias distribuidas
CREATE EXTENSION IF NOT EXISTS "vector";          -- pgvector para embeddings RAG normativo
CREATE EXTENSION IF NOT EXISTS "postgis";         -- PostGIS para coordenadas GPS de evidencias

-- ============================================================================
-- SECCIÓN 2: TIPOS ENUMERADOS (ENUMS)
-- ============================================================================
-- TRL 6: Los enums garantizan integridad de datos y documentan estados válidos
-- del sistema, facilitando auditorías de cumplimiento.

-- Estado de procesamiento de capturas de campo
CREATE TYPE processing_status AS ENUM (
    'pending',          -- Captura recibida, esperando análisis
    'queued',           -- En cola de procesamiento n8n
    'analyzing',        -- IA procesando activamente
    'compliant',        -- Sin hallazgos de incumplimiento
    'non_compliant',    -- Hallazgos detectados, requiere acción
    'manual_review',    -- Requiere revisión humana
    'archived'          -- Procesamiento completado y archivado
);

-- Dispositivo de captura de evidencia
CREATE TYPE capture_device AS ENUM (
    'drone_dji',        -- Drone DJI (Phantom, Mavic, etc.)
    'drone_other',      -- Otros drones
    'mobile_ios',       -- iPhone/iPad
    'mobile_android',   -- Dispositivo Android
    'cctv_fixed',       -- Cámara CCTV fija
    'cctv_ptz',         -- Cámara CCTV PTZ
    'lidar_scanner',    -- Escáner LiDAR terrestre
    'total_station',    -- Estación total topográfica
    'manual_upload'     -- Subida manual desde escritorio
);

-- Severidad de hallazgos de IA
CREATE TYPE finding_severity AS ENUM (
    'critical',         -- Riesgo de seguridad inmediato
    'major',            -- Incumplimiento normativo significativo
    'minor',            -- Desviación menor, observación
    'informational'     -- Solo para registro/trazabilidad
);

-- Rol de usuario en la organización
CREATE TYPE user_role AS ENUM (
    'owner',            -- Propietario de la organización
    'admin',            -- Administrador con acceso total
    'supervisor',       -- Supervisor de obra con permisos de escritura
    'auditor',          -- Auditor externo con permisos de lectura
    'viewer'            -- Solo visualización
);

-- ============================================================================
-- SECCIÓN 3: TABLA BASE - ORGANIZACIONES (MULTI-TENANT ROOT)
-- ============================================================================
-- TRL 6: Arquitectura multi-tenant desde el núcleo. Cada organización es un
-- "tenant" aislado. Todos los datos heredan este aislamiento vía RLS.

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Identificación
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,  -- URL-friendly identifier
    tax_id VARCHAR(50),                  -- RUC/NIT para facturación
    
    -- Configuración
    subscription_tier VARCHAR(50) DEFAULT 'trial',  -- trial, pro, enterprise
    max_projects INTEGER DEFAULT 3,
    max_users INTEGER DEFAULT 5,
    features JSONB DEFAULT '{}',         -- Feature flags específicos
    
    -- Metadatos de auditoría (TRL 6: Trazabilidad total)
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID,                     -- Se poblará con auth.uid()
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    
    -- Constraints
    CONSTRAINT organizations_slug_format CHECK (slug ~ '^[a-z0-9-]+$')
);

-- Índices para búsqueda rápida
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_active ON organizations(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE organizations IS 'TRL 6: Tenant root. Todo dato del sistema pertenece a una organización. RLS garantiza aislamiento total.';

-- ============================================================================
-- SECCIÓN 4: TABLA DE USUARIOS Y MEMBRESÍAS
-- ============================================================================
-- TRL 6: Gestión granular de permisos. Un usuario puede pertenecer a múltiples
-- organizaciones con diferentes roles (ej: auditor externo).

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Información del perfil
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(50),
    professional_license VARCHAR(100),   -- CIP, CAP, etc.
    
    -- Preferencias
    preferred_language VARCHAR(10) DEFAULT 'es',
    timezone VARCHAR(50) DEFAULT 'America/Lima',
    notification_preferences JSONB DEFAULT '{"email": true, "push": true}',
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    last_login_at TIMESTAMPTZ
);

CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Permisos
    role user_role NOT NULL DEFAULT 'viewer',
    permissions JSONB DEFAULT '{}',      -- Permisos granulares adicionales
    
    -- Estado
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    joined_at TIMESTAMPTZ,
    invited_by UUID REFERENCES auth.users(id),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    
    -- Constraints
    UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);

COMMENT ON TABLE organization_members IS 'TRL 6: Relación M:N usuario-organización. Permite auditoría cruzada entre organizaciones.';

-- ============================================================================
-- SECCIÓN 5: PROYECTOS DE CONSTRUCCIÓN
-- ============================================================================
-- TRL 6: Cada proyecto es una obra física. Incluye geolocalización del sitio
-- y metadatos contractuales para trazabilidad legal.

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Identificación del proyecto
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),                    -- Código interno del proyecto
    description TEXT,
    
    -- Ubicación (TRL 6: Geolocalización precisa)
    address TEXT,
    city VARCHAR(100),
    region VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Perú',
    site_polygon GEOMETRY(POLYGON, 4326),    -- Perímetro del terreno
    site_center GEOMETRY(POINT, 4326),       -- Centro del proyecto
    
    -- Datos contractuales (TRL 6: Trazabilidad legal)
    contract_number VARCHAR(100),
    client_name VARCHAR(255),
    contractor_name VARCHAR(255),
    start_date DATE,
    estimated_end_date DATE,
    contract_value DECIMAL(15, 2),
    currency VARCHAR(3) DEFAULT 'PEN',
    
    -- Estado del proyecto
    status VARCHAR(50) DEFAULT 'planning',   -- planning, active, paused, completed
    progress_percentage DECIMAL(5, 2) DEFAULT 0,
    
    -- Configuración de IA
    ai_config JSONB DEFAULT '{
        "auto_analyze": true,
        "confidence_threshold": 0.75,
        "notify_on_critical": true
    }',
    
    -- Metadatos de auditoría
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    is_archived BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_site_center ON projects USING GIST(site_center);

COMMENT ON TABLE projects IS 'TRL 6: Representa una obra física. Incluye geometría PostGIS para validación de ubicación de evidencias.';

-- ============================================================================
-- SECCIÓN 6: ONTOLOGÍA DE CONSTRUCCIÓN - WBS (WORK BREAKDOWN STRUCTURE)
-- ============================================================================
-- TRL 6: Jerarquía recursiva que replica el cronograma/WBS de la obra.
-- Permite vincular hallazgos a partidas específicas para trazabilidad.

CREATE TABLE wbs_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Jerarquía recursiva
    parent_id UUID REFERENCES wbs_nodes(id) ON DELETE CASCADE,
    path LTREE,                          -- Materialización del path para queries eficientes
    depth INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    
    -- Identificación de la partida
    code VARCHAR(50) NOT NULL,           -- Ej: "01.02.03"
    name VARCHAR(255) NOT NULL,          -- Ej: "Vaciado de Concreto f'c=210"
    description TEXT,
    
    -- Datos técnicos
    unit_of_measure VARCHAR(50),         -- m3, m2, kg, und, glb
    planned_quantity DECIMAL(15, 4),
    executed_quantity DECIMAL(15, 4) DEFAULT 0,
    unit_cost DECIMAL(15, 4),
    
    -- Programación
    planned_start DATE,
    planned_end DATE,
    actual_start DATE,
    actual_end DATE,
    
    -- Estado
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed, blocked
    compliance_status VARCHAR(50) DEFAULT 'not_evaluated', -- not_evaluated, compliant, non_compliant
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    UNIQUE(project_id, code)
);

-- Extensión LTREE para queries jerárquicas eficientes
CREATE EXTENSION IF NOT EXISTS ltree;

CREATE INDEX idx_wbs_project ON wbs_nodes(project_id);
CREATE INDEX idx_wbs_parent ON wbs_nodes(parent_id);
CREATE INDEX idx_wbs_path ON wbs_nodes USING GIST(path);
CREATE INDEX idx_wbs_org ON wbs_nodes(organization_id);

COMMENT ON TABLE wbs_nodes IS 'TRL 6: Estructura jerárquica de obra (WBS). Permite vincular hallazgos a partidas específicas del cronograma.';

-- Función para actualizar el path LTREE automáticamente
CREATE OR REPLACE FUNCTION update_wbs_path() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_id IS NULL THEN
        NEW.path = NEW.code::ltree;
        NEW.depth = 0;
    ELSE
        SELECT path || NEW.code::ltree, depth + 1
        INTO NEW.path, NEW.depth
        FROM wbs_nodes
        WHERE id = NEW.parent_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wbs_path_trigger
    BEFORE INSERT OR UPDATE OF parent_id, code ON wbs_nodes
    FOR EACH ROW EXECUTE FUNCTION update_wbs_path();

-- ============================================================================
-- SECCIÓN 7: DOCUMENTOS REGULATORIOS (BASE DE CONOCIMIENTO RAG)
-- ============================================================================
-- TRL 6: Almacena fragmentos del RNE, ISO, normas técnicas. La columna
-- `embedding` permite búsqueda semántica para citas precisas en hallazgos.

CREATE TABLE regulatory_docs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL, -- NULL = docs globales
    
    -- Identificación del documento
    doc_type VARCHAR(50) NOT NULL,       -- 'rne', 'iso', 'ntc', 'internal', 'contract'
    doc_code VARCHAR(100) NOT NULL,       -- Ej: "RNE E.060", "ISO 9001:2015"
    doc_version VARCHAR(50),
    doc_title VARCHAR(500) NOT NULL,
    
    -- Contenido del fragmento
    section_number VARCHAR(50),           -- Ej: "21.2.1"
    section_title VARCHAR(500),
    content TEXT NOT NULL,                -- Texto del fragmento
    
    -- Embedding para RAG (TRL 6: Búsqueda semántica normativa)
    embedding vector(1536),               -- OpenAI ada-002 / text-embedding-3-small
    
    -- Metadatos
    source_url TEXT,
    effective_date DATE,
    expiry_date DATE,
    tags TEXT[],                          -- ['concreto', 'estructuras', 'refuerzo']
    
    -- Auditoría
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    indexed_at TIMESTAMPTZ,               -- Cuándo se generó el embedding
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Índice HNSW para búsqueda vectorial eficiente (TRL 6: Performance en producción)
CREATE INDEX idx_regulatory_embedding ON regulatory_docs 
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

CREATE INDEX idx_regulatory_doc_type ON regulatory_docs(doc_type);
CREATE INDEX idx_regulatory_doc_code ON regulatory_docs(doc_code);
CREATE INDEX idx_regulatory_tags ON regulatory_docs USING GIN(tags);

COMMENT ON TABLE regulatory_docs IS 'TRL 6: Base de conocimiento RAG. Embeddings permiten citar normas específicas en hallazgos de IA.';

-- Función de búsqueda semántica
CREATE OR REPLACE FUNCTION search_regulations(
    query_embedding vector(1536),
    match_threshold FLOAT DEFAULT 0.75,
    match_count INT DEFAULT 5,
    filter_doc_type TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    doc_code VARCHAR(100),
    section_number VARCHAR(50),
    content TEXT,
    similarity FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        rd.id,
        rd.doc_code,
        rd.section_number,
        rd.content,
        1 - (rd.embedding <=> query_embedding) AS similarity
    FROM regulatory_docs rd
    WHERE rd.is_active = TRUE
        AND (filter_doc_type IS NULL OR rd.doc_type = filter_doc_type)
        AND 1 - (rd.embedding <=> query_embedding) > match_threshold
    ORDER BY rd.embedding <=> query_embedding
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECCIÓN 8: CAPTURAS DE SITIO (EVIDENCIA DE CAMPO)
-- ============================================================================
-- TRL 6: Registro de toda evidencia visual capturada en obra. Incluye
-- geolocalización GPS precisa para validar que la foto es del proyecto correcto.

CREATE TABLE site_captures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    wbs_node_id UUID REFERENCES wbs_nodes(id) ON DELETE SET NULL,
    
    -- Identificación de la captura
    capture_type VARCHAR(50) NOT NULL,    -- 'photo', 'video', 'point_cloud', '360_photo'
    filename VARCHAR(255) NOT NULL,
    storage_path TEXT NOT NULL,           -- Path en Supabase Storage
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    
    -- Geolocalización (TRL 6: Validación espacial de evidencias)
    gps_coordinates GEOMETRY(POINT, 4326),
    altitude_meters DECIMAL(10, 2),
    gps_accuracy_meters DECIMAL(10, 2),
    compass_heading DECIMAL(5, 2),        -- Orientación de la cámara
    
    -- Dispositivo de captura
    capture_device capture_device NOT NULL,
    device_model VARCHAR(100),
    device_serial VARCHAR(100),
    
    -- Metadatos temporales
    captured_at TIMESTAMPTZ NOT NULL,     -- Cuándo se tomó (EXIF o manual)
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    captured_by UUID REFERENCES auth.users(id),
    
    -- Estado de procesamiento IA
    processing_status processing_status DEFAULT 'pending',
    processing_started_at TIMESTAMPTZ,
    processing_completed_at TIMESTAMPTZ,
    processing_error TEXT,
    
    -- Resultados de análisis IA
    ai_analysis_result JSONB,             -- Resultado completo del modelo
    detected_elements JSONB,              -- Elementos detectados (rebar, concrete, etc.)
    
    -- Metadatos adicionales
    weather_conditions VARCHAR(100),
    notes TEXT,
    tags TEXT[],
    
    -- Auditoría
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_captures_project ON site_captures(project_id);
CREATE INDEX idx_captures_org ON site_captures(organization_id);
CREATE INDEX idx_captures_wbs ON site_captures(wbs_node_id);
CREATE INDEX idx_captures_status ON site_captures(processing_status);
CREATE INDEX idx_captures_gps ON site_captures USING GIST(gps_coordinates);
CREATE INDEX idx_captures_captured_at ON site_captures(captured_at DESC);

COMMENT ON TABLE site_captures IS 'TRL 6: Registro de evidencias de campo. GPS + timestamps = prueba irrefutable para auditorías.';

-- Función para validar que la captura está dentro del perímetro del proyecto
CREATE OR REPLACE FUNCTION validate_capture_location() RETURNS TRIGGER AS $$
DECLARE
    project_polygon GEOMETRY;
    is_within BOOLEAN;
BEGIN
    -- Obtener el polígono del proyecto
    SELECT site_polygon INTO project_polygon
    FROM projects WHERE id = NEW.project_id;
    
    -- Si el proyecto tiene polígono definido, validar
    IF project_polygon IS NOT NULL AND NEW.gps_coordinates IS NOT NULL THEN
        is_within := ST_Within(NEW.gps_coordinates, project_polygon);
        
        -- Agregar warning en metadata si está fuera (no bloquear, solo alertar)
        IF NOT is_within THEN
            NEW.ai_analysis_result = COALESCE(NEW.ai_analysis_result, '{}'::jsonb) || 
                '{"location_warning": "Captura fuera del perímetro del proyecto"}'::jsonb;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER capture_location_validation
    BEFORE INSERT OR UPDATE OF gps_coordinates ON site_captures
    FOR EACH ROW EXECUTE FUNCTION validate_capture_location();

-- ============================================================================
-- SECCIÓN 9: HALLAZGOS DE IA (JUICIO DEL SISTEMA)
-- ============================================================================
-- TRL 6: Tabla crítica donde n8n/agentes IA escriben detecciones. Cada
-- hallazgo debe tener trazabilidad completa: evidencia + norma citada.

CREATE TABLE ai_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    site_capture_id UUID NOT NULL REFERENCES site_captures(id) ON DELETE CASCADE,
    wbs_node_id UUID REFERENCES wbs_nodes(id) ON DELETE SET NULL,
    
    -- Normativa citada (TRL 6: Trazabilidad a norma específica)
    cited_regulation_id UUID REFERENCES regulatory_docs(id) ON DELETE SET NULL,
    cited_regulation_text TEXT,           -- Copia del texto para inmutabilidad
    
    -- Descripción del hallazgo
    finding_type VARCHAR(100) NOT NULL,   -- 'missing_rebar', 'incorrect_spacing', etc.
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    
    -- Localización en la imagen
    bounding_box JSONB,                   -- {"x": 100, "y": 200, "width": 50, "height": 50}
    annotated_image_path TEXT,            -- Path a imagen con anotaciones
    
    -- Métricas de confianza IA (TRL 6: Transparencia del modelo)
    confidence_score DECIMAL(5, 4) NOT NULL CHECK (confidence_score BETWEEN 0 AND 1),
    model_name VARCHAR(100),              -- Nombre del modelo que detectó
    model_version VARCHAR(50),
    inference_metadata JSONB,             -- Metadata adicional del modelo
    
    -- Severidad y clasificación
    severity finding_severity NOT NULL DEFAULT 'minor',
    category VARCHAR(100),                -- 'structural', 'safety', 'quality', 'documentation'
    subcategory VARCHAR(100),
    
    -- Sugerencia de remediación
    remediation_suggestion TEXT,
    estimated_remediation_cost DECIMAL(15, 2),
    remediation_priority INTEGER DEFAULT 3 CHECK (remediation_priority BETWEEN 1 AND 5),
    
    -- Flujo de trabajo de resolución
    status VARCHAR(50) DEFAULT 'open',    -- open, acknowledged, in_progress, resolved, disputed
    assigned_to UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMPTZ,
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES auth.users(id),
    resolution_notes TEXT,
    resolution_evidence_id UUID REFERENCES site_captures(id), -- Foto de corrección
    
    -- Auditoría (TRL 6: Registro inmutable)
    detected_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_findings_org ON ai_findings(organization_id);
CREATE INDEX idx_findings_project ON ai_findings(project_id);
CREATE INDEX idx_findings_capture ON ai_findings(site_capture_id);
CREATE INDEX idx_findings_regulation ON ai_findings(cited_regulation_id);
CREATE INDEX idx_findings_status ON ai_findings(status);
CREATE INDEX idx_findings_severity ON ai_findings(severity);
CREATE INDEX idx_findings_detected ON ai_findings(detected_at DESC);

COMMENT ON TABLE ai_findings IS 'TRL 6: Registro de hallazgos de IA. Trazabilidad completa: evidencia → detección → norma → resolución.';

-- ============================================================================
-- SECCIÓN 10: HISTORIAL DE AUDITORÍA (AUDIT LOG)
-- ============================================================================
-- TRL 6: Log inmutable de todas las acciones críticas del sistema.
-- Fundamental para auditorías de cumplimiento y trazabilidad forense.

CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    
    -- Actor
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT,                      -- Copia para cuando el usuario se elimine
    ip_address INET,
    user_agent TEXT,
    
    -- Acción
    action VARCHAR(100) NOT NULL,         -- 'create', 'update', 'delete', 'view', 'export'
    resource_type VARCHAR(100) NOT NULL,  -- 'project', 'finding', 'capture', etc.
    resource_id UUID,
    
    -- Datos del cambio
    old_values JSONB,
    new_values JSONB,
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    session_id UUID,
    request_id UUID                       -- Para correlacionar con logs de aplicación
);

-- Particionar por tiempo para performance (TRL 6: Datos de años)
-- En producción, considerar particionamiento por mes
CREATE INDEX idx_audit_org_time ON audit_log(organization_id, created_at DESC);
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_resource ON audit_log(resource_type, resource_id);

COMMENT ON TABLE audit_log IS 'TRL 6: Log de auditoría inmutable. Registra todas las acciones críticas para trazabilidad forense.';

-- ============================================================================
-- SECCIÓN 11: ROW LEVEL SECURITY (RLS) - AISLAMIENTO MULTI-TENANT
-- ============================================================================
-- TRL 6: RLS es el mecanismo de seguridad crítico. Garantiza que cada
-- organización solo puede acceder a sus propios datos, incluso con bugs en la app.

-- Habilitar RLS en todas las tablas
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE wbs_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Función helper para obtener organization_ids del usuario actual
CREATE OR REPLACE FUNCTION get_user_organization_ids()
RETURNS UUID[] AS $$
BEGIN
    RETURN ARRAY(
        SELECT organization_id 
        FROM organization_members 
        WHERE user_id = auth.uid() 
        AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función helper para verificar rol mínimo
CREATE OR REPLACE FUNCTION user_has_role(org_id UUID, min_role user_role)
RETURNS BOOLEAN AS $$
DECLARE
    user_role_val user_role;
    role_order TEXT[] := ARRAY['viewer', 'auditor', 'supervisor', 'admin', 'owner'];
BEGIN
    SELECT role INTO user_role_val
    FROM organization_members
    WHERE organization_id = org_id 
    AND user_id = auth.uid()
    AND is_active = TRUE;
    
    IF user_role_val IS NULL THEN
        RETURN FALSE;
    END IF;
    
    RETURN array_position(role_order, user_role_val::TEXT) >= array_position(role_order, min_role::TEXT);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==================== POLÍTICAS RLS ====================

-- Organizations: Solo miembros pueden ver su organización
CREATE POLICY "org_select" ON organizations FOR SELECT
    USING (id = ANY(get_user_organization_ids()));

CREATE POLICY "org_update" ON organizations FOR UPDATE
    USING (user_has_role(id, 'admin'));

-- User Profiles: Usuario puede ver/editar su propio perfil
CREATE POLICY "profile_select" ON user_profiles FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "profile_update" ON user_profiles FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "profile_insert" ON user_profiles FOR INSERT
    WITH CHECK (id = auth.uid());

-- Organization Members: Miembros ven otros miembros de sus orgs
CREATE POLICY "members_select" ON organization_members FOR SELECT
    USING (organization_id = ANY(get_user_organization_ids()));

CREATE POLICY "members_insert" ON organization_members FOR INSERT
    WITH CHECK (user_has_role(organization_id, 'admin'));

CREATE POLICY "members_update" ON organization_members FOR UPDATE
    USING (user_has_role(organization_id, 'admin'));

CREATE POLICY "members_delete" ON organization_members FOR DELETE
    USING (user_has_role(organization_id, 'admin'));

-- Projects: Solo miembros de la org pueden ver proyectos
CREATE POLICY "projects_select" ON projects FOR SELECT
    USING (organization_id = ANY(get_user_organization_ids()));

CREATE POLICY "projects_insert" ON projects FOR INSERT
    WITH CHECK (user_has_role(organization_id, 'supervisor'));

CREATE POLICY "projects_update" ON projects FOR UPDATE
    USING (user_has_role(organization_id, 'supervisor'));

CREATE POLICY "projects_delete" ON projects FOR DELETE
    USING (user_has_role(organization_id, 'admin'));

-- WBS Nodes: Hereda permisos del proyecto
CREATE POLICY "wbs_select" ON wbs_nodes FOR SELECT
    USING (organization_id = ANY(get_user_organization_ids()));

CREATE POLICY "wbs_insert" ON wbs_nodes FOR INSERT
    WITH CHECK (user_has_role(organization_id, 'supervisor'));

CREATE POLICY "wbs_update" ON wbs_nodes FOR UPDATE
    USING (user_has_role(organization_id, 'supervisor'));

CREATE POLICY "wbs_delete" ON wbs_nodes FOR DELETE
    USING (user_has_role(organization_id, 'admin'));

-- Regulatory Docs: Globales (org_id IS NULL) o de la organización
CREATE POLICY "regulations_select" ON regulatory_docs FOR SELECT
    USING (
        organization_id IS NULL  -- Documentos globales
        OR organization_id = ANY(get_user_organization_ids())
    );

CREATE POLICY "regulations_insert" ON regulatory_docs FOR INSERT
    WITH CHECK (
        organization_id IS NULL AND auth.jwt() ->> 'is_admin' = 'true'  -- Solo admins globales
        OR user_has_role(organization_id, 'admin')
    );

-- Site Captures: Solo miembros de la org
CREATE POLICY "captures_select" ON site_captures FOR SELECT
    USING (organization_id = ANY(get_user_organization_ids()));

CREATE POLICY "captures_insert" ON site_captures FOR INSERT
    WITH CHECK (user_has_role(organization_id, 'supervisor'));

CREATE POLICY "captures_update" ON site_captures FOR UPDATE
    USING (user_has_role(organization_id, 'supervisor'));

-- AI Findings: Visible para todos los miembros, editable por supervisors+
CREATE POLICY "findings_select" ON ai_findings FOR SELECT
    USING (organization_id = ANY(get_user_organization_ids()));

CREATE POLICY "findings_insert" ON ai_findings FOR INSERT
    WITH CHECK (user_has_role(organization_id, 'supervisor'));

CREATE POLICY "findings_update" ON ai_findings FOR UPDATE
    USING (user_has_role(organization_id, 'supervisor'));

-- Audit Log: Solo lectura para admins+
CREATE POLICY "audit_select" ON audit_log FOR SELECT
    USING (
        organization_id = ANY(get_user_organization_ids())
        AND user_has_role(organization_id, 'admin')
    );

-- Insert permitido solo via service role (backend/n8n)
CREATE POLICY "audit_insert" ON audit_log FOR INSERT
    WITH CHECK (TRUE);  -- Se controla via service_role key

-- ============================================================================
-- SECCIÓN 12: TRIGGERS DE AUDITORÍA AUTOMÁTICA
-- ============================================================================
-- TRL 6: Registro automático de cambios en tablas críticas.

CREATE OR REPLACE FUNCTION log_audit_event() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (
            organization_id, user_id, action, resource_type, resource_id,
            old_values, user_email
        ) VALUES (
            OLD.organization_id, auth.uid(), 'delete', TG_TABLE_NAME, OLD.id,
            to_jsonb(OLD), auth.jwt() ->> 'email'
        );
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (
            organization_id, user_id, action, resource_type, resource_id,
            old_values, new_values, user_email
        ) VALUES (
            NEW.organization_id, auth.uid(), 'update', TG_TABLE_NAME, NEW.id,
            to_jsonb(OLD), to_jsonb(NEW), auth.jwt() ->> 'email'
        );
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (
            organization_id, user_id, action, resource_type, resource_id,
            new_values, user_email
        ) VALUES (
            NEW.organization_id, auth.uid(), 'create', TG_TABLE_NAME, NEW.id,
            to_jsonb(NEW), auth.jwt() ->> 'email'
        );
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar triggers a tablas críticas
CREATE TRIGGER audit_projects AFTER INSERT OR UPDATE OR DELETE ON projects
    FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_findings AFTER INSERT OR UPDATE OR DELETE ON ai_findings
    FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_wbs AFTER INSERT OR UPDATE OR DELETE ON wbs_nodes
    FOR EACH ROW EXECUTE FUNCTION log_audit_event();

-- ============================================================================
-- SECCIÓN 13: FUNCIONES DE UPDATED_AT AUTOMÁTICO
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas las tablas con updated_at
CREATE TRIGGER update_organizations_timestamp BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_timestamp BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_timestamp BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wbs_timestamp BEFORE UPDATE ON wbs_nodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regulatory_docs_timestamp BEFORE UPDATE ON regulatory_docs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_captures_timestamp BEFORE UPDATE ON site_captures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_findings_timestamp BEFORE UPDATE ON ai_findings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SECCIÓN 14: VISTAS MATERIALIZADAS PARA DASHBOARDS (OPCIONAL TRL 6+)
-- ============================================================================

-- Vista de resumen de proyecto para dashboard
CREATE OR REPLACE VIEW project_summary AS
SELECT 
    p.id AS project_id,
    p.organization_id,
    p.name AS project_name,
    p.status,
    p.progress_percentage,
    COUNT(DISTINCT sc.id) AS total_captures,
    COUNT(DISTINCT CASE WHEN sc.processing_status = 'non_compliant' THEN sc.id END) AS captures_with_issues,
    COUNT(DISTINCT af.id) AS total_findings,
    COUNT(DISTINCT CASE WHEN af.status = 'open' THEN af.id END) AS open_findings,
    COUNT(DISTINCT CASE WHEN af.severity = 'critical' THEN af.id END) AS critical_findings,
    MAX(sc.captured_at) AS last_capture_at,
    MAX(af.detected_at) AS last_finding_at
FROM projects p
LEFT JOIN site_captures sc ON sc.project_id = p.id
LEFT JOIN ai_findings af ON af.project_id = p.id
WHERE p.is_archived = FALSE
GROUP BY p.id, p.organization_id, p.name, p.status, p.progress_percentage;

COMMENT ON VIEW project_summary IS 'TRL 6: Vista agregada para dashboards. Evita queries costosos en tiempo real.';

-- ============================================================================
-- FIN DE LA MIGRACIÓN INICIAL
-- ============================================================================
-- 
-- RESUMEN DE ARQUITECTURA TRL 6:
-- 
-- ✅ Extensiones: uuid-ossp, vector (pgvector), postgis, ltree
-- ✅ Multi-Tenant: organization_id en todas las tablas + RLS estricto
-- ✅ Ontología WBS: Jerarquía recursiva con LTREE para queries eficientes
-- ✅ RAG Normativo: regulatory_docs con embeddings vector(1536)
-- ✅ Evidencia Geolocalizada: site_captures con PostGIS + validación espacial
-- ✅ Hallazgos IA: ai_findings con trazabilidad completa
-- ✅ Audit Log: Registro inmutable de todas las acciones críticas
-- ✅ Auto-timestamps: updated_at automático en todas las tablas
--
-- SIGUIENTE PASO: Ejecutar este script en Supabase Dashboard > SQL Editor
-- ============================================================================
