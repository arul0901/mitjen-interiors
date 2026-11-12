import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Vector2,
  SRGBColorSpace,
  NoColorSpace,
  LinearFilter,
  TextureLoader,
  Texture,
  ShaderMaterial,
} from "three";
import { parallaxVertexShader, parallaxFragmentShader } from "../shaders/parallaxShader";
import { RoomData } from "../data/rooms";

interface RoomPlaneProps {
  rooms: RoomData[];
  currentIndex: number;
  targetIndex: number;
  progressRef: React.MutableRefObject<number>;
  parallaxUpdate: (time: number) => Vector2;
  strength: number;
  onLoadedFirstRoom?: () => void;
}

// Generate procedural fallback canvas for images
function createPlaceholderColorCanvas(label: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 853;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 1280, 853);
    grad.addColorStop(0, "#e8e5e0");
    grad.addColorStop(1, "#c8c4bc");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 853);

    // Architectural layered shapes
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(200, 150, 880, 550);
    ctx.fillStyle = "#d0cbc2";
    ctx.fillRect(350, 300, 580, 300);

    ctx.fillStyle = "#171717";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, 640, 440);
  }
  return canvas;
}

// Generate procedural radial/linear fallback depth canvas (White = Near, Black = Far)
function createPlaceholderDepthCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 427;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Linear gradient simulating floor foreground near (bottom white) to ceiling/back far (top black)
    const grad = ctx.createLinearGradient(0, 0, 0, 427);
    grad.addColorStop(0, "#222222"); // Far wall/ceiling
    grad.addColorStop(0.5, "#777777"); // Midground
    grad.addColorStop(1, "#ffffff"); // Foreground floor
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 427);

    // Foreground architectural element (bright/near)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(240, 260, 160, 120);
  }
  return canvas;
}

export function RoomPlane({
  rooms,
  currentIndex,
  targetIndex,
  progressRef,
  parallaxUpdate,
  strength,
  onLoadedFirstRoom,
}: RoomPlaneProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const texturesCache = useRef<Map<string, { color: Texture; depth: Texture }>>(new Map());
  const [loadedRooms, setLoadedRooms] = useState<Set<number>>(new Set());

  // Texture loader helper with fallback
  const textureLoader = useMemo(() => new TextureLoader(), []);

  const loadRoomTextures = (room: RoomData): { color: Texture; depth: Texture } => {
    if (texturesCache.current.has(room.id)) {
      return texturesCache.current.get(room.id)!;
    }

    // Color texture
    const colorTex = textureLoader.load(
      room.image,
      (tex) => {
        tex.colorSpace = SRGBColorSpace;
        tex.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn(`[ParallaxHero] Missing color texture for ${room.id}, using procedural fallback.`, err);
        const canvas = createPlaceholderColorCanvas(room.title);
        (colorTex as any).image = canvas;
        colorTex.needsUpdate = true;
      }
    );
    colorTex.colorSpace = SRGBColorSpace;

    // Depth texture
    const depthTex = textureLoader.load(
      room.depth,
      (tex) => {
        tex.colorSpace = NoColorSpace;
        tex.minFilter = LinearFilter;
        tex.magFilter = LinearFilter;
        tex.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn(`[ParallaxHero] Missing depth map for ${room.id}, using procedural fallback.`, err);
        const canvas = createPlaceholderDepthCanvas();
        (depthTex as any).image = canvas;
        depthTex.colorSpace = NoColorSpace;
        depthTex.minFilter = LinearFilter;
        depthTex.magFilter = LinearFilter;
        depthTex.needsUpdate = true;
      }
    );
    depthTex.colorSpace = NoColorSpace;
    depthTex.minFilter = LinearFilter;
    depthTex.magFilter = LinearFilter;

    const entry = { color: colorTex, depth: depthTex };
    texturesCache.current.set(room.id, entry);
    return entry;
  };

  // Preload first room immediately; lazy-load remaining rooms
  useEffect(() => {
    // Immediate room 1 load
    const firstRoom = rooms[0];
    if (firstRoom) {
      loadRoomTextures(firstRoom);
      setLoadedRooms((prev) => new Set(prev).add(0));
      onLoadedFirstRoom?.();
    }

    // Lazy load the remaining rooms after first paint
    const timer = setTimeout(() => {
      rooms.slice(1).forEach((room, idx) => {
        loadRoomTextures(room);
        setLoadedRooms((prev) => new Set(prev).add(idx + 1));
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [rooms, onLoadedFirstRoom]);

  // Shader uniforms
  const uniforms = useMemo(() => {
    const roomA = rooms[currentIndex] || rooms[0];
    const roomB = rooms[targetIndex] || rooms[0];
    const texA = loadRoomTextures(roomA);
    const texB = loadRoomTextures(roomB);

    return {
      uTexA: { value: texA.color },
      uDepthA: { value: texA.depth },
      uTexB: { value: texB.color },
      uDepthB: { value: texB.depth },
      uMouse: { value: new Vector2(0, 0) },
      uStrength: { value: strength },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uResolution: { value: new Vector2(size.width, size.height) },
      uImageAspect: { value: 1.5 }, // 3:2 aspect ratio = 2560/1707 = 1.5
      uFocus: { value: 0.5 },
    };
  }, [rooms, currentIndex, targetIndex, size.width, size.height, strength]);

  // Update textures when currentIndex or targetIndex changes
  useEffect(() => {
    if (!materialRef.current) return;
    const roomA = rooms[currentIndex] || rooms[0];
    const roomB = rooms[targetIndex] || rooms[0];
    const texA = loadRoomTextures(roomA);
    const texB = loadRoomTextures(roomB);

    materialRef.current.uniforms.uTexA.value = texA.color;
    materialRef.current.uniforms.uDepthA.value = texA.depth;
    materialRef.current.uniforms.uTexB.value = texB.color;
    materialRef.current.uniforms.uDepthB.value = texB.depth;
  }, [rooms, currentIndex, targetIndex]);

  // Frame update loop
  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    const u = materialRef.current.uniforms;
    u.uTime.value = clock.getElapsedTime();
    u.uProgress.value = progressRef.current;
    u.uStrength.value = strength;
    u.uResolution.value.set(size.width, size.height);

    // Update parallax mouse vector with lerp & idle drift
    const mouseVec = parallaxUpdate(clock.getElapsedTime());
    u.uMouse.value.copy(mouseVec);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={parallaxVertexShader}
        fragmentShader={parallaxFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
