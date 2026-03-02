# PLAN OPERATIVO Y PRESUPUESTO
## Proyecto: Supervisor IA 4.0
### Concurso E041-2026-02 - Investigación Aplicada (Modalidad Avanzados)

**Monto Total Solicitado:** S/ 300,000.00  
**Duración:** 24 meses  
**TRL Inicial:** 3 → **TRL Final:** 6  
**Fecha de Elaboración:** 28 de Enero de 2026

---

## 📅 CRONOGRAMA DE ACTIVIDADES (24 MESES / 8 TRIMESTRES)

### Tabla Resumen por Trimestre

| Trimestre | Período | Hito Principal | Entregables |
|-----------|---------|----------------|-------------|
| **T1** | Mes 1-3 | Adquisición y Contratación | Equipos adquiridos, Tesista contratado |
| **T2** | Mes 4-6 | Infraestructura Cloud | Ambiente de desarrollo configurado |
| **T3** | Mes 7-9 | Integración 3D | API Hunyuan3D integrada |
| **T4** | Mes 10-12 | Modelo YOLO SSOMA | Modelo entrenado para EPP |
| **T5** | Mes 13-15 | RAG Legal | Cerebro Legal con pgvector |
| **T6** | Mes 16-18 | Artículo 1 | Manuscrito enviado a revista |
| **T7** | Mes 19-21 | Validación TRL 5 | Pruebas en obra piloto |
| **T8** | Mes 22-24 | Cierre y TRL 6 | Tesis sustentada, Artículo 2, Patente |

---

### Cronograma Detallado Mes a Mes

| Mes | Actividad Principal | Responsable | Productos/Entregables |
|-----|---------------------|-------------|----------------------|
| **1** | Kick-off del proyecto. Publicación de convocatoria para tesista. Especificaciones técnicas de equipos. | RT + GP | Acta de inicio, TdR tesista |
| **2** | Proceso de adquisición de Drone DJI + Servidor GPU. Selección de tesista. | GP + GT | Órdenes de compra emitidas |
| **3** | Recepción de equipos. Contratación de tesista. Configuración inicial de ambiente. | RT + GP | Actas de recepción, Contrato tesista |
| **4** | Setup de Supabase con pgvector. Configuración de servidores n8n. | RT + Tesista | Ambiente de desarrollo operativo |
| **5** | Captura de imágenes piloto con drone (obra de prueba). Generación de dataset inicial. | RT + Tesista | 500+ imágenes de construcción |
| **6** | Integración con API de Hunyuan3D. Primeras pruebas de reconstrucción. | RT + Co-I | Prototipo de pipeline 3D |
| **7** | Afinamiento de parámetros de reconstrucción 3D. Documentación técnica. | RT + Tesista | Informe técnico T2 |
| **8** | Inicio de etiquetado de dataset para YOLO (EPP, riesgos). Consultoría ML. | RT + Co-I + Consultor | Dataset etiquetado (1000 imágenes) |
| **9** | Entrenamiento inicial de modelo YOLOv8 para detección de EPP. | RT + Tesista | Modelo v0.1 con mAP > 0.6 |
| **10** | Iteración y mejora del modelo YOLO. Aumentación de datos. | RT + Tesista | Modelo v0.5 con mAP > 0.75 |
| **11** | Integración de YOLO en frontend de Supervisor IA. Pruebas de usabilidad. | RT + Tesista | Auditoría Visual operativa |
| **12** | Cierre de Año 1. Informe técnico anual. Preparación de manuscrito 1. | RT + Co-I | Informe anual, Draft artículo |
| **13** | Implementación de embeddings vectoriales para NTPs. Carga de corpus normativo. | RT + Tesista | Base vectorial con 50+ normas |
| **14** | Desarrollo de pipeline RAG con LangChain/pgvector. Pruebas de precisión. | RT + Tesista | Cerebro Legal v1.0 |
| **15** | Viaje a Trujillo: Selección de obra piloto para validación TRL 5. | RT + GP | Convenio con empresa constructora |
| **16** | Primera validación en campo. Captura de imágenes reales. Feedback de usuarios. | RT + Tesista | Reporte de validación inicial |
| **17** | Ajustes basados en feedback de campo. Mejora de interfaz. | RT + Tesista | Versión mejorada del sistema |
| **18** | **HITO: Envío de Artículo 1** a Automation in Construction. | RT + Co-I | Constancia de envío |
| **19** | Desarrollo de módulo de generación automática de reportes con IA. | RT + Tesista | Deep Analytics v1.0 |
| **20** | Integración completa de los 6 motores. Pruebas de estrés. | RT + Tesista | Sistema integrado TRL 5 |
| **21** | Segunda campaña de validación en Trujillo (2 obras adicionales). | RT + Tesista + GP | Datos de validación multi-obra |
| **22** | Análisis estadístico de resultados. Redacción de tesis y Artículo 2. | RT + Tesista | Borrador de tesis al 80% |
| **23** | **HITO: Sustentación de Tesis**. Envío de BIT a CATI. | Tesista + RT | Acta de sustentación |
| **24** | **HITO: Cierre del Proyecto**. Validación TRL 6. Envío de Artículo 2. Informe final. | RT + GP | Informe final, todos los entregables |

---

### Diagrama de Gantt Simplificado

```
Actividad                          | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 |
-----------------------------------|----|----|----|----|----|----|----|----|
Adquisición de Equipos             | ██ |    |    |    |    |    |    |    |
Contratación de Tesista            | ██ |    |    |    |    |    |    |    |
Configuración Infraestructura      |    | ██ |    |    |    |    |    |    |
Integración API 3D (Hunyuan)       |    | ██ | ██ |    |    |    |    |    |
Entrenamiento YOLO v8              |    |    | ██ | ██ |    |    |    |    |
Desarrollo Cerebro Legal (RAG)     |    |    |    |    | ██ | ██ |    |    |
Validación en Campo TRL 5          |    |    |    |    |    | ██ | ██ |    |
Redacción Artículo 1               |    |    |    | ██ | ██ | ██ |    |    |
Redacción Artículo 2               |    |    |    |    |    |    | ██ | ██ |
Desarrollo de Tesis                |    | ██ | ██ | ██ | ██ | ██ | ██ | ██ |
Validación Final TRL 6             |    |    |    |    |    |    |    | ██ |
Gestión de PI (BIT + Patente)      |    |    |    |    |    |    | ██ | ██ |
```

---

## 💰 PRESUPUESTO DETALLADO

### Estructura Financiera (Regla 80/20 - Tabla N° 12)

| Fuente | Monto (S/) | Porcentaje |
|--------|------------|------------|
| **Financiamiento PROCIENCIA** | 300,000.00 | 80% |
| **Contrapartida No Monetaria (ES)** | 75,000.00 | 20% |
| **TOTAL PROYECTO** | **375,000.00** | **100%** |

---

### Resumen por Rubros - PROCIENCIA (S/ 300,000.00)

| Rubro | Monto (S/) | Porcentaje | Límite Bases |
|-------|------------|------------|--------------|
| **Recursos Humanos** | 165,000.00 | 55.00% | ≤ 60% ✅ |
| **Equipos** | 72,000.00 | 24.00% | ≤ 40% ✅ |
| **Servicios de Terceros** | 36,000.00 | 12.00% | ≤ 25% ✅ |
| **Pasajes y Viáticos** | 18,000.00 | 6.00% | ≤ 15% ✅ |
| **Gastos Logísticos de Operación** | 9,000.00 | 3.00% | ≤ 10% ✅ |
| **TOTAL PROCIENCIA** | **300,000.00** | **100.00%** | ✅ |

---

### 1. RECURSOS HUMANOS (S/ 165,000.00 - 55%)

| Cargo | Dedicación | Meses | Monto Mensual (S/) | Subtotal (S/) |
|-------|------------|-------|-------------------|---------------|
| **Responsable Técnico (RT)** | 20 hrs/sem | 24 | 3,500.00 | 84,000.00 |
| **Co-Investigador (Co-I)** | 15 hrs/sem | 24 | 2,000.00 | 48,000.00 |
| **Tesista de Pregrado** | 30 hrs/sem | 22 | 1,500.00 | 33,000.00 |
| **SUBTOTAL RRHH** | | | | **165,000.00** |

**Notas:**
- El RT debe estar calificado en RENACYT (Nivel IV-VII)
- El Tesista será contratado a partir del Mes 3
- El estipendio del Gestor de Proyecto está en "Gastos Logísticos" según Tabla N° 11

---

### 2. EQUIPOS (S/ 72,000.00 - 24%)

| Equipo | Cantidad | Costo Unitario (S/) | Subtotal (S/) | Justificación |
|--------|----------|---------------------|---------------|---------------|
| **Drone DJI Mavic 3 Pro** | 1 | 12,000.00 | 12,000.00 | Captura de imágenes aéreas para reconstrucción 3D |
| **Servidor GPU (RTX 4090)** | 1 | 25,000.00 | 25,000.00 | Entrenamiento de modelos YOLO y procesamiento 3D |
| **Workstation de Desarrollo** | 2 | 8,000.00 | 16,000.00 | Para RT y Tesista |
| **Tablet Industrial** | 2 | 3,500.00 | 7,000.00 | Validación en campo (resistente a polvo/agua) |
| **Disco SSD Externo 4TB** | 4 | 1,500.00 | 6,000.00 | Almacenamiento de datasets de imágenes |
| **Cámara Térmica FLIR** | 1 | 6,000.00 | 6,000.00 | Detección de anomalías estructurales |
| **SUBTOTAL EQUIPOS** | | | **72,000.00** | |

**Notas:**
- Todos los equipos serán inventariados a nombre de la entidad ejecutora
- Se aplicará depreciación según normativa vigente

---

### 3. SERVICIOS DE TERCEROS (S/ 36,000.00 - 12%)

| Servicio | Descripción | Meses/Unidades | Costo (S/) | Subtotal (S/) |
|----------|-------------|----------------|------------|---------------|
| **API Hunyuan3D (Tencent)** | Créditos de procesamiento 3D | 18 meses | 500.00/mes | 9,000.00 |
| **API OpenAI/Anthropic** | Embeddings y LLM para RAG | 18 meses | 300.00/mes | 5,400.00 |
| **n8n Cloud Pro** | Orquestación de flujos IA | 24 meses | 150.00/mes | 3,600.00 |
| **Supabase Pro** | Base de datos + pgvector | 24 meses | 100.00/mes | 2,400.00 |
| **Consultoría ML Especializada** | Optimización de modelos YOLO | 1 | 6,000.00 | 6,000.00 |
| **Servicio CATI (BIT)** | Búsqueda de Info. Tecnológica | 1 | 3,000.00 | 3,000.00 |
| **Revisión de Estilo Científico** | Artículos en inglés (proofreading) | 2 | 1,500.00 | 3,000.00 |
| **Publicación Open Access** | APC de revista Q1 | 1 | 3,600.00 | 3,600.00 |
| **SUBTOTAL SERVICIOS** | | | | **36,000.00** |

---

### 4. PASAJES Y VIÁTICOS (S/ 18,000.00 - 6%)

| Concepto | Destino | Personas | Días | Viajes | Costo Unit. (S/) | Subtotal (S/) |
|----------|---------|----------|------|--------|------------------|---------------|
| **Pasajes Lima-Trujillo** | Trujillo | 2 | - | 5 | 400.00 | 4,000.00 |
| **Viáticos en Trujillo** | Trujillo | 2 | 4 | 5 | 350.00/día | 14,000.00 |
| **SUBTOTAL PASAJES** | | | | | | **18,000.00** |

**Detalle de Viajes:**
1. **Viaje 1 (Mes 5):** Reconocimiento de obra piloto
2. **Viaje 2 (Mes 15):** Firma de convenio con constructora
3. **Viaje 3 (Mes 16):** Primera validación en campo
4. **Viaje 4 (Mes 21):** Segunda campaña de validación
5. **Viaje 5 (Mes 24):** Validación final TRL 6

---

### 5. GASTOS LOGÍSTICOS DE OPERACIÓN (S/ 9,000.00 - 3%)

| Concepto | Meses | Costo Mensual (S/) | Subtotal (S/) |
|----------|-------|-------------------|---------------|
| **Estipendio Gestor de Proyecto (GP)** | 24 | 300.00 | 7,200.00 |
| **Útiles de oficina e impresiones** | 24 | 50.00 | 1,200.00 |
| **Otros gastos logísticos** | - | - | 600.00 |
| **SUBTOTAL GASTOS LOGÍSTICOS** | | | **9,000.00** |

---

## 🏢 CONTRAPARTIDA NO MONETARIA DE LA ENTIDAD (20%)

Según la **Tabla N° 12 de las Bases**, las entidades públicas o privadas sin fines de lucro deben aportar una **contrapartida no monetaria mínima del 20%** del presupuesto total del proyecto.

### Cálculo de Contrapartida (Regla 80/20)

- PROCIENCIA financia: **80%** = S/ 300,000
- Contrapartida ES: **20%** = S/ 75,000
- **Total Proyecto: S/ 375,000**

### Detalle de Contrapartida No Monetaria

| Concepto | Valorización Mensual (S/) | Meses | Total (S/) |
|----------|---------------------------|-------|------------|
| **Uso de Oficinas/Laboratorio** | 1,000.00 | 24 | 24,000.00 |
| **Servicios Básicos (Luz, Internet, Agua)** | 400.00 | 24 | 9,600.00 |
| **Tiempo de Personal Administrativo** | 600.00 | 24 | 14,400.00 |
| **Uso de Equipos Existentes** | 500.00 | 24 | 12,000.00 |
| **Uso de Software Licenciado** | 300.00 | 24 | 7,200.00 |
| **Tiempo parcial Gestor Tecnológico** | 325.00 | 24 | 7,800.00 |
| **TOTAL CONTRAPARTIDA** | | | **75,000.00** |

**Contrapartida Requerida (20%):** S/ 375,000 × 20% = **S/ 75,000.00** ✅

---

## 📊 RESUMEN FINANCIERO

```
┌─────────────────────────────────────────────────────────────┐
│                    ESTRUCTURA FINANCIERA                     │
├─────────────────────────────────────────────────────────────┤
│  FINANCIAMIENTO PROCIENCIA (80%)                            │
│  ├── Recursos Humanos .............. S/ 165,000.00 (55%)   │
│  ├── Equipos ....................... S/  72,000.00 (24%)   │
│  ├── Servicios de Terceros ......... S/  36,000.00 (12%)   │
│  ├── Pasajes y Viáticos ............ S/  18,000.00  (6%)   │
│  └── Gastos Logísticos ............. S/   9,000.00  (3%)   │
│  ════════════════════════════════════════════════════════   │
│  SUBTOTAL PROCIENCIA ............... S/ 300,000.00 (80%)   │
├─────────────────────────────────────────────────────────────┤
│  CONTRAPARTIDA ENTIDAD (No monetaria - 20%)                 │
│  └── Aporte valorizado ............. S/  75,000.00 (20%)   │
├─────────────────────────────────────────────────────────────┤
│  INVERSIÓN TOTAL DEL PROYECTO ...... S/ 375,000.00 (100%)  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ VERIFICACIÓN DE CUMPLIMIENTO DE BASES

| Requisito | Límite | Presupuesto | Estado |
|-----------|--------|-------------|--------|
| Recursos Humanos | ≤ 60% | 55% | ✅ Cumple |
| Equipos | ≤ 40% | 24% | ✅ Cumple |
| Servicios de Terceros | ≤ 25% | 12% | ✅ Cumple |
| Pasajes y Viáticos | ≤ 15% | 6% | ✅ Cumple |
| Gastos Logísticos | ≤ 10% | 3% | ✅ Cumple |
| Contrapartida No Monetaria | ≥ 20% | 20% | ✅ Cumple |
| Monto PROCIENCIA | ≤ S/ 300,000 | S/ 300,000 | ✅ Cumple |
| Presupuesto Total | = 100% | S/ 375,000 | ✅ Cumple |
| Duración | ≤ 24 meses | 24 meses | ✅ Cumple |
| Artículos científicos | ≥ 2 (Q1/Q2/Q3) | 2 artículos | ✅ Cumple |
| Tesis | ≥ 1 tesis | 1 tesis | ✅ Cumple |
| BIT | ≥ 1 | 1 (CATI) | ✅ Cumple |
| Vinculatech | ≥ 1 participación | 1 | ✅ Cumple |

---

## 📎 ANEXOS REQUERIDOS

1. **Anexo A:** CV documentado del Responsable Técnico (RENACYT)
2. **Anexo B:** CV documentado del Co-Investigador
3. **Anexo C:** Carta de compromiso de la entidad ejecutora
4. **Anexo D:** Cotizaciones de equipos (3 por ítem)
5. **Anexo E:** Carta de intención de empresa constructora (validación)
6. **Anexo F:** Declaración jurada de no duplicidad de financiamiento

---

*Documento elaborado siguiendo las Bases del Concurso E041-2026-02 de ProCiencia - SINACTI*  
*Versión: 1.0 | Fecha: 28 de Enero de 2026*
