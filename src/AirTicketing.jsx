import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  HeartPulse
} from 'lucide-react';

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

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.25,0.4,0.2,1)] ${
        isVisible
          ? `opacity-100 translate-y-0 filter-none active ${glow ? 'drop-shadow-[0_0_35px_rgba(212,175,55,0.5)]' : ''}`
          : 'opacity-0 translate-y-16 blur-md'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FlightBackground = ({ isDarkMode }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationId;
    let checkInterval;
    let cleanupThree = () => {};

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);

      const planeGroup = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0xffffff : 0x111111,
        metalness: 0.6,
        roughness: 0.3
      });
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.8,
        roughness: 0.2
      });
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

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 80;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 40;
        posArray[i * 6] = x;
        posArray[i * 6 + 1] = y;
        posArray[i * 6 + 2] = z;
        posArray[i * 6 + 3] = x + 3 + Math.random() * 5;
        posArray[i * 6 + 4] = y;
        posArray[i * 6 + 5] = z;
      }

      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particles = new THREE.LineSegments(
        particlesGeo,
        new THREE.LineBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: isDarkMode ? 0.3 : 0.6
        })
      );
      scene.add(particles);

      let scrollProgress = 0;
      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

        if (mountRef.current) {
          const baseOpacity = isDarkMode ? 0.8 : 0.4;
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
        for (let i = 0; i < particleCount; i++) {
          const speed = 1 + scrollProgress * 1.5;
          positions[i * 6] -= speed;
          positions[i * 6 + 3] -= speed;

          if (positions[i * 6] < -40) {
            const newX = 40 + Math.random() * 10;
            positions[i * 6] = newX;
            positions[i * 6 + 3] = newX + 3 + Math.random() * 5;
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

      cleanupThree = () => {
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

    checkInterval = setInterval(attemptInit, 100);
    attemptInit();

    return () => {
      clearInterval(checkInterval);
      cleanupThree();
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, [isDarkMode]);

  return (
    <div
      ref={mountRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-opacity duration-300"
    />
  );
};

const HiTechAirportBackground = ({ isDarkMode }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationId;
    let checkInterval;
    let cleanupThree = () => {};

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(isDarkMode ? 0x050505 : 0xf0f0f0, 0.0025);

      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 15, 90);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);

      const grid = new THREE.GridHelper(500, 100, 0xd4af37, isDarkMode ? 0x111111 : 0xdddddd);
      scene.add(grid);

      const lightsGeo = new THREE.BufferGeometry();
      const lightsPos = [];
      for (let i = 0; i < 150; i++) {
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
            blending: THREE.AdditiveBlending
          })
        )
      );

      const buildingMat = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0x0a0a0a : 0xffffff,
        metalness: 0.8,
        roughness: 0.2
      });

      const mainTerminal = new THREE.Mesh(new THREE.BoxGeometry(80, 20, 40), buildingMat);
      mainTerminal.position.set(50, 10, -20);
      scene.add(mainTerminal);

      const concourse = new THREE.Mesh(new THREE.BoxGeometry(20, 15, 140), buildingMat);
      concourse.position.set(30, 7.5, 30);
      scene.add(concourse);

      const towerGroup = new THREE.Group();
      towerGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(2.5, 5, 60, 16), buildingMat));

      const towerTop = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 5, 12, 16),
        new THREE.MeshStandardMaterial({
          color: isDarkMode ? 0x050505 : 0xffffff,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0xd4af37,
          emissiveIntensity: 0.4
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
          depthWrite: false
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
          new THREE.MeshStandardMaterial({ color: isDarkMode ? 0x0a0a0a : 0xdddddd, wireframe: true })
        )
      );
      officeGroup.add(
        new THREE.Mesh(
          new THREE.BoxGeometry(39.5, 34.5, 19.5),
          new THREE.MeshPhysicalMaterial({
            color: 0x88bbff,
            transparent: true,
            opacity: 0.1,
            roughness: 0.1,
            metalness: 0.9
          })
        )
      );

      const screenGeo = new THREE.PlaneGeometry(1.8, 1.2);
      const screenColors = [0x00ffcc, 0xff00cc, 0xd4af37, 0x00ccff, 0xffffff];
      for (let floor = 0; floor < 4; floor++) {
        for (let desk = 0; desk < 5; desk++) {
          const screen = new THREE.Mesh(
            screenGeo,
            new THREE.MeshBasicMaterial({
              color: screenColors[Math.floor(Math.random() * screenColors.length)],
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 1
            })
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
      for (let i = 0; i < 35; i++) {
        const h = 50 + Math.random() * 120;
        const w = 15 + Math.random() * 25;
        const d = 15 + Math.random() * 25;
        const bldg = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
        bldg.position.set(-120 - Math.random() * 300, h / 2, -150 + Math.random() * 300);

        const floors = Math.floor(Math.random() * 8) + 3;
        for (let f = 0; f < floors; f++) {
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
        const thrustMat = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
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
      for (let i = 0; i < 4; i++) {
        const plane = buildPlane();
        const lane = Math.random() > 0.5 ? -6 : 6;
        const startZ = 120 - i * 80;
        plane.position.set(lane, 2, startZ);
        scene.add(plane);
        activePlanes.push({ mesh: plane, zPos: startZ, speed: 1.5 + Math.random() * 1.5 });
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
          const baseOpacity = isDarkMode ? 1 : 0.8;
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
            if (index > 1 && Math.random() > 0.92) {
              child.material.opacity = Math.random() > 0.5 ? 1 : 0.2;
            }
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

      cleanupThree = () => {
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

    if (!document.getElementById('three-js-script')) {
      const script = document.createElement('script');
      script.id = 'three-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      document.head.appendChild(script);
    }

    checkInterval = setInterval(attemptInit, 100);
    attemptInit();

    return () => {
      clearInterval(checkInterval);
      cleanupThree();
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, [isDarkMode]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
      style={{ opacity: isDarkMode ? 1 : 0.8 }}
    />
  );
};

const AirTicketing = ({ navigateTo = () => {}, isDarkMode = true }) => {
  const airlinesRow1 = [
    'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa', 'British Airways',
    'Air France', 'Cathay Pacific', 'Etihad Airways', 'Delta Airlines', 'ANA',
    'Japan Airlines', 'Qantas', 'Turkish Airlines', 'Swiss International', 'Air New Zealand',
    'KLM', 'EVA Air', 'Virgin Atlantic', 'United Airlines', 'American Airlines', 'Air Canada'
  ];

  const airlinesRow2 = [
    'Korean Air', 'Hainan Airlines', 'Finnair', 'Iberia', 'LATAM', 'Asiana Airlines',
    'Aer Lingus', 'SAS', 'TAP Air Portugal', 'Garuda Indonesia', 'Malaysia Airlines',
    'Thai Airways', 'Saudi Arabian', 'Oman Air', 'Gulf Air', 'Royal Jordanian',
    'Ethiopian Airlines', 'South African Airways', 'Kenya Airways', 'Avianca', 'Copa Airlines'
  ];

  const visas = [
    { country: 'United States', type: 'B1/B2 Tourist', fee: '$185', duration: '10 Years', processing: 'Variable', docs: ['Valid Passport (6 months validity)', 'DS-160 Confirmation Page', '2x2 inch Passport Photo', 'Bank Statements (Last 6 months)', 'Proof of Employment/Ties to Home Country'] },
    { country: 'United Kingdom', type: 'Standard Visitor', fee: 'GBP 115', duration: '6 Months', processing: '3-4 Weeks', docs: ['Valid Passport', 'VAF1A Form', 'Financial Proof (Bank Statements/Payslips)', 'Detailed Travel Itinerary', 'Accommodation Details'] },
    { country: 'Schengen Zone', type: 'Short Stay (Type C)', fee: 'EUR 80', duration: '90 Days', processing: '15 Days', docs: ['Passport (issued within 10 yrs)', 'Flight Itinerary', 'Travel Medical Insurance (EUR 30,000 cover)', 'Proof of Accommodation', 'Bank Statements'] },
    { country: 'UAE (Dubai)', type: 'Tourist Visa', fee: '350 AED', duration: '30/60 Days', processing: '2-3 Days', docs: ['Passport Copy (Front & Back)', 'Passport Size Photo (White Background)', 'Confirmed Return Flight Ticket'] },
    { country: 'Australia', type: 'Visitor (Subclass 600)', fee: '$190 AUD', duration: '1 Year', processing: '20-30 Days', docs: ['Valid Passport', 'Form 1419', 'Certified Bank Statements', 'Letter from Employer', 'Travel Itinerary'] },
    { country: 'Canada', type: 'Visitor Visa', fee: '$100 CAD', duration: '10 Years', processing: '30+ Days', docs: ['Valid Passport', 'IMM 5257 Form', 'Proof of Financial Support', 'Travel History', 'Purpose of Travel Document'] },
    { country: 'Japan', type: 'Temporary Visitor', fee: 'JPY 3,000', duration: '15-90 Days', processing: '5-7 Days', docs: ['Valid Passport', 'Visa Application Form', 'Recent Photo (2x2 inch)', 'Certificate of Employment', 'Bank Statements', 'Daily Itinerary'] },
    { country: 'Singapore', type: 'Tourist Visa', fee: '$30 SGD', duration: '30 Days', processing: '3-5 Days', docs: ['Valid Passport', 'Form 14A', 'Recent Passport Photo', 'Return Flight Ticket', 'Letter of Introduction (if applicable)'] },
    { country: 'China', type: 'L Visa (Tourist)', fee: '$140', duration: '30-60 Days', processing: '4-5 Days', docs: ['Valid Passport', 'COVA Form', 'Photo (Light Background)', 'Flight & Hotel Bookings', 'Invitation Letter (if applicable)'] },
    { country: 'New Zealand', type: 'Visitor Visa', fee: '$246 NZD', duration: 'Up to 9 Months', processing: '20 Days', docs: ['Valid Passport', 'INZ 1017 Form', 'Proof of Funds ($1000 NZD/month)', 'Onward Travel Ticket', 'Medical/Character Certificates'] },
    { country: 'South Korea', type: 'Tourist (C-3)', fee: '$40', duration: '90 Days', processing: '7-10 Days', docs: ['Valid Passport', 'Visa Application Form', 'Bank Statements (Last 6 Months)', 'Flight & Hotel Itinerary', 'Employment Certificate'] },
    { country: 'Turkey', type: 'E-Visa', fee: '$50', duration: '30-90 Days', processing: '24 Hours', docs: ['Valid Passport (6 months validity)', 'Return Ticket', 'Hotel Reservation', 'Proof of Funds ($50/day)', 'Valid Supporting Visa (Schengen/US/UK - if required)'] },
    { country: 'Saudi Arabia', type: 'E-Visa', fee: '535 SAR', duration: '1 Year (Multiple Entry)', processing: 'Minutes', docs: ['Valid Passport', 'Digital Photo', 'Medical Insurance (Included in fee)', 'Completed Online Form'] },
    { country: 'South Africa', type: 'Tourist Visa', fee: 'R425 ZAR', duration: '90 Days', processing: '10-15 Days', docs: ['Valid Passport', 'Form BI-84', 'Bank Statements (Last 3 months)', 'Proof of Accommodation', 'Yellow Fever Certificate (if applicable)'] },
    { country: 'Egypt', type: 'E-Visa', fee: '$25', duration: '30 Days', processing: '7 Days', docs: ['Valid Passport', 'Online Application', 'Digital Photo', 'Travel Itinerary'] },
    { country: 'Brazil', type: 'Visitor Visa (VIVIS)', fee: '$80', duration: '90 Days', processing: '10-15 Days', docs: ['Valid Passport', 'Visa Application Receipt', 'Photo (2x2 inch)', 'Bank Statements', 'Flight Itinerary'] },
    { country: 'Thailand', type: 'Tourist Visa (TR)', fee: 'THB 1,000', duration: '60 Days', processing: '5-7 Days', docs: ['Valid Passport', 'Visa Application Form', 'Recent Photo', 'Proof of Funds ($700/person)', 'Confirmed Flight Ticket'] },
    { country: 'Malaysia', type: 'E-Visa', fee: 'RM 105 MYR', duration: '30 Days', processing: '2-3 Days', docs: ['Valid Passport', 'Digital Photo', 'Return Flight Ticket', 'Proof of Accommodation'] },
    { country: 'India', type: 'E-Tourist Visa', fee: '$25-$80', duration: '30 Days - 5 Yrs', processing: '3-5 Days', docs: ['Valid Passport', 'Digital Photograph', 'Return Ticket', 'Proof of sufficient funds'] },
    { country: 'Vietnam', type: 'E-Visa', fee: '$25', duration: '30 Days', processing: '3-4 Days', docs: ['Passport Data Page', 'Passport-sized Photo', 'Intended Entry/Exit Dates', 'Hotel Booking'] },
    { country: 'Indonesia', type: 'VoA / B211A', fee: 'Rp 500,000 IDR', duration: '30-60 Days', processing: 'On Arrival/3 Days', docs: ['Passport valid for 6 months', 'Return Flight Ticket', 'Covid-19 Vaccination (if req)', 'Hotel Confirmation'] },
    { country: 'Mexico', type: 'Tourist Visa', fee: '$53', duration: '180 Days', processing: '10 Days', docs: ['Valid Passport', 'Visa Application Form', 'Proof of Economic Solvency', 'One recent passport photo', 'Employment letter'] },
    { country: 'Kenya', type: 'E-TA', fee: '$34', duration: '90 Days', processing: '3 Days', docs: ['Valid Passport', 'Selfie/Passport Photo', 'Flight Booking', 'Hotel Reservation Details'] },
    { country: 'Argentina', type: 'Tourist Visa', fee: '$150', duration: '90 Days', processing: '15-20 Days', docs: ['Passport', 'Completed FSV Form', 'Proof of Funds', 'Round Trip Flight', 'Interview at Consulate'] },
    { country: 'Russia', type: 'E-Visa', fee: '$52', duration: '16 Days', processing: '4 Days', docs: ['Valid Passport', 'Digital Photo', 'Medical Insurance Valid in Russia'] },
    { country: 'Philippines', type: 'Tourist Visa (9A)', fee: 'PHP 1,500', duration: '59 Days', processing: '2-10 Days', docs: ['Valid Passport', 'Visa Application Form', 'Return Ticket', 'Proof of Financial Capacity'] },
    { country: 'Sri Lanka', type: 'E-TA', fee: '$50', duration: '30 Days', processing: '24-48 Hours', docs: ['Valid Passport', 'Return Ticket', 'Proof of Sufficient Funds'] },
    { country: 'Maldives', type: 'Tourist Visa', fee: 'Free', duration: '30 Days', processing: 'On Arrival', docs: ['Passport valid for 1 month', 'Confirmed Hotel Booking', 'Return Onward Ticket', 'IMUGA Traveler Declaration'] },
    { country: 'Morocco', type: 'E-Visa', fee: '770 MAD', duration: '30 Days', processing: '1-3 Days', docs: ['Valid Passport', 'Passport-sized Photo', 'Flight & Accommodation Details'] },
    { country: 'Tanzania', type: 'E-Visa', fee: '$50', duration: '90 Days', processing: '10 Days', docs: ['Valid Passport', 'Return Ticket', 'Passport Photo', 'Yellow Fever Certificate (if from endemic country)'] },
    { country: 'Colombia', type: 'Tourist Visa', fee: '$82', duration: '90 Days', processing: '5-10 Days', docs: ['Valid Passport', 'Digital Photo', 'Bank Statements (Last 3 Months)', 'Flight Itinerary'] },
    { country: 'Peru', type: 'Tourist Visa', fee: '$30', duration: '183 Days', processing: '15 Days', docs: ['Valid Passport', 'Application Form', 'Proof of Funds', 'Travel Itinerary', 'Hotel Reservation'] },
    { country: 'Oman', type: 'E-Visa', fee: '20 OMR', duration: '30 Days', processing: '24-48 Hours', docs: ['Valid Passport', 'Digital Photo', 'Hotel Booking Confirmation'] },
    { country: 'Qatar', type: 'Hayya Tourist', fee: '100 QAR', duration: '30 Days', processing: '1-3 Days', docs: ['Valid Passport', 'Accommodation Booking via Discover Qatar', 'Return Ticket'] }
  ];

  const insurances = [
    { country: 'United States', currency: 'USD', fee: '$45 - $120', coverage: '$100k - $500k Medical, Evacuation, Trip Interruption' },
    { country: 'United Kingdom', currency: 'GBP', fee: 'GBP 30 - GBP 80', coverage: 'GBP 100k Medical, Baggage Loss, Flight Delay' },
    { country: 'Schengen Area', currency: 'EUR', fee: 'EUR 30 - EUR 60', coverage: 'EUR 30k mandatory minimum medical, zero deductible' },
    { country: 'UAE (Dubai)', currency: 'AED', fee: '150 - 300 AED', coverage: '500k AED medical, mandatory COVID-19 coverage included' },
    { country: 'Australia', currency: 'AUD', fee: '$60 - $150 AUD', coverage: '$200k AUD medical, adventure sports inclusion' },
    { country: 'Canada', currency: 'CAD', fee: '$50 - $120 CAD', coverage: '$100k CAD medical, winter sports and evacuation' },
    { country: 'Japan', currency: 'JPY', fee: 'JPY 5,000 - JPY 12,000', coverage: 'JPY 10M medical, language support services' },
    { country: 'Singapore', currency: 'SGD', fee: '$40 - $90 SGD', coverage: '$50k SGD medical, personal liability' },
    { country: 'India', currency: 'INR', fee: 'INR 1,500 - INR 4,500', coverage: 'INR 5M medical, trip cancellation, loss of passport' },
    { country: 'South Africa', currency: 'ZAR', fee: 'R500 - R1,200', coverage: 'R1M ZAR medical, safari and wildlife adventure cover' },
    { country: 'Thailand', currency: 'THB', fee: 'THB 1,200 - THB 3,000', coverage: 'THB 2M medical, scooter or moped accident cover' },
    { country: 'Global Multi-Trip', currency: 'USD', fee: 'From $250/yr', coverage: 'Annual worldwide cover with max 45 days per trip' }
  ];

  const bookingPlatforms = [
    { name: 'Amadeus', icon: <Globe size={24} strokeWidth={1.5} /> },
    { name: 'Sabre', icon: <Server size={24} strokeWidth={1.5} /> },
    { name: 'Travelport', icon: <Network size={24} strokeWidth={1.5} /> },
    { name: 'Skyscanner', icon: <Compass size={24} strokeWidth={1.5} /> },
    { name: 'Kayak', icon: <MapPin size={24} strokeWidth={1.5} /> },
    { name: 'Expedia', icon: <Plane size={24} strokeWidth={1.5} /> },
    { name: 'Booking.com', icon: <Building size={24} strokeWidth={1.5} /> },
    { name: 'Agoda', icon: <Ticket size={24} strokeWidth={1.5} /> }
  ];

  const guides = [
    {
      dest: 'Europe Grand Tour',
      highlight: 'Best scenic train routes and hidden authentic cafes.',
      img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
      points: ['Eurail Pass navigation strategies', 'Skip-the-line museum tickets', 'Local culinary hidden gems', 'Boutique hotel recommendations']
    },
    {
      dest: 'Asia Pacific',
      highlight: 'Bustling tech hubs intertwined with serene ancient temples.',
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
      points: ['Bullet train pass optimizations', 'Street food safety and top spots', 'Temple etiquette and dress codes', 'Navigating mega-city subways']
    },
    {
      dest: 'Middle East',
      highlight: 'Extravagant luxury shopping and unforgettable desert safaris.',
      img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
      points: ['VIP desert safari bookings', 'Luxury mall personal shoppers', 'Cultural customs and best practices', 'Exclusive beach club access']
    },
    {
      dest: 'The Americas',
      highlight: 'Breathtaking national parks and vibrant metropolitan nightlife.',
      img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
      points: ['National Park passes and routes', 'Broadway and show ticket secrets', 'Regional dining specialties', 'Cross-country domestic flights']
    },
    {
      dest: 'African Safaris',
      highlight: 'Witness the Great Migration and luxurious lodge stays.',
      img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop',
      points: ['Big Five tracking strategies', 'Malaria and vaccination prep', 'Luxury tented camp bookings', 'Bush flight logistics']
    },
    {
      dest: 'Island Escapes',
      highlight: 'Overwater bungalows and pristine coral reef diving.',
      img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
      points: ['Private seaplane transfers', 'PADI certification planning', 'All-inclusive resort optimization', 'Seasonal weather planning']
    }
  ];

  return (
    <div className={`travel-page ${isDarkMode ? 'dark bg-[#050505] text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen pb-20 relative z-10 animate-fade-in overflow-hidden`}>
      <style>{`
        .travel-page .glass-panel {
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .travel-page.dark .glass-panel {
          background: rgba(15, 15, 15, 0.75);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
      `}</style>

      <HiTechAirportBackground isDarkMode={isDarkMode} />
      <FlightBackground isDarkMode={isDarkMode} />

      <section className="px-6 max-w-7xl mx-auto text-center mb-32 relative z-10 pt-28 min-h-[80vh] flex flex-col justify-center items-center">
        <Reveal glow>
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-white/70 dark:bg-[#D4AF37]/10 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <PlaneTakeoff size={16} className="text-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] font-bold tracking-wider text-sm uppercase">Global Travel Desk</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-900 dark:text-white drop-shadow-md dark:drop-shadow-none">
            Elevate Your <br />
            <span className="text-gradient-gold">Global Journey</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium bg-white/70 dark:bg-black/40 p-4 rounded-xl backdrop-blur-md">
            Seamless flight bookings, expedited visa processing, and comprehensive travel insurance. We navigate the complexities of international travel so you do not have to.
          </p>
        </Reveal>
      </section>

      <section className="py-8 relative z-10 border-y border-[#D4AF37]/20 bg-[#050505]/90 backdrop-blur-2xl mb-32 shadow-[0_0_40px_rgba(212,175,55,0.1)] overflow-hidden">
        <Reveal>
          <div className="text-center mb-8 relative z-20">
            <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
              Global Network Tie-Ups
            </h3>
          </div>
        </Reveal>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-[#D4AF37]/10 blur-[100px] pointer-events-none rounded-[100%] z-0"></div>

        <div className="relative flex flex-col gap-6 overflow-x-hidden z-10">
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>

          <div className="animate-marquee whitespace-nowrap flex items-center" style={{ animationDuration: '45s' }}>
            {[...airlinesRow1, ...airlinesRow1].map((airline, index) => (
              <div key={`row1-${index}`} className="mx-6 md:mx-10 flex items-center gap-3 group">
                <Plane size={20} className="text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300" />
                <span className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] group-hover:from-[#D4AF37] group-hover:to-[#FCF6BA] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all duration-500 cursor-default select-none">
                  {airline}
                </span>
              </div>
            ))}
          </div>

          <div className="animate-marquee whitespace-nowrap flex items-center" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
            {[...airlinesRow2, ...airlinesRow2].map((airline, index) => (
              <div key={`row2-${index}`} className="mx-6 md:mx-10 flex items-center gap-3 group">
                <Plane size={20} className="text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300" />
                <span className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] group-hover:from-[#D4AF37] group-hover:to-[#FCF6BA] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all duration-500 cursor-default select-none">
                  {airline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
        <Reveal glow>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Global <span className="text-[#D4AF37]">Visa Processing</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto bg-white/70 dark:bg-black/40 p-3 rounded-lg backdrop-blur-sm">
              Transparent fees, timelines, and document checklists for top international destinations. Let our experts handle the paperwork.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visas.map((visa, i) => (
            <Reveal key={visa.country} delay={(i % 4) * 50}>
              <div className="glass-panel p-6 rounded-2xl flex flex-col group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shrink-0">
                    <Globe size={20} />
                  </div>
                  <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-right ml-2 leading-tight">
                    {visa.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{visa.country}</h3>

                <div className="space-y-2 mb-5">
                  <div className="flex justify-between items-center text-sm font-medium border-b border-gray-100 dark:border-white/5 pb-2">
                    <span className="text-gray-500">Est. Fee:</span>
                    <span className="text-[#D4AF37] font-black">{visa.fee}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium border-b border-gray-100 dark:border-white/5 pb-2">
                    <span className="text-gray-500">Validity:</span>
                    <span className="text-gray-900 dark:text-white text-right">{visa.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-500">Processing:</span>
                    <span className="text-gray-900 dark:text-white text-right">{visa.processing}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10">
                  <p className="text-xs font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileCheck size={14} className="text-[#D4AF37]" /> Required Documents:
                  </p>
                  <ul className="space-y-2">
                    {visa.docs.map((doc) => (
                      <li key={doc} className="text-[11px] font-medium text-gray-600 dark:text-gray-400 flex items-start gap-2 leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0"></div>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
        <Reveal glow>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Global & Domestic <span className="text-[#D4AF37]">Coverage</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 bg-white/70 dark:bg-black/40 p-3 rounded-lg backdrop-blur-sm inline-block">
              Connecting you seamlessly, powered by industry-leading distribution systems.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Reveal delay={100}>
            <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
              <MapPin className="text-[#D4AF37] mb-6 w-12 h-12" />
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Domestic Flights</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                Unbeatable rates for inter-state and regional travel. We pre-negotiate last-minute bookings, corporate deals, and excess baggage allowances.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" /> Priority Boarding Assistance</li>
                <li className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" /> 24/7 Rescheduling Support</li>
                <li className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" /> Regional Carrier Exclusives</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
              <Globe className="text-[#D4AF37] mb-6 w-12 h-12" />
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">International Flights</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                Complex multi-city itineraries, round-the-world tickets, and premium cabin upgrades are facilitated through our global airline network tie-ups.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" /> Premium Lounge Access</li>
                <li className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" /> Multi-Carrier Combinations</li>
                <li className="flex gap-3 items-center text-sm font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 size={18} className="text-[#D4AF37]" /> Transit Visa Facilitation</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} glow>
          <div className="glass-panel py-8 rounded-3xl text-center relative overflow-hidden border border-[#D4AF37]/30 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none"></div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-6 relative z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
              Integrated Partner Platforms
            </h4>

            <div className="relative flex overflow-x-hidden z-10">
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white/80 dark:from-[#111] to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white/80 dark:from-[#111] to-transparent z-20 pointer-events-none"></div>

              <div className="animate-marquee whitespace-nowrap flex items-center" style={{ animationDuration: '30s' }}>
                {[...bookingPlatforms, ...bookingPlatforms].map((platform, idx) => (
                  <div key={`plat-${platform.name}-${idx}`} className="mx-6 md:mx-10 flex items-center gap-3 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/5 flex items-center justify-center text-gray-400 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 border border-gray-200 dark:border-white/5 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.8)]">
                      {React.cloneElement(platform.icon, { size: 20 })}
                    </div>
                    <span className="text-lg font-black tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-white transition-all duration-300 drop-shadow-sm">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
        <Reveal glow>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Curated <span className="text-[#D4AF37]">Travel Guides</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 bg-white/70 dark:bg-black/40 p-3 rounded-lg backdrop-blur-sm inline-block">
              Complimentary itineraries and tips for your next adventure.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <Reveal key={guide.dest} delay={i * 100}>
              <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl border border-gray-200 dark:border-white/10 hover:border-[#D4AF37]/50 transition-colors">
                <div className="absolute inset-0 bg-black">
                  <img src={guide.img} alt={guide.dest} className="w-full h-full object-cover opacity-60 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <Compass className="text-[#D4AF37] mb-3 group-hover:animate-bounce" size={32} />
                  <h3 className="text-3xl font-black text-white mb-2">{guide.dest}</h3>

                  <p className="text-gray-300 font-medium transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 mb-4">
                    {guide.highlight}
                  </p>

                  <ul className="space-y-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {guide.points.map((pt) => (
                      <li key={pt} className="text-sm font-semibold text-white flex items-start gap-2 leading-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0 shadow-[0_0_5px_#D4AF37]"></div>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto relative z-10 mb-32">
        <Reveal glow>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">Comprehensive <span className="text-[#D4AF37]">Travel Insurance</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto bg-white/70 dark:bg-black/40 p-3 rounded-lg backdrop-blur-sm inline-block">
              Protect your journey with premium coverage. Mandatory for many visas and essential for absolute peace of mind.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insurances.map((ins, i) => (
            <Reveal key={ins.country} delay={i * 100}>
              <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/50 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0">
                    <HeartPulse size={24} />
                  </div>
                  <span className="text-2xl font-black text-[#D4AF37] text-right">{ins.fee}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{ins.country}</h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                  Currency: <span className="text-[#D4AF37]">{ins.currency}</span>
                </p>
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-start gap-3 leading-relaxed">
                    <ShieldCheck size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    {ins.coverage}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-5xl mx-auto relative z-10">
        <Reveal glow>
          <div className="glass-panel p-10 md:p-16 rounded-[3rem] text-center shadow-[0_20px_50px_rgba(212,175,55,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)] animate-pulse-gold pointer-events-none"></div>

            <div className="flex justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white dark:bg-black/50 rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm border border-gray-200 dark:border-white/10 group-hover:-translate-y-2 transition-transform">
                <Ticket size={32} />
              </div>
              <div className="w-16 h-16 bg-white dark:bg-black/50 rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm border border-gray-200 dark:border-white/10 group-hover:-translate-y-2 transition-transform delay-100">
                <CreditCard size={32} />
              </div>
            </div>

            <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">Secure Bookings & <span className="text-[#D4AF37]">Consultation</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-medium">
              We process secure payments globally via Stripe, PayPal, and SWIFT transfers. Schedule a call with our travel architects to customize your itinerary and lock in the best rates.
            </p>

            <button
              onClick={() => navigateTo('contact')}
              className="px-10 py-5 bg-[#D4AF37] text-black font-bold text-lg rounded-xl hover:bg-[#e0c055] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)] inline-flex items-center gap-3 relative z-10"
            >
              Book Travel Consultation <Navigation size={20} />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AirTicketing;
