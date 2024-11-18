import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

// Globe configuration options
const GLOBE_CONFIG = {
  width: 600,
  height: 600,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [243 / 255, 189 / 255, 74 / 255], // #f3bd4a in RGB
  glowColor: [1, 1, 1],
  markers: [
    { location: [41.0082, 28.9784], size: 0.2 }, // Türkiye (Istanbul)
    { location: [24.4539, 54.3773], size: 0.1 }, // Abu Dhabi, UAE
    { location: [25.276987, 55.296249], size: 0.1 }, // Dubai, UAE
    { location: [30.0444, 31.2357], size: 0.1 }, // Cairo, Egypt
    { location: [31.7917, -7.0926], size: 0.1 }, // Morocco
    { location: [24.7136, 46.6753], size: 0.1 }, // Riyadh, Saudi Arabia
    { location: [55.7558, 37.6173], size: 0.1 }, // Russia (Moscow)
    { location: [33.6844, 73.0479], size: 0.1 }, // Pakistan (Islamabad)
    { location: [0.3476, 32.5825], size: 0.1 }, // Uganda (Kampala)
    { location: [-1.9403, 29.8739], size: 0.1 }, // Rwanda (Kigali)
    { location: [41.9028, 12.4964], size: 0.1 }, // Italy (Rome)
    { location: [51.5074, -0.1278], size: 0.1 }, // United Kingdom (London)
    { location: [48.8566, 2.3522], size: 0.1 }, // France (Paris)
    { location: [41.3275, 19.8187], size: 0.1 }, // Albania (Tirana)
    { location: [20.5937, 78.9629], size: 0.1 }, // India (New Delhi approximate center)
    { location: [1.2921, 36.8219], size: 0.1 }, // Kenya (Nairobi)
    { location: [33.3152, 44.3661], size: 0.1 }, // Iraq (Baghdad)
    { location: [38.9072, -77.0369], size: 0.1 }, // United States (Washington, D.C.)
  ],
};

const Globe = ({ className, config = GLOBE_CONFIG }) => {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  let phi = 0;

  // Detect if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update pointer interaction
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  // Update movement
  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setRotation(delta / 200);
    }
  };

  // Render function for globe animation
  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) {
        phi += isMobile ? 0.01 : 0.004; // Faster rotation on mobile
      }
      state.phi = phi + rotation;

      if (canvasRef.current) {
        state.width = canvasRef.current.offsetWidth * 2;
        state.height = canvasRef.current.offsetWidth * 2;
      }
    },
    [rotation, isMobile]
  );

  // Resize handler
  const onResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth * 2;
      canvasRef.current.height = canvasRef.current.offsetWidth * 2;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [onRender, config]);

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[600px] ${className}`}>
      {/* Text Behind Globe */}
      <div className="absolute inset-x-0 top-2 flex justify-center z-0">
        <h1 className="text-6xl md:text-5xl sm:text-3xl font-bold text-black opacity-100 text-center">
          Reportage
        </h1>
      </div>

      {/* Globe Canvas */}
      <canvas
        className="w-full h-full opacity-0 transition-opacity duration-500 relative z-10 mx-auto"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
};

export default Globe;
