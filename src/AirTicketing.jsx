import React, { useEffect, useRef, useState } from 'react';
import {
  PlaneTakeoff,
  Plane,
  Globe,
  MapPin,
  CheckCircle2,
  Compass,
  Ticket,
  CreditCard,
  Navigation,
  FileCheck,
  Server,
  Network,
  Building,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';

const GOLD = '#D4AF37';

// --- HELPER: GLOWING SCROLL REVEAL ---
const Reveal = ({ children, delay = 0, glow = false }) => {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.25,0.4,0.2,1)] ${
        isVisible
          ? `opacity-100 translate-y-0 filter-none active ${glow ? 'drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]' : ''}`
          : 'opacity-0 translate-y-16 blur-md'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ensureThreeScript = () => {
  if (typeof document === 'undefined' || document.getElementById('three-js-script')) return;

  const script = document.createElement('script');
  script.id = 'three-js-script';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.async = true;
  document.head.appendChild(script);
};

// --- THREE.JS 3D FLIGHT BACKGROUND (HIGH ALTITUDE) ---
const FlightBackground = ({ isDarkMode }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationId;
    let cleanupScene;
    let checkInterval;

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      mountRef.current.replaceChildren(renderer.domElement);

      const planeGroup = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0xffffff : 0x111111,
        metalness: 0.6,
        roughness: 0.3,
      });
      const wingMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      const bodyGeo = new THREE.CylinderGeometry(0.8, 0.8, 7, 32);
      bodyGeo.rotateZ(Math.PI / 2);
      planeGroup.add(new THREE.Mesh(bodyGeo, bodyMat));

      const noseGeo = new THREE.ConeGeometry(0.8, 2.5, 32);
      noseGeo.rotateZ(-Math.PI / 2);
      const nose = new THREE.Mesh(noseGeo, bodyMat);
      nose.position.set(4.75, 0, 0);
      planeGroup.add(nose);

      const wing = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 12), wingMat);
      wing.position.set(0.5, 0, 0);
      planeGroup.add(wing);

      const vertTail = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.5, 0.1), wingMat);
      vertTail.position.set(-2.8, 1.25, 0);
      planeGroup.add(vertTail);

      const horizTail = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 4), wingMat);
      horizTail.position.set(-2.8, 0, 0);
      planeGroup.add(horizTail);

      const engineGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 16);
      engineGeo.rotateZ(Math.PI / 2);
      const engine1 = new THREE.Mesh(engineGeo, glowMat);
      engine1.position.set(0.5, -0.6, 2.5);
      planeGroup.add(engine1);
      const engine2 = new THREE.Mesh(engineGeo, glowMat);
      engine2.position.set(0.5, -0.6, -2.5);
      planeGroup.add(engine2);

      scene.add(planeGroup);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      const dirLight = new THREE.DirectionalLight(0xd4af37, 2);
      dirLight.position.set(5, 10, 8);
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 1);
      fillLight.position.set(-5, -5, -5);
      scene.add(fillLight);

      const particleCount = 200;
      const particlesGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 6);

      for (let i = 0; i < particleCount; i += 1) {
        const x = (Math.random() - 0.5) * 80;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 40;
        posArray[i * 6] = x;
        posArray[i * 6 + 1] = y;
        posArray[i * 6 + 2] = z;
        posArray[i * 6 + 3] = x + (3 + Math.random() * 5);
        posArray[i * 6 + 4] = y;
        posArray[i * 6 + 5] = z;
      }

      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particles = new THREE.LineSegments(
        particlesGeo,
        new THREE.LineBasicMaterial({ color: 0xd4af37, transparent: true, opacity: isDarkMode ? 0.28 : 0.42 })
      );
      scene.add(particles);

      let scrollProgress = 0;
      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

        if (mountRef.current) {
          const baseOpacity = isDarkMode ? 0.72 : 0.34;
          const currentOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.1) * 6.66)) * baseOpacity;
          mountRef.current.style.opacity = currentOpacity.toString();
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        const targetX = 14 - scrollProgress * 28;
        const targetY = Math.sin(time * 1.5) * 0.8;
        const targetRotZ = scrollProgress * (Math.PI / 6) - Math.PI / 16;
        const targetRotX = Math.sin(time * 2) * 0.1 + scrollProgress * (Math.PI / 16);

        planeGroup.position.x += (targetX - planeGroup.position.x) * 0.05;
        planeGroup.position.y += (targetY - planeGroup.position.y) * 0.05;
        planeGroup.rotation.z += (targetRotZ - planeGroup.rotation.z) * 0.05;
        planeGroup.rotation.x += (targetRotX - planeGroup.rotation.x) * 0.05;

        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i += 1) {
          const speed = 1.0 + scrollProgress * 1.5;
          positions[i * 6] -= speed;
          positions[i * 6 + 3] -= speed;

          if (positions[i * 6] < -40) {
            const newX = 40 + Math.random() * 10;
            positions[i * 6] = newX;
            positions[i * 6 + 3] = newX + (3 + Math.random() * 5);
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      cleanupScene = () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    const attemptInit = () => {
      if (window.THREE && mountRef.current) {
        clearInterval(checkInterval);
        initThree();
      }
    };

    ensureThreeScript();
    checkInterval = setInterval(attemptInit, 100);
    attemptInit();

    return () => {
      clearInterval(checkInterval);
      if (cleanupScene) cleanupScene();
      if (mountRef.current) mountRef.current.replaceChildren();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={mountRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen drop-shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-opacity duration-300"
    />
  );
};

// --- THREE.JS 3D HI-TECH AIRPORT BACKGROUND (GROUND LEVEL) ---
const HiTechAirportBackground = ({ isDarkMode }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationId;
    let cleanupScene;
    let checkInterval;

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(isDarkMode ? 0x050505 : 0xf8f4ea, 0.0025);

      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 15, 90);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.replaceChildren(renderer.domElement);

      const grid = new THREE.GridHelper(500, 100, 0xd4af37, isDarkMode ? 0x171717 : 0xd8c99a);
      scene.add(grid);

      const lightsGeo = new THREE.BufferGeometry();
      const lightsPos = [];
      for (let i = 0; i < 150; i += 1) {
        lightsPos.push(-12, 0.2, 120 - i * 5);
        lightsPos.push(12, 0.2, 120 - i * 5);
        if (i % 2 === 0) lightsPos.push(0, 0.1, 120 - i * 5);
      }
      lightsGeo.setAttribute('position', new THREE.Float32BufferAttribute(lightsPos, 3));
      scene.add(
        new THREE.Points(
          lightsGeo,
          new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 1.5,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
          })
        )
      );

      const buildingMat = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0x0a0a0a : 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
      });

      const mainTerminal = new THREE.Mesh(new THREE.BoxGeometry(80, 20, 40), buildingMat);
      mainTerminal.position.set(50, 10, -20);
      scene.add(mainTerminal);

      const concourse = new THREE.Mesh(new THREE.BoxGeometry(20, 15, 140), buildingMat);
      concourse.position.set(30, 7.5, 30);
      scene.add(concourse);

      const towerGroup = new THREE.Group();
      const towerBase = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 5, 60, 16), buildingMat);
      towerGroup.add(towerBase);

      const towerTop = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 5, 12, 16),
        new THREE.MeshStandardMaterial({
          color: isDarkMode ? 0x050505 : 0xffffff,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0xd4af37,
          emissiveIntensity: 0.4,
        })
      );
      towerTop.position.y = 36;
      towerGroup.add(towerTop);

      const radar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 100, 50, 32, 1, true, 0, Math.PI / 4),
        new THREE.MeshBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.15,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      radar.position.set(0, 42, 0);
      radar.rotation.x = Math.PI / 2;
      towerGroup.add(radar);
      towerGroup.position.set(-40, 30, 10);
      scene.add(towerGroup);

      const officeGroup = new THREE.Group();
      officeGroup.add(
        new THREE.Mesh(
          new THREE.BoxGeometry(40, 35, 20),
          new THREE.MeshStandardMaterial({ color: isDarkMode ? 0x0a0a0a : 0xded6c0, wireframe: true })
        )
      );
      officeGroup.add(
        new THREE.Mesh(
          new THREE.BoxGeometry(39.5, 34.5, 19.5),
          new THREE.MeshPhysicalMaterial({ color: 0x88bbff, transparent: true, opacity: 0.1, roughness: 0.1, metalness: 0.9 })
        )
      );

      const screenGeo = new THREE.PlaneGeometry(1.8, 1.2);
      const screenColors = [0x00ffcc, 0xff00cc, 0xd4af37, 0x00ccff, 0xffffff];
      for (let floor = 0; floor < 4; floor += 1) {
        for (let desk = 0; desk < 5; desk += 1) {
          const screen = new THREE.Mesh(
            screenGeo,
            new THREE.MeshBasicMaterial({ color: screenColors[Math.floor(Math.random() * screenColors.length)], side: THREE.DoubleSide })
          );
          screen.position.set(-14 + desk * 7, -12 + floor * 8, 8);
          screen.rotation.y = Math.PI;
          officeGroup.add(screen);
        }
      }
      officeGroup.position.set(70, 17.5, 40);
      scene.add(officeGroup);

      const cityGroup = new THREE.Group();
      const windowMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.8 });
      for (let i = 0; i < 35; i += 1) {
        const h = 50 + Math.random() * 120;
        const w = 15 + Math.random() * 25;
        const d = 15 + Math.random() * 25;
        const bldg = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
        bldg.position.set(-120 - Math.random() * 300, h / 2, -150 + Math.random() * 300);
        const floors = Math.floor(Math.random() * 8) + 3;
        for (let f = 0; f < floors; f += 1) {
          const strip = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 1, d + 0.2), windowMat);
          strip.position.y = (Math.random() - 0.5) * (h - 10);
          bldg.add(strip);
        }
        cityGroup.add(bldg);
      }
      scene.add(cityGroup);

      const buildPlane = () => {
        const group = new THREE.Group();
        const bMat = new THREE.MeshStandardMaterial({ color: isDarkMode ? 0xffffff : 0x111111, metalness: 0.8, roughness: 0.2 });
        const wMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });

        const bGeo = new THREE.CylinderGeometry(1, 1, 10, 16);
        bGeo.rotateZ(Math.PI / 2);
        group.add(new THREE.Mesh(bGeo, bMat));

        const nGeo = new THREE.ConeGeometry(1, 3, 16);
        nGeo.rotateZ(-Math.PI / 2);
        const nose = new THREE.Mesh(nGeo, bMat);
        nose.position.set(6.5, 0, 0);
        group.add(nose);

        const wing = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 18), wMat);
        wing.position.set(0.5, 0, 0);
        group.add(wing);

        const vTail = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3.5, 0.1), wMat);
        vTail.position.set(-4.5, 1.8, 0);
        group.add(vTail);

        const hTail = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 6), wMat);
        hTail.position.set(-4.5, 0, 0);
        group.add(hTail);

        const eGeo = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
        eGeo.rotateZ(Math.PI / 2);
        const engine1 = new THREE.Mesh(eGeo, bMat);
        engine1.position.set(0, -0.8, 4);
        group.add(engine1);
        const engine2 = new THREE.Mesh(eGeo, bMat);
        engine2.position.set(0, -0.8, -4);
        group.add(engine2);

        const thrustGeo = new THREE.ConeGeometry(0.6, 6, 16);
        thrustGeo.rotateZ(-Math.PI / 2);
        const thrustMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const thrust1 = new THREE.Mesh(thrustGeo, thrustMat);
        thrust1.position.set(-3.5, -0.8, 4);
        group.add(thrust1);
        const thrust2 = new THREE.Mesh(thrustGeo, thrustMat);
        thrust2.position.set(-3.5, -0.8, -4);
        group.add(thrust2);

        group.rotation.y = -Math.PI / 2;
        return group;
      };

      const activePlanes = [];
      for (let i = 0; i < 4; i += 1) {
        const p = buildPlane();
        const lane = Math.random() > 0.5 ? -6 : 6;
        const startZ = 120 - i * 80;
        p.position.set(lane, 2, startZ);
        scene.add(p);
        activePlanes.push({ mesh: p, zPos: startZ, speed: 1.5 + Math.random() * 1.5 });
      }

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const dirLightGround = new THREE.DirectionalLight(0xd4af37, 2.5);
      dirLightGround.position.set(10, 30, 20);
      scene.add(dirLightGround);

      let scrollProgress = 0;
      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

        if (mountRef.current) {
          const baseOpacity = isDarkMode ? 1 : 0.62;
          const currentOpacity = Math.max(0, 1 - scrollProgress * 5) * baseOpacity;
          mountRef.current.style.opacity = currentOpacity.toString();
          mountRef.current.style.display = currentOpacity <= 0 ? 'none' : 'block';
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (mountRef.current && mountRef.current.style.display !== 'none') {
          radar.rotation.z -= 0.05;

          officeGroup.children.forEach((child, index) => {
            if (index > 1 && child.material && Math.random() > 0.92) child.material.opacity = Math.random() > 0.5 ? 1 : 0.2;
          });

          const targetCamZ = 90 - scrollProgress * 80;
          const targetCamY = 15 + scrollProgress * 30;
          const targetCamRotX = -(scrollProgress * 0.1);
          camera.position.z += (targetCamZ - camera.position.z) * 0.05;
          camera.position.y += (targetCamY - camera.position.y) * 0.05;
          camera.rotation.x += (targetCamRotX - camera.rotation.x) * 0.05;

          activePlanes.forEach((plane) => {
            plane.zPos -= plane.speed;

            if (plane.zPos < -20) {
              const distancePastTakeoff = Math.abs(plane.zPos + 20);
              plane.mesh.position.y = 2 + Math.pow(distancePastTakeoff, 1.25) * 0.15;
              plane.mesh.rotation.x = Math.min(0.45, distancePastTakeoff * 0.02);
              plane.mesh.rotation.z = Math.sin(Date.now() * 0.002) * 0.1;
            } else {
              plane.mesh.position.y = 2;
              plane.mesh.rotation.x = 0;
              plane.mesh.rotation.z = 0;
            }

            plane.mesh.position.z = plane.zPos;

            if (plane.zPos < camera.position.z - 300) {
              plane.zPos = camera.position.z + 150 + Math.random() * 100;
              plane.speed = 1.5 + Math.random() * 1.5;
              plane.mesh.position.x = Math.random() > 0.5 ? -6 : 6;
              plane.mesh.position.y = 2;
              plane.mesh.rotation.x = 0;
              plane.mesh.rotation.z = 0;
            }
          });

          renderer.render(scene, camera);
        }
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      cleanupScene = () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    const attemptInit = () => {
      if (window.THREE && mountRef.current) {
        clearInterval(checkInterval);
        initThree();
      }
    };

    ensureThreeScript();
    checkInterval = setInterval(attemptInit, 100);
    attemptInit();

    return () => {
      clearInterval(checkInterval);
      if (cleanupScene) cleanupScene();
      if (mountRef.current) mountRef.current.replaceChildren();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-300"
      style={{ opacity: isDarkMode ? 1 : 0.62 }}
    />
  );
};

const airlinesRow1 = [
  'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa', 'British Airways', 'Air France', 'Cathay Pacific',
  'Etihad Airways', 'Delta Airlines', 'ANA', 'Japan Airlines', 'Qantas', 'Turkish Airlines', 'Swiss International',
  'Air New Zealand', 'KLM', 'EVA Air', 'Virgin Atlantic', 'United Airlines', 'American Airlines', 'Air Canada',
];

const airlinesRow2 = [
  'Korean Air', 'Hainan Airlines', 'Finnair', 'Iberia', 'LATAM', 'Asiana Airlines', 'Aer Lingus', 'SAS',
  'TAP Air Portugal', 'Garuda Indonesia', 'Malaysia Airlines', 'Thai Airways', 'Saudi Arabian', 'Oman Air',
  'Gulf Air', 'Royal Jordanian', 'Ethiopian Airlines', 'South African Airways', 'Kenya Airways', 'Avianca', 'Copa Airlines',
];

const visas = [
  { country: 'United States', type: 'B1/B2 Tourist', fee: '$185', duration: '10 Years', processing: 'Variable', docs: ['Valid passport with 6 months validity', 'DS-160 confirmation page', '2x2 inch passport photo', 'Bank statements for 6 months', 'Proof of employment or home-country ties'] },
  { country: 'United Kingdom', type: 'Standard Visitor', fee: 'GBP 115', duration: '6 Months', processing: '3-4 Weeks', docs: ['Valid passport', 'VAF1A form', 'Financial proof', 'Detailed travel itinerary', 'Accommodation details'] },
  { country: 'Schengen Zone', type: 'Short Stay Type C', fee: 'EUR 80', duration: '90 Days', processing: '15 Days', docs: ['Passport issued within 10 years', 'Flight itinerary', 'Travel medical insurance with EUR 30,000 cover', 'Proof of accommodation', 'Bank statements'] },
  { country: 'UAE Dubai', type: 'Tourist Visa', fee: '350 AED', duration: '30/60 Days', processing: '2-3 Days', docs: ['Passport copy', 'Passport size photo with white background', 'Confirmed return flight ticket'] },
  { country: 'Australia', type: 'Visitor Subclass 600', fee: '$190 AUD', duration: '1 Year', processing: '20-30 Days', docs: ['Valid passport', 'Form 1419', 'Certified bank statements', 'Letter from employer', 'Travel itinerary'] },
  { country: 'Canada', type: 'Visitor Visa', fee: '$100 CAD', duration: '10 Years', processing: '30+ Days', docs: ['Valid passport', 'IMM 5257 form', 'Proof of financial support', 'Travel history', 'Purpose of travel document'] },
  { country: 'Japan', type: 'Temporary Visitor', fee: 'JPY 3,000', duration: '15-90 Days', processing: '5-7 Days', docs: ['Valid passport', 'Visa application form', 'Recent photo', 'Certificate of employment', 'Daily itinerary'] },
  { country: 'Singapore', type: 'Tourist Visa', fee: '$30 SGD', duration: '30 Days', processing: '3-5 Days', docs: ['Valid passport', 'Form 14A', 'Recent passport photo', 'Return flight ticket', 'Letter of introduction if applicable'] },
  { country: 'China', type: 'L Visa Tourist', fee: '$140', duration: '30-60 Days', processing: '4-5 Days', docs: ['Valid passport', 'COVA form', 'Photo with light background', 'Flight and hotel bookings', 'Invitation letter if applicable'] },
  { country: 'New Zealand', type: 'Visitor Visa', fee: '$246 NZD', duration: 'Up to 9 Months', processing: '20 Days', docs: ['Valid passport', 'INZ 1017 form', 'Proof of funds', 'Onward travel ticket', 'Medical or character certificates'] },
  { country: 'South Korea', type: 'Tourist C-3', fee: '$40', duration: '90 Days', processing: '7-10 Days', docs: ['Valid passport', 'Visa application form', 'Bank statements', 'Flight and hotel itinerary', 'Employment certificate'] },
  { country: 'Turkey', type: 'E-Visa', fee: '$50', duration: '30-90 Days', processing: '24 Hours', docs: ['Valid passport', 'Return ticket', 'Hotel reservation', 'Proof of funds', 'Supporting visa if required'] },
  { country: 'Saudi Arabia', type: 'E-Visa', fee: '535 SAR', duration: '1 Year Multiple Entry', processing: 'Minutes', docs: ['Valid passport', 'Digital photo', 'Medical insurance', 'Completed online form'] },
  { country: 'Thailand', type: 'Tourist Visa TR', fee: 'THB 1,000', duration: '60 Days', processing: '5-7 Days', docs: ['Valid passport', 'Visa application form', 'Recent photo', 'Proof of funds', 'Confirmed flight ticket'] },
  { country: 'India', type: 'E-Tourist Visa', fee: '$25-$80', duration: '30 Days - 5 Years', processing: '3-5 Days', docs: ['Valid passport', 'Digital photograph', 'Return ticket', 'Proof of sufficient funds'] },
  { country: 'Vietnam', type: 'E-Visa', fee: '$25', duration: '30 Days', processing: '3-4 Days', docs: ['Passport data page', 'Passport-sized photo', 'Entry and exit dates', 'Hotel booking'] },
  { country: 'Maldives', type: 'Tourist Visa', fee: 'Free', duration: '30 Days', processing: 'On Arrival', docs: ['Passport valid for 1 month', 'Confirmed hotel booking', 'Return onward ticket', 'IMUGA traveler declaration'] },
  { country: 'Qatar', type: 'Hayya Tourist', fee: '100 QAR', duration: '30 Days', processing: '1-3 Days', docs: ['Valid passport', 'Accommodation booking', 'Return ticket'] },
];

const insurances = [
  { country: 'United States', currency: 'USD', fee: '$45 - $120', coverage: '$100k - $500k medical, evacuation, trip interruption' },
  { country: 'United Kingdom', currency: 'GBP', fee: 'GBP 30 - GBP 80', coverage: 'GBP 100k medical, baggage loss, flight delay' },
  { country: 'Schengen Area', currency: 'EUR', fee: 'EUR 30 - EUR 60', coverage: 'EUR 30k mandatory minimum medical, zero deductible' },
  { country: 'UAE Dubai', currency: 'AED', fee: '150 - 300 AED', coverage: '500k AED medical, mandatory COVID-19 coverage included' },
  { country: 'Australia', currency: 'AUD', fee: '$60 - $150 AUD', coverage: '$200k AUD medical, adventure sports inclusion' },
  { country: 'Canada', currency: 'CAD', fee: '$50 - $120 CAD', coverage: '$100k CAD medical, winter sports and evacuation' },
  { country: 'Japan', currency: 'JPY', fee: 'JPY 5,000 - JPY 12,000', coverage: 'JPY 10M medical, language support services' },
  { country: 'Singapore', currency: 'SGD', fee: '$40 - $90 SGD', coverage: '$50k SGD medical, personal liability' },
  { country: 'India', currency: 'INR', fee: 'INR 1,500 - INR 4,500', coverage: 'INR 5M medical, trip cancellation, loss of passport' },
];

const bookingPlatforms = [
  { name: 'Amadeus', icon: <Globe size={24} strokeWidth={1.5} /> },
  { name: 'Sabre', icon: <Server size={24} strokeWidth={1.5} /> },
  { name: 'Travelport', icon: <Network size={24} strokeWidth={1.5} /> },
  { name: 'Skyscanner', icon: <Compass size={24} strokeWidth={1.5} /> },
  { name: 'Kayak', icon: <MapPin size={24} strokeWidth={1.5} /> },
  { name: 'Expedia', icon: <Plane size={24} strokeWidth={1.5} /> },
  { name: 'Booking.com', icon: <Building size={24} strokeWidth={1.5} /> },
  { name: 'Agoda', icon: <Ticket size={24} strokeWidth={1.5} /> },
];

const guides = [
  { dest: 'Europe Grand Tour', highlight: 'Best scenic train routes and hidden authentic cafes.', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800', points: ['Eurail pass strategy', 'Skip-the-line museum tickets', 'Local culinary gems', 'Boutique hotel recommendations'] },
  { dest: 'Asia Pacific', highlight: 'Bustling tech hubs intertwined with serene ancient temples.', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800', points: ['Bullet train pass optimization', 'Street food safety', 'Temple etiquette', 'Mega-city subway navigation'] },
  { dest: 'Middle East', highlight: 'Luxury shopping, desert safaris, and cultural landmarks.', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800', points: ['VIP desert safari bookings', 'Luxury mall support', 'Cultural customs', 'Beach club access'] },
  { dest: 'The Americas', highlight: 'National parks, city nightlife, and cross-country routes.', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800', points: ['National Park routes', 'Show ticket secrets', 'Regional dining', 'Domestic flight planning'] },
  { dest: 'African Safaris', highlight: 'Witness the Great Migration and stay in premium lodges.', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800', points: ['Big Five tracking', 'Vaccination prep', 'Luxury camp bookings', 'Bush flight logistics'] },
  { dest: 'Island Escapes', highlight: 'Overwater bungalows and pristine coral reef diving.', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800', points: ['Seaplane transfers', 'PADI planning', 'Resort optimization', 'Seasonal weather timing'] },
];

const AirTicketing = ({ navigateTo, isDarkMode = true }) => (
  <div className={`${isDarkMode ? 'dark bg-[#050505] text-gray-100' : 'bg-[#fffaf0] text-gray-900'} min-h-screen pb-20 relative z-10 animate-fade-in overflow-hidden`}>
    <style>{`
      .travel-glass-panel {
        background: rgba(255, 255, 255, 0.86);
        backdrop-filter: blur(18px);
        border: 1px solid rgba(181, 134, 24, 0.22);
        box-shadow: 0 18px 55px rgba(88, 62, 9, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .dark .travel-glass-panel {
        background: rgba(15, 15, 15, 0.75);
        border-color: rgba(212, 175, 55, 0.15);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
      }
      .travel-section-shell {
        background: linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,246,212,0.52));
        border-color: rgba(181, 134, 24, 0.2);
      }
      .dark .travel-section-shell {
        background: rgba(5, 5, 5, 0.9);
        border-color: rgba(212, 175, 55, 0.2);
      }
      @keyframes travel-marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .animate-travel-marquee {
        display: flex;
        width: 200%;
        animation: travel-marquee 25s linear infinite;
      }
    `}</style>

    <HiTechAirportBackground isDarkMode={isDarkMode} />
    <FlightBackground isDarkMode={isDarkMode} />

    <section className="px-6 max-w-7xl mx-auto text-center mb-32 relative z-10 pt-28 min-h-[80vh] flex flex-col justify-center items-center">
      <Reveal glow>
        <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-white/60 dark:bg-[#D4AF37]/10 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <PlaneTakeoff size={16} className="text-[#D4AF37] animate-pulse" />
          <span className="text-[#B58618] dark:text-[#D4AF37] font-black tracking-wider text-sm uppercase">Air Ticketing & Visa&apos;s</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-950 dark:text-white drop-shadow-md dark:drop-shadow-none">
          Elevate Your <br />
          <span className="text-gradient-gold">Global Journey</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium bg-white/70 dark:bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-[#D4AF37]/15">
          Seamless flight bookings, expedited visa processing, and comprehensive travel insurance. We navigate the complexities of international travel so you do not have to.
        </p>
      </Reveal>
    </section>

    <section className="py-8 relative z-10 border-y travel-section-shell backdrop-blur-2xl mb-32 shadow-[0_0_40px_rgba(212,175,55,0.1)] overflow-hidden">
      <Reveal>
        <div className="text-center mb-8 relative z-20">
          <h3 className="text-xs font-black text-[#B58618] dark:text-[#D4AF37] uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]">Global Network Tie-Ups</h3>
        </div>
      </Reveal>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-[#D4AF37]/10 blur-[100px] pointer-events-none rounded-[100%] z-0" />
      <div className="relative flex flex-col gap-6 overflow-x-hidden z-10">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#fffaf0] dark:from-[#050505] via-[#fffaf0]/80 dark:via-[#050505]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#fffaf0] dark:from-[#050505] via-[#fffaf0]/80 dark:via-[#050505]/80 to-transparent z-20 pointer-events-none" />
        {[airlinesRow1, airlinesRow2].map((row, rowIndex) => (
          <div key={rowIndex} className="animate-travel-marquee whitespace-nowrap flex items-center" style={{ animationDirection: rowIndex === 1 ? 'reverse' : 'normal', animationDuration: rowIndex === 1 ? '40s' : '45s' }}>
            {[...row, ...row].map((airline, index) => (
              <div key={`${rowIndex}-${index}`} className="mx-6 md:mx-10 flex items-center gap-3 group">
                <Plane size={20} className="text-[#D4AF37] opacity-70 group-hover:opacity-100 group-hover:animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300" />
                <span className="text-xl md:text-2xl font-black tracking-tight text-gray-500 dark:text-gray-300 group-hover:text-[#B58618] dark:group-hover:text-[#FCF6BA] transition-all duration-300 cursor-default select-none">{airline}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>

    <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
      <SectionHeading title="Global" accent="Visa Processing" subtitle="Transparent fees, timelines, and document checklists for top international destinations. Let our experts handle the paperwork." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visas.map((visa, i) => (
          <Reveal key={visa.country} delay={(i % 4) * 50}>
            <div className="travel-glass-panel p-6 rounded-2xl flex flex-col group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/50 h-full">
              <div className="flex justify-between items-start mb-5">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shrink-0"><Globe size={20} /></div>
                <span className="bg-[#D4AF37]/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-right ml-2 leading-tight">{visa.type}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-950 dark:text-white">{visa.country}</h3>
              <div className="space-y-2 mb-5">
                <InfoRow label="Est. Fee" value={visa.fee} gold />
                <InfoRow label="Validity" value={visa.duration} />
                <InfoRow label="Processing" value={visa.processing} />
              </div>
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10">
                <p className="text-xs font-bold text-gray-950 dark:text-white mb-3 flex items-center gap-2"><FileCheck size={14} className="text-[#D4AF37]" /> Required Documents:</p>
                <ul className="space-y-2">
                  {visa.docs.map((doc) => (
                    <li key={doc} className="text-[11px] font-medium text-gray-600 dark:text-gray-400 flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
      <SectionHeading title="Global & Domestic" accent="Coverage" subtitle="Connecting you seamlessly, powered by industry-leading distribution systems." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <FlightCard icon={<MapPin className="text-[#D4AF37] mb-6 w-12 h-12" />} title="Domestic Flights" text="Unbeatable rates for inter-state and regional travel. We pre-negotiate last-minute bookings, corporate deals, and excess baggage allowances." items={['Priority boarding assistance', '24/7 rescheduling support', 'Regional carrier exclusives']} />
        <FlightCard icon={<Globe className="text-[#D4AF37] mb-6 w-12 h-12" />} title="International Flights" text="Complex multi-city itineraries, round-the-world tickets, and premium cabin upgrades facilitated through our global airline network." items={['Premium lounge access', 'Multi-carrier combinations', 'Transit visa facilitation']} delay={150} />
      </div>
      <Reveal delay={300} glow>
        <div className="travel-glass-panel py-8 rounded-3xl text-center relative overflow-hidden border border-[#D4AF37]/30 shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
          <h4 className="text-sm font-bold text-[#B58618] dark:text-[#D4AF37] uppercase tracking-[0.2em] mb-6 relative z-10">Integrated Partner Platforms</h4>
          <div className="relative flex overflow-x-hidden z-10">
            <div className="animate-travel-marquee whitespace-nowrap flex items-center" style={{ animationDuration: '30s' }}>
              {[...bookingPlatforms, ...bookingPlatforms].map((platform, idx) => (
                <div key={`${platform.name}-${idx}`} className="mx-6 md:mx-10 flex items-center gap-3 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 border border-gray-200 dark:border-white/5 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.8)]">{React.cloneElement(platform.icon, { size: 20 })}</div>
                  <span className="text-lg font-black tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-[#B58618] dark:group-hover:text-[#FCF6BA] transition-all duration-300">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>

    <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
      <SectionHeading title="Curated" accent="Travel Guides" subtitle="Complimentary itineraries and tips for your next adventure." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <Reveal key={guide.dest} delay={i * 100}>
            <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl border border-gray-200 dark:border-white/10 hover:border-[#D4AF37]/50 transition-colors">
              <div className="absolute inset-0 bg-black"><img src={guide.img} alt={guide.dest} className="w-full h-full object-cover opacity-70 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <Compass className="text-[#D4AF37] mb-3 group-hover:animate-bounce" size={32} />
                <h3 className="text-3xl font-black text-white mb-2">{guide.dest}</h3>
                <p className="text-gray-300 font-medium transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 mb-4">{guide.highlight}</p>
                <ul className="space-y-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {guide.points.map((pt) => <li key={pt} className="text-sm font-semibold text-white flex items-start gap-2 leading-tight"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0 shadow-[0_0_5px_#D4AF37]" />{pt}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
      <SectionHeading title="Comprehensive" accent="Travel Insurance" subtitle="Protect your journey with premium coverage. Mandatory for many visas and essential for absolute peace of mind." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insurances.map((ins, i) => (
          <Reveal key={ins.country} delay={i * 80}>
            <div className="travel-glass-panel p-8 rounded-2xl group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/50 h-full flex flex-col">
              <div className="flex justify-between gap-4 items-start mb-6"><div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform"><HeartPulse size={24} /></div><span className="text-2xl font-black text-[#B58618] dark:text-[#D4AF37] text-right">{ins.fee}</span></div>
              <h3 className="text-xl font-bold mb-2 text-gray-950 dark:text-white">{ins.country}</h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Currency: <span className="text-[#B58618] dark:text-[#D4AF37]">{ins.currency}</span></p>
              <p className="mt-auto text-sm font-medium text-gray-600 dark:text-gray-300 flex items-start gap-3 leading-relaxed"><ShieldCheck size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />{ins.coverage}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="px-6 max-w-5xl mx-auto relative z-10">
      <Reveal glow>
        <div className="travel-glass-panel p-10 md:p-16 rounded-[3rem] text-center shadow-[0_20px_50px_rgba(212,175,55,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_60%)] animate-pulse-gold pointer-events-none" />
          <div className="flex justify-center gap-4 mb-8">
            <IconTile><Ticket size={32} /></IconTile>
            <IconTile delay><CreditCard size={32} /></IconTile>
          </div>
          <h2 className="text-4xl font-black mb-6 text-gray-950 dark:text-white">Secure Bookings & <span className="text-[#B58618] dark:text-[#D4AF37]">Consultation</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-medium">We process secure payments globally via Stripe, PayPal, and SWIFT transfers. Schedule a call with our travel architects to customize your itinerary and lock in the best rates.</p>
          <button onClick={() => navigateTo('contact')} className="px-10 py-5 bg-[#D4AF37] text-black font-bold text-lg rounded-xl hover:bg-[#e0c055] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)] inline-flex items-center gap-3 relative z-10">Book Travel Consultation <Navigation size={20} /></button>
        </div>
      </Reveal>
    </section>
  </div>
);

const SectionHeading = ({ title, accent, subtitle }) => (
  <Reveal glow>
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-950 dark:text-white">{title} <span className="text-[#B58618] dark:text-[#D4AF37]">{accent}</span></h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto bg-white/70 dark:bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-[#D4AF37]/10">{subtitle}</p>
    </div>
  </Reveal>
);

const InfoRow = ({ label, value, gold = false }) => (
  <div className="flex justify-between items-center text-sm font-medium border-b border-gray-100 dark:border-white/5 pb-2 last:border-b-0">
    <span className="text-gray-500">{label}:</span>
    <span className={`${gold ? 'text-[#B58618] dark:text-[#D4AF37] font-black' : 'text-gray-900 dark:text-white'} text-right`}>{value}</span>
  </div>
);

const FlightCard = ({ icon, title, text, items, delay = 0 }) => (
  <Reveal delay={delay}>
    <div className="travel-glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
      {icon}
      <h3 className="text-3xl font-bold mb-4 text-gray-950 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed">{text}</p>
      <ul className="space-y-4">
        {items.map((item) => <li key={item} className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" />{item}</li>)}
      </ul>
    </div>
  </Reveal>
);

const IconTile = ({ children, delay = false }) => (
  <div className={`w-16 h-16 bg-white dark:bg-black/50 rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm border border-gray-200 dark:border-white/10 group-hover:-translate-y-2 transition-transform ${delay ? 'delay-100' : ''}`}>{children}</div>
);

export default AirTicketing;
