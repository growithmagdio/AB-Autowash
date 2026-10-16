import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Star, RotateCcw } from 'lucide-react';
import { siteContent } from '../content/site';

interface Hero3DProps {
  lang: 'en' | 'ta';
  onOpenBooking: () => void;
}

export interface CarColorOption {
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

export const CAR_COLORS: CarColorOption[] = [
  {
    name: 'Obsidian Black',
    hex: '#0D0E12',
    metalness: 0.92,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03
  },
  {
    name: 'Champagne Gold',
    hex: '#D9B544',
    metalness: 0.85,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04
  },
  {
    name: 'Racing Red',
    hex: '#A8141F',
    metalness: 0.82,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03
  },
  {
    name: 'Platinum Silver',
    hex: '#D8D9DC',
    metalness: 0.94,
    roughness: 0.20,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04
  }
];

export const Hero3D: React.FC<Hero3DProps> = ({ lang, onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<CarColorOption>(CAR_COLORS[0]);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  const paintMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const turntableGroupRef = useRef<THREE.Group | null>(null);
  const resetCameraRef = useRef<(() => void) | null>(null);

  const t = siteContent.uiStrings[lang];

  // Helper: Procedural High-Contrast Studio Environment Map with Softboxes
  const createStudioEnvironment = (renderer: THREE.WebGLRenderer): THREE.Texture => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Background gradient: Deep obsidian studio atmosphere
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
    bgGrad.addColorStop(0, '#101116');
    bgGrad.addColorStop(0.5, '#070709');
    bgGrad.addColorStop(1, '#030304');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // 1. Large Overhead Softbox Bank (illuminates roof, hood, rear glass)
    const topSoftbox = ctx.createRadialGradient(512, 100, 10, 512, 100, 260);
    topSoftbox.addColorStop(0, 'rgba(255, 255, 255, 1)');
    topSoftbox.addColorStop(0.3, 'rgba(240, 245, 255, 0.9)');
    topSoftbox.addColorStop(0.7, 'rgba(217, 181, 68, 0.25)');
    topSoftbox.addColorStop(1, 'transparent');
    ctx.fillStyle = topSoftbox;
    ctx.fillRect(180, 0, 664, 240);

    // 2. Left Lateral Strip Softbox (razor-sharp shoulder line highlight)
    const leftStrip = ctx.createLinearGradient(120, 140, 190, 140);
    leftStrip.addColorStop(0, 'transparent');
    leftStrip.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    leftStrip.addColorStop(1, 'transparent');
    ctx.fillStyle = leftStrip;
    ctx.fillRect(100, 120, 110, 220);

    // 3. Right Lateral Strip Softbox (aerodynamic side-flank reflection)
    const rightStrip = ctx.createLinearGradient(834, 140, 904, 140);
    rightStrip.addColorStop(0, 'transparent');
    rightStrip.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    rightStrip.addColorStop(1, 'transparent');
    ctx.fillStyle = rightStrip;
    ctx.fillRect(814, 120, 110, 220);

    // 4. Rear Warm Gold Accent Softbox (illuminates car silhouette & haunches)
    const goldRim = ctx.createRadialGradient(256, 380, 10, 256, 380, 190);
    goldRim.addColorStop(0, 'rgba(217, 181, 68, 0.95)');
    goldRim.addColorStop(0.5, 'rgba(167, 131, 32, 0.45)');
    goldRim.addColorStop(1, 'transparent');
    ctx.fillStyle = goldRim;
    ctx.fillRect(80, 260, 350, 240);

    // 5. Front Daylight Key Softbox
    const frontSoftbox = ctx.createRadialGradient(768, 380, 10, 768, 380, 190);
    frontSoftbox.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    frontSoftbox.addColorStop(0.6, 'rgba(220, 230, 245, 0.3)');
    frontSoftbox.addColorStop(1, 'transparent');
    ctx.fillStyle = frontSoftbox;
    ctx.fillRect(590, 260, 350, 240);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    pmremGenerator.dispose();
    texture.dispose();

    return envMap;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }
    } catch {
      setWebGlAvailable(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090909);
    // Subtle distant fog so car is completely clear and never obscured
    scene.fog = new THREE.FogExp2(0x090909, 0.022);

    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 38, width / height, 0.1, 100);

    // Position camera with optimal 3/4 beauty angle:
    // Slightly pulled back on mobile to fit the entire car
    const defaultCamRadius = isMobile ? 8.2 : 6.8;
    let cameraAngleY = isMobile ? 0.95 : 0.78;
    let cameraElevation = isMobile ? 0.30 : 0.26; // radians elevation

    const updateCameraPos = () => {
      const cx = defaultCamRadius * Math.cos(cameraElevation) * Math.sin(cameraAngleY);
      const cy = defaultCamRadius * Math.sin(cameraElevation) + (isMobile ? 0.2 : 0.1);
      const cz = defaultCamRadius * Math.cos(cameraElevation) * Math.cos(cameraAngleY);
      camera.position.set(cx, cy, cz);
      // Look slightly above turntable center for perfect optical balance
      camera.lookAt(isMobile ? 0 : 0.4, 0.45, 0);
    };
    updateCameraPos();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. High-End Studio Environment Map
    const studioEnvMap = createStudioEnvironment(renderer);
    scene.environment = studioEnvMap;

    // 3. Turntable Root Group
    const turntableGroup = new THREE.Group();
    // Shift slightly to right on desktop so text on left doesn't cover vehicle
    if (!isMobile) {
      turntableGroup.position.x = 0.5;
    }
    scene.add(turntableGroup);
    turntableGroupRef.current = turntableGroup;

    // Turntable Platform
    const platformGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.14, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x111114,
      roughness: 0.28,
      metalness: 0.85
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.07;
    platform.receiveShadow = true;
    turntableGroup.add(platform);

    // Glowing Champagne Gold Outer Ring
    const ringGeo = new THREE.TorusGeometry(3.62, 0.035, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD9B544,
      emissive: 0xD9B544,
      emissiveIntensity: 2.8,
      roughness: 0.2,
      metalness: 0.95
    });
    const goldRing = new THREE.Mesh(ringGeo, ringMat);
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = 0.01;
    turntableGroup.add(goldRing);

    // Soft Contact Shadow Plane Underbody
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d')!;
    const shadowGrad = sCtx.createRadialGradient(256, 256, 40, 256, 256, 240);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
    shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
    shadowGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.2)');
    shadowGrad.addColorStop(1, 'transparent');
    sCtx.fillStyle = shadowGrad;
    sCtx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 3.2), shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.02;
    turntableGroup.add(contactShadow);

    // Surrounding Polished Floor with Studio Yellow Boundary Accent Lines
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090909,
      roughness: 0.16,
      metalness: 0.9
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.14;
    floor.receiveShadow = true;
    scene.add(floor);

    const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xFFC400, opacity: 0.8, transparent: true });
    const createStudioLine = (w: number, d: number, x: number, z: number) => {
      const lineMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), yellowLineMat);
      lineMesh.rotation.x = -Math.PI / 2;
      lineMesh.position.set(x, -0.13, z);
      scene.add(lineMesh);
    };
    createStudioLine(0.08, 9.5, -4.5 + (isMobile ? 0 : 0.5), 0);
    createStudioLine(0.08, 9.5, 4.5 + (isMobile ? 0 : 0.5), 0);
    createStudioLine(9.08, 0.08, isMobile ? 0 : 0.5, 4.75);
    createStudioLine(9.08, 0.08, isMobile ? 0 : 0.5, -4.75);

    // 4. Honeycomb Hexagon Ceiling Light Grid (Matching Real Auto Bright Studio)
    const ceilingGroup = new THREE.Group();
    scene.add(ceilingGroup);
    ceilingGroup.position.set(isMobile ? 0 : 0.5, 3.6, 0);

    const hexLightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 4.2,
      roughness: 0.08
    });

    const createHexagonLight = (radius: number, x: number, z: number) => {
      const hexGroup = new THREE.Group();
      for (let i = 0; i < 6; i++) {
        const angle1 = (i * Math.PI) / 3;
        const angle2 = ((i + 1) * Math.PI) / 3;
        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;

        const length = Math.hypot(x2 - x1, z2 - z1);
        const tubeGeo = new THREE.CylinderGeometry(0.025, 0.025, length, 8);
        const tube = new THREE.Mesh(tubeGeo, hexLightMat);
        tube.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
        tube.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(x2 - x1, 0, z2 - z1).normalize()
        );
        hexGroup.add(tube);
      }
      hexGroup.position.set(x, 0, z);
      return hexGroup;
    };

    const hr = 1.18;
    const hdx = hr * Math.sqrt(3);
    const hdz = hr * 1.5;
    ceilingGroup.add(createHexagonLight(hr, 0, 0));
    ceilingGroup.add(createHexagonLight(hr, hdx, 0));
    ceilingGroup.add(createHexagonLight(hr, -hdx, 0));
    ceilingGroup.add(createHexagonLight(hr, hdx / 2, hdz));
    ceilingGroup.add(createHexagonLight(hr, -hdx / 2, hdz));
    ceilingGroup.add(createHexagonLight(hr, hdx / 2, -hdz));
    ceilingGroup.add(createHexagonLight(hr, -hdx / 2, -hdz));

    // 5. Studio Lighting Rig (Ensures the car silhouette & glossy panels pop vibrantly!)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Overhead Studio Daylight (illuminates hood, clearcoat reflections)
    const topLight = new THREE.DirectionalLight(0xffffff, 3.5);
    topLight.position.set(0, 7, 1);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    topLight.shadow.bias = -0.0005;
    scene.add(topLight);

    // Front Key Light (illuminates front bumper, grille, and badges)
    const frontKey = new THREE.SpotLight(0xffffff, 4.5, 20, Math.PI / 4, 0.35, 1.2);
    frontKey.position.set(3.5, 3.2, 5.5);
    frontKey.castShadow = true;
    scene.add(frontKey);

    // Golden Rim Lights (Specific highlight around the vehicle silhouette!)
    const goldRimRearLeft = new THREE.SpotLight(0xD9B544, 5.5, 16, Math.PI / 3, 0.4, 1.2);
    goldRimRearLeft.position.set(-4.2, 2.2, -3.8);
    scene.add(goldRimRearLeft);

    const goldRimRearRight = new THREE.SpotLight(0xF0D478, 4.8, 16, Math.PI / 3, 0.4, 1.2);
    goldRimRearRight.position.set(4.2, 2.2, -3.8);
    scene.add(goldRimRearRight);

    // Fill Light on side haunches
    const sideFill = new THREE.DirectionalLight(0xEAEAF5, 2.0);
    sideFill.position.set(-5, 2, 2);
    scene.add(sideFill);

    // 6. Primary PBR Automotive Paint Material
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.hex),
      metalness: selectedColor.metalness,
      roughness: selectedColor.roughness,
      clearcoat: selectedColor.clearcoat,
      clearcoatRoughness: selectedColor.clearcoatRoughness,
      envMapIntensity: 2.2,
      reflectivity: 1.0
    });
    paintMaterialsRef.current = [carPaintMat];

    const wheelChromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.12,
      envMapIntensity: 2.4
    });

    const brakeGoldMat = new THREE.MeshStandardMaterial({
      color: 0xD9B544,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0xD9B544,
      emissiveIntensity: 0.4
    });

    const carGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x081018,
      metalness: 0.9,
      roughness: 0.03,
      transmission: 0.85,
      transparent: true,
      opacity: 0.88,
      ior: 1.52,
      envMapIntensity: 2.6
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.85,
      metalness: 0.08
    });

    const headlampDrlMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 5.0,
      roughness: 0.05
    });

    const tailLightMat = new THREE.MeshStandardMaterial({
      color: 0xcc0015,
      emissive: 0xff0020,
      emissiveIntensity: 4.5,
      roughness: 0.1
    });

    const carHolderGroup = new THREE.Group();
    turntableGroup.add(carHolderGroup);

    // 7. Load Real Luxury Sports Car Model (GLB with DRACOLoader)
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      '/models/car.glb',
      (gltf) => {
        const carScene = gltf.scene;

        // Auto-compute bounding box to perfectly scale & ground on turntable
        const box = new THREE.Box3().setFromObject(carScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Target length ~ 4.4 units
        const scaleFactor = 4.4 / Math.max(size.x, size.z);
        carScene.scale.setScalar(scaleFactor);

        // Center on X and Z, place wheels directly on turntable surface (y = 0.01)
        const newBox = new THREE.Box3().setFromObject(carScene);
        carScene.position.x = -center.x * scaleFactor;
        carScene.position.z = -center.z * scaleFactor;
        carScene.position.y = -newBox.min.y + 0.01;

        // Traverse & assign materials
        const paintArray: THREE.MeshPhysicalMaterial[] = [];

        carScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const name = child.name.toLowerCase();

            if (name.includes('body') || name === 'body') {
              child.material = carPaintMat;
              paintArray.push(carPaintMat);
            } else if (name.includes('rim') || name.includes('wheel')) {
              child.material = wheelChromeMat;
            } else if (name.includes('brake')) {
              child.material = brakeGoldMat;
            } else if (name.includes('glass')) {
              child.material = carGlassMat;
            } else if (name.includes('tire') || name.includes('tyre')) {
              child.material = tireMat;
            } else if (name.includes('light_red') || name.includes('taillight')) {
              child.material = tailLightMat;
            } else if (name.includes('lights') || name.includes('leds')) {
              child.material = headlampDrlMat;
            } else if (child.material) {
              // Ensure default materials reflect studio envMap with rich depth
              const mat = child.material as THREE.MeshStandardMaterial;
              if (mat.isMeshStandardMaterial) {
                mat.envMapIntensity = 1.8;
                mat.needsUpdate = true;
              }
            }
          }
        });

        if (paintArray.length > 0) {
          paintMaterialsRef.current = paintArray;
        }

        carHolderGroup.add(carScene);
      },
      undefined,
      (error) => {
        console.warn('GLB load failed or timed out, activating procedural luxury car:', error);
        buildProceduralSportsCar();
      }
    );

    // Procedural High-Fidelity Backup Sports Car
    const buildProceduralSportsCar = () => {
      const pGroup = new THREE.Group();

      // Sleek contoured sports coupe body
      const chassisGeo = new THREE.BoxGeometry(1.92, 0.48, 4.35);
      const chassis = new THREE.Mesh(chassisGeo, carPaintMat);
      chassis.position.y = 0.42;
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      pGroup.add(chassis);

      // Curved aerodynamic hood
      const hoodGeo = new THREE.CylinderGeometry(0.88, 0.96, 1.75, 24);
      const hood = new THREE.Mesh(hoodGeo, carPaintMat);
      hood.rotation.x = Math.PI / 2;
      hood.rotation.z = Math.PI / 2;
      hood.position.set(0, 0.52, 1.25);
      hood.scale.set(1.0, 0.30, 1.0);
      hood.castShadow = true;
      pGroup.add(hood);

      // Curved Glass Teardrop Cabin
      const cabinGeo = new THREE.BoxGeometry(1.52, 0.52, 2.2);
      const cabin = new THREE.Mesh(cabinGeo, carGlassMat);
      cabin.position.set(0, 0.84, -0.2);
      cabin.castShadow = true;
      pGroup.add(cabin);

      // Roof Panel
      const roofGeo = new THREE.BoxGeometry(1.44, 0.05, 1.7);
      const roof = new THREE.Mesh(roofGeo, carPaintMat);
      roof.position.set(0, 1.10, -0.28);
      roof.castShadow = true;
      pGroup.add(roof);

      // Headlamps with bright DRL Glow
      const drlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.12), headlampDrlMat);
      drlLeft.position.set(0.68, 0.48, 2.14);
      drlLeft.rotation.y = -0.15;
      pGroup.add(drlLeft);

      const drlRight = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.12), headlampDrlMat);
      drlRight.position.set(-0.68, 0.48, 2.14);
      drlRight.rotation.y = 0.15;
      pGroup.add(drlRight);

      // Rear Continuous Cyber Red Lightbar
      const rearLight = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.07, 0.06), tailLightMat);
      rearLight.position.set(0, 0.60, -2.18);
      pGroup.add(rearLight);

      // Wheels
      const wheelPos = [
        { x: 0.98, y: 0.35, z: 1.4 },
        { x: -0.98, y: 0.35, z: 1.4 },
        { x: 0.98, y: 0.35, z: -1.4 },
        { x: -0.98, y: 0.35, z: -1.4 }
      ];

      wheelPos.forEach((pos) => {
        const wGroup = new THREE.Group();
        wGroup.position.set(pos.x, pos.y, pos.z);

        const tyre = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.24, 32), tireMat);
        tyre.rotation.z = Math.PI / 2;
        tyre.castShadow = true;
        wGroup.add(tyre);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.25, 24), wheelChromeMat);
        rim.rotation.z = Math.PI / 2;
        wGroup.add(rim);

        const cal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.06), brakeGoldMat);
        cal.position.set(pos.x > 0 ? -0.06 : 0.06, 0.1, 0.05);
        wGroup.add(cal);

        pGroup.add(wGroup);
      });

      carHolderGroup.add(pGroup);
    };

    // 8. 360-Degree Touch & Mouse Rotation with Inertia & Pitch Control
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let rotationVelocityY = 0;
    let targetAngleY = cameraAngleY;
    let targetElevation = cameraElevation;
    let autoRotate = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const stopAutoRotateTemporarily = () => {
      autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 2500);
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      stopAutoRotateTemporarily();
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      stopAutoRotateTemporarily();

      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      rotationVelocityY = -deltaX * 0.006;
      targetAngleY += rotationVelocityY;

      // Adjust camera elevation (pitch within safe bounds)
      targetElevation = Math.max(0.12, Math.min(0.48, targetElevation + deltaY * 0.003));
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {}
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);

    // Reset Camera Function
    resetCameraRef.current = () => {
      targetAngleY = isMobile ? 0.95 : 0.78;
      targetElevation = isMobile ? 0.30 : 0.26;
      autoRotate = true;
    };

    // 9. Main Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Auto-rotation when idle
      if (autoRotate && !isDragging) {
        targetAngleY += 0.0028;
      }

      // Smooth damping interpolation
      cameraAngleY = THREE.MathUtils.lerp(cameraAngleY, targetAngleY, 0.08);
      cameraElevation = THREE.MathUtils.lerp(cameraElevation, targetElevation, 0.08);

      const cx = defaultCamRadius * Math.cos(cameraElevation) * Math.sin(cameraAngleY);
      const cy = defaultCamRadius * Math.sin(cameraElevation) + (isMobile ? 0.2 : 0.1);
      const cz = defaultCamRadius * Math.cos(cameraElevation) * Math.cos(cameraAngleY);
      camera.position.set(cx, cy, cz);
      camera.lookAt(isMobile ? 0 : 0.4, 0.45, 0);

      // Subtle pulse on gold perimeter ring
      ringMat.emissiveIntensity = 2.4 + Math.sin(time * 2.8) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (idleTimer) clearTimeout(idleTimer);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      dracoLoader.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Live Smooth Color Transition on Material
  const handleColorChange = useCallback((color: CarColorOption) => {
    setSelectedColor(color);
    const targetCol = new THREE.Color(color.hex);

    paintMaterialsRef.current.forEach((mat) => {
      mat.color.copy(targetCol);
      mat.metalness = color.metalness;
      mat.roughness = color.roughness;
      mat.clearcoat = color.clearcoat;
      mat.clearcoatRoughness = color.clearcoatRoughness;
      mat.needsUpdate = true;
    });
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#090909]">
      {/* 3D Canvas Mount or WebGL Fallback */}
      {webGlAvailable ? (
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 touch-none select-none"
          title="Drag to rotate 360° · Scroll to inspect"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img
            src="/images/hero-car.webp"
            alt="Auto Bright luxury car detailing studio Madurai"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />
        </div>
      )}

      {/* Atmospheric Vignette & Hex Texture Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#090909]/85 via-transparent to-[#090909] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_45%,transparent_40%,#090909_92%)] z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 flex flex-col justify-between min-h-[95vh] pointer-events-none">
        {/* Top Google Rating Badge */}
        <div className="flex flex-col items-center sm:items-start pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121214]/85 backdrop-blur-md border border-[#D9B544]/40 shadow-[0_0_25px_rgba(217,181,68,0.25)]">
            <div className="flex items-center text-[#FFC400]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-manrope font-semibold tracking-wider text-[#F0D478]">
              {t.heroBadge}
            </span>
            <ShieldCheck className="w-4 h-4 text-[#D9B544]" />
          </div>
        </div>

        {/* Center Headline & CTAs (Positioned with high contrast and generous padding) */}
        <div className="max-w-2xl my-auto pt-4 pointer-events-auto text-center sm:text-left">
          <span className="font-cormorant italic text-lg sm:text-2xl text-[#D9B544] tracking-[0.2em] block mb-3 font-semibold">
            AUTO BRIGHT · MADURAI
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7F4ED] leading-[1.12] mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {lang === 'en' ? (
              <>
                WHERE EVERY CAR IS TREATED{' '}
                <span className="bg-gradient-to-r from-[#FFF6DD] via-[#D9B544] to-[#F0D478] bg-clip-text text-transparent">
                  LIKE ROYALTY
                </span>
              </>
            ) : (
              siteContent.business.taglineTa
            )}
          </h1>
          <p className="font-manrope text-sm sm:text-lg text-[#B8B5B0] font-normal max-w-xl leading-relaxed mb-8">
            {lang === 'en' ? siteContent.business.sublineEn : siteContent.business.sublineTa}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D9B544] via-[#F0D478] to-[#D9B544] text-[#090909] text-xs font-bold uppercase tracking-[0.18em] shadow-[0_0_30px_rgba(217,181,68,0.45)] hover:shadow-[0_0_50px_rgba(217,181,68,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.heroCtaPrimary}</span>
            </button>

            <a
              href="#services"
              className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#121214]/80 backdrop-blur-md border border-[#D9B544]/35 text-[#F7F4ED] text-xs font-semibold uppercase tracking-wider hover:border-[#D9B544] hover:bg-[#D9B544]/15 transition-all"
            >
              <span>{t.heroCtaSecondary}</span>
              <ArrowRight className="w-4 h-4 text-[#D9B544]" />
            </a>
          </div>
        </div>

        {/* Bottom Interactive Paint Switcher & 360° Instructions */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto border-t border-[#D9B544]/25">
          {/* Studio Color Selector */}
          <div className="flex items-center gap-3 bg-[#121214]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#D9B544]/35 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            <span className="text-xs font-manrope font-semibold text-[#F0D478] hidden md:inline">
              {t.switchColor}
            </span>
            <div className="flex items-center gap-2.5">
              {CAR_COLORS.map((color) => {
                const isActive = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'border-[#D9B544] scale-110 shadow-[0_0_15px_rgba(217,181,68,0.7)]'
                        : 'border-white/20 opacity-75 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} (Clearcoat paint)`}
                    aria-label={`Select ${color.name} paint`}
                  >
                    {isActive && (
                      <Sparkles className="w-3.5 h-3.5 text-[#D9B544]" />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-mono font-medium text-[#F7F4ED] min-w-[110px]">
              {selectedColor.name}
            </span>
          </div>

          {/* 360° Drag & Reset Hint */}
          <div className="flex items-center gap-4 text-xs font-manrope text-[#D9B544] tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-ping" />
              <span>{t.dragToRotate}</span>
            </div>

            <button
              onClick={() => resetCameraRef.current && resetCameraRef.current()}
              className="p-1.5 rounded-lg bg-[#121214] border border-[#D9B544]/30 hover:border-[#D9B544] text-[#F0D478] transition-colors"
              title="Reset 3D Camera View"
              aria-label="Reset Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
