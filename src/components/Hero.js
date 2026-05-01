"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { X } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import sohailImg from '../../public/assests/sohail-1.jpeg';
import styles from './Hero.module.css';

export default function Hero() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const { setActiveTab } = useNavigation();

    return (
        <section id="about" className={styles.hero}>
            <motion.div 
                className={styles.imageWrapper}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
            >
                <Image
                    src={sohailImg}
                    alt="Syed Sohail Ahmed"
                    width={180}
                    height={180}
                    className={styles.profileImage}
                    priority
                />
            </motion.div>

            <motion.h1 
                className={styles.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Syed Sohail Ahmed
            </motion.h1>
            <h2 className={styles.role}>
                <Typewriter
                    options={{
                        strings: [
                            'Backend Developer',
                            'AWS Specialist',
                            'Full Stack Engineer',
                            'DevOps Enthusiast',
                            'Cloud Architect'
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        deleteSpeed: 50,
                    }}
                />
            </h2>

            <p className={styles.summary}>
                Passionate developer with expertise in Node.js, Python, and Cloud technologies.
                Building scalable microservices and robust backend systems.
            </p>

            <div className={styles.ctaButtons}>
                <button onClick={() => { setActiveTab('projects'); window.scrollTo(0,0); }} className={styles.primaryBtn}>View Work</button>
                <button onClick={() => setIsPreviewOpen(true)} className={styles.downloadBtn}>
                    Preview CV
                </button>
                <a href="./assests/Resume (1).pdf" download="Syed_Sohail_CV.pdf" className={styles.secondaryBtn}>
                    Download CV
                </a>
            </div>

            <AnimatePresence>
                {isPreviewOpen && (
                    <motion.div 
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        <motion.div 
                            className={styles.modalContent}
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeBtn} onClick={() => setIsPreviewOpen(false)}>
                                <X size={24} />
                            </button>
                            <iframe 
                                src="./assests/Resume (1).pdf#toolbar=0" 
                                className={styles.pdfIframe}
                                title="CV Preview"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
