import { useState, useRef, useEffect } from 'react';
import { Box, Maximize2, ZoomIn, ZoomOut, Layers, Play, Pause, RefreshCw } from 'lucide-react';
import * as THREE from 'three';

export default function BIMView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number>(0);
  const [isRotating, setIsRotating] = useState(true);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = zoom;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 20, 0x00e5ff, 0x1a2744);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 0.5);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);

    // Building structure (simplified)
    const buildingGroup = new THREE.Group();

    // Base/Foundation
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 3);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      metalness: 0.3,
      roughness: 0.7
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.4;
    buildingGroup.add(base);

    // Columns
    const columnGeometry = new THREE.BoxGeometry(0.15, 2, 0.15);
    const columnMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.5,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8
    });

    const columnPositions = [
      [-1.2, -0.3, -1.2],
      [1.2, -0.3, -1.2],
      [-1.2, -0.3, 1.2],
      [1.2, -0.3, 1.2],
      [0, -0.3, -1.2],
      [0, -0.3, 1.2],
    ];

    columnPositions.forEach(pos => {
      const column = new THREE.Mesh(columnGeometry, columnMaterial);
      column.position.set(pos[0], pos[1], pos[2]);
      buildingGroup.add(column);
    });

    // Floor slabs
    const slabGeometry = new THREE.BoxGeometry(2.8, 0.15, 2.8);
    const slabMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.2,
      roughness: 0.5,
      transparent: true,
      opacity: 0.7
    });

    const slab1 = new THREE.Mesh(slabGeometry, slabMaterial);
    slab1.position.y = 0.7;
    buildingGroup.add(slab1);

    // Beams
    const beamGeometry = new THREE.BoxGeometry(2.8, 0.2, 0.15);
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      metalness: 0.4,
      roughness: 0.4
    });

    const beam1 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam1.position.set(0, 0.5, -1.2);
    buildingGroup.add(beam1);

    const beam2 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam2.position.set(0, 0.5, 1.2);
    buildingGroup.add(beam2);

    const beam3 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam3.rotation.y = Math.PI / 2;
    beam3.position.set(-1.2, 0.5, 0);
    buildingGroup.add(beam3);

    const beam4 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam4.rotation.y = Math.PI / 2;
    beam4.position.set(1.2, 0.5, 0);
    buildingGroup.add(beam4);

    // Wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });

    const wireframeBox = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 3), wireframeMaterial);
    wireframeBox.position.y = -0.1;
    buildingGroup.add(wireframeBox);

    scene.add(buildingGroup);

    // Animation
    let rotationAngle = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (isRotating) {
        rotationAngle += 0.005;
        buildingGroup.rotation.y = rotationAngle;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  // Update zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoom;
    }
  }, [zoom]);

  const handleZoomIn = () => setZoom(prev => Math.max(2, prev - 1));
  const handleZoomOut = () => setZoom(prev => Math.min(10, prev + 1));
  const handleReset = () => {
    setZoom(5);
    setIsRotating(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="glass rounded-[20px] p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-electric/20 rounded-lg">
            <Box className="text-cyan-electric" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Modelo BIM 360
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                Three.js
              </span>
            </h2>
            <p className="text-sm text-gray-400">Visualización 3D del proyecto estructural</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} className="text-gray-400" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} className="text-gray-400" />
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 glass rounded-lg transition-colors ${isRotating ? 'bg-cyan-500/20 border border-cyan-500/30' : 'hover:bg-gray-800/50'}`}
            title={isRotating ? "Pausar rotación" : "Rotar"}
          >
            {isRotating ? (
              <Pause size={18} className="text-cyan-400" />
            ) : (
              <Play size={18} className="text-gray-400" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors"
            title="Resetear vista"
          >
            <RefreshCw size={18} className="text-gray-400" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Capas">
            <Layers size={18} className="text-gray-400" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-gray-800/50 transition-colors" title="Pantalla Completa">
            <Maximize2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* 3D Viewer Area */}
      <div className="flex-1 glass rounded-[20px] relative overflow-hidden">
        <div ref={containerRef} className="w-full h-full" />

        {/* Corner indicators */}
        <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg">
          <p className="text-xs font-mono text-cyan-electric">
            Zoom: {((10 - zoom) / 8 * 100 + 25).toFixed(0)}%
          </p>
        </div>

        <div className="absolute top-4 right-4 glass px-3 py-2 rounded-lg">
          <p className="text-xs font-mono text-gray-500">
            {isRotating ? '🔄 Rotando' : '⏸️ Pausado'}
          </p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass px-4 py-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-2 font-semibold">Leyenda:</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-cyan-400 rounded-sm" />
              <span className="text-gray-400">Columnas</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <span className="text-gray-400">Vigas</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-orange-500 rounded-sm" />
              <span className="text-gray-400">Losas</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-lg">
          <p className="text-xs font-mono text-gray-500">Escala 1:100</p>
        </div>
      </div>
    </div>
  );
}
