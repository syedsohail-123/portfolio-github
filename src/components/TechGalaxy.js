"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const planets = [
    { name: "React", color: "#61dafb", radius: 1.2, speed: 0.01, orbit: 4, desc: "3+ Years - Core Frontend" },
    { name: "AWS", color: "#ff9900", radius: 1.5, speed: 0.008, orbit: 6, desc: "2+ Years - Cloud Architecture" },
    { name: "Node.js", color: "#68a063", radius: 1, speed: 0.015, orbit: 3, desc: "3+ Years - Backend APIs" },
    { name: "Python", color: "#3776ab", radius: 1.1, speed: 0.012, orbit: 5, desc: "2+ Years - Data & Scripting" },
    { name: "Flutter", color: "#02569b", radius: 1.3, speed: 0.009, orbit: 7, desc: "1+ Years - Mobile Apps" }
];

function Planet({ data }) {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Random initial angle so planets don't start in a line
    const angle = useMemo(() => Math.random() * Math.PI * 2, []);
    const orbitRef = useRef(angle);

    useFrame(() => {
        // Only orbit if not clicked/zoomed in
        if (!clicked) {
            orbitRef.current += data.speed;
            if (meshRef.current) {
                meshRef.current.position.x = Math.cos(orbitRef.current) * data.orbit;
                meshRef.current.position.z = Math.sin(orbitRef.current) * data.orbit;
                meshRef.current.rotation.y += 0.01;
            }
        }
    });

    return (
        <group>
            {/* Orbit ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.orbit - 0.02, data.orbit + 0.02, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* Planet */}
            <Sphere
                ref={meshRef}
                args={[data.radius, 32, 32]}
                position={[Math.cos(angle) * data.orbit, 0, Math.sin(angle) * data.orbit]}
                onClick={() => setClicked(!clicked)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <meshStandardMaterial 
                    color={data.color} 
                    emissive={data.color}
                    emissiveIntensity={hovered ? 0.8 : 0.2}
                    roughness={0.4}
                />
                
                {(hovered || clicked) && (
                    <Html distanceFactor={15} center>
                        <div style={{
                            background: 'rgba(10, 10, 10, 0.85)',
                            padding: '10px 15px',
                            borderRadius: '8px',
                            border: `1px solid ${data.color}`,
                            color: 'white',
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
                            pointerEvents: 'none',
                            minWidth: '150px',
                            boxShadow: `0 0 15px ${data.color}40`,
                            backdropFilter: 'blur(4px)'
                        }}>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: data.color }}>{data.name}</h4>
                            <p style={{ margin: 0, fontSize: '12px', color: '#ccc' }}>{data.desc}</p>
                        </div>
                    </Html>
                )}
            </Sphere>
        </group>
    );
}

export default function TechGalaxy() {
    return (
        <div style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', background: '#050505', position: 'relative' }}>
            <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                
                {/* Sun / Core */}
                <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                    <Html distanceFactor={15} center>
                        <div style={{ color: 'black', background: 'white', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                            Full Stack
                        </div>
                    </Html>
                </Sphere>

                {planets.map((planet, idx) => (
                    <Planet key={idx} data={planet} />
                ))}

                <OrbitControls enableZoom={true} enablePan={false} autoRotate={!true} maxDistance={25} minDistance={5} />
            </Canvas>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', pointerEvents: 'none' }}>
                Drag to rotate • Scroll to zoom • Click a planet
            </div>
        </div>
    );
}
