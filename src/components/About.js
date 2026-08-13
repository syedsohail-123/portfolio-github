"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, Brain, Target, Sparkles, Activity, Terminal, MapPin } from 'lucide-react';
import { useRef } from 'react';
import AudioPlayer from './AudioPlayer';
import MagneticButton from './MagneticButton';
import sohailImg from '../../public/assests/Sohail-2.jpeg';
import styles from './About.module.css';
import Image from 'next/image';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                setCount(Math.floor(progress * (to - from) + from));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [isInView, from, to, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const TypewriterText = ({ text, className }) => {
    return (
        <span className={className}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.05, delay: index * 0.05 }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={className}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={fadeInUp}
        >
            <div style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default function About() {
    const [terminalOutput, setTerminalOutput] = useState([
        { text: "System initialized. Welcome to sohail_os v1.0.0.", type: "system" },
        { text: "Select a command below to explore my expertise.", type: "system" }
    ]);

    const terminalCommands = [
        { cmd: "whoami", output: "Syed Sohail Ahmed. Full-Stack Developer & Cloud Architect." },
        { cmd: "./show_backend.sh", output: "=> Architecting scalable backend systems (Nest.js, Node.js)\n=> Building robust APIs (Django, FastAPI)" },
        { cmd: "./show_cloud.sh", output: "=> Deploying microservices via Docker & CI/CD\n=> 5x AWS Certified Cloud Practitioner" }
    ];

    const runCommand = (cmdObj) => {
        setTerminalOutput(prev => [
            ...prev,
            { text: `visitor@sohail_os:~$ ${cmdObj.cmd}`, type: "cmd" },
            { text: cmdObj.output, type: "output" }
        ]);
    };

    const introSpeech = "Hi, I'm Syed Sohail Ahmed, a Full-Stack Software Developer. I specialize in building complete, end-to-end digital solutions—from crafting clean, responsive user interfaces on the frontend to architecting reliable backend systems. On the client side, I work extensively with React, Tailwind, and Flutter for cross-platform mobile apps. On the server side, I build scalable APIs with Django and FastAPI, supported by containerized DevOps workflows using Docker and Linux. I love turning complex ideas into seamless user experiences.";

    return (
        <section id="about" className={styles.aboutSection}>
            <motion.div 
                className={styles.bentoGrid}
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
            >
                {/* Tile 1: Bio */}
                <motion.div className={`${styles.bentoTile} ${styles.bioTile}`} variants={fadeInUp}>
                    <div className={styles.bioHeader}>
                        <div className={styles.aboutImageContainer}>
                            <Image src={sohailImg} alt="Syed Sohail Ahmed" fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h3 className={styles.glitchName} data-text="Syed Sohail Ahmed">
                                Syed Sohail Ahmed
                            </h3>
                            <p className={styles.title}>Full-Stack & Cloud Engineer</p>
                        </div>
                    </div>
                    <div className={styles.bioText}>
                        <TypewriterText text={introSpeech} className={styles.typewriter} />
                    </div>
                </motion.div>

                {/* Tile 2: Terminal */}
                <motion.div className={`${styles.bentoTile} ${styles.terminalTile}`} variants={fadeInUp}>
                    <div className={styles.terminalContainer}>
                        <div className={styles.terminalHeader}>
                            <div className={styles.terminalButtons}>
                                <span className={styles.redDot}></span>
                                <span className={styles.yellowDot}></span>
                                <span className={styles.greenDot}></span>
                            </div>
                            <div className={styles.terminalTab}>bash — ~sohail_os</div>
                            <Terminal size={16} className={styles.terminalIcon} />
                        </div>
                        
                        <div className={styles.terminalBody}>
                            <div className={styles.terminalOutput}>
                                {terminalOutput.map((line, idx) => (
                                    <div key={idx} className={`${styles.termLine} ${styles[line.type]}`}>
                                        {line.text.split('\n').map((str, i) => (
                                            <p key={i}>{str}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            
                            <div className={styles.terminalControls}>
                                <p className={styles.runPrompt}>Select command to run:</p>
                                <div className={styles.commandBtns}>
                                    {terminalCommands.map((cmdObj, idx) => (
                                        <button key={idx} onClick={() => runCommand(cmdObj)} className={styles.cmdBtn}>
                                            {cmdObj.cmd}
                                        </button>
                                    ))}
                                    <button onClick={() => setTerminalOutput([{ text: "Terminal cleared.", type: "system" }])} className={styles.cmdBtn}>
                                        clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tile 3: Audio */}
                <motion.div className={`${styles.bentoTile} ${styles.audioTile}`} variants={fadeInUp}>
                    <div className={styles.audioWrapper}>
                        <AudioPlayer textToSpeak={introSpeech} />
                        <p className={styles.audioLabel}>Play Intro</p>
                    </div>
                </motion.div>

                {/* Tile 4: Location */}
                <motion.div className={`${styles.bentoTile} ${styles.locationTile}`} variants={fadeInUp}>
                    <div className={styles.locationContent}>
                        <MapPin size={32} className={styles.locationIcon} />
                        <div>
                            <p className={styles.locationText}>Based In</p>
                            <p className={styles.locationCity}>Global Remote</p>
                        </div>
                        <div className={styles.pulseDot}></div>
                    </div>
                </motion.div>

                {/* Tile 5: Stats */}
                <motion.div className={`${styles.bentoTile} ${styles.statsTile}`} variants={fadeInUp}>
                    <TiltCard className={styles.statCard}>
                        <h4 className={styles.statNumber}><AnimatedCounter from={0} to={1} suffix="+" /></h4>
                        <p className={styles.statLabel}>Years Experience</p>
                    </TiltCard>
                    <TiltCard className={styles.statCard}>
                        <h4 className={styles.statNumber}><AnimatedCounter from={0} to={10} suffix="+" /></h4>
                        <p className={styles.statLabel}>Projects Built</p>
                    </TiltCard>
                    <TiltCard className={styles.statCard}>
                        <h4 className={styles.statNumber}><AnimatedCounter from={0} to={5} /></h4>
                        <p className={styles.statLabel}>AWS Certifications</p>
                    </TiltCard>
                </motion.div>
            </motion.div>
        </section>
    );
}
