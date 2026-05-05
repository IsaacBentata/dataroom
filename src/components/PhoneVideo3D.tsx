"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const DEFAULT_MODEL_URL = "/models/iphone/scene.gltf";

type Props = {
  src?: string;
  imageSrc?: string;
  baseTilt?: { x?: number; y?: number };
  staticTilt?: boolean;
  className?: string;
  height?: number | string;
  /** GLB/GLTF model URL. Defaults to /models/iphone.glb; falls back to procedural if absent. */
  modelUrl?: string;
};

export default function PhoneVideo3D({
  src,
  imageSrc,
  baseTilt = { x: -0.05, y: 0.18 },
  staticTilt = false,
  className,
  height = 480,
  modelUrl = DEFAULT_MODEL_URL,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const { displayedSrc, displayedImage, targetOpacity } = useScreenContent(src, imageSrc);
  const screenTexture = useScreenTexture(displayedSrc, displayedImage, inView);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.1, rootMargin: "200px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height, width: "100%" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 30 }}
        dpr={[1.5, 2.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 5, 4]} intensity={1.0} />
        <directionalLight position={[-3, -1, 2]} intensity={0.4} />
        <Suspense fallback={null}>
          <ModelOrFallbackPhone
            modelUrl={modelUrl}
            screenTexture={screenTexture}
            targetOpacity={targetOpacity}
            baseTilt={baseTilt}
            staticTilt={staticTilt}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

type PhoneInternals = {
  screenTexture: THREE.Texture | null;
  targetOpacity: React.RefObject<number>;
  baseTilt: { x?: number; y?: number };
  staticTilt: boolean;
};

function ModelOrFallbackPhone({
  modelUrl,
  ...rest
}: PhoneInternals & { modelUrl: string }) {
  const [loaded, setLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(modelUrl, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setLoaded(r.ok);
      })
      .catch(() => {
        if (!cancelled) setLoaded(false);
      });
    return () => {
      cancelled = true;
    };
  }, [modelUrl]);

  if (loaded === false) return <ProceduralPhone {...rest} />;
  if (loaded === null) return <ProceduralPhone {...rest} />;
  return <ModelPhone modelUrl={modelUrl} {...rest} />;
}

/* ------------------------------------------------------------------------- */
/* Shared video / texture / tilt logic                                         */
/* ------------------------------------------------------------------------- */

function useScreenContent(src?: string, imageSrc?: string) {
  // Two-step swap: screen fades to 0, src updates, screen fades back to 1
  const [displayedSrc, setDisplayedSrc] = useState(src);
  const [displayedImage, setDisplayedImage] = useState(imageSrc);
  const targetOpacity = useRef(1);

  useEffect(() => {
    if (src === displayedSrc && imageSrc === displayedImage) return;
    targetOpacity.current = 0;
    const swap = setTimeout(() => {
      setDisplayedSrc(src);
      setDisplayedImage(imageSrc);
      targetOpacity.current = 1;
    }, 240);
    return () => clearTimeout(swap);
  }, [src, imageSrc, displayedSrc, displayedImage]);

  return { displayedSrc, displayedImage, targetOpacity };
}

function useRoundedAlphaTexture(width: number, height: number, radiusPct: number) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const aspect = width / height;
    // Higher base + slight feather along the corner edge → smooth, anti-aliased
    // curves instead of stair-stepping.
    const base = 2048;
    const cw = Math.round(aspect >= 1 ? base : base * aspect);
    const ch = Math.round(aspect >= 1 ? base / aspect : base);
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
    const r = Math.min(cw, ch) * radiusPct;
    ctx.fillStyle = "white";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(cw - r, 0);
    ctx.arcTo(cw, 0, cw, r, r);
    ctx.lineTo(cw, ch - r);
    ctx.arcTo(cw, ch, cw - r, ch, r);
    ctx.lineTo(r, ch);
    ctx.arcTo(0, ch, 0, ch - r, r);
    ctx.lineTo(0, r);
    ctx.arcTo(0, 0, r, 0, r);
    ctx.closePath();
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    return tex;
  }, [width, height, radiusPct]);
}

function useScreenTexture(displayedSrc?: string, displayedImage?: string, active = true) {
  // Track whether the video has frame data — gates whether we use a
  // VideoTexture or fall back to the still image. Avoids "black phone" when
  // the user navigates back and the video element hasn't decoded a frame yet.
  const [videoReady, setVideoReady] = useState(false);

  const video = useMemo(() => {
    if (!displayedSrc) return null;
    if (typeof document === "undefined") return null;
    // Reuse a primed video element if one exists for this src — these were
    // created synchronously inside the click gesture on the home page, so
    // they already have valid autoplay activation.
    const primed = (window as unknown as { __primedFeatureVideos?: Record<string, HTMLVideoElement> })
      .__primedFeatureVideos?.[displayedSrc];
    if (primed) return primed;
    const v = document.createElement("video");
    // Set all autoplay-relevant attributes BEFORE src so the browser knows
    // this is muted autoplay when it starts the load.
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("loop", "");
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.loop = true;
    v.crossOrigin = "anonymous";
    v.preload = "auto";
    // Off-DOM videos get inconsistent autoplay treatment in some browsers.
    // Park it in DOM, hidden, so the browser treats it as a normal media
    // element for autoplay-policy purposes.
    v.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(v);
    // src LAST so the load-start check sees the autoplay flags already set.
    v.src = displayedSrc;
    v.load();
    return v;
  }, [displayedSrc]);

  // Track whether this video was created here (vs reused from primed pool)
  // so cleanup only removes nodes we own.
  const isPrimedRef = useRef(false);
  useEffect(() => {
    if (!video || typeof window === "undefined") return;
    const primed = (window as unknown as { __primedFeatureVideos?: Record<string, HTMLVideoElement> })
      .__primedFeatureVideos;
    isPrimedRef.current = !!primed && Object.values(primed).includes(video);
  }, [video]);

  // Remove the hidden DOM node when the video instance changes / unmounts —
  // but only if we created it. Primed videos persist on window for reuse.
  useEffect(() => {
    if (!video) return;
    return () => {
      if (isPrimedRef.current) return;
      if (video.parentNode) video.parentNode.removeChild(video);
    };
  }, [video]);

  // Robust autoplay: try to play on mount, on metadata load, and on canplay.
  // Some browsers reject play() before the metadata is ready; some need the
  // user gesture fallback. This covers all three.
  useEffect(() => {
    if (!video) return;
    const tryPlay = () => {
      if (!active) return;
      void video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    const onUserGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("keydown", onUserGesture);
      window.removeEventListener("wheel", onUserGesture);
      window.removeEventListener("scroll", onUserGesture, true);
    };
    window.addEventListener("pointerdown", onUserGesture, { once: true });
    window.addEventListener("touchstart", onUserGesture, { once: true });
    window.addEventListener("keydown", onUserGesture, { once: true });
    window.addEventListener("wheel", onUserGesture, { once: true, passive: true });
    // Scroll listener uses capture so it fires for any scrollable ancestor.
    window.addEventListener("scroll", onUserGesture, { once: true, capture: true, passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pointerdown", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("keydown", onUserGesture);
      window.removeEventListener("wheel", onUserGesture);
      window.removeEventListener("scroll", onUserGesture, true);
    };
  }, [video, active]);

  useEffect(() => {
    return () => {
      if (video && !isPrimedRef.current) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [video]);

  // Sync videoReady with the video element's readyState. Set true once the
  // video has at least one decoded frame (HAVE_CURRENT_DATA = 2). Reset
  // false when the video element changes.
  useEffect(() => {
    if (!video) {
      setVideoReady(false);
      return;
    }
    const check = () => {
      if (video.readyState >= 2) setVideoReady(true);
    };
    check();
    if (video.readyState >= 2) return;
    setVideoReady(false);
    video.addEventListener("loadeddata", check);
    video.addEventListener("canplay", check);
    return () => {
      video.removeEventListener("loadeddata", check);
      video.removeEventListener("canplay", check);
    };
  }, [video]);

  const texture = useMemo<THREE.Texture | null>(() => {
    if (video && videoReady) {
      const t = new THREE.VideoTexture(video);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      return t;
    }
    if (displayedImage) {
      const loader = new THREE.TextureLoader();
      const t = loader.load(displayedImage, (loaded) => {
        // For tall page-screenshots (e.g., artist profile pages), preserve
        // aspect ratio so the image isn't squished to fit the phone screen.
        // Show the top of the image at correct proportions; auto-scroll
        // animation below cycles through the full content.
        const img = loaded.image as HTMLImageElement | undefined;
        if (!img) return;
        const imgAspect = img.width / img.height;
        const SCREEN_ASPECT = 9 / 19.5;
        if (imgAspect < SCREEN_ASPECT * 0.7) {
          loaded.repeat.y = imgAspect / SCREEN_ASPECT;
          // With default flipY=true: offset.y = 1 - repeat.y shows the TOP of
          // the image. We start at the top and animate toward the bottom.
          loaded.offset.y = 1 - loaded.repeat.y;
        }
      });
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      return t;
    }
    return null;
  }, [video, videoReady, displayedImage]);

  // Auto-scroll long page-screenshots (top → bottom → top) so the user can
  // see all the content in the natural feel of a scrolling phone page.
  useEffect(() => {
    if (!texture) return;
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const max = 1 - texture.repeat.y;
      if (max < 0.01) return; // not a tall image — nothing to scroll
      const cycleMs = 14000; // 14s for one round-trip
      const phase = ((ts - start) % cycleMs) / cycleMs; // 0..1
      // Ping-pong: 0→1→0
      const pp = phase < 0.5 ? phase * 2 : 2 - phase * 2;
      // Ease in/out cubic
      const eased = pp < 0.5 ? 4 * pp * pp * pp : 1 - Math.pow(-2 * pp + 2, 3) / 2;
      // 0 (start) shows top → max shows bottom (with flipY=true)
      texture.offset.y = max * (1 - eased);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [texture]);

  useEffect(() => {
    return () => texture?.dispose();
  }, [texture]);

  return texture;
}

// Window-level pointer tracker — normalised to [-1, 1] across the viewport so
// the phone keeps tilting even when the cursor leaves the canvas. One ref is
// shared across all PhoneVideo3D instances.
const globalPointer = { x: 0, y: 0, attached: false };
function ensureGlobalPointer() {
  if (globalPointer.attached || typeof window === "undefined") return;
  globalPointer.attached = true;
  const handle = (e: PointerEvent) => {
    globalPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalPointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", handle, { passive: true });
}

function useTiltAndScreenFade(
  groupRef: React.RefObject<THREE.Group | null>,
  matRef: React.RefObject<THREE.MeshBasicMaterial | null>,
  baseTilt: { x?: number; y?: number },
  staticTilt: boolean,
  targetOpacity: React.RefObject<number>,
) {
  useEffect(() => {
    ensureGlobalPointer();
  }, []);
  useFrame(() => {
    if (groupRef.current) {
      const targetX = staticTilt
        ? (baseTilt.x ?? 0)
        : (baseTilt.x ?? 0) + -globalPointer.y * 0.18;
      const targetY = staticTilt
        ? (baseTilt.y ?? 0)
        : (baseTilt.y ?? 0) + globalPointer.x * 0.32;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.08,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.08,
      );
    }
    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(
        matRef.current.opacity,
        targetOpacity.current,
        0.18,
      );
    }
  });
}

/* ------------------------------------------------------------------------- */
/* Procedural fallback (no model file present)                                 */
/* ------------------------------------------------------------------------- */

function ProceduralPhone({
  screenTexture,
  targetOpacity,
  baseTilt,
  staticTilt,
}: PhoneInternals) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useTiltAndScreenFade(groupRef, screenMatRef, baseTilt, staticTilt, targetOpacity);

  const W = 1.0;
  const H = 2.16;
  const D = 0.1;
  const bezel = 0.045;
  const screenW = W - bezel * 2;
  const screenH = H - bezel * 2;

  const roundedAlpha = useRoundedAlphaTexture(screenW, screenH, 0.06);

  return (
    <group ref={groupRef} rotation={[baseTilt.x ?? 0, baseTilt.y ?? 0, 0]}>
      <RoundedBox args={[W, H, D]} radius={0.13} smoothness={6}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.55} roughness={0.35} />
      </RoundedBox>
      {screenTexture && (
        <mesh position={[0, 0, D / 2 + 0.001]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial
            ref={screenMatRef}
            map={screenTexture}
            alphaMap={roundedAlpha ?? undefined}
            alphaTest={0.01}
            toneMapped={false}
            transparent
            opacity={1}
          />
        </mesh>
      )}
      <mesh position={[0, H / 2 - 0.18, D / 2 + 0.002]}>
        <planeGeometry args={[0.32, 0.075]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------------- */
/* Real GLTF iPhone model                                                      */
/* ------------------------------------------------------------------------- */

function ModelPhone({
  modelUrl,
  screenTexture,
  targetOpacity,
  baseTilt,
  staticTilt,
}: PhoneInternals & { modelUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useTiltAndScreenFade(groupRef, screenMatRef, baseTilt, staticTilt, targetOpacity);

  const { scene } = useGLTF(modelUrl) as unknown as { scene: THREE.Group };

  // Clone, fit, locate the screen mesh, and use its bounding box for the overlay plane.
  const { wrapper, screenMesh, overlay } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const targetH = 2.16;
    const longestAxis = Math.max(size.x, size.y, size.z);
    const scale = targetH / longestAxis;

    const wrapper = new THREE.Group();
    wrapper.add(cloned);
    cloned.position.sub(center);
    wrapper.scale.setScalar(scale);
    wrapper.updateMatrixWorld(true);

    // Find the screen — by node name "Screen", or material name "Display"/"Screen".
    const meshes: THREE.Mesh[] = [];
    cloned.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) meshes.push(obj as THREE.Mesh);
    });
    let screenMesh: THREE.Mesh | null = null;
    for (const mesh of meshes) {
      const nameMatch = /screen|display/i.test(mesh.name);
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      const matName = Array.isArray(mat) ? mat[0]?.name : mat?.name;
      const matMatch = matName ? /screen|display/i.test(matName) : false;
      if (nameMatch || matMatch) {
        screenMesh = mesh;
        break;
      }
    }

    // Source for plane dimensions: prefer the screen mesh's world bbox if found
    // (precise screen size), else fall back to the model's front face.
    const sourceBox = new THREE.Box3();
    if (screenMesh) {
      screenMesh.updateMatrixWorld(true);
      sourceBox.setFromObject(screenMesh);
    } else {
      sourceBox.setFromObject(cloned);
    }
    const sSize = new THREE.Vector3();
    sourceBox.getSize(sSize);
    const sCenter = new THREE.Vector3();
    sourceBox.getCenter(sCenter);

    const sorted = (["x", "y", "z"] as Array<"x" | "y" | "z">).sort((a, b) => sSize[b] - sSize[a]);
    const heightAxis = sorted[0];
    const widthAxis = sorted[1];
    const depthAxis = sorted[2];
    const planeH = sSize[heightAxis];
    const planeW = sSize[widthAxis];

    const normal = new THREE.Vector3(
      depthAxis === "x" ? 1 : 0,
      depthAxis === "y" ? 1 : 0,
      depthAxis === "z" ? 1 : 0,
    );
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal,
    );
    // Position: screen-bbox center, nudged a hair along the depth axis so it
    // sits just in front of the model glass.
    const position = sCenter
      .clone()
      .add(normal.clone().multiplyScalar(sSize[depthAxis] / 2 + 0.003));

    return {
      wrapper,
      screenMesh,
      overlay: { width: planeW, height: planeH, position, quaternion: q },
    };
  }, [scene]);

  if (typeof window !== "undefined" && !(window as unknown as { __phone3d_logged?: boolean }).__phone3d_logged) {
    // eslint-disable-next-line react-hooks/immutability
    (window as unknown as { __phone3d_logged?: boolean }).__phone3d_logged = true;
    console.log("[PhoneVideo3D] screenMesh found:", screenMesh?.name ?? null, "overlay:", overlay);
  }

  // Hide the model's original screen mesh so our overlay plane is what shows.
  useEffect(() => {
    if (!screenMesh) return;
    const mesh = screenMesh as THREE.Mesh;
    const previous = mesh.visible;
    // eslint-disable-next-line react-hooks/immutability
    mesh.visible = false;
    return () => {
      // eslint-disable-next-line react-hooks/immutability
      mesh.visible = previous;
    };
  }, [screenMesh]);

  // Flatten all body materials to matte black, drop the glossy front-glass cover.
  useEffect(() => {
    const restore: Array<() => void> = [];
    wrapper.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const matName = (
        Array.isArray(mesh.material) ? mesh.material[0]?.name : (mesh.material as THREE.Material | undefined)?.name
      ) ?? "";
      // Hide only the main front cover glass — anything else (lens covers,
      // filters, mirrors) stays visible to keep the camera/sensor solid.
      if (/^glass$/i.test(matName)) {
        const prev = mesh.visible;
        mesh.visible = false;
        restore.push(() => {
          mesh.visible = prev;
        });
        return;
      }
      // Flatten remaining materials to matte black
      const original = mesh.material;
      const flat = new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        metalness: 0,
        roughness: 0.55,
      });
      mesh.material = flat;
      restore.push(() => {
        mesh.material = original;
        flat.dispose();
      });
    });
    return () => {
      for (const r of restore) r();
    };
  }, [wrapper]);

  return (
    <group ref={groupRef} rotation={[baseTilt.x ?? 0, baseTilt.y ?? 0, 0]}>
      <primitive object={wrapper} />
      {screenTexture && (
        <RoundedScreenPlane
          screenMatRef={screenMatRef}
          texture={screenTexture}
          position={overlay.position}
          quaternion={overlay.quaternion}
          width={overlay.width}
          height={overlay.height}
        />
      )}
    </group>
  );
}

function RoundedScreenPlane({
  screenMatRef,
  texture,
  position,
  quaternion,
  width,
  height,
}: {
  screenMatRef: React.RefObject<THREE.MeshBasicMaterial | null>;
  texture: THREE.Texture;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  width: number;
  height: number;
}) {
  const alphaMap = useRoundedAlphaTexture(width, height, 0.20);
  return (
    <mesh position={position} quaternion={quaternion} renderOrder={999}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        ref={screenMatRef}
        map={texture}
        alphaMap={alphaMap ?? undefined}
        toneMapped={false}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

if (typeof window !== "undefined") {
  useGLTF.preload(DEFAULT_MODEL_URL);
}
