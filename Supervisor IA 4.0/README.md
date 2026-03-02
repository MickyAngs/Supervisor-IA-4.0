# Supervisor IA 4.0

Supervisor-IA 4.0 es una plataforma SaaS B2B (TRL 6) diseñada para el sector construcción. Este proyecto constituye el motor frontend e infraestructura inicial.

## Arquitectura

La plataforma está construida utilizando una arquitectura moderna de React con las siguientes tecnologías clave:
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend / Database:** Supabase (PostgreSQL) con soporte Multi-Tenant, Row Level Security (RLS) y soporte de vectores (`pgvector`).
- **Webhooks & Automatización:** n8n (Pendiente de implementación)

## Inicialización de Base de Datos (Supabase)

Para inicializar la estructura de la base de datos necesaria para la aplicación, debes ejecutar el esquema en tu proyecto de Supabase.

### Instrucciones:
1. Inicia sesión en tu cuenta de [Supabase](https://supabase.com/).
2. Accede a tu proyecto o crea uno nuevo.
3. Dirígete a la sección de **SQL Editor** en el panel lateral.
4. Crea un nuevo query (New query).
5. Copia todo el contenido del archivo `supabase_schema.sql` que se encuentra en la raíz de este repositorio y pégalo en el editor editor de consultas.
6. Haz clic en el botón **Run** (o usa el atajo).

El script SQL se encargará de:
- Habilitar las extensiones necesarias (`uuid-ossp` y `vector`).
- Crear las tablas clave para el modelo multitenant: `tenants`, `users`, `projects`, `ar_anchors`, `spatial_scans`, `legal_knowledge_vectors`, `audit_reports`.
- Habilitar Row Level Security (RLS) y crear un esquema riguroso para la separación de datos por "tenant".
- Exponer la lógica inicial de aislamiento y seguridad.

## Configuración del Entorno Local

1. Renombra (o copia) el archivo `.env.local` a partir de tus variables del proyecto de Supabase.
2. Instala las dependencias y ejecuta el proyecto:
```bash
npm install
npm run dev
```
