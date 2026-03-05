import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileBox, CheckCircle, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Temporal static placeholders
const TEMP_PROJECT_ID = '11111111-1111-1111-1111-111111111111';
const TEMP_USER_ID = '22222222-2222-2222-2222-222222222222';
const BUCKET_NAME = 'spatial-scans-bucket';

export default function IngestaView() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'model/obj': ['.obj'],
            'application/zip': ['.zip']
        },
        maxFiles: 1,
        multiple: false
    });

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(10); // Start progress

        try {
            if (!supabase) {
                throw new Error('Supabase client not initialized');
            }

            // 1. Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `scans/${TEMP_PROJECT_ID}/${fileName}`;

            setUploadProgress(30);

            const { error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                throw new Error(`Storage error: ${uploadError.message}`);
            }

            setUploadProgress(60);

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(filePath);

            setUploadProgress(80);

            // 3. Register in Database
            const { data: scanData, error: dbError } = await (supabase as any)
                .from('spatial_scans')
                .insert({
                    project_id: TEMP_PROJECT_ID,
                    uploaded_by: TEMP_USER_ID,
                    obj_file_url: publicUrl,
                    status: 'PENDING_PROCESSING',
                    metadata: {
                        originalName: file.name,
                        size: file.size,
                        type: file.type
                    }
                })
                .select(); // Need to select to get the ID back

            if (dbError || !scanData || scanData.length === 0) {
                // If DB insert fails, we might want to cleanup the storage, but for now we throw
                throw new Error(`Database error: ${dbError?.message || 'Failed to insert'}`);
            }

            // 4. Trigger n8n Webhook
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
            if (webhookUrl) {
                try {
                    // We do this non-blocking to return fast to user
                    fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            record: {
                                id: scanData[0].id,
                                tenant_id: TEMP_PROJECT_ID
                            }
                        })
                    }).catch(err => console.error("Error triggering n8n webhook:", err));
                } catch (webhookErr) {
                    console.error("Critical error in webhook execution block:", webhookErr);
                }
            }

            setUploadProgress(100);
            toast.success('Modelo 3D subido con éxito', {
                description: 'El archivo ha sido enviado para su procesamiento.',
                icon: <CheckCircle className="text-green-500" />
            });

            // Reset state after success
            setTimeout(() => {
                setFile(null);
                setUploadProgress(0);
                setIsUploading(false);
            }, 1500);

        } catch (error: any) {
            console.error('Upload failed:', error);
            toast.error('Error al subir el archivo', {
                description: error.message || 'Ocurrió un error inesperado durante la subida.',
                icon: <AlertCircle className="text-red-500" />
            });
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Ingesta de Datos (Verdad de Campo)</h2>
                <p className="text-gray-400">
                    Sube tus modelos 3D (.OBJ) o escaneos empaquetados (.ZIP) para que el Cerebro Legal y la Auditoría IA comiencen su análisis espacial y normativo.
                </p>
            </div>

            <div className="bg-slate-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl">
                <div
                    {...getRootProps()}
                    className={`
            relative flex flex-col items-center justify-center w-full h-80 
            border-2 border-dashed rounded-xl cursor-pointer 
            transition-all duration-300 ease-in-out
            ${isDragActive ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800/50'}
            ${isDragReject ? 'border-red-500 bg-red-500/10' : ''}
            ${file ? 'border-orange-safety/50 bg-orange-safety/5' : ''}
            ${isUploading ? 'pointer-events-none opacity-80' : ''}
          `}
                >
                    <input {...getInputProps()} />

                    {file ? (
                        <div className="flex flex-col items-center text-center p-6 w-full max-w-md">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-safety to-cyan-electric rounded-2xl flex items-center justify-center mb-4 relative shadow-lg">
                                <FileBox className="text-white w-8 h-8" />
                                {!isUploading && (
                                    <button
                                        onClick={removeFile}
                                        className="absolute -top-2 -right-2 bg-slate-800 border border-gray-600 rounded-full p-1 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-1 truncate w-full">{file.name}</h3>
                            <p className="text-sm text-gray-400 mb-6 font-mono">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>

                            {isUploading ? (
                                <div className="w-full space-y-3">
                                    <div className="flex justify-between text-xs font-medium text-gray-400">
                                        <span>Subiendo a Storage...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-cyan-electric to-orange-safety h-2 transition-all duration-300 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpload();
                                    }}
                                    className="px-8 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                >
                                    <UploadCloud className="w-5 h-5" />
                                    Iniciar Procesamiento
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10">
                                <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-cyan-500 animate-bounce' : 'text-gray-400'}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {isDragActive ? 'Suelta el archivo aquí...' : 'Arrastra tu archivo aquí'}
                            </h3>
                            <p className="text-gray-400 max-w-sm mb-6">
                                Soporta formato .OBJ o directorios en .ZIP. El tamaño máximo por defecto depende de tu plan de Supabase.
                            </p>
                            <div className="px-6 py-2 bg-slate-800 text-white font-medium rounded-lg text-sm border border-gray-700 hover:border-gray-500 transition-colors">
                                Examinar Archivos
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-gray-800 p-5 rounded-xl">
                    <div className="text-cyan-500 mb-3"><UploadCloud className="w-6 h-6" /></div>
                    <h4 className="text-white font-medium mb-1">Carga Segura</h4>
                    <p className="text-sm text-gray-400">Tus datos se encriptan en tránsito hasta nuestro Supabase Storage aislado (RLS).</p>
                </div>
                <div className="bg-slate-900 border border-gray-800 p-5 rounded-xl">
                    <div className="text-orange-safety mb-3"><FileBox className="w-6 h-6" /></div>
                    <h4 className="text-white font-medium mb-1">Auto-extracción</h4>
                    <p className="text-sm text-gray-400">Modelos 3D son pre-procesados para aligerar la carga visual en el navegador.</p>
                </div>
                <div className="bg-slate-900 border border-gray-800 p-5 rounded-xl">
                    <div className="text-green-500 mb-3"><CheckCircle className="w-6 h-6" /></div>
                    <h4 className="text-white font-medium mb-1">Gatillo n8n</h4>
                    <p className="text-sm text-gray-400">Una vez registrado, n8n despertará los pipelines de análisis de desviaciones.</p>
                </div>
            </div>
        </div>
    );
}
