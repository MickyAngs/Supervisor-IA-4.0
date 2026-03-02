# Supervisor IA 4.0 - Documentación Técnica y Propuesta ProCiencia

**Fecha de generación:** 28 de Enero de 2026  
**Versión:** 1.0.0 (TRL 3 → TRL 5/6)  
**Concurso:** Investigación Aplicada E041-2026-02 - ProCiencia (SINACTI)

---

## 📋 RESUMEN EJECUTIVO

**Supervisor IA 4.0** es un sistema de inteligencia artificial para la supervisión automatizada de obras de construcción, que integra reconstrucción 3D, auditoría geométrica, visión computacional SSOMA y un cerebro legal técnico basado en Normas Técnicas Peruanas (NTP). El proyecto busca reducir las desviaciones constructivas no detectadas y mejorar la seguridad laboral en el sector construcción mediante tecnologías de la Industria 4.0.

---

## 🎯 ALINEACIÓN ESTRATÉGICA (SINACTI)

| Criterio | Valor |
|----------|-------|
| **Área Estratégica** | TICs - Tecnologías de la Información y Comunicación |
| **Línea de Investigación** | Inteligencia Artificial aplicada a Ingeniería Civil |
| **TRL de Inicio** | TRL 3 - Prueba de concepto experimental |
| **TRL Mínimo Garantizado** | TRL 4 - Validación en laboratorio (cumplimiento Bases, Sección 1.3) |
| **TRL Meta Aspiracional** | TRL 5/6 - Validación en entorno relevante (Obras en Trujillo) |
| **Duración del Proyecto** | 24 meses |
| **Financiamiento PROCIENCIA** | S/ 300,000 (80% del presupuesto total) |
| **Contrapartida No Monetaria** | S/ 75,000 (20% del presupuesto total) |
| **Presupuesto Total del Proyecto** | S/ 375,000 (100%) |

---

### Justificación del TRL (Según Sección 1.3 de las Bases E041-2026-02)

#### Marco Normativo

Según la **Tabla N° 1 - Modalidad Avanzados** de las Bases:

> *"Los proyectos pueden iniciar en TRL 2 o 3 y alcanzar, **como mínimo, TRL 3 o 4** respectivamente."*

Por lo tanto, al iniciar en **TRL 3**, el proyecto **GARANTIZA** alcanzar como mínimo **TRL 4** al finalizar la ejecución.

#### Escala de Madurez Tecnológica (TRL)

| Nivel | Descripción | Estado del Proyecto |
|-------|-------------|---------------------|
| TRL 1 | Principios básicos observados | ✅ Superado |
| TRL 2 | Concepto tecnológico formulado | ✅ Superado |
| **TRL 3** | Prueba de concepto experimental | ✅ **ACTUAL** - Prototipo funcional |
| **TRL 4** | Validación en laboratorio | 🎯 **MÍNIMO GARANTIZADO** |
| TRL 5 | Validación en entorno relevante | 🎯 Meta aspiracional |
| TRL 6 | Demostración en entorno relevante | 🎯 Meta aspiracional |
| TRL 7-9 | Demostración y operación comercial | Fuera de alcance |

---

#### Evidencia de TRL 3 (Actual)

El proyecto cuenta con un **prototipo funcional completo** que demuestra el TRL 3:

| Componente | Estado | Evidencia |
|------------|--------|-----------|
| Sistema de autenticación (Supabase Auth) | ✅ Operativo | Login funcional con email y Google OAuth |
| Dashboard de gestión de obras | ✅ Operativo | KPIs en tiempo real, lista de proyectos |
| Visor BIM 3D (Three.js) | ✅ Operativo | Modelo 3D interactivo con controles |
| Auditoría Visual con IA (simulada) | ✅ Operativo | UI con detección simulada de riesgos |
| Cerebro Legal Técnico (simulado) | ✅ Operativo | Chat RAG con 6 NTPs de referencia |
| Generación de Reportes PDF (jsPDF) | ✅ Operativo | Descarga real de PDFs |
| Orquestador n8n (widget) | 🟡 Parcial | Widget de estado listo |

---

#### Plan de Avance TRL 3 → TRL 4 (Garantizado)

| Actividad | TRL Inicial | TRL Final | Trimestre |
|-----------|-------------|-----------|-----------|
| Integración de API Hunyuan3D real | 3 | 4 | Q2-Q3 |
| Entrenamiento modelo YOLO en dataset real | 3 | 4 | Q3-Q4 |
| Conexión a pgvector con embeddings reales | 3 | 4 | Q5 |
| Pruebas de integración en laboratorio | 3 | **4** | Q4-Q5 |

**Hito de TRL 4:** Al finalizar el **Mes 12 (Q4)**, el sistema tendrá todos los motores IA conectados a APIs/modelos reales y validados en **condiciones controladas de laboratorio**.

---

#### Plan de Avance TRL 4 → TRL 5/6 (Aspiracional)

| Actividad | TRL Inicial | TRL Final | Trimestre |
|-----------|-------------|-----------|-----------|
| Primera validación en obra piloto (Trujillo) | 4 | 5 | Q6 |
| Ajustes basados en feedback de campo | 5 | 5 | Q6-Q7 |
| Segunda validación multi-obra | 5 | 5/6 | Q7 |
| Validación final en entorno operativo real | 5 | **6** | Q8 |

**Hito de TRL 5/6:** Al finalizar el **Mes 24 (Q8)**, el sistema habrá sido validado en **múltiples obras de construcción reales** en Trujillo, demostrando su funcionamiento en entorno operativo.

---

### Declaración de Cumplimiento TRL

> **El equipo de investigación se compromete a alcanzar, como mínimo, el nivel TRL 4** al finalizar la ejecución del proyecto, cumpliendo con lo establecido en la **Sección 1.3** de las Bases del Concurso E041-2026-02.
>
> La meta aspiracional de TRL 5/6 está sujeta a la exitosa validación en obras de construcción reales y a la obtención de convenios con empresas constructoras en la región La Libertad.

---

## 📊 ANÁLISIS DE NOVEDAD CIENTÍFICA

El presente proyecto de investigación aplicada cumple con los cinco criterios establecidos por el Manual de Frascati (OCDE) para actividades de I+D+i:

1. **NOVEDOSO:** No existe en el mercado peruano un sistema integrado que combine reconstrucción 3D con IA, auditoría geométrica automatizada, visión computacional SSOMA y un cerebro legal técnico con RAG sobre normativa peruana (NTP E.060, E.070, G.050).

2. **CREATIVO:** El enfoque metodológico propone una arquitectura de orquestación de múltiples modelos de IA especializados (Hunyuan 3D, modelos de detección de objetos, embeddings vectoriales) coordinados mediante flujos n8n, lo cual representa una contribución original al estado del arte.

3. **INCIERTO:** Existen riesgos técnicos no triviales relacionados con la precisión de la reconstrucción 3D en condiciones de obra (polvo, iluminación variable, oclusiones), así como la adaptación de modelos pre-entrenados al contexto constructivo peruano.

4. **SISTEMÁTICO:** El desarrollo sigue una metodología estructurada basada en Design Science Research, con ciclos iterativos de diseño, implementación y evaluación en campo.

5. **TRANSFERIBLE:** Los resultados son reproducibles y transferibles, incluyendo código fuente abierto, documentación técnica, publicaciones científicas y formación de capital humano.

---

## 🎓 COMPROMISOS ProCiencia (E041-2026-02)

### Resultados Comprometidos (Tabla N° 3 - Modalidad Avanzados)

| # | Tipo de Resultado | Cantidad | Descripción | Indicador de Verificación | Mes |
|---|-------------------|----------|-------------|---------------------------|-----|
| a | **Publicaciones Científicas** | 2 | Artículos originales en revistas Scopus/WoS. Al menos 1 en Q1/Q2, el otro en Q1/Q2/Q3. | DOI y constancia de aceptación | 18, 24 |
| b | **Formación de RRHH** | 1 | Tesis de pregrado o postgrado sustentada y aprobada en universidad peruana licenciada por SUNEDU. | Acta de sustentación con resultado aprobatorio | 23 |
| c | **Ponencia Internacional** | 1 | Ponencia o presentación de póster en congreso de alcance internacional. | Certificado de participación y constancia de presentación | 20 |
| d | **Conferencia de Difusión** | 1 | Conferencia de difusión de resultados para el público en general. | Registro fotográfico, lista de asistentes, material de difusión | 22 |
| e | **Plan de Gestión** | 1 | Plan de gestión y documentación de resultados (Anexo 11, B3). | Documento aprobado por PROCIENCIA | 24 |
| f | **Informe de Validación** | 1 | Informe de validación experimental (Anexo 11, B1). | Documento técnico con evidencia de pruebas TRL 5/6 | 24 |
| g | **BIT** | 1 | Búsqueda de Información Tecnológica elaborada por CATI o equivalente. | Informe BIT (Anexo 13) | 23 |
| h | **Vinculatech** | 1 | Participación en al menos 1 taller de Vinculación Academia-Industria-Gobierno (CONCYTEC-PROCIENCIA). | Constancia de participación emitida por PROCIENCIA | Durante ejecución |
| i | **Prototipo TRL 5/6** | 1 | Sistema Supervisor IA 4.0 validado en entorno relevante (obras de construcción). | Informe técnico de validación con métricas de desempeño | 24 |

---

### Detalle de Resultados

#### 📄 Publicaciones Científicas (2 artículos)

| Artículo | Título Tentativo | Revista Target | Cuartil | Mes de Envío |
|----------|-----------------|----------------|---------|--------------|
| **Artículo 1** | *"Automated 3D Reconstruction and Geometric Deviation Detection for Construction Site Supervision using Deep Learning"* | Automation in Construction (Elsevier) | Q1 | Mes 18 |
| **Artículo 2** | *"A RAG-based Legal Technical Assistant for Peruvian Construction Standards Compliance"* | Journal of Computing in Civil Engineering (ASCE) | Q1 | Mes 24 |

**Nota:** Los artículos deben ser **originales** (no conference papers, proceedings, ni review articles) y estar basados en datos obtenidos con financiamiento de PROCIENCIA.

---

#### 🎓 Tesis de Pregrado

| Campo | Valor |
|-------|-------|
| **Título tentativo** | "Desarrollo de un sistema de visión computacional para detección de riesgos SSOMA en obras de construcción aplicando redes neuronales convolucionales" |
| **Programa** | Ingeniería de Sistemas o Ingeniería Civil |
| **Universidad** | [A DEFINIR - Debe estar licenciada por SUNEDU] |
| **Tesista** | Ver sección "Equipo de Investigación" |
| **Sustentación programada** | Mes 23 |

---

#### 🎤 Ponencia en Congreso Internacional

| Campo | Valor |
|-------|-------|
| **Tipo** | Ponencia oral o Presentación de póster |
| **Alcance** | Internacional (no se aceptan simposios) |
| **Congresos Target** | - International Conference on Computing in Civil and Building Engineering (ICCCBE) - International Symposium on Automation and Robotics in Construction (ISARC) - IEEE International Conference on Industrial Engineering |
| **Título tentativo** | *"AI-powered Construction Site Supervision: A Multi-engine Approach for Quality and Safety Monitoring"* |
| **Mes programado** | Mes 20 |

---

#### 📢 Conferencia de Difusión para Público General

| Campo | Valor |
|-------|-------|
| **Objetivo** | Comunicar los resultados del proyecto a la sociedad |
| **Audiencia** | Público general, empresarios, estudiantes, autoridades locales |
| **Formato** | Conferencia presencial o híbrida |
| **Lugar tentativo** | Universidad ejecutora o Colegio de Ingenieros de La Libertad |
| **Duración** | 1-2 horas |
| **Mes programado** | Mes 22 |
| **Evidencia requerida** | - Lista de asistentes firmada - Registro fotográfico/video - Material de difusión (flyers, PPT) - Nota de prensa (opcional) |

---

#### 🔗 Participación en Vinculatech

| Campo | Valor |
|-------|-------|
| **Organizador** | CONCYTEC-PROCIENCIA |
| **Objetivo** | Vinculación Academia-Industria-Gobierno |
| **Participantes requeridos** | Responsable Técnico + Gestor Tecnológico |
| **Evidencia** | Constancia de participación emitida por PROCIENCIA |
| **Nota** | Obligatorio para proyectos que desarrollen prototipo o prueba de concepto |

---

## 📅 CRONOGRAMA DE HITOS (24 MESES / 8 TRIMESTRES)

### Resumen por Trimestre

| Trimestre | Período | Hito Principal | Entregables Clave |
|-----------|---------|----------------|-------------------|
| **Q1** | Mes 1-3 | 🛒 Adquisición y Contratación | Equipos adquiridos, Tesista contratado, Kick-off |
| **Q2** | Mes 4-6 | ☁️ Infraestructura y Reconstrucción 3D | Ambiente cloud configurado, API Hunyuan3D integrada |
| **Q3** | Mes 7-9 | 🤖 Entrenamiento Modelos IA | Modelo YOLO v0.5 entrenado, Dataset etiquetado |
| **Q4** | Mes 10-12 | 📄 Cierre Año 1 + Artículo 1 | Informe anual, Draft artículo enviado |
| **Q5** | Mes 13-15 | 🧠 Cerebro Legal RAG | Base vectorial con NTPs, Pipeline RAG operativo |
| **Q6** | Mes 16-18 | ✅ Primera Validación + Artículo 1 | Validación en obra piloto, **Artículo 1 enviado** |
| **Q7** | Mes 19-21 | 🔧 Integración y Segunda Validación | Sistema integrado TRL 5, Datos multi-obra |
| **Q8** | Mes 22-24 | 🎓 Cierre + TRL 6 | **Tesis sustentada**, **Artículo 2**, Informe final |

---

### Cronograma Detallado por Actividad

| Actividad | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|-----------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **ADQUISICIÓN Y CONTRATACIÓN** | | | | | | | | |
| Adquisición de equipos (Drone, GPU, Workstations) | ██ | | | | | | | |
| Contratación de tesista de pregrado | ██ | | | | | | | |
| Configuración de infraestructura cloud | | ██ | | | | | | |
| **DESARROLLO DE MOTORES IA** | | | | | | | | |
| Integración API Hunyuan3D (Reconstrucción 3D) | | ██ | ██ | | | | | |
| Captura de dataset de imágenes de construcción | | ██ | | | | | | |
| Etiquetado de dataset para YOLO (EPP, riesgos) | | | ██ | | | | | |
| Entrenamiento modelo YOLOv8 (SSOMA) | | | ██ | ██ | | | | |
| Desarrollo Cerebro Legal (pgvector + RAG) | | | | | ██ | ██ | | |
| Integración de los 6 motores IA | | | | | | | ██ | |
| **VALIDACIÓN EN CAMPO** | | | | | | | | |
| Viaje 1: Reconocimiento obra piloto (Trujillo) | | ██ | | | | | | |
| Viaje 2: Firma convenio con constructora | | | | | ██ | | | |
| Viaje 3: Primera validación TRL 5 | | | | | | ██ | | |
| Viaje 4: Segunda campaña de validación | | | | | | | ██ | |
| Viaje 5: Validación final TRL 6 | | | | | | | | ██ |
| **PUBLICACIONES Y TESIS** | | | | | | | | |
| Redacción Artículo 1 | | | | ██ | ██ | ██ | | |
| **HITO: Envío Artículo 1** (Automation in Construction) | | | | | | ██ | | |
| Desarrollo de tesis (continuo) | | ██ | ██ | ██ | ██ | ██ | ██ | ██ |
| Redacción Artículo 2 | | | | | | | ██ | ██ |
| **HITO: Sustentación de Tesis** | | | | | | | | ██ |
| **HITO: Envío Artículo 2** | | | | | | | | ██ |
| **DIFUSIÓN Y PI** | | | | | | | | |
| Ponencia en congreso internacional | | | | | | | ██ | |
| Conferencia de difusión público general | | | | | | | ██ | |
| Participación en Vinculatech | | | | | | ██ | ██ | |
| Elaboración de BIT (CATI) | | | | | | | ██ | ██ |
| **GESTIÓN E INFORMES** | | | | | | | | |
| Informe técnico semestral 1 | | | ██ | | | | | |
| Informe técnico anual (Año 1) | | | | ██ | | | | |
| Informe técnico semestral 2 | | | | | | ██ | | |
| Plan de gestión y documentación (Anexo 11, B3) | | | | | | | | ██ |
| Informe de validación experimental (Anexo 11, B1) | | | | | | | | ██ |
| **HITO: Informe Final + Cierre TRL 6** | | | | | | | | ██ |

---

### Hitos Principales con Fechas

| Hito | Trimestre | Mes | Descripción | Verificación |
|------|-----------|-----|-------------|--------------|
| 🚀 **Kick-off del Proyecto** | Q1 | 1 | Inicio oficial, acta de inicio firmada | Acta de inicio |
| 🛒 **Equipos Adquiridos** | Q1 | 3 | Drone, Servidor GPU, Workstations entregados | Actas de recepción |
| 👤 **Tesista Contratado** | Q1 | 3 | Tesista incorporado al equipo | Contrato firmado |
| ☁️ **Infraestructura Operativa** | Q2 | 6 | Supabase + n8n + APIs configurados | Ambiente de desarrollo listo |
| 🤖 **Modelo YOLO v0.5** | Q4 | 12 | Modelo entrenado con mAP > 0.75 | Métricas de evaluación |
| 📄 **Informe Anual Año 1** | Q4 | 12 | Cierre del primer año de ejecución | Informe aprobado |
| 🧠 **Cerebro Legal v1.0** | Q5 | 14 | Pipeline RAG operativo con 50+ NTPs | Demo funcional |
| ✈️ **Convenio con Constructora** | Q5 | 15 | Acuerdo formal para validación en obra | Convenio firmado |
| 🏗️ **Primera Validación TRL 5** | Q6 | 16-17 | Pruebas en obra piloto de Trujillo | Reporte de validación |
| 📝 **Artículo 1 Enviado** | Q6 | 18 | Manuscrito enviado a Automation in Construction | Constancia de envío |
| 🔧 **Sistema Integrado TRL 5** | Q7 | 20 | 6 motores integrados y probados | Pruebas de integración |
| 🎤 **Ponencia Internacional** | Q7 | 20 | Presentación en congreso internacional | Certificado de participación |
| 📢 **Conferencia de Difusión** | Q7 | 22 | Evento para público general | Lista de asistentes, fotos |
| 🎓 **Tesis Sustentada** | Q8 | 23 | Tesista aprueba sustentación | Acta de sustentación |
| 📄 **BIT Entregado** | Q8 | 23 | Búsqueda de Información Tecnológica | Informe BIT (CATI) |
| 📝 **Artículo 2 Enviado** | Q8 | 24 | Manuscrito enviado a J. Computing in Civil Eng. | Constancia de envío |
| ✅ **Validación Final TRL 6** | Q8 | 24 | Sistema validado en entorno real (multi-obra) | Informe de validación TRL 6 |
| 🏁 **Cierre del Proyecto** | Q8 | 24 | Entrega de todos los entregables | Informe final aprobado |

---

### Diagrama de Gantt Simplificado

```
ACTIVIDAD                              | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
---------------------------------------|----|----|----|----|----|----|----|----|
Adquisición de Equipos                 |████|    |    |    |    |    |    |    |
Contratación de Tesista                |████|    |    |    |    |    |    |    |
Configuración Infraestructura Cloud    |    |████|    |    |    |    |    |    |
Integración API 3D (Hunyuan)           |    |████|████|    |    |    |    |    |
Captura y Etiquetado de Dataset        |    |████|████|    |    |    |    |    |
Entrenamiento Modelo YOLO v8           |    |    |████|████|    |    |    |    |
Desarrollo Cerebro Legal (RAG)         |    |    |    |    |████|████|    |    |
Primera Validación en Campo (TRL 5)    |    |    |    |    |    |████|    |    |
Segunda Validación (Multi-obra)        |    |    |    |    |    |    |████|    |
Integración de 6 Motores IA            |    |    |    |    |    |    |████|████|
Redacción Artículo 1                   |    |    |    |████|████|████|    |    |
Redacción Artículo 2                   |    |    |    |    |    |    |████|████|
Desarrollo de Tesis                    |    |████|████|████|████|████|████|████|
Sustentación de Tesis                  |    |    |    |    |    |    |    |████|
Validación Final TRL 6                 |    |    |    |    |    |    |    |████|
Elaboración BIT + Informes Finales     |    |    |    |    |    |    |████|████|
```

---

## 🏛️ ENTIDADES PARTICIPANTES

### Entidad Solicitante (ES)

| Campo | Valor |
|-------|-------|
| **Razón Social** | **GARES S.A.C.** |
| **RUC** | 20601234567 *(VERIFICAR RUC REAL)* |
| **Tipo de Entidad** | ☑️ Empresa con ventas > 150 UIT (2024) |
| **Condición Jurídica** | Sociedad Anónima Cerrada (S.A.C.) |
| **Domicilio Fiscal** | Av. España 1231, Urb. Centro Histórico, Trujillo, La Libertad |
| **Región** | La Libertad |
| **Representante Legal** | [NOMBRE DEL GERENTE GENERAL] |
| **Correo Institucional** | contacto@gares.pe *(VERIFICAR)* |
| **Rubro de Actividad** | Construcción e Ingeniería Civil |
| **Años de Funcionamiento** | +2 años continuos (requisito cumplido) |

**Evidencia de Elegibilidad (empresa con fines de lucro):**
- ☐ Declaración Anual del Impuesto a la Renta 2024 con ventas > 150 UIT
- ☐ Ficha RUC SUNAT con estado ACTIVO y condición HABIDO
- ☐ Vigencia de Poder del Representante Legal

---

### Entidad Asociada (EA) - OBLIGATORIA para Modalidad Avanzados

> ⚠️ **ACCIÓN REQUERIDA:** Debes especificar una Entidad Asociada. Opciones sugeridas:
> - Universidad Nacional de Trujillo (UNT)
> - Universidad Privada Antenor Orrego (UPAO)
> - Universidad Privada del Norte (UPN)
> - Otra empresa constructora o instituto de investigación

| Campo | Valor |
|-------|-------|
| **Razón Social** | **⚠️ [COMPLETAR: NOMBRE DE UNIVERSIDAD O EMPRESA]** |
| **RUC** | [COMPLETAR: RUC 11 dígitos] |
| **Tipo de Entidad** | ☐ Universidad licenciada por SUNEDU ☐ Instituto de Investigación ☐ Empresa |
| **Domicilio Fiscal** | [COMPLETAR: DIRECCIÓN] |
| **Región** | [COMPLETAR - Puede ser igual a La Libertad para Avanzados] |
| **Representante Legal** | [COMPLETAR: NOMBRE] |
| **Correo Institucional** | [COMPLETAR: EMAIL] |
| **Co-Investigador de la EA** | **OBLIGATORIO** - El Co-I debe pertenecer a esta entidad |

**Nota:** La Entidad Asociada debe:
- Contar con al menos 2 años de funcionamiento continuo (entidades privadas)
- Aportar al menos 1 Co-Investigador al equipo (obligatorio para Avanzados)
- Firmar Carta de Compromiso de participación

---

## 👥 EQUIPO DE INVESTIGACIÓN

### Tabla Resumen del Equipo (Modalidad Avanzados - Tabla N° 6)

| Rol | Nombre | Grado Académico | RENACYT | CTI Vitae | ORCID | Entidad | Dedicación |
|-----|--------|-----------------|---------|-----------|-------|---------|------------|
| **Responsable Técnico (RT)** | [COMPLETAR] | Maestría/Doctorado | Sí (Nivel IV-VII) | Sí | Sí | GARES SAC (ES) | 20 hrs/sem |
| **Co-Investigador (Co-I)** | [COMPLETAR] | Maestría mínimo | Opcional | Sí | Sí | ⚠️ EA (obligatorio) | 15 hrs/sem |
| **Tesista de Pregrado** | [COMPLETAR] | Bachiller/Último año | N/A | Sí | Sí | Universidad licenciada | 30 hrs/sem |
| **Gestor Tecnológico (GT)** | [COMPLETAR] | Bachiller mínimo | N/A | Sí | N/A | GARES SAC (ES) | 10 hrs/sem |
| **Gestor de Proyecto (GP)** | [COMPLETAR] | Bachiller mínimo | N/A | Sí | N/A | GARES SAC (ES) | 10 hrs/sem |

---

### 1. Responsable Técnico (RT)

| Requisito (Bases Tabla N° 8) | Evidencia |
|------------------------------|-----------|
| Vínculo laboral/contractual con ES | ☐ Contrato/CAS/Planilla adjunto |
| Residencia en Perú y en la región de postulación | ☐ DNI con domicilio verificable |
| Registro RENACYT vigente | ☐ Constancia RENACYT Nivel [___] |
| Pertenecer a Grupo de Investigación de la ES | ☐ Constancia del Grupo: [NOMBRE] |
| Grado de Maestría o Doctorado (SUNEDU/CTI Vitae) | ☐ Diploma/Constancia adjunta |
| 1+ proyecto con financiamiento concursable | ☐ Contrato proyecto: [NOMBRE] |
| 2+ artículos en Scopus/WoS en área estratégica | ☐ DOI Artículo 1: [_____] ☐ DOI Artículo 2: [_____] |

**Datos del RT:**
- **Nombre Completo:** [NOMBRE COMPLETO]
- **DNI:** [NÚMERO]
- **RENACYT:** [CÓDIGO]
- **ORCID:** [0000-0000-0000-0000]
- **Correo:** [EMAIL]
- **Afiliación:** [FACULTAD/DEPARTAMENTO]

---

### 2. Co-Investigador (Co-I)

| Requisito (Bases Sección 2.3.2) | Evidencia |
|---------------------------------|-----------|
| Vínculo laboral/contractual/académico con ES o EA | ☐ Contrato/Constancia adjunto |
| Título universitario (o Maestría si pertenece a universidad) | ☐ Diploma adjunto |
| 1+ proyecto con financiamiento concursable | ☐ Contrato proyecto: [NOMBRE] |
| Registro CTI Vitae | ☐ Verificado |

**Datos del Co-I:**
- **Nombre Completo:** [COMPLETAR]
- **DNI/Pasaporte:** [COMPLETAR]
- **ORCID:** [0000-0000-0000-0000]
- **Correo:** [COMPLETAR]
- **Afiliación (EA):** ⚠️ **OBLIGATORIO: Debe pertenecer a la Entidad Asociada**

> 📌 **IMPORTANTE (Bases Sección 2.2.2 y 2.3):** El Co-Investigador DEBE pertenecer a la Entidad Asociada y tener vínculo laboral, contractual o académico con ella. La EA debe participar en el proyecto con al menos un Co-I.

---

### 3. Tesista de Pregrado

| Requisito (Bases Sección 2.3.3) | Evidencia |
|---------------------------------|-----------|
| Bachiller/Estudiante último año/Egresado (≤3 años) | ☐ Constancia de estudios/egreso |
| Tesis individual (no culminada) | ☐ Plan de tesis aprobado |
| Sin otro estipendio PROCIENCIA para tesis | ☐ Declaración jurada |
| Registro CTI Vitae + ORCID | ☐ Verificado |

**Datos del Tesista:**
- **Nombre Completo:** [NOMBRE COMPLETO]
- **DNI:** [NÚMERO]
- **Universidad:** [NOMBRE UNIVERSIDAD LICENCIADA]
- **Carrera:** [INGENIERÍA CIVIL / SISTEMAS / AFÍN]
- **Ciclo/Condición:** [ÚLTIMO AÑO / BACHILLER / EGRESADO]
- **Fecha de Egreso (si aplica):** [DD/MM/AAAA]
- **ORCID:** [0000-0000-0000-0000]

**Título Tentativo de Tesis:**
> "Desarrollo de un sistema de visión computacional para detección de riesgos SSOMA en obras de construcción aplicando redes neuronales convolucionales"

---

### 4. Gestor Tecnológico (GT)

| Requisito (Bases Sección 2.3.4) | Evidencia |
|---------------------------------|-----------|
| Vínculo laboral/contractual/académico con ES | ☐ Contrato/Constancia adjunto |
| Grado de Bachiller mínimo | ☐ Diploma adjunto |
| 1+ año experiencia en PI/Transferencia Tecnológica/CATI | ☐ Certificados/Constancias |
| 1+ año experiencia en sector privado | ☐ Certificado de trabajo |
| Registro CTI Vitae | ☐ Verificado |

**Entregables Obligatorios del GT:**
- ☐ Constancia de Taller de Inducción de Gestión Tecnológica (CONCYTEC)
- ☐ 3 Cursos MOOC en PI/Transferencia (Vincúlate, OMPI, INDECOPI)
- ☐ Búsqueda de Información Tecnológica (BIT) - Anexo 13
- ☐ Informe de Validación Experimental - Anexo 11, B1

**Datos del GT:**
- **Nombre Completo:** [NOMBRE COMPLETO]
- **DNI:** [NÚMERO]
- **Correo:** [EMAIL]
- **Afiliación:** [OFICINA DE TRANSFERENCIA TECNOLÓGICA / CATI / EMPRESA]

---

### 5. Gestor de Proyecto (GP)

| Requisito (Bases Sección 2.3.5) | Evidencia |
|---------------------------------|-----------|
| Grado de Bachiller mínimo | ☐ Diploma adjunto |
| Experiencia en contrataciones con el Estado (OSCE) o proyectos con fondos públicos | ☐ Contrato/Certificado FONDECYT/PROCIENCIA |

**Datos del GP:**
- **Nombre Completo:** [NOMBRE COMPLETO]
- **DNI:** [NÚMERO]
- **Correo:** [EMAIL]
- **Experiencia Relevante:** [PROYECTO PREVIO CON FONDOS PÚBLICOS]

---

## 📋 RESULTADOS OBLIGATORIOS (Tabla N° 3 - Modalidad Avanzados)

| # | Resultado | Cantidad | Responsable | Mes de Entrega |
|---|-----------|----------|-------------|----------------|
| a | Artículos científicos originales Q1/Q2/Q3 (al menos 1 en Q1/Q2) | 2 | RT + Co-I | Mes 18, 24 |
| b | Tesis de pregrado o postgrado sustentada | 1 | Tesista | Mes 23 |
| c | Ponencia o póster en congreso INTERNACIONAL | 1 | RT | Mes 20 |
| d | Conferencia de difusión para público general | 1 | RT | Mes 22 |
| e | Plan de gestión y documentación de resultados (Anexo 11, B3) | 1 | RT | Mes 24 |
| f | Informe de validación experimental (Anexo 11, B1) | 1 | RT | Mes 24 |
| g | Búsqueda de Información Tecnológica - BIT (Anexo 13) | 1 | GT | Mes 23 |
| h | Participación en taller Vinculatech (CONCYTEC-PROCIENCIA) | 1 | RT + GT | Durante ejecución |

---

## 📢 ACTIVIDADES ADICIONALES DE DIFUSIÓN Y TRANSFERENCIA (Sección 1.6 de Bases)

### Compromisos Adicionales de Difusión

| # | Actividad de Difusión | Cantidad | Público Objetivo | Responsable | Mes |
|---|----------------------|----------|------------------|-------------|-----|
| i | **Ponencia en Congreso Nacional o Internacional** | 1 | Comunidad científica CTI | RT | Mes 20 |
| j | **Taller de Transferencia Tecnológica** | 1 | Ingenieros civiles de La Libertad | RT + GT | Mes 21-22 |
| k | **Registro en Portal Vinculatech** | 1 | Ecosistema de innovación nacional | GT | Mes 6 |

---

### Detalle de Actividades de Difusión

#### 🎤 Ponencia en Congreso (Requisito c - Obligatorio)

| Campo | Valor |
|-------|-------|
| **Tipo de presentación** | Ponencia oral o Presentación de póster |
| **Alcance mínimo** | Internacional (no se aceptan simposios) |
| **Congresos target** | ICCCBE, CIB W78, ASCE Computing Conference |
| **Mes programado** | Mes 20 (Q7) |
| **Contenido** | Resultados de validación del prototipo TRL 5 |
| **Evidencia** | Constancia de participación + Certificado |

---

#### 🎓 Taller de Transferencia Tecnológica para Ingenieros de La Libertad

| Campo | Valor |
|-------|-------|
| **Título tentativo** | "Inteligencia Artificial aplicada a la Supervisión de Obras: Experiencias con Supervisor IA 4.0" |
| **Público objetivo** | Ingenieros civiles, supervisores de obra, empresas constructoras de la Región La Libertad |
| **Número estimado de participantes** | 30-50 profesionales |
| **Duración** | 4 horas (medio día) |
| **Modalidad** | Presencial (Trujillo) o Híbrido |
| **Lugar propuesto** | Colegio de Ingenieros del Perú - Consejo Departamental La Libertad (CIP-CDLL) |
| **Mes programado** | Mes 21-22 (Q7-Q8) |
| **Contenido** |
| | - Introducción a la IA en construcción |
| | - Demostración en vivo de Supervisor IA 4.0 |
| | - Casos de uso: Detección de desviaciones y riesgos SSOMA |
| | - Sesión de preguntas y networking |
| **Responsable** | RT + GT |
| **Evidencia** | Lista de asistentes firmada, fotos, encuesta de satisfacción |
| **Costo estimado** | S/ 1,500 (incluido en Servicios de Terceros o Logísticos) |

---

#### 🔗 Registro Obligatorio en Portal Vinculatech (CONCYTEC)

| Campo | Valor |
|-------|-------|
| **Plataforma** | [Vinculatech - CONCYTEC](https://vinculatech.concytec.gob.pe) |
| **Objetivo** | Visibilizar el proyecto ante empresas y potenciales adoptantes |
| **Información a registrar** |
| | - Ficha del proyecto de investigación |
| | - Resultados alcanzados (TRL, publicaciones) |
| | - Datos de contacto del equipo |
| | - Potencial de licenciamiento o transferencia |
| **Mes de registro inicial** | Mes 6 (Q2) |
| **Actualizaciones** | Cada 6 meses durante la ejecución |
| **Responsable** | Gestor Tecnológico (GT) |
| **Evidencia** | Captura de pantalla del registro en plataforma |

> 📌 **Nota (Sección 1.6 de Bases):** El registro en Vinculatech es obligatorio para proyectos que desarrollen prototipos o pruebas de concepto, ya que forma parte del ecosistema de transferencia tecnológica del SINACTI.

---

## 🎥 REQUISITOS ADICIONALES DE POSTULACIÓN

| Requisito | Estado | Archivo/Enlace |
|-----------|--------|----------------|
| Video explicativo (máx. 3 min) | ☐ Pendiente | [URL YouTube/Vimeo] |
| Plan de Gestión de Datos (Anexo 14) | ☐ Pendiente | [Archivo adjunto] |
| Análisis de Novedad (búsqueda de patentes) | ☐ Pendiente | [Capturas de pantalla] |
| Carta de compromiso de Entidad Solicitante | ☐ Pendiente | [Archivo adjunto] |
| Carta de compromiso de Entidad Asociada | ☐ Pendiente | [Archivo adjunto] |
| CV documentado del RT (CTI Vitae exportado) | ☐ Pendiente | [Archivo adjunto] |
| CV documentado del Co-I (CTI Vitae exportado) | ☐ Pendiente | [Archivo adjunto] |

---

## 💰 PRESUPUESTO DETALLADO

### Estructura Financiera (Regla 80/20 - Tabla N° 12 de Bases)

| Concepto | Monto (S/) | Porcentaje | Tipo |
|----------|------------|------------|------|
| **Monto Solicitado a PROCIENCIA** | 300,000.00 | 80% | Recursos monetarios no reembolsables |
| **Contrapartida GARES SAC** | 75,000.00 | 20% | Aporte No Monetario (valorizado) |
| **PRESUPUESTO TOTAL DEL PROYECTO** | **375,000.00** | **100%** | |

> **Nota (Tabla N° 12):** Al ser GARES SAC una empresa privada con fines de lucro (S.A.C.), la distribución debería ser 60% PROCIENCIA / 30% monetario / 10% no monetario. Sin embargo, si la ES es una universidad pública o entidad sin fines de lucro, aplica la regla 80/20.

---

### Rubros Financiables - PROCIENCIA (S/ 300,000.00)

| Rubro | Monto (S/) | % del Total | Límite Bases | Estado |
|-------|------------|-------------|--------------|--------|
| **Recursos Humanos** | 165,000.00 | 55.0% | ≤ 60% | ✅ |
| **Equipos y Bienes Duraderos** | 72,000.00 | 24.0% | ≤ 40% | ✅ |
| **Servicios de Terceros** | 36,000.00 | 12.0% | ≤ 25% | ✅ |
| **Pasajes y Viáticos** | 18,000.00 | 6.0% | ≤ 15% | ✅ |
| **Gastos Logísticos de Operación** | 9,000.00 | 3.0% | ≤ 10% | ✅ |
| **TOTAL PROCIENCIA** | **300,000.00** | **100%** | | ✅ |

---

### Detalle por Rubro

#### 1. Recursos Humanos (S/ 165,000.00 - 55%)

| Cargo | Dedicación | Meses | Incentivo Mensual (S/) | Subtotal (S/) |
|-------|------------|-------|------------------------|---------------|
| Responsable Técnico (RT) | 20 hrs/sem | 24 | 3,500.00 | 84,000.00 |
| Co-Investigador (Co-I) | 15 hrs/sem | 24 | 2,000.00 | 48,000.00 |
| Tesista de Pregrado (Estipendio) | 30 hrs/sem | 22 | 1,500.00 | 33,000.00 |
| **SUBTOTAL RRHH** | | | | **165,000.00** |

> **Nota:** El estipendio del Gestor de Proyecto se registra en "Gastos Logísticos de Operación" según Tabla N° 11 de las Bases.

---

#### 2. Equipos y Bienes Duraderos (S/ 72,000.00 - 24%)

| Equipo | Cant. | Costo Unit. (S/) | Subtotal (S/) | Justificación |
|--------|-------|------------------|---------------|---------------|
| Drone DJI Mavic 3 Pro | 1 | 12,000.00 | 12,000.00 | Captura aérea para reconstrucción 3D |
| Servidor GPU (RTX 4090) | 1 | 25,000.00 | 25,000.00 | Entrenamiento YOLO y procesamiento 3D |
| Workstation de Desarrollo | 2 | 8,000.00 | 16,000.00 | RT y Tesista |
| Tablet Industrial IP68 | 2 | 3,500.00 | 7,000.00 | Validación en campo |
| Disco SSD Externo 4TB | 4 | 1,500.00 | 6,000.00 | Almacenamiento de datasets |
| Cámara Térmica FLIR | 1 | 6,000.00 | 6,000.00 | Detección de anomalías |
| **SUBTOTAL EQUIPOS** | | | **72,000.00** | |

---

#### 3. Servicios de Terceros (S/ 36,000.00 - 12%)

| Servicio | Descripción | Meses/Unid | Costo (S/) | Subtotal (S/) |
|----------|-------------|------------|------------|---------------|
| API Hunyuan3D (Tencent) | Créditos 3D | 18 meses | 500/mes | 9,000.00 |
| API OpenAI/Anthropic | Embeddings + LLM | 18 meses | 300/mes | 5,400.00 |
| n8n Cloud Pro | Orquestación IA | 24 meses | 150/mes | 3,600.00 |
| Supabase Pro | BD + pgvector | 24 meses | 100/mes | 2,400.00 |
| Consultoría ML | Optimización YOLO | 1 | 6,000.00 | 6,000.00 |
| Servicio CATI (BIT) | Búsqueda tecnológica | 1 | 3,000.00 | 3,000.00 |
| Proofreading científico | Artículos en inglés | 2 | 1,500.00 | 3,000.00 |
| Publicación Open Access | APC revista Q1 | 1 | 3,600.00 | 3,600.00 |
| **SUBTOTAL SERVICIOS** | | | | **36,000.00** |

---

#### 4. Pasajes y Viáticos (S/ 18,000.00 - 6%)

| Concepto | Destino | Personas | Días | Viajes | Costo Unit (S/) | Subtotal (S/) |
|----------|---------|----------|------|--------|-----------------|---------------|
| Pasajes Lima-Trujillo | Trujillo | 2 | - | 5 | 400.00 | 4,000.00 |
| Viáticos en Trujillo | Trujillo | 2 | 4 | 5 | 350.00/día | 14,000.00 |
| **SUBTOTAL PASAJES** | | | | | | **18,000.00** |

**Viajes programados:**
1. Mes 5: Reconocimiento de obra piloto
2. Mes 15: Firma de convenio con constructora
3. Mes 16: Primera validación en campo
4. Mes 21: Segunda campaña de validación
5. Mes 24: Validación final TRL 6

---

#### 5. Gastos Logísticos de Operación (S/ 9,000.00 - 3%)

> 📌 **IMPORTANTE (Tabla N° 11):** El estipendio del Gestor de Proyecto (GP) se registra en este rubro, NO en Recursos Humanos.

| Concepto | Meses | Costo Mensual (S/) | Subtotal (S/) |
|----------|-------|-------------------|---------------|
| **Estipendio Gestor de Proyecto (GP)** | 24 | 300.00 | 7,200.00 |
| Útiles de oficina e impresiones | 24 | 50.00 | 1,200.00 |
| Otros gastos logísticos | - | - | 600.00 |
| **SUBTOTAL GASTOS LOGÍSTICOS** | | | **9,000.00** |

**Verificación límite GP:**
- Límite Gastos Logísticos: ≤ 10% de S/ 300,000 = **S/ 30,000 máximo**
- Propuesta: S/ 9,000 (3%) = **✅ CUMPLE**

---

### Contrapartida No Monetaria de la Entidad Solicitante (S/ 75,000.00 - 20%)

| Concepto | Valorización Mensual (S/) | Meses | Total (S/) |
|----------|---------------------------|-------|------------|
| Uso de oficinas y laboratorio | 1,000.00 | 24 | 24,000.00 |
| Servicios básicos (luz, internet, agua) | 400.00 | 24 | 9,600.00 |
| Tiempo de personal administrativo | 600.00 | 24 | 14,400.00 |
| Uso de equipos existentes (servidores, laptops) | 500.00 | 24 | 12,000.00 |
| Uso de software licenciado (Office, AutoCAD) | 300.00 | 24 | 7,200.00 |
| Tiempo parcial del Gestor Tecnológico | 325.00 | 24 | 7,800.00 |
| **TOTAL CONTRAPARTIDA** | | | **75,000.00** |

> **Nota:** La contrapartida no monetaria será valorizada y verificada durante la ejecución del proyecto según la Guía de Soporte, Seguimiento y Evaluación de PROCIENCIA.

---

### Verificación de Cumplimiento de Bases

| Requisito | Límite | Propuesta | Estado |
|-----------|--------|-----------|--------|
| Recursos Humanos | ≤ 60% | 55.0% | ✅ Cumple |
| Equipos | ≤ 40% | 24.0% | ✅ Cumple |
| Servicios de Terceros | ≤ 25% | 12.0% | ✅ Cumple |
| Pasajes y Viáticos | ≤ 15% | 6.0% | ✅ Cumple |
| Gastos Logísticos | ≤ 10% | 3.0% | ✅ Cumple |
| Contrapartida No Monetaria | ≥ 20% | 20.0% | ✅ Cumple |
| Suma de rubros | = 100% | 100% | ✅ Cumple |
| Monto máximo PROCIENCIA | ≤ S/ 300,000 | S/ 300,000 | ✅ Cumple |

---

## 🏗️ ¿Qué es Supervisor IA 4.0?

**Supervisor IA 4.0** es una plataforma web de gestión de obras de construcción que conecta el frontend con una base de datos en la nube (Supabase). Permite a las empresas constructoras organizar sus **organizaciones**, **proyectos** y **estructuras de desglose de trabajo (WBS)** de manera visual e interactiva.

La propuesta de valor diferencial radica en la integración de **6 Motores de Inteligencia Artificial** que automatizan tareas críticas de supervisión:

1. **Motor de Reconstrucción 3D** - Generación de modelos As-Built desde fotografías
2. **Auditoría Geométrica Automatizada** - Comparación As-Designed vs As-Built
3. **Cerebro Legal Técnico** - RAG con embeddings vectoriales sobre NTPs
4. **Visión Computacional SSOMA** - Detección de riesgos de seguridad
5. **Orquestador de Operaciones** - Flujos automatizados con n8n
6. **Reportabilidad Deep Analytics** - Generación automática de informes PDF

---

## 🛠️ Stack Tecnológico

| Categoría              | Tecnología                              | Estado |
|------------------------|-----------------------------------------|--------|
| **Frontend**           | React 19, TypeScript, Vite 7            | ✅ Implementado |
| **Estilos**            | TailwindCSS 3.4, Glassmorphism UI       | ✅ Implementado |
| **Backend/Base de Datos** | Supabase (PostgreSQL + Auth + RLS)   | ✅ Implementado |
| **Routing**            | React Router 7                          | ✅ Implementado |
| **Iconos**             | Lucide React                            | ✅ Implementado |
| **Visualización 3D**   | Three.js                                | ✅ Implementado |
| **Generación de PDFs** | jsPDF                                   | ✅ Implementado |
| **Embeddings Vectoriales** | pgvector (Supabase)                 | 🟡 UI lista, backend pendiente |
| **Orquestación IA**    | n8n (self-hosted o cloud)               | 🟡 Widget listo, conexión pendiente |
| **Reconstrucción 3D**  | Tencent Hunyuan3D API                   | 🔴 Pendiente |
| **Visión Computacional** | YOLO v8 / Modelos custom              | 🟡 UI lista, modelo pendiente |
| **Despliegue**         | Cloudflare Workers                      | ✅ Configurado |

---

## ✅ Funcionalidades Implementadas (TRL 3)

### 1. Sistema de Autenticación Completo

- ✅ Login con **Email/Contraseña** conectado a Supabase Auth
- ✅ Login con **Google OAuth** (requiere configuración en Supabase Dashboard)
- ✅ **Rutas Protegidas**: El Dashboard solo es accesible para usuarios autenticados
- ✅ **Manejo de Errores Específicos**: Credenciales inválidas, correo no confirmado, configuración de Google pendiente
- ✅ **Spinner de Carga** mientras se verifica la sesión
- ✅ **Cerrar Sesión** funcional

### 2. Dashboard de Gestión de Obras

- ✅ **KPIs en tiempo real**: Organizaciones, Proyectos, Nodos WBS (conectados a Supabase)
- ✅ **Indicador de Estado**: "SISTEMA ONLINE" con animación de pulso verde
- ✅ **Lista de Proyectos Activos** con su organización y cantidad de nodos WBS
- ✅ **Visualización de Árbol WBS** con indentación jerárquica y códigos
- ✅ **Botón de refrescar datos** para sincronización manual

### 3. Sistema de Seed Idempotente

- ✅ Botón "⚡ Iniciar Motor Real" para poblar datos de demostración
- ✅ Lógica **"Find First, Create Second"**: No duplica datos si ya existen
- ✅ Inserta: Organización "Demo GARES", Proyecto "Altos de Trujillo", y estructura WBS completa
- ✅ **Señales TestSprite**: `TESTSPRITE_STATUS: DATABASE_READY`, `SEED_SUCCESS`

### 4. Manejo Robusto de Errores

- ✅ Detección de **variables de entorno faltantes** con mensaje claro
- ✅ Detección de **errores de permisos RLS** (código 42501) con icono de candado
- ✅ Detección de **usuario no autenticado** con pantalla de "Acceso Restringido"
- ✅ **Mensajes de error detallados** en español con códigos Postgres

### 5. Tipado Estricto con TypeScript

- ✅ Tipos generados para la base de datos (`Database`, `Organization`, `Project`, `WBSNode`)
- ✅ Tipos de inserción explícitos para operaciones Supabase
- ✅ Tipado del cliente Supabase con `SupabaseClient<Database>`

### 6. Visor BIM 3D Interactivo (Three.js)

- ✅ **Modelo estructural 3D** con columnas (cyan), vigas (verde), y losas (naranja)
- ✅ **Rotación automática** con botón para pausar/reanudar
- ✅ **Controles de zoom** (acercar/alejar) con indicador de porcentaje
- ✅ **Grid de referencia** estilo CAD con iluminación ambiental y direccional
- ✅ **Leyenda de elementos** visible en la esquina inferior izquierda
- ✅ **Indicador de escala** (1:100) en la esquina inferior derecha
- ✅ **Barra de herramientas** con Zoom In/Out, Play/Pause, Reset, Capas, Pantalla Completa

### 7. Cerebro Legal Técnico (Chat RAG Simulado)

- ✅ **Interfaz de chat** estilo asistente con mensajes del usuario y del sistema
- ✅ **Base de conocimiento simulada** con 6 NTPs:
  - NTP E.060 - Concreto Armado (recubrimiento, columnas, encofrado)
  - Norma G.050 - Seguridad durante la Construcción (EPP, arnés, casco)
  - Referencias a ACI 318, ANSI Z359.1, Ley 29783
- ✅ **Respuestas contextuales** con formato markdown, emojis, y viñetas
- ✅ **Referencias normativas** mostradas como badges al final de cada respuesta
- ✅ **Indicador de "Consultando normativa..."** durante el procesamiento
- ✅ **Ejemplos de preguntas** en el mensaje de bienvenida
- ✅ **Timestamp** en cada mensaje

### 8. Auditoría Visual con IA (Simulada)

- ✅ **InteractiveVisionScanner**: Componente de upload de imágenes con drag & drop
- ✅ **Detección simulada** de riesgos con bounding boxes animados
- ✅ **Tipos de detección**: Errores (rojo/naranja) y Elementos Correctos (cyan)
- ✅ **Referencias a normas**: G.050 Seguridad durante la Construcción
- ✅ **Resumen de detecciones**: Contador de errores vs elementos correctos
- ✅ **Efecto de escaneo**: Línea animada que recorre la imagen
- ✅ **Mensajes de proceso**: "Inicializando análisis...", "Detectando EPP...", etc.

### 9. Reportes del Proyecto con Generación de PDF

- ✅ **Lista de reportes** con diferentes tipos:
  - Avance Mensual
  - Auditoría de Seguridad
  - Cumplimiento Normativo
  - Detección IA
  - Control de Calidad
  - Análisis BIM
- ✅ **Estados de reporte**: Completado (cyan), Pendiente (naranja), En Revisión (amarillo)
- ✅ **Generación real de PDFs** con jsPDF:
  - Header con gradiente y logo "SUPERVISOR IA 4.0"
  - Metadatos: fecha, estado, ID del reporte
  - Contenido del reporte con información del proyecto
  - Footer con timestamp de generación
- ✅ **Modal de preview** para ver el contenido antes de descargar
- ✅ **Botón "Nuevo Reporte"** para generar reportes automáticamente
- ✅ **Notificaciones de éxito** al descargar o generar reportes

### 10. Asistente de Voz VAPI

- ✅ **Botón flotante animado** con efecto de glow cyan
- ✅ **Estado "Escuchando"** con ondas de audio animadas (wave effect)
- ✅ **Efecto de pulso** cuando está activo
- ✅ **Label dinámico**: "Escuchando..." / "Asistente VAPI"
- 🔴 **Pendiente**: Integración real con VAPI o servicio de voz

### 11. Panel de Actividad (Activity Log)

- ✅ **Panel lateral** que muestra actividad reciente del sistema
- ✅ Se muestra en vistas Dashboard y Auditoría
- ✅ **Estilo glassmorphism** consistente con el diseño

### 12. Navegación con Sidebar

- ✅ **Sidebar lateral** con logo "Supervisor IA 4.0"
- ✅ **Menú de navegación** con 5 vistas:
  - 📊 Dashboard General
  - 📦 Modelo BIM
  - 📷 Auditoría Visual
  - 🧠 Cerebro Legal
  - 📄 Reportes
- ✅ **Indicador visual** de vista activa con gradiente
- ✅ **Widget de estado n8n** en la parte inferior (Online/Offline)

---

## 🚧 Funcionalidades Pendientes (TRL 4-6)

| Motor | Estado | Descripción | TRL Objetivo |
|-------|--------|-------------|--------------|
| Motor de Reconstrucción 3D | 🔴 Pendiente | Integración con Hunyuan3D API | TRL 4 |
| Auditoría Geométrica | 🔴 Pendiente | Comparación de mallas 3D (As-Designed vs As-Built) | TRL 4 |
| Cerebro Legal Técnico | � UI Completa | Conexión a pgvector con embeddings reales | TRL 5 |
| Visión Computacional SSOMA | 🟡 UI Completa | Conexión a modelo YOLO real | TRL 5 |
| Orquestador n8n | � Widget Listo | Conexión a webhooks de n8n | TRL 4 |
| Integración VAPI | 🟡 UI Completa | Conexión a servicio de voz VAPI | TRL 4 |
| Visor BIM con IFC | 🟡 Three.js Listo | Carga de archivos IFC reales | TRL 5 |

---

## 📂 Estructura de Archivos Clave

```
Supervisor IA 4.0/
├── src/
│   ├── hooks/
│   │   ├── useAuth.ts                  # Hook de autenticación (signIn, signOut, Google OAuth)
│   │   └── useConstructionData.ts      # Hook de datos (load, seed, refresh, RLS checks)
│   ├── lib/
│   │   └── supabase.ts                 # Cliente Supabase singleton + funciones auth
│   ├── shared/
│   │   └── types.ts                    # Tipos TypeScript para la BD (Database, Organization, Project, WBSNode)
│   ├── react-app/
│   │   ├── App.tsx                     # Router + ProtectedRoute
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Página principal con layout y router de vistas
│   │   │   └── Login.tsx               # Pantalla de login (Email + Google)
│   │   └── components/
│   │       ├── Sidebar.tsx             # Menú lateral de navegación (5 items)
│   │       ├── ActivityLog.tsx         # Panel de actividad reciente
│   │       ├── VapiAssistant.tsx       # Botón flotante de asistente de voz
│   │       ├── VisionViewer.tsx        # Visor de detecciones (legacy)
│   │       ├── InteractiveVisionScanner.tsx  # Scanner interactivo con upload y detecciones
│   │       ├── KPICard.tsx             # Tarjeta de KPI
│   │       ├── SimpleKPICard.tsx       # Tarjeta de KPI simplificada
│   │       └── views/
│   │           ├── DashboardView.tsx   # Vista principal del dashboard (KPIs, proyectos, WBS)
│   │           ├── BIMView.tsx         # Visor BIM 3D con Three.js
│   │           ├── AuditoriaView.tsx   # Vista de auditoría visual con IA
│   │           ├── CerebroLegalView.tsx # Chat del Cerebro Legal Técnico
│   │           └── ReportesView.tsx    # Vista de reportes con generación PDF
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql      # Esquema de la BD (organizations, projects, wbs_nodes)
├── .env                                # Variables de entorno (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
├── package.json                        # Dependencias (react, supabase-js, three, jspdf, lucide-react)
└── DOCUMENTACION_SUPERVISOR_IA_4.0.md  # Este archivo
```

---

## 🗄️ Esquema de Base de Datos (Supabase)

| Tabla          | Columnas                                              | Descripción               |
|----------------|-------------------------------------------------------|---------------------------|
| `organizations` | `id`, `name`, `created_at`                           | Empresas constructoras    |
| `projects`      | `id`, `organization_id`, `name`, `status`, `created_at` | Obras activas          |
| `wbs_nodes`     | `id`, `project_id`, `parent_id`, `name`, `code`, `embedding`, `created_at` | Estructura jerárquica WBS |

---

## 🔒 Seguridad

- **Supabase Auth**: Gestión de sesiones con tokens JWT
- **RLS (Row Level Security)**: Preparado para políticas de acceso por organización
- **Protección de Rutas**: El componente `ProtectedRoute` redirige a `/login` si no hay sesión
- **Validación de Errores**: Detección específica de códigos 42501 (RLS violation)

---

## 🚀 Cómo Ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/[usuario]/Supervisor-IA-4.0.git

# Navegar al directorio
cd "Supervisor IA 4.0"

# Instalar dependencias
npm install

# Configurar variables de entorno (crear archivo .env)
echo "VITE_SUPABASE_URL=https://tu-proyecto.supabase.co" > .env
echo "VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui" >> .env

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173
```

---

## 📋 Variables de Entorno Requeridas

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

---

## � Dependencias Principales

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.91.0",
    "lucide-react": "^0.510.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-router": "^7.5.3",
    "three": "latest",
    "jspdf": "latest"
  }
}
```

---

## �📜 DECLARACIÓN DE CUMPLIMIENTO

El presente proyecto de investigación aplicada se desarrolla en el marco del Sistema Nacional de Ciencia, Tecnología e Innovación (SINACTI) del Perú, cumpliendo con:

- Ley N° 31250 - Ley del Sistema Nacional de Ciencia, Tecnología e Innovación
- Reglamento RENACYT vigente
- Bases del Concurso E041-2026-02 de ProCiencia
- Lineamientos de integridad científica de CONCYTEC

---

## 👤 Información de Contacto

**Responsable Técnico:** Ver sección "Equipo de Investigación" → RT  
**Entidad Solicitante:** Ver sección "Entidades Participantes" → ES  
**Entidad Asociada:** Ver sección "Entidades Participantes" → EA

---

## 📜 DECLARACIONES JURADAS REQUERIDAS

El Responsable Técnico y el Representante Legal de la Entidad Solicitante declaran bajo juramento que:

1. ☐ La información consignada en la propuesta es veraz y verificable.
2. ☐ No existe duplicidad de financiamiento para las mismas actividades con otros fondos públicos.
3. ☐ Los integrantes del equipo cumplen con los requisitos establecidos en las bases.
4. ☐ La entidad solicitante está facultada para realizar investigación según su estatuto.
5. ☐ Se cuenta con la infraestructura y equipamiento básico para ejecutar el proyecto.
6. ☐ Los tesistas no cuentan con otro estipendio de PROCIENCIA para desarrollo de tesis.
7. ☐ El Responsable Técnico no lidera actualmente otro proyecto PROCIENCIA/FONDECYT.

---

## 📊 Resumen de Estado del Proyecto

| Categoría | Implementado | Pendiente |
|-----------|--------------|-----------|
| **Autenticación** | 100% | 0% |
| **Dashboard** | 100% | 0% |
| **Visor BIM 3D** | 100% (Three.js) | Carga de IFC |
| **Auditoría Visual** | 80% (UI + Simulación) | Modelo YOLO real |
| **Cerebro Legal** | 80% (UI + Simulación) | pgvector + embeddings |
| **Reportes PDF** | 100% (jsPDF) | 0% |
| **Asistente Voz** | 50% (UI) | Integración VAPI |
| **n8n Orquestador** | 30% (Widget) | Webhooks reales |

**Progreso Total Estimado: 75%**

---

## 🎬 ANEXO: GUION DE VIDEO (3 MINUTOS)

### Especificaciones Técnicas

| Campo | Valor |
|-------|-------|
| **Duración máxima** | 3 minutos (180 segundos) |
| **Formato** | MP4, 1080p mínimo |
| **Plataforma** | YouTube (no listado) o Vimeo |
| **Idioma** | Español |
| **Subtítulos** | Recomendado |

---

### Estructura del Video

```
┌────────────────────────────────────────────────────────────────┐
│  0:00 ─────────── 0:45 ─────────── 2:00 ─────────── 3:00      │
│    │  PROBLEMA    │    SOLUCIÓN    │  EQUIPO + RESULTADOS   │
│    │   (45 seg)   │   (75 seg)     │      (60 seg)          │
└────────────────────────────────────────────────────────────────┘
```

---

### SECCIÓN 1: EL PROBLEMA (0:00 - 0:45)

**Objetivo:** Generar empatía y establecer la problemática.

#### Guion Narrativo

> **[0:00 - 0:10] APERTURA IMPACTANTE**
>
> *[Visual: Imágenes de obras de construcción en Perú con problemas visibles]*
>
> **Narrador:** "En el Perú, el sector construcción representa el 6% del PBI, pero enfrenta un problema crítico: **más del 40% de las obras presentan desviaciones de calidad** que no se detectan a tiempo."

> **[0:10 - 0:25] ESTADÍSTICAS DEL PROBLEMA**
>
> *[Visual: Gráficos animados con datos]*
>
> **Narrador:** "Cada año, los sobrecostos por reprocesos superan los **500 millones de soles**. Los accidentes laborales en construcción representan el **14% del total nacional**. Y la supervisión manual de obras es lenta, subjetiva y propensa a errores humanos."

> **[0:25 - 0:45] PREGUNTA DETONANTE**
>
> *[Visual: Supervisor revisando planos vs. realidad en obra]*
>
> **Narrador:** "¿Cómo podemos automatizar la supervisión de obras para detectar problemas de calidad y seguridad **antes** de que se conviertan en sobrecostos o accidentes? Aquí es donde entra **Supervisor IA 4.0**."

---

### SECCIÓN 2: LA SOLUCIÓN (0:45 - 2:00)

**Objetivo:** Presentar Supervisor IA 4.0 y sus 6 motores de IA.

#### Guion Narrativo

> **[0:45 - 1:00] INTRODUCCIÓN DE LA SOLUCIÓN**
>
> *[Visual: Logo animado de Supervisor IA 4.0 + Pantalla del dashboard]*
>
> **Narrador:** "Supervisor IA 4.0 es una plataforma de inteligencia artificial que **automatiza la supervisión de obras** mediante seis motores especializados que trabajan en conjunto."

> **[1:00 - 1:15] MOTOR 1 Y 2: RECONSTRUCCIÓN 3D Y AUDITORÍA GEOMÉTRICA**
>
> *[Visual: Demostración de captura con drone → Modelo 3D → Comparación con diseño]*
>
> **Narrador:** "Primero, capturamos la obra con **drones** y generamos un modelo 3D automático. Luego, comparamos este modelo con el diseño original para detectar **desviaciones geométricas** en tiempo real."

> **[1:15 - 1:30] MOTOR 3: VISIÓN COMPUTACIONAL SSOMA**
>
> *[Visual: Cámara detectando trabajadores sin EPP, zonas de riesgo]*
>
> **Narrador:** "Nuestro sistema de **visión computacional** detecta automáticamente riesgos de seguridad: trabajadores sin casco, andamios mal colocados, zonas de peligro. Todo en tiempo real."

> **[1:30 - 1:45] MOTOR 4: CEREBRO LEGAL TÉCNICO**
>
> *[Visual: Interfaz de chat consultando normativas]*
>
> **Narrador:** "El **Cerebro Legal** es un asistente de IA que conoce toda la normativa técnica peruana: NTP E.060, E.070, G.050. Responde consultas instantáneas sobre cumplimiento normativo."

> **[1:45 - 2:00] MOTORES 5 Y 6: ORQUESTACIÓN Y REPORTES**
>
> *[Visual: Flujos automatizados en n8n + Reporte PDF generándose]*
>
> **Narrador:** "Finalmente, un **orquestador inteligente** coordina todos los motores y genera **reportes automáticos** que llegan directamente al supervisor de obra y al cliente."

---

### SECCIÓN 3: EQUIPO Y RESULTADOS PROCIENCIA (2:00 - 3:00)

**Objetivo:** Presentar al equipo, TRL y resultados comprometidos.

#### Guion Narrativo

> **[2:00 - 2:15] EL EQUIPO**
>
> *[Visual: Fotos del RT, Co-I, Tesista + Logos de universidades]*
>
> **Narrador:** "Somos un equipo de investigadores de **[Universidad - A DEFINIR]** con experiencia en inteligencia artificial, ingeniería civil y visión computacional. Contamos con el apoyo de **[Entidad Asociada - A DEFINIR]**."

> **[2:15 - 2:30] NIVEL DE MADUREZ TECNOLÓGICA**
>
> *[Visual: Barra de TRL 3 → TRL 4 → TRL 5/6]*
>
> **Narrador:** "Actualmente tenemos un **prototipo funcional en TRL 3**. Con el financiamiento de ProCiencia, alcanzaremos como mínimo **TRL 4** y aspiramos a **TRL 6**, validando el sistema en obras reales en Trujillo."

> **[2:30 - 2:45] RESULTADOS COMPROMETIDOS**
>
> *[Visual: Iconos de artículos, tesis, patentes]*
>
> **Narrador:** "Nos comprometemos a publicar **2 artículos en revistas Q1**, graduar **1 tesista**, elaborar una **búsqueda de información tecnológica** y participar en el taller **Vinculatech**."

> **[2:45 - 3:00] LLAMADO A LA ACCIÓN**
>
> *[Visual: Pantalla final con logo y datos de contacto]*
>
> **Narrador:** "Supervisor IA 4.0: Inteligencia artificial al servicio de la construcción peruana. **Transformemos juntos la supervisión de obras.**"
>
> *[Texto en pantalla: "Proyecto postulado al Concurso E041-2026-02 - ProCiencia"]*

---

### Recursos Visuales Sugeridos

| Escena | Recurso Visual |
|--------|----------------|
| Obras con problemas | Stock footage de construcción en Perú + fotos reales |
| Estadísticas | Gráficos animados (Canva, After Effects) |
| Dashboard | Captura de pantalla del prototipo funcional |
| Drone capturando | Stock footage + render 3D |
| Modelo 3D | Captura del visor Three.js del proyecto |
| Detección SSOMA | Mockup con bounding boxes sobre imagen de obra |
| Cerebro Legal | Grabación de pantalla del chat RAG |
| Reportes PDF | Demostración de descarga de PDF real |
| Equipo | Fotos profesionales del RT, Co-I, Tesista |
| TRL | Animación de barra de progreso |

---

### Checklist de Producción

- [ ] Grabar narración de voz en off (3 min)
- [ ] Capturar pantallas del prototipo funcional
- [ ] Obtener fotos profesionales del equipo
- [ ] Crear gráficos animados de estadísticas
- [ ] Editar video con transiciones profesionales
- [ ] Agregar música de fondo (libre de derechos)
- [ ] Incluir subtítulos en español
- [ ] Revisar que no exceda 3 minutos
- [ ] Subir a YouTube como "No listado"
- [ ] Copiar URL para formulario ProCiencia

---

## 📂 ANEXO 14: PLAN DE GESTIÓN DE DATOS DE INVESTIGACIÓN

### Marco Normativo

Este Plan de Gestión de Datos (PGD) se elabora conforme a:

- **Ley N° 30035** - Ley que Regula el Repositorio Nacional Digital de Ciencia, Tecnología e Innovación de Acceso Abierto
- **Decreto Supremo N° 006-2015-PCM** - Reglamento de la Ley N° 30035
- **Guía de Plan de Gestión de Datos de Investigación** - CONCYTEC (Anexo 14 de las Bases)
- **Política Nacional de Datos Abiertos** - Decreto Supremo N° 016-2017-PCM

---

### 1. Descripción General del Proyecto

| Campo | Valor |
|-------|-------|
| **Título del Proyecto** | Supervisor IA 4.0: Sistema de Supervisión Inteligente de Obras de Construcción |
| **Código de Concurso** | E041-2026-02 |
| **Responsable de Datos** | Responsable Técnico (RT) |
| **Duración** | 24 meses |
| **Financiador** | PROCIENCIA (SINACTI) |

---

### 2. Tipos de Datos Generados

El proyecto generará los siguientes tipos de datos de investigación:

| Tipo de Dato | Formato | Volumen Estimado | Sensibilidad |
|--------------|---------|------------------|--------------|
| **Imágenes aéreas de drones** | JPG, RAW, MP4 | 500 GB | Media (ubicación de obras) |
| **Modelos 3D reconstruidos** | OBJ, GLB, PLY | 100 GB | Baja |
| **Datasets etiquetados YOLO** | TXT, JSON, JPG | 50 GB | Baja |
| **Embeddings vectoriales (NTPs)** | JSONL, Parquet | 5 GB | Baja |
| **Registros de detecciones SSOMA** | JSON, CSV | 10 GB | Media (trabajadores) |
| **Logs de orquestación n8n** | JSON | 2 GB | Baja |
| **Reportes PDF generados** | PDF | 5 GB | Media (información de proyectos) |
| **Datos de validación en campo** | XLSX, CSV, JPG | 20 GB | Media |
| **Código fuente** | TypeScript, Python | 500 MB | Baja (open source) |

**Volumen Total Estimado:** ~700 GB

---

### 3. Ciclo de Vida de los Datos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO DE VIDA DE DATOS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [1. CAPTURA]  →  [2. PROCESAMIENTO]  →  [3. ANÁLISIS]  →  [4. PRESERVACIÓN]
│        │                   │                    │                  │        │
│   Drones DJI          Supabase +            Modelos IA        Repositorio   │
│   Cámaras FLIR        pgvector +            YOLO + RAG        CONCYTEC      │
│   Tablets campo       Hunyuan3D                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3.1 Fase de Captura (Meses 1-18)

| Fuente de Datos | Descripción | Frecuencia | Responsable |
|-----------------|-------------|------------|-------------|
| **Drone DJI Mavic 3 Pro** | Imágenes aéreas y video 4K de obras | Cada visita a obra (5+ viajes) | Tesista |
| **Cámara térmica FLIR** | Imágenes térmicas para detección de anomalías | Cada validación en campo | Tesista |
| **Tablets industriales** | Registros manuales de observaciones in situ | Continuo durante validación | RT + Tesista |
| **APIs externas** | Datos normativos (NTPs desde INACAL) | Una vez (carga inicial) | Co-I |

#### 3.2 Fase de Procesamiento (Continuo)

| Proceso | Tecnología | Entrada | Salida | Almacenamiento |
|---------|------------|---------|--------|----------------|
| **Reconstrucción 3D** | API Hunyuan3D (Tencent) | Imágenes aéreas | Modelos OBJ/GLB | Supabase Storage |
| **Etiquetado de dataset** | LabelImg, Roboflow | Imágenes de obra | Anotaciones YOLO | Disco local + backup |
| **Generación de embeddings** | OpenAI/Anthropic API | Texto de NTPs (PDF) | Vectores 1536-dim | pgvector (Supabase) |
| **Entrenamiento YOLO** | Python + CUDA | Dataset etiquetado | Modelo .pt/.onnx | Servidor GPU local |
| **Almacenamiento estructurado** | Supabase (PostgreSQL) | Todos los metadatos | Tablas relacionales | Cloud (AWS) |

#### 3.3 Fase de Análisis (Meses 12-24)

| Análisis | Datos Utilizados | Método | Resultado |
|----------|------------------|--------|-----------|
| Detección de desviaciones geométricas | Modelos 3D vs. diseño BIM | Comparación punto a punto | Mapas de calor de desviación |
| Detección de riesgos SSOMA | Imágenes en tiempo real | Inferencia YOLO v8 | Alertas con bounding boxes |
| Consultas normativas | Base vectorial de NTPs | RAG con LLM | Respuestas contextualizadas |
| Métricas de validación | Datos de campo | Precisión, Recall, F1-Score | Tablas de resultados |

#### 3.4 Fase de Preservación y Depósito (Meses 23-24)

| Destino | Tipo de Datos | Formato | Licencia |
|---------|---------------|---------|----------|
| **Repositorio Institucional de la Universidad** | Tesis, artículos, datasets | PDF, CSV, JSON | CC BY 4.0 |
| **ALICIA (CONCYTEC)** | Publicaciones científicas | PDF | Acceso Abierto |
| **Repositorio Nacional Digital CTI** | Datasets de investigación | CSV, JSON, Parquet | CC BY 4.0 |
| **GitHub/Zenodo** | Código fuente | TypeScript, Python | MIT License |
| **Hugging Face** | Modelos entrenados (YOLO) | ONNX, PyTorch | Apache 2.0 |

---

### 4. Almacenamiento y Seguridad en Supabase

#### 4.1 Estructura de Almacenamiento

```sql
-- Esquema de base de datos en Supabase (PostgreSQL)

-- Tabla principal de proyectos de construcción
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    organization_id UUID REFERENCES organizations(id)
);

-- Tabla de capturas de drone
CREATE TABLE drone_captures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    capture_date DATE NOT NULL,
    image_urls TEXT[], -- Array de URLs en Supabase Storage
    metadata JSONB,
    processed BOOLEAN DEFAULT FALSE
);

-- Tabla de modelos 3D reconstruidos
CREATE TABLE models_3d (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    capture_id UUID REFERENCES drone_captures(id),
    model_url TEXT,
    format TEXT CHECK (format IN ('obj', 'glb', 'ply')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de detecciones SSOMA
CREATE TABLE ssoma_detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    detection_type TEXT,
    confidence FLOAT,
    bbox JSONB, -- {x, y, width, height}
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de embeddings (pgvector)
CREATE TABLE ntp_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ntp_code TEXT NOT NULL, -- Ej: "E.060", "G.050"
    chunk_text TEXT,
    embedding VECTOR(1536), -- OpenAI ada-002
    metadata JSONB
);
```

#### 4.2 Medidas de Seguridad

| Medida | Implementación |
|--------|----------------|
| **Cifrado en tránsito** | HTTPS/TLS 1.3 para todas las conexiones |
| **Cifrado en reposo** | AES-256 en Supabase Storage |
| **Autenticación** | Supabase Auth con JWT + MFA |
| **Autorización** | Row Level Security (RLS) por organización |
| **Backups** | Automáticos diarios (retención 30 días) |
| **Anonimización** | Rostros de trabajadores pixelados en imágenes públicas |
| **Auditoría** | Logs de acceso en tabla `audit_logs` |

#### 4.3 Política de Retención

| Tipo de Dato | Retención en Producción | Archivo a Largo Plazo |
|--------------|-------------------------|------------------------|
| Imágenes originales de drone | 24 meses | Repositorio institucional (10 años) |
| Modelos 3D procesados | Permanente | Zenodo (DOI permanente) |
| Datasets etiquetados | Permanente | Hugging Face + Zenodo |
| Logs de sistema | 6 meses | Archivo comprimido (5 años) |
| Datos de usuarios | Según LGPD | Eliminación tras cierre de proyecto |

---

### 5. Acceso y Compartición de Datos

#### 5.1 Niveles de Acceso

| Rol | Datos Accesibles | Permisos |
|-----|------------------|----------|
| **Responsable Técnico** | Todos los datos | Lectura, escritura, eliminación |
| **Co-Investigador** | Todos los datos | Lectura, escritura |
| **Tesista** | Datos de su scope de tesis | Lectura, escritura limitada |
| **Gestor Tecnológico** | Metadatos de PI | Lectura |
| **Empresa constructora (validación)** | Solo sus proyectos | Lectura |
| **Público (post-publicación)** | Datasets anonimizados | Lectura (CC BY 4.0) |

#### 5.2 Embargo y Liberación

| Tipo de Dato | Período de Embargo | Fecha de Liberación |
|--------------|--------------------|--------------------|
| Datos de validación en campo | Hasta publicación de artículos | Mes 24 o fecha de aceptación |
| Código fuente | Sin embargo | Inmediato (GitHub público) |
| Modelos entrenados | Hasta aceptación de artículo | Mes 20 aprox. |
| Tesis completa | Hasta sustentación | Mes 23 |

---

### 6. Depósito en Repositorios (Ley N° 30035)

#### 6.1 Repositorio Institucional

| Campo | Valor |
|-------|-------|
| **Universidad** | [A DEFINIR] |
| **URL del Repositorio** | [URL del repositorio institucional] |
| **Formato de metadatos** | Dublin Core |
| **Colección destino** | Tesis de Pregrado / Proyectos de Investigación |

#### 6.2 ALICIA - Acceso Libre a Información Científica

| Campo | Valor |
|-------|-------|
| **URL** | https://alicia.concytec.gob.pe |
| **Tipos de documentos** | Artículos científicos, Tesis |
| **Cosecha OAI-PMH** | Automática desde repositorio institucional |
| **Plazo máximo de depósito** | 30 días después de publicación/sustentación |

#### 6.3 Repositorio Nacional Digital de CTI

| Campo | Valor |
|-------|-------|
| **Entidad responsable** | CONCYTEC |
| **Tipos de datos** | Datasets de investigación, código fuente |
| **Formato preferido** | CSV, JSON, Parquet (datos), ZIP (código) |
| **Licencia requerida** | Creative Commons (CC BY 4.0 recomendado) |
| **Metadatos** | DataCite Schema |

---

### 7. Identificadores Persistentes

| Recurso | Identificador | Proveedor |
|---------|---------------|-----------|
| **Artículos científicos** | DOI | Crossref (vía editorial) |
| **Datasets** | DOI | Zenodo |
| **Código fuente** | DOI | Zenodo (release de GitHub) |
| **Tesis** | Handle | Repositorio institucional |
| **Investigadores** | ORCID | ORCID.org |
| **Entidad** | ROR | ROR.org |

---

### 8. Responsabilidades

| Rol | Responsabilidad en Gestión de Datos |
|-----|-------------------------------------|
| **RT (Data Steward)** | Supervisar cumplimiento del PGD, aprobar depósitos |
| **Co-I** | Curar metadatos, verificar calidad de datos |
| **Tesista** | Capturar, etiquetar y documentar datasets |
| **GT** | Asegurar depósito en repositorios, gestionar licencias |
| **GP** | Verificar cumplimiento de plazos de depósito |

---

### 9. Presupuesto para Gestión de Datos

| Concepto | Incluido en Rubro | Monto Estimado (S/) |
|----------|-------------------|---------------------|
| Supabase Pro (24 meses) | Servicios de Terceros | 2,400 |
| Almacenamiento adicional (500 GB) | Servicios de Terceros | 600 |
| DOI para datasets (Zenodo) | Gratuito | 0 |
| Repositorio institucional | Contrapartida (ES) | 0 |
| Anonimización de imágenes | Servicios de Terceros | 500 |
| **Total** | | **3,500** |

---

### 10. Plan de Contingencia

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Pérdida de datos en cloud | Baja | Alto | Backups automáticos + copia local |
| Falla de Supabase | Baja | Alto | Exportación mensual a backup externo |
| Robo de equipos en campo | Media | Medio | Sincronización inmediata a cloud |
| Violación de privacidad | Baja | Alto | Anonimización previa a publicación |
| Incumplimiento de depósito | Media | Alto | Alertas de calendario en GP |

---

### 11. Actualización del Plan

Este Plan de Gestión de Datos será revisado y actualizado:

- [ ] Al inicio del proyecto (Mes 1)
- [ ] En cada informe semestral (Meses 6, 12, 18)
- [ ] Antes del cierre del proyecto (Mes 23)
- [ ] Ante cambios significativos en la recolección de datos

**Responsable de actualización:** Responsable Técnico (RT)

---

### 12. Declaración de Cumplimiento

> El equipo de investigación se compromete a cumplir con lo establecido en la **Ley N° 30035** y su Reglamento, depositando los datos y publicaciones resultantes de este proyecto en el **Repositorio Nacional Digital de Ciencia, Tecnología e Innovación** dentro de los plazos establecidos.
>
> Asimismo, se garantiza que los datos personales recolectados (imágenes de trabajadores) serán tratados conforme a la **Ley N° 29733 - Ley de Protección de Datos Personales**.

---

*Documento adaptado para postulación al Concurso de Investigación Aplicada E041-2026-02 - ProCiencia*  
*Última actualización: 29 de Enero de 2026*
