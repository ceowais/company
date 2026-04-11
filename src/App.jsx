import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, ChevronRight, CheckCircle2, Star, Mail, Phone, MapPin, 
  Send, Globe, Server, Smartphone, Zap, Search, Shield, ChevronDown, 
  MonitorPlay, Activity, TrendingUp, Award, PieChart, Rocket, Fingerprint, 
  Cpu, Layers, Target, Megaphone, Linkedin, Twitter, Instagram, Youtube, Sparkles,
  Briefcase, GraduationCap, Scale, ShoppingCart, Calendar, Scissors, Stethoscope,
  Building, HeartHandshake, Smile, Music, Plane, BookOpen, MonitorSmartphone, Camera, Coffee,
  Network, Database, Lock, Hexagon, ExternalLink,
  PenTool, Code2, FileCheck, Lightbulb, ShieldCheck
} from 'lucide-react';

// --- CUSTOM STYLES & ANIMATIONS ---
const customStyles = `
  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); }
    50% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.2); }
    100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse-gold {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
  }
  .animate-glow { animation: glow 3s infinite; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-gold { animation: pulse-gold 2s infinite; }
  
  /* Premium Light Mode White Boxes & Dark Mode Glass Panels */
  .glass-panel {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(212, 175, 55, 0.2);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
  }
  .dark .glass-panel {
    background: rgba(15, 15, 15, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 175, 55, 0.15);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  }
  
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes reveal-up { from { opacity: 0; transform: translateY(30px); filter: blur(8px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
  .animate-reveal { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .text-gradient-gold {
    background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
    -webkit-background-clip: text; 
    background-clip: text; 
    color: transparent; 
    background-size: 200% auto; 
    animation: shimmer 12s linear infinite;
  }

  .line-path { 
    stroke-dasharray: 1000; 
    stroke-dashoffset: 1000; 
    transition: stroke-dashoffset 3s ease-in-out; 
    filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.7));
  }
  .active .line-path { stroke-dashoffset: 0; }
  .perspective-2000 { perspective: 2000px; }
  .preserve-3d { transform-style: preserve-3d; }

  .chart-glow-border {
    transition: border-color 0.5s ease, box-shadow 0.5s ease;
  }
  .chart-glow-border:hover {
    border-color: rgba(212, 175, 55, 0.6) !important;
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.25) !important;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .card-3d {
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
  }
  .card-3d:hover {
    transform: translateY(-10px);
  }

  /* Tree Line Animation */
  .tree-line::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
    z-index: 0;
  }
  @media (min-width: 768px) {
    .tree-line::before {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  /* Hide Scrollbar for Mockup */
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  /* --- MAGICAL MOBILE MENU EFFECTS --- */
  .mobile-menu-overlay {
    clip-path: circle(0px at calc(100% - 3.5rem) 2.5rem);
    transition: clip-path 0.9s cubic-bezier(0.86, 0, 0.07, 1);
    background: radial-gradient(ellipse at bottom, #1a0b2e 0%, #050505 100%);
  }
  .mobile-menu-overlay.open {
    clip-path: circle(300% at calc(100% - 3.5rem) 2.5rem);
  }
  
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(50px) scale(0.9); filter: blur(10px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  .mobile-link-animate {
    animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .mobile-link-text {
    background: linear-gradient(90deg, #D4AF37, #D4AF37);
    background-size: 0% 2px;
    background-repeat: no-repeat;
    background-position: left bottom;
    transition: background-size 0.3s ease, color 0.3s ease;
  }
  .mobile-link-text:hover {
    background-size: 100% 2px;
    color: #D4AF37 !important;
  }

  /* Glitter Particles */
  @keyframes twinkle {
    0%, 100% { opacity: 0.1; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 15px 3px rgba(212, 175, 55, 0.8); }
  }
  .animate-twinkle {
    animation: twinkle ease-in-out infinite alternate;
  }

  /* Shooting Star */
  @keyframes shooting-star {
    0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
    100% { transform: translateX(-200vw) translateY(200vh) rotate(-45deg); opacity: 0; }
  }
  .animate-shooting-star {
    transform-origin: top left;
    opacity: 0;
    animation: shooting-star linear infinite;
  }

  @keyframes line-travel {
    0% { top: -20%; }
    100% { top: 120%; }
  }

  /* --- NEW MAGICAL & 3D EFFECTS --- */
  @keyframes spin-slow { 100% { transform: rotate(360deg); } }
  
  @keyframes float-random {
    0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    33% { transform: translate(15px, -20px) scale(1.2); opacity: 0.8; }
    66% { transform: translate(-10px, -10px) scale(0.8); opacity: 0.5; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  }

  /* Magical Tree Process Styles */
  .tree-card-container { perspective: 1500px; }
  .tree-card-3d {
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), border-radius 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .tilt-left:hover {
    transform: rotateX(10deg) rotateY(-12deg) translateY(-10px) scale(1.02);
    box-shadow: -20px 30px 50px rgba(212, 175, 55, 0.2);
  }
  .tilt-right:hover {
    transform: rotateX(10deg) rotateY(12deg) translateY(-10px) scale(1.02);
    box-shadow: 20px 30px 50px rgba(212, 175, 55, 0.2);
  }
  .tree-card-content {
    transform: translateZ(25px);
    transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .tree-card-3d:hover .tree-card-content {
    transform: translateZ(70px);
  }

  /* Magical Card Wrappers */
  .magic-card-wrapper {
    position: relative;
    border-radius: 1.2rem;
    padding: 2px;
    overflow: hidden;
    background: rgba(212, 175, 55, 0.05);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease;
  }
  .magic-card-wrapper:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
  }
  .magic-card-wrapper::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: conic-gradient(transparent, transparent, transparent, #D4AF37, transparent);
    animation: spin-slow 4s linear infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .magic-card-wrapper:hover::before {
    opacity: 1;
  }
  .magic-card-inner {
    background: inherit;
    position: relative;
    height: 100%;
    border-radius: calc(1.2rem - 2px);
    z-index: 10;
  }

  /* Glowing Nav Elements */
  .nav-glow {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
  .dark .nav-glow {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.05);
  }
  .nav-glow::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0; height: 1.5px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    animation: shimmer 4s infinite linear;
    background-size: 200% 100%;
  }
  .nav-orbit {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px dashed rgba(212, 175, 55, 0.4);
    animation: spin-slow 8s linear infinite;
  }
  .nav-orbit::before {
    content: '';
    position: absolute;
    top: -3px; left: 50%;
    width: 6px; height: 6px;
    background: #D4AF37;
    border-radius: 50%;
    box-shadow: 0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #ffffff;
  }

  /* Tree Connected Leaves Design */
  .leaf-shape-left { transition: border-radius 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.7s ease !important; }
  .leaf-shape-left:hover { 
    border-radius: 4rem 0.5rem 4rem 0.5rem !important; 
    box-shadow: inset 0 0 30px rgba(212, 175, 55, 0.3), 0 15px 40px rgba(212, 175, 55, 0.4) !important;
  }
  
  .leaf-shape-right { transition: border-radius 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.7s ease !important; }
  .leaf-shape-right:hover { 
    border-radius: 0.5rem 4rem 0.5rem 4rem !important; 
    box-shadow: inset 0 0 30px rgba(212, 175, 55, 0.3), 0 15px 40px rgba(212, 175, 55, 0.4) !important;
  }

  /* SVG Network Wire Animation */
  .network-wire {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: flowWire 4s ease-in-out forwards infinite alternate;
  }
  @keyframes flowWire {
    0% { stroke-dashoffset: 1000; opacity: 0.1; }
    50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.8)); }
    100% { stroke-dashoffset: 0; opacity: 0.1; }
  }

  /* 3D Laptop Perspective */
  .laptop-perspective {
    perspective: 2500px;
  }
  .laptop-lid {
    transform-origin: bottom center;
    transition: transform 0.1s ease-out;
    transform-style: preserve-3d;
  }
  .laptop-screen-content {
    backface-visibility: hidden;
  }
  .laptop-lid-back {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1f2022, #111);
    border-radius: 1.5rem 1.5rem 0 0;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Marquee Slider Animation */
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: 200%;
    animation: marquee 25s linear infinite;
  }
  .company-logo {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: grayscale(80%) opacity(0.6) drop-shadow(0 0 5px rgba(212, 175, 55, 0.2));
  }
  .company-logo:hover {
    filter: grayscale(0%) opacity(1) drop-shadow(0 0 20px rgba(212, 175, 55, 0.8));
    transform: scale(1.1) translateY(-5px);
    color: #D4AF37;
  }

  /* Typing Dot Animation */
  @keyframes typing {
    0%, 100% { opacity: 0.2; }
    20% { opacity: 1; }
  }
  .typing-dot { animation: typing 1.4s infinite both; }
  .typing-dot:nth-child(1) { animation-delay: 0s; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
`;

// --- THREE.JS BACKGROUND COMPONENT ---
const NetworkBackground = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    let checkInterval;
    let animationId;
    let currentRenderer;

    const initThree = () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }

      const THREE = window.THREE;
      const scene = new THREE.Scene();
      
      // Crisp white background for light mode, deep black for dark mode
      const bgColor = isDarkMode ? 0x050505 : 0xf8f9fa;
      scene.background = new THREE.Color(bgColor);
      scene.fog = new THREE.FogExp2(bgColor, 0.0015);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 250;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }
      currentRenderer = renderer;

      // Create Particles
      const particleCount = window.innerWidth > 768 ? 400 : 150;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 600;
        positions[i + 1] = (Math.random() - 0.5) * 600;
        positions[i + 2] = (Math.random() - 0.5) * 600;
        
        velocities.push({
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
          z: (Math.random() - 0.5) * 0.5
        });
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Gold color for particles with dynamic opacity
      const material = new THREE.PointsMaterial({
        color: 0xD4AF37,
        size: window.innerWidth > 768 ? 2.5 : 1.5,
        transparent: true,
        opacity: isDarkMode ? 0.8 : 0.9,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Create Lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: isDarkMode ? 0.15 : 0.3,
      });
      
      const lineGeometry = new THREE.BufferGeometry();
      const maxLines = particleCount * 5; 
      const linePositions = new Float32Array(maxLines * 6);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      
      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      // Animation Loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        const posAttr = geometry.attributes.position;
        const currentPositions = posAttr.array;
        
        for (let i = 0; i < particleCount; i++) {
          currentPositions[i * 3] += velocities[i].x;
          currentPositions[i * 3 + 1] += velocities[i].y;
          currentPositions[i * 3 + 2] += velocities[i].z;

          if (Math.abs(currentPositions[i * 3]) > 300) velocities[i].x *= -1;
          if (Math.abs(currentPositions[i * 3 + 1]) > 300) velocities[i].y *= -1;
          if (Math.abs(currentPositions[i * 3 + 2]) > 300) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        let lineIndex = 0;
        const connectionDistance = 60;

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = currentPositions[i * 3] - currentPositions[j * 3];
            const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
            const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
            const distSq = dx*dx + dy*dy + dz*dz;

            if (distSq < connectionDistance * connectionDistance && lineIndex < maxLines) {
              linePositions[lineIndex * 6] = currentPositions[i * 3];
              linePositions[lineIndex * 6 + 1] = currentPositions[i * 3 + 1];
              linePositions[lineIndex * 6 + 2] = currentPositions[i * 3 + 2];
              linePositions[lineIndex * 6 + 3] = currentPositions[j * 3];
              linePositions[lineIndex * 6 + 4] = currentPositions[j * 3 + 1];
              linePositions[lineIndex * 6 + 5] = currentPositions[j * 3 + 2];
              lineIndex++;
            }
          }
        }
        
        for(let i = lineIndex * 6; i < maxLines * 6; i++) {
            linePositions[i] = 0;
        }
        
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex * 2);

        scene.rotation.y += 0.001;
        scene.rotation.x += 0.0005;

        renderer.render(scene, camera);
      };

      animate();
      sceneRef.current = { animationId, renderer };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
      };
    };

    const attemptInit = () => {
      if (window.THREE && mountRef.current) {
        clearInterval(checkInterval);
        initThree();
      }
    };

    // Poll until ThreeJS is loaded
    checkInterval = setInterval(attemptInit, 100);
    attemptInit();

    return () => {
      clearInterval(checkInterval);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none transition-colors duration-700" />;
};

// --- HELPER: LOGO ICON ---
const LogoIcon = ({ className = "w-10 h-10" }) => (
  <div className={`relative rounded-full overflow-hidden border-2 border-[#D4AF37]/80 shadow-[0_0_15px_rgba(212,175,55,0.6)] bg-[#050505] flex items-center justify-center shrink-0 transition-transform duration-300 ${className}`}>
    <img 
      src="src/logo.png" 
      alt="CEOWAIS Logo" 
      className="w-full h-full object-cover scale-[1.05] drop-shadow-2xl"
      referrerPolicy="no-referrer"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/100x100/D4AF37/000000?text=C";
      }}
    />
  </div>
);

// --- HELPER: SCROLL REVEAL ---
const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[1.2s] ${isVisible ? 'opacity-100 translate-y-0 filter-none active' : 'opacity-0 translate-y-16 blur-md'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- SUB-COMPONENT: 3D MOBILE MOCKUP ---
const MobileMockup = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [animateChart, setAnimateChart] = useState(false);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateChart(true), 800);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isHovered) return;
    
    let scrollAmount = 0.5;
    let currentScroll = el.scrollTop;
    let animationFrameId;

    const scroll = () => {
      if (!el) return;
      
      currentScroll += scrollAmount;
      el.scrollTop = currentScroll;
      
      if (el.scrollTop >= el.scrollHeight - el.clientHeight - 1) {
        scrollAmount = -0.5;
        currentScroll = el.scrollTop; 
      } else if (el.scrollTop <= 0) {
        scrollAmount = 0.5;
        currentScroll = 0; 
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((clientY - rect.top) / rect.height - 0.5) * 30;
    const y = ((clientX - rect.left) / rect.width - 0.5) * 30;
    setRotation({ x: -x, y });
  };

  return (
    <div 
      className="perspective-2000 py-10 flex justify-center w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
    >
      <div 
        className="relative w-72 h-[600px] bg-[#1a1a1a] rounded-[3.5rem] border-[8px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-out preserve-3d"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-[#222] rounded-full border border-blue-500/50"></div>
        </div>

        <div className="absolute inset-1.5 bg-white dark:bg-[#080808] rounded-[2.8rem] overflow-hidden flex flex-col">
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-4 flex-grow space-y-5 overflow-y-auto pt-10 scrollbar-hide relative"
          >
            <div className="flex justify-between items-center mb-2 px-1">
               <LogoIcon className="w-8 h-8" />
               <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-2 py-1 rounded-full border border-[#D4AF37]/20">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[7px] font-black uppercase text-[#D4AF37] tracking-widest">Live Node Sync</span>
               </div>
            </div>

            <div className="bg-gray-50 dark:bg-black/50 p-4 rounded-3xl border border-gray-100 dark:border-white/5">
               <div className="flex justify-between items-center mb-3">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Scaling Index</p>
                  <TrendingUp size={10} className="text-[#D4AF37]" />
               </div>
               <div className="flex justify-between items-end h-24 gap-1.5 px-1">
                  {[45, 70, 55, 95, 65, 100].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-[#AA771C] to-[#D4AF37] rounded-t-md transition-all duration-[2s]"
                      style={{ height: animateChart ? `${h}%` : '0%' }}
                    ></div>
                  ))}
               </div>
            </div>

            <div className="relative overflow-hidden p-4 rounded-[2.2rem] bg-[#111] text-white border border-[#D4AF37]/30">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-800 border border-white/10 overflow-hidden flex items-center justify-center">
                     <LogoIcon className="w-10 h-10 border-none shadow-none" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black tracking-tight leading-none mb-1">Studio Lead</h5>
                    <p className="text-[7px] text-[#D4AF37] font-bold uppercase">Verified Identity</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
               {['ISO 27001', 'TRADEMARK', 'MSME REG', 'CERTIFIED'].map((text, i) => (
                 <div key={i} className="bg-white/40 dark:bg-white/5 p-3 rounded-2xl flex flex-col items-center gap-2 border border-gray-100 dark:border-white/5">
                    <Award size={14} className="text-[#D4AF37]" />
                    <span className="text-[6px] font-black text-center uppercase tracking-tighter">{text}</span>
                 </div>
               ))}
            </div>

            {/* Additional content to enable scrolling */}
            <div className="space-y-3 pb-6">
               <h6 className="text-[9px] font-black tracking-widest text-gray-400 uppercase">Live Operations</h6>
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="bg-gray-50 dark:bg-[#111] p-3 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-[#D4AF37]'}`}></div>
                       <span className="text-[8px] font-bold uppercase text-gray-600 dark:text-gray-300">Cluster {849 + i}</span>
                    </div>
                    <span className="text-[7px] text-[#D4AF37] font-black tracking-wider">SYNCED</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="h-6 w-full flex justify-center items-center bg-white dark:bg-[#080808] border-t border-gray-100 dark:border-white/5 z-10 shrink-0">
             <div className="w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: SUCCESS CHARTS ---
const SuccessCharts = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-32 px-6 max-w-7xl mx-auto">
    <Reveal>
      <div className="chart-glow-border bg-white/70 dark:bg-[#0a0a0a]/75 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] flex flex-col items-center justify-center border border-gray-100 dark:border-white/5 border-t-[#D4AF37]/20 h-full">
        <h3 className="text-[10px] font-black mb-12 text-gray-400 uppercase tracking-[0.5em] flex items-center gap-3">
          <PieChart size={16} /> Market Stability
        </h3>
        <div className="relative w-56 h-56">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" className="text-gray-100 dark:text-gray-800" strokeWidth="2.5" stroke="currentColor" />
            <circle cx="18" cy="18" r="16" fill="none" className="text-[#D4AF37] line-path" strokeWidth="2.5" stroke="currentColor" strokeDasharray="86, 100" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter">86%</span>
            <span className="text-[9px] uppercase font-black text-[#D4AF37] tracking-widest">Dominance</span>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={200}>
      <div className="chart-glow-border bg-white/70 dark:bg-[#0a0a0a]/75 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] border border-gray-100 dark:border-white/5 border-t-[#D4AF37]/20 h-full">
        <h3 className="text-[10px] font-black mb-16 text-center text-gray-400 uppercase tracking-[0.5em] flex items-center justify-center gap-3">
          <TrendingUp size={16} /> Growth Path (2023-2026)
        </h3>
        <div className="relative h-56 w-full flex items-end justify-between px-4">
          <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none">
             <path 
                className="line-path text-[#D4AF37]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 0 160 Q 50 140 100 120 Q 150 100 200 80 Q 250 40 300 10" 
              />
          </svg>
          {['FY 23', 'FY 24', 'FY 25', 'FY 26'].map((y, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-6 group relative z-10">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,1)]"></div>
              <span className="text-[10px] font-black text-gray-400 uppercase">{y}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </div>
);

// --- MAIN EXPORT: THE TWO SECTIONS ---
const UnifiedProtocolsAndMetrics = () => {
  return (
    <div className="relative z-10 bg-transparent">
      {/* 1. Unified Digital Protocols Section */}
      <section className="pt-32 pb-24">
        <Reveal>
          <div className="text-center px-6 mb-24">
            <h2 className="text-4xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter text-gray-900 dark:text-white">
              Unified <br/>
              <span className="text-gradient-gold">Digital</span> Protocols
            </h2>
            <p className="text-lg md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
              Deploying high-frequency digital architectures for market dominance. Every node, database, and interface is engineered for sub-millisecond precision.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 max-w-7xl mx-auto mb-32">
           <Reveal>
              <div className="space-y-12">
                 {[
                   { icon: <Fingerprint />, title: "Biometric Identity Core", desc: "Enterprise-grade identity management with zero-trust protocols." },
                   { icon: <Cpu />, title: "Neural Logic Infrastructure", desc: "Adaptive AI integration that optimizes based on real-time data flow." },
                   { icon: <Rocket />, title: "Global Edge Deployment", desc: "Instant worldwide content delivery with sub-10ms latency targets." }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-8 items-start group">
                      <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:rotate-12 transition-transform border border-[#D4AF37]/20">
                        {feat.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight text-gray-900 dark:text-white">{feat.title}</h3>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">{feat.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Reveal>
           <Reveal delay={200}>
              <MobileMockup />
           </Reveal>
        </div>
      </section>

      {/* 2. Growth Metrics Section */}
      <section className="py-24">
        <Reveal>
          <div className="text-center px-6 mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
              Growth <span className="text-[#D4AF37]">Metrics</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px] mt-6">Protocol Verification: Synchronized</p>
          </div>
        </Reveal>
        <SuccessCharts />
      </section>
    </div>
  );
};


// --- NEW COMPONENT: PRICING ---
const Pricing = ({ navigateTo }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <Reveal>
        <div className="text-center mb-16 relative">
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37] opacity-10 blur-[100px] z-0 pointer-events-none"></div>
          <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-2 relative z-10">Investment</h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">Transparent <span className="text-gradient-gold">Pricing</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg relative z-10">Premium digital solutions tailored to your business growth stage.</p>
        </div>
      </Reveal>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio Tier */}
        <Reveal delay={100}>
          <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full z-10">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Design Portfolio</h3>
            <p className="text-gray-500 mb-6 text-sm">The best design portfolio for your personal profile.</p>
            <div className="mb-6 flex flex-col">
              <span className="text-lg text-gray-400 line-through decoration-red-500/50">₹5,000</span>
              <span className="text-4xl font-black text-gray-900 dark:text-white">₹3,000</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow font-medium text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Premium Custom Design</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Responsive Mobile Layout</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Fast Loading Speeds</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Personal Branding Optimization</li>
            </ul>
            <button onClick={() => navigateTo('contact')} className="w-full py-4 rounded-xl border border-[#D4AF37] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-black transition-colors shadow-sm">Get Started</button>
          </div>
        </Reveal>

        {/* Static Shop Tier */}
        <Reveal delay={200}>
          <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)] transform md:-translate-y-4 h-full z-20 bg-white/90 dark:bg-[#111]/90">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-md whitespace-nowrap">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Business Website</h3>
            <p className="text-gray-500 mb-6 text-sm">Perfect for your organization or business online presence.</p>
            <div className="mb-6 flex flex-col">
              <span className="text-lg text-gray-400 line-through decoration-red-500/50">₹20,000</span>
              <span className="text-5xl font-black text-[#D4AF37] flex items-center gap-2">₹12,999 <Zap size={24} className="animate-pulse" /></span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow font-medium text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Multiple Pages & Sections</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Full SEO Optimization</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Interactive Contact Forms</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Stunning Product Showcase</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0"/> Priority Support</li>
            </ul>
            <button onClick={() => navigateTo('contact')} className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#e0c055] transition-colors shadow-[0_10px_20px_rgba(212,175,55,0.4)]">Claim Discount</button>
          </div>
        </Reveal>

        {/* Web App Tier */}
        <Reveal delay={300}>
          <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full z-10">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Custom Solutions</h3>
            <p className="text-gray-500 mb-6 text-sm">Apps, consulting, and AI benefits tailored for you.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900 dark:text-white">Let's Consult</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow font-medium text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5"/> Custom Web Apps & Logic</li>
              <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5"/> Business Dev & Career Consulting</li>
              <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5"/> WordPress Building & Maintenance</li>
              <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5"/> AI Integrations & Workflows</li>
              <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5"/> Any Problem? We have solutions.</li>
            </ul>
            <button onClick={() => navigateTo('contact')} className="w-full py-4 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">Book Consultation</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};


// --- PAGES & COMPONENTS ---

const HeroSection = ({ navigateTo }) => (
  <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
      <video 
        autoPlay loop muted playsInline 
        className="w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      >
        <source src="src/back.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-[#f8f9fa] dark:from-transparent dark:to-[#050505]"></div>
    </div>

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <div className="inline-block mb-4 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-white dark:bg-black/40 backdrop-blur-md animate-glow shadow-md dark:shadow-none">
        <span className="text-[#D4AF37] font-bold tracking-wider text-sm uppercase">Welcome to the Future</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white drop-shadow-sm dark:drop-shadow-none">
        Engineering the <br/>
        <span className="text-gradient-gold">Digital Universe</span>
      </h1>
      <p className="text-lg md:text-2xl mb-10 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
        Empowering brands with cutting-edge Tech Solutions, Web Applications, Databases, and AI Technology.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button onClick={() => navigateTo('contact')} className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#e0c055] transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2">
          Lets transform <ChevronRight size={20} />
        </button>
        <button onClick={() => navigateTo('services')} className="px-8 py-4 bg-white dark:bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm dark:shadow-none">
          <MonitorPlay size={20} /> Our Services
        </button>
      </div>
    </div>
  </div>
);

const Home = ({ navigateTo }) => {
  const features = [
    { title: "Strategic Discovery", desc: "We analyze your business goals to create a roadmap for success.", icon: <Search className="text-[#D4AF37]" size={32} /> },
    { title: "AI-Powered Architecture", desc: "Building scalable and intelligent systems that grow with you.", icon: <Activity className="text-[#D4AF37]" size={32} /> },
    { title: "Flawless Execution", desc: "Agile development ensuring pixel-perfect and robust applications.", icon: <Zap className="text-[#D4AF37]" size={32} /> }
  ];

  const testimonials = [
    { name: "Sarah Jenkins", role: "CEO, TechCorp", text: "Their AI integration transformed our entire database structure. Absolute wizards!" },
    { name: "Marcus Thorne", role: "Founder, Elevate", text: "The web application they built is not just fast, it's a living ecosystem. Outstanding ROI." },
    { name: "Aisha Patel", role: "Director, GlobalTech", text: "A truly professional team. The premium quality is evident in every line of code." }
  ];

  return (
    <div className="animate-fade-in pb-20">
      <HeroSection navigateTo={navigateTo} />
      <UnifiedProtocolsAndMetrics />

      {/* Zig Zag Services Convince Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Transform Your <span className="text-[#D4AF37]">Vision</span></h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Step-by-step journey to digital excellence</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_30px_rgba(212,175,55,0.15)] relative group">
              <div className="absolute inset-0 bg-[#D4AF37]/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Strategy" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="w-12 h-12 bg-white dark:bg-[#D4AF37]/20 border border-[#D4AF37]/30 dark:border-transparent rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-xl shadow-sm">01</div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Data-Driven Strategy</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We don't guess. We analyze your market, competitors, and audience to build a bulletproof blueprint for your digital product.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_30px_rgba(212,175,55,0.15)] relative group">
              <div className="absolute inset-0 bg-[#D4AF37]/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" alt="Development" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
             <div className="w-12 h-12 bg-white dark:bg-[#D4AF37]/20 border border-[#D4AF37]/30 dark:border-transparent rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-xl shadow-sm">02</div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Cutting-Edge Development</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Utilizing high-tech frameworks and secure databases, we engineer solutions that are fast, scalable, and beautifully interactive.
            </p>
          </div>
        </div>
      </section>

      {/* Company Intro & Cards */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-transparent dark:via-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-16">The Architecture of <span className="text-[#D4AF37]">Innovation</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl card-3d animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="bg-[#D4AF37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration of New Pricing Section */}
      <Pricing navigateTo={navigateTo} />

      {/* Trust Building & Reviews */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="glass-panel rounded-3xl p-10 md:p-16 text-center mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          <Shield className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Worthy Money Trust</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your investment translates directly into measurable ROI. We operate with 100% transparency, military-grade security, and an unwavering commitment to your success.
          </p>
        </div>

        <h3 className="text-3xl font-bold text-center mb-12">Client <span className="text-[#D4AF37]">Ecosystem</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-panel p-8 rounded-xl relative hover:scale-105 transition-transform duration-300">
              <div className="flex gap-1 mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-sm font-semibold text-[#D4AF37]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Services = () => {
  const [activeModal, setActiveModal] = useState(null);

  const websiteTypes = [
    { name: "Business Websites", icon: <Briefcase size={24} /> },
    { name: "Education Websites", icon: <GraduationCap size={24} /> },
    { name: "Law Firm Websites", icon: <Scale size={24} /> },
    { name: "Mart / E-commerce", icon: <ShoppingCart size={24} /> },
    { name: "Event Planning", icon: <Calendar size={24} /> },
    { name: "Fashion & Designer", icon: <Scissors size={24} /> },
    { name: "Medical & Doctor", icon: <Stethoscope size={24} /> },
    { name: "Real Estate", icon: <Building size={24} /> },
    { name: "NGO Websites", icon: <HeartHandshake size={24} /> },
    { name: "Yoga & Fitness", icon: <Smile size={24} /> },
    { name: "Music Concerts", icon: <Music size={24} /> },
    { name: "Tours & Travel", icon: <Plane size={24} /> },
    { name: "E-book & Authors", icon: <BookOpen size={24} /> },
    { name: "Digital Agencies", icon: <MonitorSmartphone size={24} /> },
    { name: "Photography", icon: <Camera size={24} /> },
    { name: "Restaurants", icon: <Coffee size={24} /> }
  ];

  const servicesData = [
    {
      id: 1,
      title: "Web Development Studio",
      desc: "Full-stack web solutions with cutting-edge technologies and responsive design that delivers exceptional user experiences.",
      icon: <Globe size={40} />,
      features: [
        "Business & Corporate Websites", "E-commerce & Mart Websites", 
        "Education & E-Learning Websites", "Medical & Healthcare Websites", 
        "Real Estate & Property Websites", "Law Firm & Legal Websites",
        "NGO & Non-Profit Websites", "Tours & Travel Websites", 
        "Event Planning Websites", "Restaurant & Cafe Websites", 
        "Fashion & Designer Portfolios", "Photography Portfolios",
        "Music & Concert Websites", "Yoga & Fitness Websites", 
        "Digital Agency Websites", "E-book & Author Websites", 
        "Custom Web Applications", "Progressive Web Apps (PWA)"
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      desc: "Native and cross-platform mobile applications that engage users with intuitive interfaces and seamless performance.",
      icon: <Smartphone size={40} />,
      features: [
        "Native Android & iOS Apps", "Cross-Platform (Flutter/React)", "App Store Optimization",
        "Mobile-First Design", "Real-time Features & Chat", "Push Notifications",
        "Offline Capabilities", "Wearable App Integration"
      ]
    },
    {
      id: 3,
      title: "Brand Visibility Lab",
      desc: "Strategic brand optimization services identifying high-potential opportunities to maximize your online presence.",
      icon: <Search size={40} />,
      features: [
        "Google Business Profile", "Advanced SEO Strategy", "Reputation Management",
        "Local Search Dominance", "Competitor Analysis", "Conversion Optimization",
        "Content Marketing", "Analytics & Reporting"
      ]
    },
    {
      id: 4,
      title: "Complete Digital Ecosystem",
      desc: "End-to-end digital transformation combining web, mobile, and brand strategies for comprehensive business growth.",
      icon: <Server size={40} />,
      features: [
        "Digital Transformation Strategy", "Omnichannel Integration", "Data Warehousing",
        "AI Workflow Automation", "Legacy System Migration", "Continuous Monitoring",
        "24/7 Priority Support", "Custom Analytics Dashboard"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 animate-fade-in">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold mb-6">Our <span className="text-gradient-gold">Services</span></h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive technological solutions designed to elevate your brand in the digital universe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
        {servicesData.map((srv) => (
          <div key={srv.id} className="glass-panel rounded-2xl p-8 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-300 group">
            <div className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300">
              {srv.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{srv.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{srv.desc}</p>
            <button 
              onClick={() => setActiveModal(srv)}
              className="px-6 py-3 bg-gray-50 dark:bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black font-semibold transition-colors duration-300 w-full md:w-auto shadow-sm dark:shadow-none"
            >
              View Features
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-[#0a0a0a] border border-[#D4AF37] rounded-2xl max-w-2xl w-full p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-[#D4AF37]">
              <X size={28} />
            </button>
            <div className="text-[#D4AF37] mb-4">{activeModal.icon}</div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{activeModal.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {activeModal.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#D4AF37] mt-1 shrink-0" size={18} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#e0c055] transition-colors shadow-md"
            >
              Close & Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* NEW SECTION: Web Development Flowchart/Tree */}
      <div className="mt-32 mb-20 relative z-10 tree-card-container">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Digital Architectures</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Web Development <span className="text-gradient-gold">Ecosystem</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From corporate platforms to highly interactive applications, we engineer specialized digital domains across all major industries with radiant precision.
            </p>
          </Reveal>
        </div>

        <div className="relative max-w-4xl mx-auto py-10 px-4">
           {/* Center Animated Energy Trunk */}
           <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/30 to-[#D4AF37]/10 transform md:-translate-x-1/2 z-0 overflow-hidden rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-white to-transparent animate-[line-travel_2.5s_ease-in-out_infinite] shadow-[0_0_20px_#fff]"></div>
           </div>

           {websiteTypes.map((site, index) => {
             const isLeft = index % 2 === 0;
             return (
               <Reveal key={index} delay={(index % 4) * 100}>
                 <div className={`relative flex items-center mb-8 md:mb-12 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                   
                   <div className="hidden md:block md:w-1/2"></div>
                   
                   {/* Pulse Node on Trunk */}
                   <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#050505] rounded-full border-[3px] border-[#D4AF37] z-20 group-hover:bg-[#D4AF37] transition-colors duration-500 shadow-[0_0_15px_rgba(212,175,55,0.8)] flex items-center justify-center">
                     <div className="w-2 h-2 bg-[#D4AF37] rounded-full group-hover:bg-white group-hover:animate-ping"></div>
                   </div>
                   
                   {/* Mobile Connector */}
                   <div className="md:hidden absolute left-8 w-8 h-[3px] bg-[#D4AF37]/40 top-1/2 transform -translate-y-1/2 z-10 rounded-full"></div>
                   
                   {/* Hoverable Card Wrapper */}
                   <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'} relative z-10 group`}>
                      
                      {/* Curved Branch for Leaves */}
                      <div className={`hidden md:block absolute top-[-2rem] w-12 h-[calc(50%+2rem)] border-b-[3px] border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-500 z-0 group-hover:shadow-[0_5px_15px_rgba(212,175,55,0.5)]
                        ${isLeft ? 'right-0 border-r-[3px] rounded-br-[2.5rem]' 
                                 : 'left-0 border-l-[3px] rounded-bl-[2.5rem]'}`}>
                         <div className={`absolute bottom-[-3px] w-4 h-[3px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-pulse shadow-[0_0_10px_#fff] ${isLeft ? 'left-0' : 'right-0'}`}></div>
                      </div>

                      {/* The Leaf Card with 3D Tilt and Leaf Rounding */}
                      <div className={`glass-panel p-4 md:p-6 rounded-2xl flex items-center gap-5 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl cursor-pointer relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] tree-card-3d ${isLeft ? 'leaf-shape-left tilt-right' : 'leaf-shape-right tilt-left'}`}>
                         
                         {/* Internal Leaf Glow Sweep */}
                         <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/15 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                         
                         {/* Leaf Icon */}
                         <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shrink-0 shadow-[inset_0_0_10px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.8)] z-10">
                            {site.icon}
                         </div>
                         
                         <div className="z-10 tree-card-content flex-grow">
                           <span className="font-bold md:text-xl text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors drop-shadow-sm">{site.name}</span>
                         </div>
                      </div>
                   </div>
                 </div>
               </Reveal>
             );
           })}
        </div>
      </div>

      {/* Animated Tree Process */}
      <div className="mt-32 mb-20 relative z-10 tree-card-container">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Execution Protocol</h2>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Magical <span className="text-gradient-gold">Tree Process</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A meticulously engineered timeline transforming raw vision into a dominant digital reality. Hover over nodes to activate the connection protocols.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-5xl mx-auto py-10 px-4">
          {/* Animated Central Energy Line (The Trunk) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-3 bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/40 to-[#D4AF37]/10 transform md:-translate-x-1/2 z-0 rounded-full overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent via-[#fff] to-transparent animate-[line-travel_3s_ease-in-out_infinite] shadow-[0_0_30px_#fff]"></div>
          </div>

          {[
            { title: "Discovery & Strategy", desc: "We map out your digital DNA, identifying core objectives, audience behaviors, and hidden market opportunities to blueprint a foolproof strategy.", icon: <Search size={28} /> },
            { title: "Architecture & Design", desc: "Transforming raw data into breathtaking visual prototypes and robust system architectures designed for limitless scalability.", icon: <Layers size={28} /> },
            { title: "Agile Development", desc: "Our engineers forge your platform using bleeding-edge tech stacks, ensuring sub-millisecond load times and impenetrable codebases.", icon: <Cpu size={28} /> },
            { title: "Testing & QA", desc: "Rigorous stress-testing protocols and security audits guarantee a flawless, unbreakable user experience across all devices.", icon: <Shield size={28} /> },
            { title: "Launch & Optimize", desc: "Ignition sequence complete. We deploy your ecosystem to the live servers and continuously optimize via AI-driven analytics.", icon: <Rocket size={28} /> }
          ].map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <Reveal key={idx} delay={idx * 150}>
                <div className={`relative flex items-center mb-16 md:mb-32 group ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Empty half for spacing on desktop */}
                  <div className="hidden md:block md:w-5/12"></div>
                  
                  {/* Central Node Pulse (The Tree Knots) */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 bg-[#0a0a0a] rounded-full border-[4px] border-[#D4AF37]/30 z-20 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_40px_rgba(212,175,55,1)] flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full group-hover:bg-white group-hover:animate-ping transition-colors"></div>
                  </div>

                  {/* Curved Glowing Branch (The Process Limbs) */}
                  <div className={`hidden md:block absolute top-[-3rem] w-16 md:w-24 lg:w-32 h-[calc(50%+3rem)] border-b-[4px] border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-700 z-0 group-hover:shadow-[0_10px_20px_rgba(212,175,55,0.4)]
                    ${isLeft ? 'right-0 border-r-[4px] rounded-br-[3.5rem] translate-x-full' 
                             : 'left-0 border-l-[4px] rounded-bl-[3.5rem] -translate-x-full'}`}>
                      <div className={`absolute bottom-[-4px] w-8 h-[4px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-pulse blur-[1px] shadow-[0_0_15px_3px_#fff] ${isLeft ? 'left-0' : 'right-0'}`}></div>
                  </div>

                  {/* Magical 3D Content Card Container */}
                  <div className={`w-full pl-20 md:pl-0 md:w-5/12 relative z-10`}>
                    
                    {/* Wrapper for Glow and Rounding Transition */}
                    <div className={`relative p-[3px] rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] tree-card-3d ${isLeft ? 'leaf-shape-left tilt-right' : 'leaf-shape-right tilt-left'} overflow-hidden cursor-pointer shadow-lg`}>
                      
                      {/* Animated Magical Glow Border */}
                      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_240deg,#D4AF37_360deg)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin-slow_2s_linear_infinite] transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/20 transition-colors duration-500"></div>

                      {/* Inner Glass Panel */}
                      <div className={`relative h-full bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl p-8 rounded-xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] border border-gray-200 dark:border-white/10 group-hover:border-transparent overflow-hidden ${isLeft ? 'leaf-shape-left' : 'leaf-shape-right'}`}>
                        
                        {/* Hover Inner Glow Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Floating Magical Particles inside Card */}
                        <div className="absolute top-4 right-8 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity delay-100" style={{ animation: 'float-random 3s infinite' }}></div>
                        <div className="absolute bottom-6 right-1/4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity delay-300" style={{ animation: 'float-random 4s infinite 1s' }}></div>

                        {/* 3D Popped Content */}
                        <div className="flex flex-col xl:flex-row items-start gap-6 relative z-10 tree-card-content">
                          {/* Animated Icon Block */}
                          <div className="w-16 h-16 rounded-xl group-hover:rounded-[2rem] bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[#D4AF37] shrink-0 border border-gray-200 dark:border-white/10 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 ease-out shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                            {step.icon}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">Phase 0{idx + 1}</span>
                              <div className="h-[2px] flex-grow bg-gray-200 dark:bg-gray-800 group-hover:bg-[#D4AF37] transition-colors shadow-[0_0_10px_rgba(212,175,55,0)] group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                            </div>
                            <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors duration-300 drop-shadow-sm">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{step.desc}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 animate-fade-in">
      
      {/* CEO Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
        <div className="w-full md:w-5/12 relative group">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl transform translate-x-4 translate-y-4 opacity-30 dark:opacity-50 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
          <img 
            src="src/CEO.png" 
            alt="CEO" 
            className="rounded-2xl relative z-10 w-full object-cover shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-[500px]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "src/CEO.png";
            }}
          />
        </div>
        <div className="w-full md:w-7/12">
          <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Leadership</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Visionary Behind the <br/>Digital Pulse</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            "Technology is not just about writing code; it's about crafting experiences that elevate human potential. We built this agency to bridge the gap between imagination and digital reality."
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-bold text-xl text-gray-900 dark:text-white">Awais khan</p>
                <p className="text-[#D4AF37] font-semibold">Founder & CEO</p>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 sm:ml-auto">
              {[
                { icon: <Linkedin size={18} />, link: "https://www.linkedin.com/in/awaixs" },
                { icon: <Twitter size={18} />, link: "#" },
                { icon: <Instagram size={18} />, link: "https://www.instagram.com/awaixs/?hl=en" },
                { icon: <Youtube size={18} />, link: "#" }
              ].map((social, i) => (
                <a key={i} href={social.link} className="w-10 h-10 rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(212,175,55,0.3)] transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="glass-panel p-10 md:p-16 rounded-3xl mb-32 border-l-4 border-l-[#D4AF37]">
        <h2 className="text-3xl font-bold mb-4 text-[#D4AF37]">Our Mission</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">Engineering the <br/>Digital Pulse of Tomorrow.</h3>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mb-10 leading-relaxed">
          We don't just build websites; we construct living digital organisms. Our mission is to empower brands with self-sustaining, high-performance ecosystems that adapt and grow.
        </p>
        <div className="flex flex-wrap gap-4">
          {["Innovation First", "Transparent Process", "Scalable Growth"].map((item, i) => (
             <span key={i} className="px-6 py-2 bg-gray-50 dark:bg-[#D4AF37]/10 text-[#D4AF37] rounded-full font-bold border border-[#D4AF37]/30 shadow-sm dark:shadow-none">
               {item}
             </span>
          ))}
        </div>
      </div>

      {/* Unified Capabilities */}
      <div className="mb-32">
        <h2 className="text-4xl font-bold mb-4 text-center">Unified <span className="text-[#D4AF37]">Capabilities</span></h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">A syllabus of excellence. Our team combines diverse skill sets to deliver comprehensive solutions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Full-Stack Dev", desc: "React, Next.js, Node.js architecture." },
            { num: "2", title: "Cloud Infra", desc: "AWS, Scalable serverless systems." },
            { num: "3", title: "SEO Strategy", desc: "Technical optimization & visibility." },
            { num: "4", title: "UX/UI Design", desc: "Human-centric digital experiences." }
          ].map((cap) => (
            <div key={cap.num} className="glass-panel p-8 rounded-xl text-center group hover:-translate-y-2">
              <div className="text-6xl font-black text-gray-200 dark:text-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors mb-4">{cap.num}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{cap.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">A Journey of <span className="text-[#D4AF37]">Evolution</span></h2>
          <div className="space-y-8">
            {[
              { year: "2023", title: "Inception", desc: "Founded with a vision to merge code and SEO." },
              { year: "2024", title: "Rapid Expansion", desc: "Scaled to 25+ enterprise clients and launched core platforms." },
              { year: "2025", title: "Global Reach", desc: "Establishing international presence and AI integration." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-[#D4AF37] rounded-full ring-4 ring-[#D4AF37]/20 dark:ring-[#D4AF37]/30"></div>
                  {i !== 2 && <div className="w-0.5 h-full bg-[#D4AF37]/30 my-2"></div>}
                </div>
                <div className="pb-8">
                  <span className="text-[#D4AF37] font-bold text-lg">{item.year}</span>
                  <h4 className="text-xl font-bold mt-1 mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-12">
           <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Cultivating <span className="text-[#D4AF37]">Growth</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed glass-panel p-6 rounded-xl border-l-4 border-l-[#D4AF37]">
                Our culture is built on continuous learning and collaborative problem-solving. We believe that a happy, challenged team delivers the most innovative solutions.
              </p>
           </div>
           <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Precision <span className="text-[#D4AF37]">Process</span></h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">From ideation to deployment and maintenance, our workflow is rigorous yet agile.</p>
              <div className="flex flex-wrap gap-3">
                {["Discovery", "Architecture", "Development", "Optimization"].map((step, i) => (
                  <span key={i} className="flex items-center gap-2 bg-white dark:bg-white/10 px-4 py-2 rounded-lg border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none font-medium">
                    <CheckCircle2 size={16} className="text-[#D4AF37]"/> {step}
                  </span>
                ))}
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  const faqs = [
    { q: "What is your typical project timeline?", a: "Depending on complexity, standard web apps take 4-8 weeks, while enterprise solutions may take 3-6 months. We prioritize quality without compromising efficiency." },
    { q: "Do you offer post-launch support?", a: "Absolutely. Our 'Complete Digital Ecosystem' package includes continuous monitoring, regular updates, and 24/7 priority support." },
    { q: "Can you integrate AI into my existing app?", a: "Yes, we specialize in modernizing legacy systems by integrating AI workflows, smart databases, and automated processes." },
    { q: "What is your pricing model?", a: "We offer project-based pricing for clear scopes and retainer models for ongoing digital growth and SEO optimization." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Let's Build <span className="text-gradient-gold">Something</span></h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Ready to engineer your digital future? Connect with our experts today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-8">Let us <span className="text-[#D4AF37]">Connect</span></h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:-translate-y-1">
              <div className="w-12 h-12 bg-gray-50 dark:bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] border border-gray-100 dark:border-transparent">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Us</p>
                <p className="font-semibold text-gray-900 dark:text-white">ceowais@gmail.com</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:-translate-y-1">
              <div className="w-12 h-12 bg-gray-50 dark:bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] border border-gray-100 dark:border-transparent">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="font-semibold text-gray-900 dark:text-white">+91</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-[#25D366]/10 dark:bg-[#25D366]/20 rounded-full flex items-center justify-center text-[#25D366]">
                <MessageCircleIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-semibold text-gray-900 dark:text-white">Message Us</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:-translate-y-1 cursor-pointer">
              <div className="w-12 h-12 bg-[#0088cc]/10 dark:bg-[#0088cc]/20 rounded-full flex items-center justify-center text-[#0088cc]">
                <Send size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Telegram</p>
                <p className="font-semibold text-gray-900 dark:text-white">@CEOWAIS</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-xl mt-8">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><MapPin className="text-[#D4AF37]"/> Headquarters</h3>
             <p className="text-gray-600 dark:text-gray-400">100 Innovation Drive,<br/>Tech Valley, Silicon State 90210</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden">
          {submitted && (
            <div className="absolute inset-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
              <div className="w-20 h-20 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Message Sent Successfully!</h3>
              <p className="text-gray-600 dark:text-gray-400">Our team will get back to you within 24 hours.</p>
            </div>
          )}
          
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Enquiry Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-400">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-400">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" 
                  placeholder="john@example.com" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-400">Service Required</label>
              <select 
                className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all [&>option]:bg-white [&>option]:dark:bg-[#111]" 
                value={formData.service} 
                onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Select a service...</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="seo">SEO & Branding</option>
                <option value="ecosystem">Complete Digital Ecosystem</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-400">Project Details</label>
              <textarea 
                required 
                rows="4" 
                className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none" 
                placeholder="Tell us about your goals..." 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold text-lg py-4 rounded-lg hover:bg-[#e0c055] hover:shadow-[0_5px_20px_rgba(212,175,55,0.4)] transition-all flex justify-center items-center gap-2">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked <span className="text-[#D4AF37]">Questions</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-lg focus:outline-none text-gray-900 dark:text-white"
              >
                {faq.q}
                <ChevronDown className={`transform transition-transform ${activeFaq === i ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// WhatsApp Custom Icon
const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// --- SUB-COMPONENT: 3D MAGICAL ROBOT FOR BRAND LAB ---
const BrandLabRobot = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationId;
    let checkInterval;
    
    const initThree = () => {
      const THREE = window.THREE;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.z = 12;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
      
      if (mountRef.current && mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);

      const robotGroup = new THREE.Group();

      // 1. Magical AI Core (Glowing Icosahedron for more complexity)
      const coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        emissive: 0xaa771c,
        emissiveIntensity: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      robotGroup.add(core);

      // 2. Inner Energy Sphere
      const eyeGeo = new THREE.SphereGeometry(0.9, 32, 32);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      robotGroup.add(eye);

      // 3. Orbiting Rings (Magical Astrolabe effect)
      const rings = new THREE.Group();
      const ring1Geo = new THREE.TorusGeometry(3.0, 0.04, 16, 100);
      const ring1Mat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, emissive: 0xD4AF37, emissiveIntensity: 0.6 });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 2;
      rings.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(3.8, 0.02, 16, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 3;
      rings.add(ring2);
      
      robotGroup.add(rings);

      // 4. Holographic Data Panels (Showing the brand lab data)
      const panels = new THREE.Group();
      for(let i=0; i<4; i++) {
          const panelGeo = new THREE.PlaneGeometry(1.5, 0.8);
          const panelMat = new THREE.MeshBasicMaterial({ 
              color: 0xD4AF37, 
              wireframe: true, 
              transparent: true, 
              opacity: 0.3,
              side: THREE.DoubleSide
          });
          const panel = new THREE.Mesh(panelGeo, panelMat);
          panel.position.set(
              Math.cos(i * Math.PI / 2) * 4.5, 
              (Math.random() - 0.5) * 2, 
              Math.sin(i * Math.PI / 2) * 4.5
          );
          panel.lookAt(0, 0, 0);
          panels.add(panel);
      }
      robotGroup.add(panels);

      // 5. Magical Scanning Beam (Appears while scrolling)
      const beamGeo = new THREE.CylinderGeometry(0.5, 6, 12, 32, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({ 
          color: 0xD4AF37, 
          transparent: true, 
          opacity: 0.05, 
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = -6;
      robotGroup.add(beam);

      scene.add(robotGroup);

      // 6. Magical Dust Particles
      const particleCount = 400;
      const particleGeo = new THREE.BufferGeometry();
      const particlePos = new Float32Array(particleCount * 3);
      const particleSpeeds = new Float32Array(particleCount);
      
      for(let i=0; i<particleCount; i++) {
        particlePos[i*3] = (Math.random() - 0.5) * 20;
        particlePos[i*3+1] = (Math.random() - 0.5) * 20;
        particlePos[i*3+2] = (Math.random() - 0.5) * 20;
        particleSpeeds[i] = Math.random() * 0.02 + 0.005;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
      particleGeo.setAttribute('speed', new THREE.BufferAttribute(particleSpeeds, 1));
      
      const particleMat = new THREE.PointsMaterial({ 
        color: 0xD4AF37, 
        size: 0.1, 
        transparent: true, 
        opacity: 0.8,
        blending: THREE.AdditiveBlending 
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambient);
      const pointLight = new THREE.PointLight(0xD4AF37, 4, 50);
      pointLight.position.set(0, 0, 5);
      scene.add(pointLight);

      // Animation Loop & Scroll Dynamics
      let targetY = 0;
      let targetRotationY = 0;
      let targetRotationZ = 0;
      let scrollVelocity = 0;
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
         const scrollY = window.scrollY;
         scrollVelocity = scrollY - lastScrollY;
         lastScrollY = scrollY;
         
         // The robot floats up and rotates aggressively on scroll
         targetY = Math.sin(scrollY * 0.005) * 2 - (scrollY * 0.002);
         targetRotationY = scrollY * 0.003;
         targetRotationZ = scrollY * 0.001;
         
         // Expand rings slightly on scroll to look like "scanning"
         const scale = 1 + Math.min(Math.abs(scrollVelocity) * 0.01, 0.5);
         rings.scale.set(scale, scale, scale);
         
         // Intensify beam on scroll
         beam.material.opacity = 0.05 + Math.min(Math.abs(scrollVelocity) * 0.005, 0.2);
      };
      window.addEventListener('scroll', handleScroll);

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Idle animations
        core.rotation.y += 0.008;
        core.rotation.x += 0.004;
        ring1.rotation.x += 0.015;
        ring1.rotation.y += 0.01;
        ring2.rotation.z -= 0.008;
        panels.rotation.y += 0.005;

        // Animate particles floating up
        const positions = particles.geometry.attributes.position.array;
        const speeds = particles.geometry.attributes.speed.array;
        for(let i=0; i<particleCount; i++) {
          positions[i*3+1] += speeds[i];
          if(positions[i*3+1] > 10) {
             positions[i*3+1] = -10;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.001;

        // Smooth interpolation for scroll
        robotGroup.position.y += (targetY - robotGroup.position.y) * 0.05;
        robotGroup.rotation.y += (targetRotationY - robotGroup.rotation.y) * 0.05;
        robotGroup.rotation.z += (targetRotationZ - robotGroup.rotation.z) * 0.05;
        
        // Return scale and beam to normal smoothly
        rings.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        beam.material.opacity += (0.05 - beam.material.opacity) * 0.05;

        // Float animation overlay
        robotGroup.position.y += Math.sin(Date.now() * 0.002) * 0.01;

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if(!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Save cleanup data to interval/scope tracking
      return () => {
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('resize', handleResize);
         cancelAnimationFrame(animationId);
      };
    };

    const attemptInit = () => {
      if (window.THREE && mountRef.current) {
        clearInterval(checkInterval);
        initThree();
      }
    };

    // Poll until ThreeJS is loaded
    checkInterval = setInterval(attemptInit, 100);
    attemptInit();

    return () => {
       clearInterval(checkInterval);
       if (animationId) cancelAnimationFrame(animationId);
       if (mountRef.current && mountRef.current.firstChild) {
         mountRef.current.removeChild(mountRef.current.firstChild);
       }
    };

  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[400px] pointer-events-none drop-shadow-[0_0_40px_rgba(212,175,55,0.6)]" />;
};

// --- NEW GENERIC SERVICE SUB-PAGE ---
const ServiceSubPage = ({ title }) => (
  <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-center animate-fade-in relative z-10">
    <Reveal>
      <div className="inline-block mb-4 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-white/50 dark:bg-black/40 backdrop-blur-md">
        <span className="text-[#D4AF37] font-bold tracking-wider text-sm uppercase">Specialized Service</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 dark:text-white">
        <span className="text-gradient-gold">{title}</span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
        Advanced digital solutions and enterprise-grade infrastructure for {title}. This node is currently being engineered for deployment.
      </p>
    </Reveal>
  </div>
);

const FreelancingWork = ({ navigateTo }) => {
  const projects = [
    { title: "Alpha E-Commerce", desc: "A high-conversion multi-vendor marketplace with real-time inventory sync, AI product recommendations, and highly secure payment gateways.", tech: ["React", "Node.js", "Redis", "Stripe"], img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop" },
    { title: "Nexus SaaS Dashboard", desc: "Enterprise analytics platform processing millions of data points with sub-second latency, featuring custom interactive 3D visualizations.", tech: ["Next.js", "GraphQL", "AWS", "Three.js"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
    { title: "Aura Health Portal", desc: "HIPAA-compliant telemedicine application engineered with live WebRTC video consultations, encrypted chat, and electronic health records.", tech: ["WebRTC", "Express", "MongoDB", "Socket.io"], img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" },
    { title: "Vertex Real Estate", desc: "Premium property listing platform integrated with interactive 3D virtual tours, advanced map filtering, and automated agent scheduling CRM.", tech: ["React", "Firebase", "Mapbox", "Tailwind"], img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" },
    { title: "Quantum FinTech", desc: "Highly secure crypto wallet interface with live market websockets, deep-tier encryption, and AI-driven investment trajectory predictions.", tech: ["Vue", "Solidity", "WebSockets", "Python"], img: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=800&auto=format&fit=crop" },
    { title: "Zenith EdTech", desc: "Interactive learning management system delivering personalized AI course recommendations, gamified user progress, and real-time grading.", tech: ["React", "Python", "TensorFlow", "PostgreSQL"], img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop" }
  ];

  const workflowSteps = [
    { title: "Discovery & Scope", desc: "Deep dive into requirements, market analysis, and architectural blueprints.", icon: <Search size={28} /> },
    { title: "Wireframing & UI/UX", desc: "Crafting pixel-perfect prototypes focused heavily on user psychology.", icon: <PenTool size={28} /> },
    { title: "Core Development", desc: "Writing clean, scalable code with bleeding-edge technology stacks.", icon: <Code2 size={28} /> },
    { title: "Rigorous QA", desc: "Intense stress testing, security audits, and comprehensive bug squashing.", icon: <FileCheck size={28} /> },
    { title: "Deployment", desc: "Seamless launch to live production servers with absolute zero downtime.", icon: <Rocket size={28} /> }
  ];

  return (
    <div className="pt-32 pb-20 relative z-10 animate-fade-in overflow-hidden">
      
      {/* 1. Intro Section with Animated Boy */}
      <section className="px-6 max-w-7xl mx-auto mb-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/5 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Code2 size={16} className="text-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] font-bold tracking-wider text-sm uppercase">Independent Expertise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-gray-900 dark:text-white">
              Elite <span className="text-gradient-gold">Freelance</span> Engineering
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Transforming complex ideas into polished, high-performance digital realities. Direct communication, uncompromising quality, and agile execution without the agency overhead.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => navigateTo('contact')} className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#e0c055] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center gap-2 group">
                Hire Me Directly <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-gray-500 font-bold px-4 py-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available for Projects
              </div>
            </div>
          </Reveal>
        </div>

        <div className="w-full lg:w-1/2 relative h-[450px] lg:h-[550px]">
          <Reveal delay={200}>
            {/* Holographic Isometric Tech Stack */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Core Ambient Glow */}
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[100px] rounded-full animate-pulse-gold"></div>
              
              <div className="relative z-10 w-full max-w-md h-full animate-float" style={{ animationDuration: '8s' }}>
                <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="iso-top" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="iso-right" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#050505" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="iso-left" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#AA771C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
                    </linearGradient>
                    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur"/>
                      <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="intense-glow">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Connecting Data Beams */}
                  <g stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 6" opacity="0.6">
                    <line x1="200" y1="120" x2="200" y2="380" className="animate-[flowWire_3s_linear_infinite]" />
                    <line x1="120" y1="160" x2="120" y2="340" className="animate-[flowWire_4s_linear_infinite]" />
                    <line x1="280" y1="160" x2="280" y2="340" className="animate-[flowWire_2s_linear_infinite]" />
                  </g>

                  {/* Orbiting Rings */}
                  <g transform="translate(200 250) scale(1 0.45)">
                     <circle cx="0" cy="0" r="160" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="10 30" opacity="0.4" className="animate-[spin-slow_12s_linear_infinite]" />
                     <circle cx="0" cy="0" r="130" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="80 20" opacity="0.2" className="animate-[spin-slow_8s_linear_infinite_reverse]" />
                  </g>

                  {/* Layer 3 (Bottom): Database */}
                  <g className="animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}>
                    <path d="M 340 320 L 340 345 L 200 415 L 200 390 Z" fill="url(#iso-right)" />
                    <path d="M 60 320 L 60 345 L 200 415 L 200 390 Z" fill="url(#iso-left)" />
                    <path d="M 200 250 L 340 320 L 200 390 L 60 320 Z" fill="url(#iso-top)" stroke="#D4AF37" strokeWidth="1.5" />
                    <path d="M 130 320 L 200 355 L 270 320" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                    <circle cx="200" cy="320" r="8" fill="#D4AF37" filter="url(#intense-glow)" className="animate-pulse" />
                    <path d="M 195 315 L 205 315 L 205 325 L 195 325 Z" fill="#fff" />
                  </g>

                  {/* Layer 2 (Middle): Logic/API */}
                  <g className="animate-float" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
                    <path d="M 320 230 L 320 250 L 200 310 L 200 290 Z" fill="url(#iso-right)" />
                    <path d="M 80 230 L 80 250 L 200 310 L 200 290 Z" fill="url(#iso-left)" />
                    <path d="M 200 170 L 320 230 L 200 290 L 80 230 Z" fill="url(#iso-top)" stroke="#D4AF37" strokeWidth="2" />
                    
                    {/* Glowing Core Box */}
                    <path d="M 200 210 L 230 225 L 200 240 L 170 225 Z" fill="#D4AF37" opacity="0.3" filter="url(#neon-glow)" className="animate-pulse" />
                    <path d="M 200 210 L 230 225 L 200 240 L 170 225 Z" fill="none" stroke="#fff" strokeWidth="1.5" className="animate-pulse" />
                    
                    <circle cx="140" cy="230" r="4" fill="#D4AF37" filter="url(#intense-glow)" />
                    <circle cx="260" cy="230" r="4" fill="#D4AF37" filter="url(#intense-glow)" />
                  </g>

                  {/* Layer 1 (Top): UI/Client */}
                  <g className="animate-float" style={{ animationDuration: '7s', animationDelay: '0s' }}>
                    <path d="M 300 130 L 300 145 L 200 195 L 200 180 Z" fill="url(#iso-right)" />
                    <path d="M 100 130 L 100 145 L 200 195 L 200 180 Z" fill="url(#iso-left)" />
                    <path d="M 200 80 L 300 130 L 200 180 L 100 130 Z" fill="url(#iso-top)" stroke="#D4AF37" strokeWidth="1.5" />
                    
                    {/* Abstract UI Elements */}
                    <path d="M 170 110 L 210 130 L 180 145 L 140 125 Z" fill="#fff" opacity="0.2" stroke="#D4AF37" strokeWidth="1" />
                    <path d="M 225 137 L 260 155 L 240 165 L 205 147 Z" fill="#D4AF37" opacity="0.4" stroke="#fff" strokeWidth="0.5" />
                    <path d="M 120 130 L 140 140 L 130 145 L 110 135 Z" fill="#fff" opacity="0.1" />
                  </g>

                  {/* Floating Data Particles */}
                  <circle cx="200" cy="180" r="4" fill="#fff" filter="url(#intense-glow)">
                    <animate attributeName="cy" values="180;390;180" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="120" cy="160" r="3" fill="#D4AF37" filter="url(#intense-glow)">
                    <animate attributeName="cy" values="340;160;340" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="280" cy="340" r="3" fill="#fff" filter="url(#intense-glow)">
                    <animate attributeName="cy" values="160;340;160" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="250" r="2" fill="#D4AF37" filter="url(#intense-glow)">
                    <animate attributeName="cy" values="390;80;390" dur="5s" repeatCount="indefinite" />
                  </circle>
                </svg>
                
                {/* Floating Interactive Architecture Nodes */}
                <div className="absolute top-12 left-0 md:-left-10 glass-panel px-4 py-3 rounded-xl text-xs font-mono text-[#D4AF37] animate-float shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-[#D4AF37]/40 backdrop-blur-md" style={{animationDelay: '1s'}}>
                   <div className="flex items-center gap-2 mb-1"><Globe size={14} className="text-gray-400" /> <span className="text-gray-300 font-bold">Client_Node</span></div>
                   <span className="text-gray-400">render:</span> <span className="text-green-400">"120fps"</span>
                </div>
                <div className="absolute top-48 right-0 md:-right-10 glass-panel px-4 py-3 rounded-xl text-xs font-mono text-[#D4AF37] animate-float shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-[#D4AF37]/40 backdrop-blur-md flex flex-col gap-1" style={{animationDelay: '2.5s'}}>
                   <div className="flex items-center gap-2"><Cpu size={14} className="text-gray-400" /> <span className="text-gray-300 font-bold">API_Gateway</span></div>
                   <div><Activity size={12} className="animate-pulse inline text-green-400 mr-1" /> <span className="text-white">8ms ping</span></div>
                </div>
                <div className="absolute bottom-10 left-4 md:left-0 glass-panel px-4 py-3 rounded-xl text-xs font-mono text-[#D4AF37] animate-float shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-[#D4AF37]/40 backdrop-blur-md" style={{animationDelay: '0.5s'}}>
                   <div className="flex items-center gap-2 mb-1"><Database size={14} className="text-gray-400" /> <span className="text-gray-300 font-bold">DB_Cluster</span></div>
                   <span className="text-gray-400">sync:</span> <span className="text-[#D4AF37]">"live_stream"</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Professional Work Services (Steps) */}
      <section className="py-24 bg-gray-50/50 dark:bg-white/5 border-y border-gray-200 dark:border-white/10 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Freelancer Work <span className="text-[#D4AF37]">Services</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A highly professional, transparent, and rigorous methodology ensuring your project transcends expectations.</p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Connecting Golden Line */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] w-[80%] h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent -translate-y-1/2 z-0 animate-pulse"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {workflowSteps.map((step, i) => (
                <Reveal key={i} delay={i * 150}>
                  <div className="relative z-10 glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-4 hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-500 h-full">
                    {/* Step Number Badge */}
                    <div className="absolute -top-5 w-10 h-10 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-[#D4AF37] text-[#D4AF37] font-black flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-125 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                      {i + 1}
                    </div>
                    {/* Icon */}
                    <div className="mt-4 mb-6 w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-inner">
                      {step.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects (ZigZag Layout) */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              <Star size={12} fill="currentColor" /> Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white">Featured <span className="text-gradient-gold">Projects</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A breathtaking showcase of complex problems solved through elegant, scalable engineering.</p>
          </div>
        </Reveal>

        <div className="space-y-32">
          {projects.map((project, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <Reveal key={idx} delay={100}>
                <div className={`flex flex-col ${isReverse ? 'md:flex-row-reverse zigzag-card-reverse' : 'md:flex-row zigzag-card'} items-center gap-12 lg:gap-20 group`}>
                  
                  {/* Image Side */}
                  <div className="w-full md:w-1/2 perspective-2000">
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-gray-200 dark:border-white/10 project-image-wrapper bg-[#111]">
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                      <img src={project.img} alt={project.title} className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110" />
                      
                      {/* Tech Stack floating tags */}
                      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-20">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-4 py-1.5 bg-black/80 backdrop-blur-md text-[#D4AF37] text-xs font-black tracking-wider rounded-lg border border-[#D4AF37]/40 shadow-[0_5px_15px_rgba(0,0,0,0.5)] transform transition-transform hover:-translate-y-1 cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 space-y-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-7xl font-black text-gray-200 dark:text-white/5 group-hover:text-[#D4AF37]/20 transition-colors duration-500 select-none">0{idx + 1}</span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors duration-500 leading-tight">{project.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed pl-6 border-l-4 border-gray-200 dark:border-white/10 group-hover:border-[#D4AF37] transition-colors duration-500 font-medium">
                      {project.desc}
                    </p>
                    <button onClick={() => navigateTo('contact')} className="flex items-center gap-3 text-[#D4AF37] font-bold text-lg hover:gap-5 transition-all mt-4 px-6 py-3 rounded-xl hover:bg-[#D4AF37]/10 w-max">
                      Discuss Similar Project <ChevronRight size={20} />
                    </button>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 4. Ideas & Creativity Section */}
      <section className="py-40 relative z-10 overflow-hidden mt-20">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-[#1a1500] dark:from-[#050505] dark:via-[#0a0a0a] dark:to-[#111] rounded-[3rem] mx-4 md:mx-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-[#D4AF37]/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)] animate-pulse-gold pointer-events-none"></div>
        
        {/* Abstract Glowing Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-[50px] animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-[60px] animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <Reveal>
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#D4AF37] blur-[30px] opacity-40 rounded-full animate-pulse"></div>
              <Lightbulb size={80} className="text-[#D4AF37] relative z-10 animate-bounce" style={{ animationDuration: '4s' }} />
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
              Code is common. <br/>
              <span className="text-gradient-gold">Creativity is rare.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
              I don't just build to spec; I build to <span className="text-[#D4AF37]">innovate</span>. By blending bleeding-edge technology with abstract, out-of-the-box thinking, I engineer digital solutions that don't just function—they captivate, engage, and utterly dominate.
            </p>
            
            {/* Interactive Terminal Creativity Box */}
            <div className="w-full max-w-2xl mx-auto bg-black/80 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left mb-12 group hover:border-[#D4AF37]/50 transition-colors">
              <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs font-mono text-gray-500 flex-grow text-center">creativity.exe</span>
              </div>
              <div className="p-6 font-mono text-sm md:text-base text-gray-300">
                <p><span className="text-blue-400">const</span> <span className="text-yellow-200">developer</span> = <span className="text-blue-400">new</span> <span className="text-green-300">Engineer</span>();</p>
                <p className="mt-2"><span className="text-blue-400">await</span> <span className="text-yellow-200">developer</span>.<span className="text-blue-300">inject</span>(&#123;</p>
                <p className="ml-4">vision: <span className="text-orange-300">"Limitless"</span>,</p>
                <p className="ml-4">design: <span className="text-orange-300">"Pixel-Perfect"</span>,</p>
                <p className="ml-4">logic: <span className="text-orange-300">"Neural"</span></p>
                <p>&#125;);</p>
                <p className="mt-2 text-[#D4AF37] flex items-center gap-2">
                  <span className="text-green-400">&gt;</span> Compiling Masterpiece <span className="flex gap-1"><span className="typing-dot bg-[#D4AF37] w-1.5 h-1.5 rounded-full inline-block"></span><span className="typing-dot bg-[#D4AF37] w-1.5 h-1.5 rounded-full inline-block"></span><span className="typing-dot bg-[#D4AF37] w-1.5 h-1.5 rounded-full inline-block"></span></span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {['Radical Innovation', 'Infinite Scalability', 'Immersive Aesthetics', 'Sub-Millisecond Performance'].map((word, i) => (
                <span key={i} className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] bg-black/40 backdrop-blur-md font-bold tracking-widest text-sm uppercase shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:bg-[#D4AF37] hover:text-black hover:-translate-y-1 transition-all cursor-default">
                  {word}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Trust & Work Handling */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(212,175,55,0.1)] relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-bl-full pointer-events-none"></div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">Handling Work with <span className="text-[#D4AF37]">Total Trust</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                As an independent professional, my reputation is my currency. I guarantee absolute confidentiality, transparent communication, and timely delivery on every single milestone.
              </p>
              <ul className="space-y-5">
                {[
                  "Strict Non-Disclosure Agreements (NDA)",
                  "Transparent Time & Milestone Tracking",
                  "Secure Code Handoff & Intellectual Property Rights",
                  "100% Client Satisfaction Guarantee"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-800 dark:text-gray-200 font-bold bg-gray-50 dark:bg-white/5 px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#D4AF37] transition-colors">
                    <ShieldCheck className="text-[#D4AF37] shrink-0" size={24} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2 relative flex justify-center mt-10 md:mt-0">
              <div className="w-72 h-72 rounded-full border-[6px] border-dashed border-[#D4AF37]/20 flex items-center justify-center relative animate-[spin-slow_15s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border-t-[6px] border-[#D4AF37] opacity-70"></div>
                <div className="w-56 h-56 rounded-full bg-white dark:bg-[#0a0a0a] shadow-[0_0_40px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center text-center p-6 border-2 border-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin-slow 15s linear infinite reverse' }}>
                  <HeartHandshake size={60} className="text-[#D4AF37] mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  <span className="font-black text-gray-900 dark:text-white text-xl tracking-wide">Trusted<br/>Partner</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

// --- UPDATED PAGE: IT CONSULTING ---
const ITConsulting = ({ navigateTo }) => {
  const laptopRef = useRef(null);
  const [lidOpenProgress, setLidOpenProgress] = useState(0);

  // Scroll listener for 3D Laptop Animation
  useEffect(() => {
    const handleScroll = () => {
      if (!laptopRef.current) return;
      const rect = laptopRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: starts opening when the top of the laptop hits the bottom 20% of the screen
      // Fully open when it reaches the middle of the screen
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.3;
      const currentPos = rect.top;
      
      let progress = (startTrigger - currentPos) / (startTrigger - endTrigger);
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      setLidOpenProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map progress (0 to 1) to angle (-100deg closed, to 5deg slightly pushed back)
  const lidAngle = -100 + (lidOpenProgress * 105);

  const networkServices = [
    { title: "Cloud Architecture", icon: <Server size={24} />, desc: "Scalable, resilient cloud environments on AWS & Azure." },
    { title: "Cybersecurity", icon: <Lock size={24} />, desc: "Military-grade encryption and threat-monitoring protocols." },
    { title: "Data Engineering", icon: <Database size={24} />, desc: "High-velocity data pipelines and analytics warehousing." },
    { title: "Network Topologies", icon: <Network size={24} />, desc: "Low-latency, redundant edge network deployments." }
  ];

  const industries = [
    { name: "FinTech & Banking", icon: <TrendingUp size={32}/>, desc: "Secure transaction ledgers." },
    { name: "Healthcare Solutions", icon: <Stethoscope size={32}/>, desc: "HIPAA-compliant data systems." },
    { name: "E-Commerce", icon: <ShoppingCart size={32}/>, desc: "High-load traffic balancing." },
    { name: "Real Estate & Infra", icon: <Building size={32}/>, desc: "Smart building IoT integrations." },
  ];

  const jobsData = [
    { field: 'Cloud Infrastructure', company: 'TechNova', loc: 'Remote', pkg: '$120k - $150k', date: 'Oct 15', contact: 'Apply Now' },
    { field: 'Cybersecurity Analyst', company: 'ShieldSystems', loc: 'New York, NY', pkg: '$140k - $180k', date: 'Oct 18', contact: 'Apply Now' },
    { field: 'Data Engineering', company: 'DataFlow Inc', loc: 'London, UK', pkg: '$110k - $140k', date: 'Oct 20', contact: 'Apply Now' },
    { field: 'AI Operations Manager', company: 'NeuralNet AI', loc: 'Hybrid / SF', pkg: '$160k - $200k', date: 'Oct 22', contact: 'Apply Now' },
    { field: 'DevOps Specialist', company: 'CloudScale', loc: 'Austin, TX', pkg: '$130k - $160k', date: 'Oct 25', contact: 'Apply Now' }
  ];

  const companies = [
    "Microsoft", "Google", "Amazon Web Services", "Meta", 
    "IBM Cloud", "Oracle", "Tesla Infrastructure", "Apple Security",
    "Nvidia", "Salesforce", "Cisco Systems", "Intel"
  ];

  return (
    <div className="pt-32 pb-20 relative z-10 animate-fade-in overflow-hidden">
      
      {/* 1. Intro Section */}
      <section className="px-6 max-w-7xl mx-auto text-center mb-32">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/5 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Cpu size={16} className="text-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] font-bold tracking-wider text-sm uppercase">Professional IT Consulting</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-900 dark:text-white">
            Engineering the <br/>
            <span className="text-gradient-gold">Digital Nervous System</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We architect, deploy, and secure enterprise-grade IT infrastructures. From high-frequency trading networks to zero-trust security frameworks, our consulting bridges the gap between complex technology and explosive business growth.
          </p>
        </Reveal>
      </section>

      {/* 2. Network Wires Design Section */}
      <section className="relative w-full py-24 mb-32 bg-gray-50/50 dark:bg-black/30 border-y border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100 overflow-hidden">
          <svg className="w-full h-full min-h-[600px]" preserveAspectRatio="none">
            {/* Animated Wires */}
            <path d="M 0 100 Q 200 300 500 200 T 1000 400" fill="none" stroke="#D4AF37" strokeWidth="2" className="network-wire" />
            <path d="M 0 300 Q 300 100 600 400 T 1200 200" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="network-wire" style={{ animationDelay: '1s', opacity: 0.6 }} />
            <path d="M 200 600 Q 400 200 800 500 T 1400 300" fill="none" stroke="#D4AF37" strokeWidth="2.5" className="network-wire" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Connected <span className="text-[#D4AF37]">Infrastructure</span></h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {networkServices.map((service, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="glass-panel p-8 rounded-2xl relative group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 rounded-bl-[100px] group-hover:scale-110 transition-transform"></div>
                  
                  <div className="w-14 h-14 bg-white dark:bg-[#111] rounded-xl flex items-center justify-center text-[#D4AF37] mb-6 border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors relative z-10">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white relative z-10">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 relative z-10">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Vision & Strategy (3D Laptop Scroll Animation) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Vision & <span className="text-[#D4AF37]">Strategy</span></h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Scroll to initiate the strategic blueprint.</p>
          </div>
        </Reveal>

        <div className="flex justify-center mb-10 laptop-perspective" ref={laptopRef}>
          {/* 3D Laptop Container */}
          <div className="relative w-full max-w-4xl preserve-3d" style={{ transform: 'rotateX(10deg)' }}>
            
            {/* Laptop Lid (Screen) */}
            <div 
              className="laptop-lid relative w-[90%] md:w-[80%] mx-auto h-[250px] md:h-[450px] rounded-t-3xl bg-gray-900 border-[6px] border-gray-800 shadow-[0_0_30px_rgba(212,175,55,0.2)] z-20 overflow-visible"
              style={{ transform: `rotateX(${lidAngle}deg)` }}
            >
              {/* Back of Laptop (Visible when closed) */}
              <div className="laptop-lid-back">
                <LogoIcon className="w-20 h-20 opacity-50 grayscale" />
              </div>

              {/* Glowing Screen Inner */}
              <div className="laptop-screen-content absolute inset-0 bg-[#050505] rounded-t-2xl overflow-hidden flex flex-col border border-[#D4AF37]/20 transition-all duration-700" style={{ boxShadow: `inset 0 0 ${lidOpenProgress * 50}px rgba(212,175,55,0.3)` }}>
                {/* Top Camera Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full flex justify-center items-center gap-2 z-50">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
                </div>

                {/* Screen UI Content */}
                <div className="flex-grow p-6 md:p-10 pt-10 relative">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-center opacity-0 transition-opacity duration-1000 delay-300" style={{ opacity: lidOpenProgress > 0.8 ? 1 : 0 }}>
                    <div className="flex items-center gap-3 mb-6">
                      <Activity size={24} className="text-[#D4AF37] animate-pulse" />
                      <span className="text-[#D4AF37] font-mono tracking-widest text-xs">SYSTEM.READY // V.2.0</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                      Strategic Blueprint
                    </h3>
                    <ul className="space-y-3 mt-4 text-gray-300 font-mono text-sm md:text-base">
                      <li className="flex gap-3 hover:text-[#D4AF37] transition-colors cursor-default"><span className="text-[#D4AF37]">&gt;</span> Aligning IT with Enterprise Goals.</li>
                      <li className="flex gap-3 hover:text-[#D4AF37] transition-colors cursor-default"><span className="text-[#D4AF37]">&gt;</span> Forecasting Technological Shifts.</li>
                      <li className="flex gap-3 hover:text-[#D4AF37] transition-colors cursor-default"><span className="text-[#D4AF37]">&gt;</span> Cost Optimization & ROI Maximization.</li>
                      <li className="flex gap-3 hover:text-[#D4AF37] transition-colors cursor-default"><span className="text-[#D4AF37]">&gt;</span> Seamless Digital Transformation.</li>
                    </ul>
                  </div>
                  
                  {/* Screen Glow Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_80%)] pointer-events-none mix-blend-screen"></div>
                </div>
              </div>
            </div>

            {/* Laptop Base (Keyboard area) */}
            <div className="relative w-full h-[15px] md:h-[25px] bg-gradient-to-b from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-b-3xl shadow-[0_30px_50px_rgba(0,0,0,0.5)] z-10 flex justify-center before:absolute before:-top-[10px] before:left-1/2 before:-translate-x-1/2 before:w-[90%] md:before:w-[80%] before:h-[10px] before:bg-gray-400 dark:before:bg-gray-800 before:rounded-t-sm">
              {/* Trackpad Indentation */}
              <div className="absolute top-0 w-32 md:w-48 h-[10px] bg-gray-400 dark:bg-gray-800 rounded-b-md shadow-inner"></div>
              {/* Front edge glow */}
              <div className="absolute bottom-0 w-full h-[2px] bg-white/20"></div>
            </div>

            {/* Shadow under laptop */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/50 blur-2xl rounded-full z-0"></div>
          </div>
        </div>
      </section>

      {/* NEW: Industries Using Technologies */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Industries We <span className="text-[#D4AF37]">Empower</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our scalable IT solutions are the backbone of market leaders across global industries.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-3 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] transition-all duration-300">
                <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                  {ind.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{ind.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{ind.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEW: Job Opportunities Scrolling Table */}
      <section className="py-24 relative z-10 bg-gray-50/50 dark:bg-white/5 border-y border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-green-500/10 text-green-600 dark:text-green-400 font-bold rounded-full text-sm mb-4 uppercase tracking-widest animate-pulse border border-green-500/30">Hiring Now</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Active <span className="text-gradient-gold">Deployments</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Step into a realm where your code shapes the future of enterprise technology.</p>
            </div>
          </Reveal>

          {/* Table Container - Horizontally scrollable on mobile */}
          <div className="w-full overflow-x-auto pb-8 scrollbar-hide">
            <div className="min-w-[900px] flex flex-col gap-4">
              
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 px-6 py-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-black uppercase tracking-wider text-xs sticky top-0 z-20">
                <div className="col-span-1">Job Field</div>
                <div className="col-span-1">Company</div>
                <div className="col-span-1">Location</div>
                <div className="col-span-1">Package</div>
                <div className="col-span-1">Date Posted</div>
                <div className="col-span-1 text-right">Role Contact</div>
              </div>

              {/* Table Rows with Animated Reveal */}
              {jobsData.map((job, idx) => (
                <Reveal key={idx} delay={idx * 150}>
                  <div className="grid grid-cols-6 gap-4 px-6 py-5 glass-panel rounded-xl items-center hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_20px_rgba(212,175,55,0.15)] transition-all duration-300 group cursor-default relative overflow-hidden">
                    {/* Hover glow sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="col-span-1 font-bold text-gray-900 dark:text-white flex items-center gap-3 relative z-10">
                      <Hexagon size={16} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                      {job.field}
                    </div>
                    <div className="col-span-1 font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2 relative z-10">
                      <Building size={16} className="text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                      {job.company}
                    </div>
                    <div className="col-span-1 text-gray-500 flex items-center gap-2 text-sm relative z-10">
                      <MapPin size={14} className="text-[#D4AF37]" />
                      {job.loc}
                    </div>
                    <div className="col-span-1 font-bold text-green-600 dark:text-green-400 text-sm relative z-10">
                      {job.pkg}
                    </div>
                    <div className="col-span-1 text-gray-500 text-sm font-medium flex items-center gap-2 relative z-10">
                      <Calendar size={14} className="text-[#D4AF37]" />
                      {job.date}
                    </div>
                    <div className="col-span-1 flex justify-end relative z-10">
                      <button onClick={() => navigateTo('contact')} className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-xs rounded-lg hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 transition-colors flex items-center gap-2">
                        {job.contact} <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* NEW: Companies Slider */}
      <section className="py-20 relative z-10 overflow-hidden">
        <Reveal>
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Technologies & Partnerships</h3>
          </div>
        </Reveal>
        
        <div className="relative flex overflow-x-hidden border-y border-gray-200 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm py-10">
          {/* Shadow fades on edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f9fa] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f9fa] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>

          <div className="animate-marquee whitespace-nowrap flex items-center">
            {/* Loop through companies twice to create infinite scroll effect */}
            {[...companies, ...companies].map((company, index) => (
              <div key={index} className="mx-8 md:mx-16 flex items-center justify-center company-logo">
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-gray-400 select-none">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trust & Worth Section (Existing) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="glass-panel p-12 md:p-16 rounded-[3rem] border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(212,175,55,0.1)] text-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none"></div>
            
            <Shield className="w-20 h-20 text-[#D4AF37] mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">Unquestionable <span className="text-[#D4AF37]">Trust & Worth</span></h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
              When you partner with CEOWAIS for IT Consulting, you aren't just getting advice; you're securing a tactical advantage. Our methods are proven, our security is impenetrable, and our focus is entirely on your ROI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-[#D4AF37] mb-2">99.9%</span>
                <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Uptime Guaranteed</span>
              </div>
              <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-gray-200 dark:border-white/10 py-6 sm:py-0">
                <span className="text-5xl font-black text-[#D4AF37] mb-2">24/7</span>
                <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Priority Support Node</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-[#D4AF37] mb-2">ISO</span>
                <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Certified Protocols</span>
              </div>
            </div>
            
            <button onClick={() => navigateTo('contact')} className="mt-16 px-10 py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#e0c055] transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 mx-auto relative z-10">
              Secure Your Consultation <ChevronRight size={20} />
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

// --- NEW PAGE: BRAND LAB ---
const BrandLab = ({ navigateTo }) => {
  const [scrollRatio, setScrollRatio] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the Brand Lab section has been scrolled
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const ratio = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll);
    // trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 animate-fade-in overflow-hidden">
      
      {/* MAGICAL ZIG-ZAG GLOWING PATH */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30 dark:opacity-60 mix-blend-screen">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
          {/* Faded background path */}
          <path 
            d="M 100,0 C 400,200 -200,400 500,500 C 1200,600 -100,800 900,1000" 
            fill="none" 
            stroke="rgba(212,175,55,0.15)" 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke"
          />
          {/* Glowing drawn path based on scroll */}
          <path 
            d="M 100,0 C 400,200 -200,400 500,500 C 1200,600 -100,800 900,1000" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="4" 
            vectorEffect="non-scaling-stroke"
            strokeDasharray="4000"
            strokeDashoffset={4000 - (scrollRatio * 4000)}
            className="transition-all duration-75 ease-out drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
          />
          {/* Travelling glowing point */}
          <path 
            d="M 100,0 C 400,200 -200,400 500,500 C 1200,600 -100,800 900,1000" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="8" 
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="1 4000"
            strokeDashoffset={4000 - (scrollRatio * 4000)}
            className="transition-all duration-75 ease-out drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
          />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row items-center mb-32 min-h-[60vh] relative">
        <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left mb-12 lg:mb-0 transition-transform duration-1000 ease-out" style={{ transform: `translateY(${scrollRatio * -50}px)` }}>
          <Reveal>
            <div className="inline-block mb-4 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-white/50 dark:bg-black/40 backdrop-blur-md shadow-sm dark:shadow-none">
              <span className="text-[#D4AF37] font-bold tracking-wider text-xs uppercase flex items-center gap-2">
                <Sparkles size={14} className="animate-pulse-gold" /> AI Protocol Active
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 dark:text-white">Brand <span className="text-gradient-gold">Lab</span></h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              We don't just build websites; we engineer your entire digital reputation. Dominate search rankings and establish unparalleled market authority with our proprietary AI systems.
            </p>
            <button onClick={() => navigateTo('contact')} className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#e0c055] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center lg:justify-start gap-2 mx-auto lg:mx-0 group overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">Initiate Protocol <Zap size={20} className="group-hover:animate-pulse" /></span>
              <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>
          </Reveal>
        </div>

        {/* MAGIC 3D ROBOT CONTAINER WITH PARALLAX */}
        <div 
          className="w-full lg:w-1/2 h-[500px] lg:h-[700px] absolute lg:relative inset-0 lg:inset-auto z-0 opacity-20 lg:opacity-100 pointer-events-none -mr-20 lg:mr-0 flex justify-center items-center transition-transform duration-1000 ease-out"
          style={{ transform: `scale(${1 + scrollRatio * 0.1}) translateY(${scrollRatio * 30}px)` }}
        >
           <BrandLabRobot />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
        <Reveal delay={100}>
          <div className="magic-card-wrapper h-full">
            <div className="glass-panel magic-card-inner p-8 rounded-2xl h-full flex flex-col relative overflow-hidden group">
               {/* Internal Floating Magic Particles */}
               <div className="absolute top-4 right-4 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: 'float-random 3s infinite' }}></div>
               <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: 'float-random 4s infinite 1s' }}></div>
               
               <Target className="text-[#D4AF37] mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-500" size={40} />
               <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">Precision Targeting</h3>
               <p className="text-gray-600 dark:text-gray-400 relative z-10">Our neural logic models identify and engage your ideal audience with sub-millisecond precision.</p>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="magic-card-wrapper h-full">
            <div className="glass-panel magic-card-inner p-8 rounded-2xl h-full flex flex-col relative overflow-hidden group">
               {/* Internal Floating Magic Particles */}
               <div className="absolute top-10 left-1/2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: 'float-random 3.5s infinite' }}></div>
               <div className="absolute bottom-12 right-6 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: 'float-random 2.5s infinite 0.5s' }}></div>

               <Layers className="text-[#D4AF37] mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-500" size={40} />
               <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">Omnichannel Sync</h3>
               <p className="text-gray-600 dark:text-gray-400 relative z-10">Deploy your brand identity simultaneously across web, mobile, and edge networks.</p>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={300}>
          <div className="magic-card-wrapper h-full">
            <div className="glass-panel magic-card-inner p-8 rounded-2xl h-full flex flex-col relative overflow-hidden group">
               {/* Internal Floating Magic Particles */}
               <div className="absolute top-8 left-8 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: 'float-random 4s infinite' }}></div>
               <div className="absolute bottom-4 right-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: 'float-random 3s infinite 1.5s' }}></div>

               <Megaphone className="text-[#D4AF37] mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-500" size={40} />
               <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">Market Dominance</h3>
               <p className="text-gray-600 dark:text-gray-400 relative z-10">Achieve top-tier visibility and authoritative presence in your industry sector.</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* --- NEW: INSIDER EXPERTISE SECTION --- */}
      <div className="mt-40 mb-10 relative z-10">
        {/* Pulsating Golden Aura Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_70%)] animate-pulse-gold pointer-events-none z-0"></div>
        
        <Reveal>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4 flex items-center justify-center gap-2">
              <Fingerprint size={16} className="animate-pulse" /> Elite Access
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Insider <span className="text-gradient-gold">Expertise</span>
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Proprietary methodologies and advanced digital strategies deployed exclusively for our premium partners to ensure total market saturation.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
           {[
             { icon: <Cpu />, title: "Algorithmic Decoupling", desc: "Reverse-engineering core search mechanics to secure volatile rank positions and immunize your brand against algorithmic updates.", delay: 100 },
             { icon: <Activity />, title: "Behavioral Neuromarketing", desc: "Deploying high-conversion psychological triggers and heat-mapped user journeys tailored to subconscious buying patterns.", delay: 200 },
             { icon: <Globe />, title: "Shadow Network Tracking", desc: "Illuminating 'dark social' shares and untracked engagements to capture the true footprint of your digital influence.", delay: 300 },
             { icon: <Search />, title: "Competitor Surveillance", desc: "Real-time algorithmic monitoring of rival traffic sources, backlink velocity, and keyword cannibalization strategies.", delay: 400 }
           ].map((expertise, idx) => (
              <Reveal key={idx} delay={expertise.delay}>
                <div className="magic-card-wrapper h-full">
                  <div className="glass-panel magic-card-inner p-10 rounded-2xl h-full flex flex-col relative overflow-hidden group">
                     
                     {/* Dynamic Hover Particles */}
                     <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_15px_#D4AF37] opacity-0 group-hover:opacity-60 transition-opacity" style={{ animation: 'float-random 4s infinite' }}></div>
                     <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] opacity-0 group-hover:opacity-80 transition-opacity" style={{ animation: 'float-random 3s infinite 1s' }}></div>
                     
                     {/* Subtle Internal Glow Sweep */}
                     <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                     {/* Animated 3D Icon Block */}
                     <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-8 border border-[#D4AF37]/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] relative z-10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
                       {React.cloneElement(expertise.icon, { size: 32 })}
                     </div>
                     
                     <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">{expertise.title}</h3>
                     <p className="text-gray-600 dark:text-gray-400 relative z-10 text-lg leading-relaxed">{expertise.desc}</p>
                  </div>
                </div>
              </Reveal>
           ))}
        </div>
      </div>

      {/* --- NEW CTAs: TRANSFORM & DOMINATE --- */}
      <Reveal>
        <div className="mt-32 relative z-10 glass-panel p-12 md:p-20 rounded-[3rem] text-center overflow-hidden group">
          {/* Animated Background Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white relative z-10">
            Ready to <span className="text-[#D4AF37]">Transform</span> Your Brand Visibility?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 relative z-10">
            Our AI-driven Brand Lab is standing by to elevate your digital footprint to unprecedented heights. Connect the nodes and watch your influence scale.
          </p>
          <button onClick={() => navigateTo('contact')} className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-xl relative z-10 flex items-center gap-2 mx-auto">
            Start the Transformation <Activity size={20} />
          </button>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 mb-10 relative z-10 p-[2px] rounded-[3rem] bg-gradient-to-r from-[#D4AF37] via-[#AA771C] to-[#D4AF37] animate-shimmer shadow-[0_0_40px_rgba(212,175,55,0.2)]" style={{ backgroundSize: '200% auto' }}>
          <div className="bg-white dark:bg-[#080808] p-12 md:p-20 rounded-[calc(3rem-2px)] text-center relative overflow-hidden group">
             {/* Magical background sparkles */}
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700"><Sparkles size={150} className="text-[#D4AF37] animate-pulse-gold"/></div>
             <div className="absolute bottom-0 left-0 p-8 opacity-10"><Globe size={200} className="text-[#D4AF37] animate-pulse-gold"/></div>
             
             <span className="inline-flex items-center gap-2 px-6 py-2 bg-red-500/10 text-red-500 font-bold rounded-full mb-8 border border-red-500/30 uppercase tracking-widest text-sm animate-pulse relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
               <Zap size={16} /> Limited Time Offer
             </span>
             
             <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white relative z-10">
               Ready to <span className="text-gradient-gold">Dominate</span> Your Market?
             </h2>
             
             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
               Secure your spot in our exclusive Brand Lab accelerator. Get priority access to our proprietary SEO algorithms and neuromarketing systems before your competitors do.
             </p>
             
             <button onClick={() => navigateTo('contact')} className="px-10 py-5 bg-[#D4AF37] text-black font-black text-lg rounded-xl hover:bg-[#e0c055] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_40px_rgba(212,175,55,0.6)] flex items-center gap-3 mx-auto relative z-10">
               Claim Your Market Dominance <Rocket size={24} className="group-hover:animate-bounce" />
             </button>
          </div>
        </div>
      </Reveal>

    </div>
  );
};

// --- MAIN APP STRUCTURE ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Auto-inject ThreeJS for the 3D backgrounds
  useEffect(() => {
    if (!document.getElementById('three-js-script')) {
      const script = document.createElement('script');
      script.id = 'three-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { 
      name: 'Services', 
      id: 'services',
      dropdown: [
        { name: 'IT Consulting', id: 'it-consulting', icon: <Server size={16} /> },
        { name: 'Freelancing Work', id: 'freelancing-work', icon: <Briefcase size={16} /> },
        { name: 'Jobs Consulting', id: 'jobs-consulting', icon: <Target size={16} /> },
        { name: 'Career Guide', id: 'career-guide', icon: <BookOpen size={16} /> },
        { name: 'Overseas Consulting', id: 'overseas-consulting', icon: <Globe size={16} /> },
        { name: 'Sales & Marketing', id: 'sales-marketing', icon: <Megaphone size={16} /> },
        { name: 'Free Courses', id: 'free-courses', icon: <GraduationCap size={16} /> },
        { name: 'Google Business Profile', id: 'google-business-profile', icon: <Search size={16} /> },
        { name: 'Stocks Investments', id: 'stocks-investments', icon: <TrendingUp size={16} /> }
      ]
    },
    { name: 'Brand Lab', id: 'brandLab' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'dark bg-[#050505] text-gray-100' : 'bg-[#f8f9fa] text-gray-900'}`}>
      <style>{customStyles}</style>
      
      {/* Background */}
      <NetworkBackground isDarkMode={isDarkMode} />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-[#050505]/90 backdrop-blur-lg border-b border-gray-200 dark:border-transparent py-3 nav-glow' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group relative" 
            onClick={() => navigateTo('home')}
          >
            {/* Glowing Orbit around Logo */}
            <div className={`transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'} nav-orbit`}></div>
            
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-black/40 border border-[#D4AF37]/30 shadow-[0_5px_15px_rgba(212,175,55,0.3)] group-hover:animate-pulse-gold relative z-10">
              <LogoIcon className="w-8 h-8" />
            </div>
            <span className="font-bold text-xl tracking-wide hidden sm:block text-gray-900 dark:text-white relative z-10">
              CEO<span className="text-[#D4AF37]">WAIS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 bg-white dark:bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
              {navLinks.map((link) => (
                <div 
                  key={link.id} 
                  className="relative group flex items-center py-1"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.id)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  <button 
                    onClick={() => navigateTo(link.id)}
                    className={`text-sm font-bold transition-all flex items-center gap-1 hover:text-[#D4AF37] ${currentPage === link.id || (link.dropdown && link.dropdown.some(sub => sub.id === currentPage)) ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`} />}
                  </button>

                  {/* Desktop Dropdown */}
                  {link.dropdown && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-5 transition-all duration-400 ease-out z-50 ${activeDropdown === link.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
                      <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-gray-200 dark:border-[#D4AF37]/30 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(212,175,55,0.15)] p-3 w-[280px] flex flex-col gap-1.5 relative overflow-hidden group/dropdown before:absolute before:top-[-8px] before:left-1/2 before:-translate-x-1/2 before:border-l-[8px] before:border-r-[8px] before:border-b-[8px] before:border-transparent before:border-b-white dark:before:border-b-[#0a0a0a]">
                        
                        {/* Animated Ambient Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover/dropdown:opacity-100 transition-opacity duration-700"></div>

                        {link.dropdown.map(sub => (
                          <button
                            key={sub.id}
                            onClick={(e) => { e.stopPropagation(); navigateTo(sub.id); setActiveDropdown(null); }}
                            className={`relative flex items-center gap-3 overflow-hidden text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-out group/item
                              ${currentPage === sub.id 
                                ? 'bg-[#D4AF37]/10 text-[#D4AF37] translate-x-1.5 border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                                : 'text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/5 hover:to-transparent hover:translate-x-1.5 border border-transparent hover:border-l-[#D4AF37]/50'}`}
                          >
                            {/* Hover Sweep */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-700 ease-in-out"></div>
                            
                            {/* Icon */}
                            <div className={`relative z-10 flex items-center justify-center transition-all duration-300 ${currentPage === sub.id ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'text-gray-400 group-hover/item:text-[#D4AF37] group-hover/item:scale-110'}`}>
                              {sub.icon}
                            </div>
                            
                            {/* Text */}
                            <span className="relative z-10 block flex-grow tracking-wide">{sub.name}</span>
                            
                            {/* Arrow Indicator */}
                            <ChevronRight size={14} className={`relative z-10 transition-all duration-300 ${currentPage === sub.id ? 'opacity-100 translate-x-0 text-[#D4AF37]' : 'opacity-0 -translate-x-4 text-[#D4AF37] group-hover/item:opacity-100 group-hover/item:translate-x-0'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-[#D4AF37] shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent hover:scale-110 transition-transform"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-[#D4AF37] shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none bg-white dark:bg-transparent shadow-sm dark:shadow-none p-1 rounded-md"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Full Screen Magical Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 z-40 flex flex-col justify-center items-center mobile-menu-overlay overflow-hidden ${isMobileMenuOpen ? 'open pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Deep Space Background for Overlay (Forces Dark Theme internally) */}
          <div className="absolute inset-0 bg-[#050505] z-0"></div>
          
          {/* Magical Universe Nebula Effect */}
          <div className={`absolute inset-0 z-0 opacity-40 mix-blend-screen transition-opacity duration-1000 delay-300 ${isMobileMenuOpen ? 'opacity-60' : 'opacity-0'}`} style={{ background: 'radial-gradient(circle at 50% 50%, #4a1c40 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1a2a6c 0%, transparent 50%)' }}></div>

          {/* Dynamic Twinkling Stars */}
          {isMobileMenuOpen && [...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle z-10"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 2 + 's'
              }}
            ></div>
          ))}

          {/* Shooting Stars */}
          {isMobileMenuOpen && [...Array(6)].map((_, i) => (
            <div
              key={`shoot-${i}`}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-white animate-shooting-star z-10"
              style={{
                width: Math.random() * 100 + 50 + 'px',
                top: Math.random() * 40 + '%',
                left: Math.random() * 80 + 10 + '%',
                animationDelay: Math.random() * 4 + 's',
                animationDuration: Math.random() * 1 + 1.5 + 's'
              }}
            ></div>
          ))}

          {/* Magical Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_50%)] pointer-events-none animate-pulse-gold z-10"></div>
          
          <div className="flex flex-col items-center w-full space-y-6 relative z-50 overflow-y-auto max-h-[80vh] scrollbar-hide pt-10 pb-20">
            {navLinks.map((link, idx) => (
              <div key={link.id} className="flex flex-col items-center w-full">
                <button 
                  onClick={() => {
                    if (link.dropdown) {
                      setMobileDropdownOpen(!mobileDropdownOpen);
                    } else {
                      navigateTo(link.id);
                    }
                  }}
                  className={`mobile-link-text flex items-center justify-center gap-2 text-4xl md:text-5xl font-black tracking-widest uppercase transition-all pb-2 ${currentPage === link.id || (link.dropdown && link.dropdown.some(sub => sub.id === currentPage)) ? 'text-[#D4AF37]' : 'text-white'} ${isMobileMenuOpen ? 'mobile-link-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={28} className={`transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />}
                </button>
                
                {/* Mobile Dropdown */}
                {link.dropdown && (
                  <div className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full ${mobileDropdownOpen ? 'max-h-[1200px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {link.dropdown.map((sub, subIdx) => (
                      <button
                        key={sub.id}
                        onClick={() => navigateTo(sub.id)}
                        className={`relative group w-[90%] md:w-[75%] flex items-center justify-between text-left px-5 py-4 rounded-2xl font-bold tracking-widest uppercase transition-all duration-500 ease-out border overflow-hidden
                          ${currentPage === sub.id 
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-100' 
                            : 'bg-white/5 dark:bg-white/5 text-gray-300 border-white/10 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02]'}`}
                        style={{ 
                          transform: mobileDropdownOpen ? 'translateY(0)' : 'translateY(-20px)',
                          opacity: mobileDropdownOpen ? 1 : 0,
                          transitionDelay: mobileDropdownOpen ? `${subIdx * 40}ms` : '0ms' 
                        }}
                      >
                        {/* Glowing Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                        
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${currentPage === sub.id ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_#D4AF37]' : 'bg-black/40 text-gray-400 border-gray-600 group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]'}`}>
                            {sub.icon}
                          </div>
                          <span className="text-sm md:text-base leading-tight mt-0.5">{sub.name}</span>
                        </div>
                        
                        <ChevronRight size={18} className={`relative z-10 transition-transform duration-300 ${currentPage === sub.id ? 'text-[#D4AF37] translate-x-0' : 'text-gray-500 group-hover:text-[#D4AF37] group-hover:translate-x-1'}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`absolute bottom-12 flex flex-col items-center gap-4 transition-all duration-1000 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-10'} z-50 pointer-events-none`}>
             <LogoIcon className="w-20 h-20 shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
             <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs mt-2">CEOWAIS</p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen">
        {currentPage === 'home' && <Home navigateTo={navigateTo} />}
        {currentPage === 'services' && <Services navigateTo={navigateTo} />}
        {currentPage === 'it-consulting' && <ITConsulting navigateTo={navigateTo} />}
        {currentPage === 'freelancing-work' && <FreelancingWork navigateTo={navigateTo} />}
        {currentPage === 'jobs-consulting' && <ServiceSubPage title="Jobs Consulting" />}
        {currentPage === 'career-guide' && <ServiceSubPage title="Career Guide" />}
        {currentPage === 'overseas-consulting' && <ServiceSubPage title="Overseas Consulting" />}
        {currentPage === 'sales-marketing' && <ServiceSubPage title="Sales & Marketing" />}
        {currentPage === 'free-courses' && <ServiceSubPage title="Free Courses" />}
        {currentPage === 'google-business-profile' && <ServiceSubPage title="Google Business Profile" />}
        {currentPage === 'stocks-investments' && <ServiceSubPage title="Stocks Investments" />}
        {currentPage === 'brandLab' && <BrandLab navigateTo={navigateTo} />}
        {currentPage === 'about' && <About navigateTo={navigateTo} />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-white/10 bg-white/90 dark:bg-black/80 backdrop-blur-md pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => navigateTo('home')}>
              <LogoIcon className="w-14 h-14 group-hover:animate-pulse-gold transition-all duration-300" />
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                CEO<span className="text-[#D4AF37]">WAIS</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Engineering the digital pulse of tomorrow with AI, robust architectures, and premium web experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li><button onClick={() => navigateTo('home')} className="hover:text-[#D4AF37] transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-[#D4AF37] transition-colors">Services</button></li>
              <li><button onClick={() => navigateTo('brandLab')} className="hover:text-[#D4AF37] transition-colors">Brand Lab</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-[#D4AF37] transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-[#D4AF37] transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#D4AF37]">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li>Web Development</li>
              <li>Mobile Applications</li>
              <li>Brand Visibility SEO</li>
              <li>Digital Ecosystems</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#D4AF37]">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 dark:border-white/10 pt-8 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center font-medium">
          <p>&copy; 2026 CEOWAIS Solutions. All rights reserved.</p>
          <p className="mt-2 md:mt-0">BY AWAIS <span className="text-[#D4AF37] font-bold">KHAN</span></p>
        </div>
      </footer>
    </div>
  );
}
