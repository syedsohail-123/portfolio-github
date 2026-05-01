"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Rocket, Brain, Target, Sparkles, Activity } from 'lucide-react';
import { useRef } from 'react';
import AudioPlayer from './AudioPlayer';
import MagneticButton from './MagneticButton';
import styles from './About.module.css';

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

export default function About() {
    const currentFocus = [
        "Developing scalable backend architectures with Nest.js and Node.js",
        "Creating robust REST and GraphQL APIs using Django and FastAPI",
        "Deploying microservices using Docker, AWS, and CI/CD pipelines"
    ];

    const introSpeech = "Hi, I'm Syed Sohail Ahmed. A dedicated Full-Stack Developer specializing in the MERN Stack and Python-based backends. I am passionate about building scalable web applications, automating workflows, and implementing modern DevOps practices. I also build high-performance cross-platform mobile applications using Flutter and Dart. Welcome to my portfolio.";

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section id="about-detailed" className={styles.aboutSection}>
            {/* 5. SVG Drawing Background */}
            <svg className={styles.svgBackground} viewBox="0 0 800 600" preserveAspectRatio="none">
                <motion.path 
                    className={styles.svgPath}
                    d="M 100,500 C 200,400 300,600 400,300 C 500,0 600,600 700,100"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                <motion.path 
                    className={styles.svgPath}
                    d="M 50,200 C 250,300 150,100 450,400 C 750,700 550,200 750,400"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                />
            </svg>

            <motion.div className={styles.container} {...fadeInUp}>
                <div className={styles.header}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        About Me
                    </motion.h2>
                    <motion.div
                        className={styles.wave}
                        animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                        👋
                    </motion.div>
                </div>

                <motion.div className={styles.intro} {...fadeInUp}>
                    <motion.div 
                        className={styles.aboutImageContainer}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        animate={{ y: [0, -15, 0] }}
                        style={{ transition: 'none' }} /* Override the Framer transition for continuous animate */
                    >
                        {/* The continuous levitation animate overrides the whileInView transition on y, so we use initial scale/opacity instead. */}
                        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                            <img 
                                src="/assests/Sohail-2.jpeg" 
                                alt="Syed Sohail Ahmed working" 
                                className={styles.aboutImage}
                            />
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className={styles.introText}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        onMouseMove={handleMouseMove}
                    >
                        {/* 2. Interactive Spotlight Overlay */}
                        <div className={styles.spotlightOverlay} />

                        <div className={styles.introContent}>
                            <motion.p className={styles.greeting} variants={fadeInUp}>
                                <TypewriterText text="Hi, I'm " />
                                <span className={`${styles.highlight} ${styles.glitchName}`} data-text="Syed Sohail Ahmed">Syed Sohail Ahmed</span>
                            </motion.p>
                            <motion.p className={styles.description} variants={fadeInUp}>
                                <Rocket className={styles.icon} size={20} />
                                A dedicated <strong>Full-Stack Developer</strong> specializing in the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js) and Python-based backends.
                            </motion.p>
                            <motion.p className={styles.description} variants={fadeInUp}>
                                <Brain className={styles.icon} size={20} />
                                Passionate about building scalable web applications, automating workflows, and implementing modern DevOps practices.
                            </motion.p>
                            <motion.p className={styles.description} variants={fadeInUp}>
                                <Target className={styles.icon} size={20} />
                                I also build high-performance cross-platform mobile applications using <strong>Flutter</strong> and Dart, delivering seamless experiences on both iOS and Android.
                            </motion.p>
                            <motion.div variants={fadeInUp}>
                                <MagneticButton>
                                    <AudioPlayer textToSpeak={introSpeech} />
                                </MagneticButton>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className={styles.statsContainer}
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                >
                    <motion.div className={styles.statCard} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                        <h4 className={styles.statNumber}><AnimatedCounter from={0} to={1} suffix="+" /></h4>
                        <p className={styles.statLabel}>Years Experience</p>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                        <h4 className={styles.statNumber}><AnimatedCounter from={0} to={10} suffix="+" /></h4>
                        <p className={styles.statLabel}>Projects Built</p>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                        <h4 className={styles.statNumber}><AnimatedCounter from={0} to={5} /></h4>
                        <p className={styles.statLabel}>AWS Certifications</p>
                    </motion.div>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={`${styles.card} ${styles.fullWidthCard}`}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        {/* 4. Peel Reveal Overlay */}
                        <motion.div 
                            className={styles.peelOverlay}
                            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                            whileHover={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className={styles.peelText}>
                                <Activity size={24} /> Hover to Reveal Focus
                            </div>
                        </motion.div>

                        <div className={styles.cardHeader}>
                            <Target className={styles.cardIcon} size={24} />
                            <h3 className={styles.cardTitle}>Professional Focus & Expertise</h3>
                        </div>
                        <motion.ul className={styles.list}>
                            {currentFocus.map((item, index) => (
                                <motion.li
                                    key={index}
                                    className={styles.listItem}
                                    variants={fadeInUp}
                                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                >
                                    <span className={styles.bullet}>▹</span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
