import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Book, Loader2, Scale } from 'lucide-react';

interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    normas?: string[];
    timestamp: Date;
}

// Base de conocimiento simulada de NTPs
const NTP_KNOWLEDGE = {
    'recubrimiento': {
        response: `Según la **NTP E.060 - Concreto Armado**, el recubrimiento mínimo del acero de refuerzo depende de las condiciones de exposición:

• **Concreto expuesto al suelo:** 7.5 cm mínimo
• **Concreto en contacto con el suelo (con encofrado):** 5 cm mínimo  
• **Muros y losas no expuestos:** 4 cm para barras ≥ Ø16mm, 2 cm para barras < Ø16mm
• **Columnas y vigas:** 4 cm mínimo

⚠️ **Importante:** El recubrimiento nunca debe ser menor que el diámetro de la barra.`,
        normas: ['NTP E.060 - Concreto Armado', 'ACI 318-19']
    },
    'casco': {
        response: `Según la **Norma G.050 - Seguridad durante la Construcción**, el uso de casco de seguridad es **OBLIGATORIO** en toda obra de construcción:

• **Artículo 17.1:** Todo trabajador debe usar casco de seguridad tipo jockey con barbiquejo.
• **Color del casco:** Debe seguir el código de colores establecido:
  - 🟡 Amarillo: Operarios
  - 🔵 Azul: Técnicos
  - ⚪ Blanco: Ingenieros/Supervisores
  - 🟢 Verde: Seguridad
  - 🔴 Rojo: Visitantes

⚠️ **Sanción:** El incumplimiento puede resultar en paralización de obra según D.S. 011-2019-TR.`,
        normas: ['Norma G.050', 'D.S. 011-2019-TR', 'R.M. 050-2013-TR']
    },
    'columna': {
        response: `Para el diseño de **columnas** según **NTP E.060**:

**Dimensiones mínimas:**
• Lado mínimo: 25 cm (columnas rectangulares)
• Diámetro mínimo: 25 cm (columnas circulares)

**Cuantía de acero:**
• Mínima: 1% del área bruta (Ag)
• Máxima: 6% del área bruta (Ag), o 4% en zonas de traslape

**Estribos:**
• Espaciamiento máximo: menor de 16 db, 48 de, o dimensión menor de la columna
• En zona de confinamiento (Lo): espaciamiento ≤ 10 cm

**Longitud de confinamiento (Lo):**
• Mayor de: h/6, 50 cm, o la mayor dimensión de la sección`,
        normas: ['NTP E.060 - Concreto Armado', 'NTP E.030 - Diseño Sismorresistente']
    },
    'arnés': {
        response: `Según **Norma G.050**, el uso de **arnés de seguridad** es obligatorio para trabajos en altura:

**Requisitos:**
• Obligatorio para trabajos a más de **1.80 metros** de altura
• El arnés debe ser de cuerpo completo con punto de anclaje dorsal
• Línea de vida con absorbedor de impacto (factor de caída ≤ 1)

**Puntos de anclaje:**
• Resistencia mínima: 2,265 kg (22.2 kN) por trabajador
• Debe estar certificado y revisado diariamente

**Inspección:**
• Antes de cada uso: revisar costuras, hebillas, y mosquetones
• Retiro inmediato si presenta: cortes, desgaste, o deformación

⚠️ **Prohibido:** Usar arnés sin punto de anclaje o con línea de vida dañada.`,
        normas: ['Norma G.050', 'ANSI Z359.1', 'R.M. 050-2013-TR']
    },
    'encofrado': {
        response: `Según **NTP E.060** y buenas prácticas de construcción:

**Tiempo mínimo de desencofrado:**
• Costados de vigas y columnas: 24-48 horas
• Fondos de losas (con puntales): 7 días
• Fondos de vigas (con puntales): 14 días
• Retiro total de puntales: 21-28 días

**Requisitos del encofrado:**
• Debe soportar peso del concreto fresco + cargas de construcción
• Estanqueidad para evitar pérdida de lechada
• Aplomado y nivelado con tolerancia ≤ 1 cm

**Control de calidad:**
• Verificar alineamiento antes del vaciado
• Aplicar desmoldante 24h antes
• Humedecer madera antes del vaciado`,
        normas: ['NTP E.060', 'ACI 347', 'Manual de Construcción en Acero AISC']
    },
    'epp': {
        response: `**Equipos de Protección Personal (EPP)** obligatorios según **Norma G.050**:

**EPP Básico (obligatorio en toda la obra):**
• 🪖 Casco de seguridad con barbiquejo
• 👢 Zapatos de seguridad con punta de acero
• 🦺 Chaleco reflectivo de alta visibilidad
• 🧤 Guantes según actividad

**EPP Específico por actividad:**
• **Soldadura:** Careta, mandil, guantes de cuero
• **Altura:** Arnés de cuerpo completo
• **Polvo/químicos:** Respirador con filtros
• **Ruido:** Tapones u orejeras (> 85 dB)
• **Proyección:** Lentes de seguridad

**Responsabilidades:**
• Empleador: Proporcionar EPP gratuito y en buen estado
• Trabajador: Usar correctamente y reportar deterioro`,
        normas: ['Norma G.050', 'Ley 29783', 'D.S. 005-2012-TR']
    }
};

function findBestMatch(query: string): { response: string; normas: string[] } | null {
    const normalizedQuery = query.toLowerCase();

    for (const [keyword, data] of Object.entries(NTP_KNOWLEDGE)) {
        if (normalizedQuery.includes(keyword)) {
            return data;
        }
    }

    // Búsqueda por palabras clave adicionales
    if (normalizedQuery.includes('seguridad') || normalizedQuery.includes('epp') || normalizedQuery.includes('protección')) {
        return NTP_KNOWLEDGE['epp'];
    }
    if (normalizedQuery.includes('altura') || normalizedQuery.includes('caída')) {
        return NTP_KNOWLEDGE['arnés'];
    }
    if (normalizedQuery.includes('concreto') || normalizedQuery.includes('vaciado')) {
        return NTP_KNOWLEDGE['encofrado'];
    }
    if (normalizedQuery.includes('norma') || normalizedQuery.includes('ntp') || normalizedQuery.includes('reglamento')) {
        return {
            response: `Las principales normas técnicas peruanas (NTP) para construcción son:

**Estructuras:**
• **E.020** - Cargas
• **E.030** - Diseño Sismorresistente
• **E.050** - Suelos y Cimentaciones
• **E.060** - Concreto Armado
• **E.070** - Albañilería
• **E.090** - Estructuras Metálicas

**Seguridad:**
• **G.050** - Seguridad durante la Construcción
• **Ley 29783** - Ley de Seguridad y Salud en el Trabajo

¿Sobre qué norma específica necesitas información?`,
            normas: ['Reglamento Nacional de Edificaciones (RNE)']
        };
    }

    return null;
}

export default function CerebroLegalView() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            role: 'assistant',
            content: `¡Hola! Soy el **Cerebro Legal Técnico** de Supervisor IA 4.0. 🧠

Puedo ayudarte con consultas sobre:
• Normas Técnicas Peruanas (NTP E.060, E.030, etc.)
• Norma G.050 de Seguridad en Construcción
• Requisitos de EPP y trabajo seguro
• Especificaciones técnicas de elementos estructurales

**Ejemplos de preguntas:**
- "¿Cuál es el recubrimiento mínimo del acero?"
- "¿Cuándo es obligatorio usar arnés?"
- "¿Qué dice la norma sobre columnas?"

Escribe tu consulta para comenzar.`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage: Message = {
            id: messages.length,
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simular delay de "pensamiento"
        await new Promise(resolve => setTimeout(resolve, 1500));

        const match = findBestMatch(input);

        const assistantMessage: Message = {
            id: messages.length + 1,
            role: 'assistant',
            content: match?.response || `No encontré información específica sobre "${input}" en mi base de conocimiento.

Te sugiero reformular tu pregunta usando términos como:
• Recubrimiento, columna, viga, losa
• Casco, arnés, EPP, seguridad
• Encofrado, desencofrado, concreto
• Norma, NTP, reglamento

O puedes consultar directamente el [Reglamento Nacional de Edificaciones](https://www.gob.pe/rne).`,
            normas: match?.normas,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-full flex flex-col max-h-[calc(100vh-200px)]">
            {/* Header */}
            <div className="glass rounded-[20px] p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30">
                        <Brain className="text-purple-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Cerebro Legal Técnico
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                                RAG Simulado
                            </span>
                        </h2>
                        <p className="text-sm text-gray-400">Consultas sobre NTP y normativa de construcción</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="glass px-3 py-2 rounded-lg border border-cyan-500/30">
                        <p className="text-xs text-gray-500">Base de datos</p>
                        <p className="text-sm font-bold text-cyan-400">6 NTPs</p>
                    </div>
                    <div className="glass px-3 py-2 rounded-lg border border-green-500/30">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-sm font-bold text-green-400">Activo</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 glass rounded-[20px] p-4 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user'
                                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-white'
                                    : 'bg-gray-800/50 border border-gray-700 text-gray-200'
                                    }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
                                        <Scale size={16} className="text-purple-400" />
                                        <span className="text-xs text-purple-400 font-semibold">Cerebro Legal</span>
                                    </div>
                                )}
                                <div
                                    className="text-sm whitespace-pre-wrap prose prose-invert prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: message.content
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400">$1</strong>')
                                            .replace(/\n/g, '<br/>')
                                    }}
                                />
                                {message.normas && message.normas.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-700">
                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                            <Book size={12} />
                                            Referencias normativas:
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {message.normas.map((norma, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 rounded border border-purple-500/20"
                                                >
                                                    {norma}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <p className="text-[10px] text-gray-500 mt-2">
                                    {message.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 flex items-center gap-2">
                                <Loader2 size={16} className="text-purple-400 animate-spin" />
                                <span className="text-sm text-gray-400">Consultando normativa...</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu consulta sobre normativa..."
                            className="flex-1 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <Send size={18} />
                            Enviar
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                        ⚠️ Sistema en modo simulación. Para producción, conectar con pgvector y embeddings reales.
                    </p>
                </div>
            </div>
        </div>
    );
}
