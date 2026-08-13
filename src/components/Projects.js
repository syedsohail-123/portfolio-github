"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, X } from 'lucide-react';
import styles from './Projects.module.css';

// We dynamically import the architecture diagram to avoid SSR issues with React Flow
import dynamic from 'next/dynamic';
const ArchitectureDiagram = dynamic(() => import('./ArchitectureDiagram'), { ssr: false });

const projectsData = [
    {
        name: "Flostat Dashboard",
        category: "Full Stack",
        techStack: ["React", "Next.js", "Chart.js", "Node.js", "AWS"],
        description: "A comprehensive dashboard for visualizing and monitoring flow statistics and system metrics in real-time. Features AWS infrastructure integration.",
        features: [
            "Real-time data visualization with interactive charts",
            "User-friendly interface for monitoring system status",
            "Historical data analysis and reporting",
            "Responsive design for access on any device"
        ],
        liveDemo: "https://awstraining.flostat.com/",
        github: "https://github.com/syedsohail-123/flostat-dashbaord.git"
    },
    {
        name: "GitHub Code Analyzer",
        category: "Full Stack",
        techStack: ["Next.js", "FastAPI", "WebSockets", "Tailwind CSS", "AWS Lambda"],
        description: "A robust GitHub Code Analyzer using Next.js and FastAPI, integrating AI to automatically generate architectural insights and codebase summaries.",
        features: [
            "Architected a Full-Stack AI Tool with Next.js and FastAPI",
            "Engineered Real-Time Streaming using WebSockets",
            "Optimized Performance with Caching using SQLAlchemy",
            "Built a Developer-Centric UI with Tailwind CSS and React Markdown",
            "Deployed Serverless Infrastructure using AWS Lambda and Terraform"
        ],
        liveDemo: "https://git-code-analyzer.vercel.app/",
        github: null
    }
];

function ProjectCard({ project, index, setIsArchitectureOpen }) {
    const [showFeatures, setShowFeatures] = useState(false);

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={styles.projectCard}
            whileHover={{ y: -8 }}
        >
            <div className={styles.content}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <div className={styles.techStack}>
                    {project.techStack.map((tech, idx) => (
                        <span key={idx} className={styles.techTag}>{tech}</span>
                    ))}
                </div>
                <p className={styles.description}>{project.description}</p>
                
                <button 
                    onClick={() => setShowFeatures(!showFeatures)} 
                    className={styles.featureToggleBtn}
                >
                    {showFeatures ? "Hide Features" : "View Features"}
                </button>

                <AnimatePresence>
                    {showFeatures && (
                        <motion.ul 
                            className={styles.features}
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {project.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
                
                <div className={styles.links}>
                    {project.liveDemo && (
                        <a href={project.liveDemo} className={`${styles.link} ${styles.demoLink}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} className={`${styles.link} ${styles.githubLink}`} target="_blank" rel="noopener noreferrer">
                            <Github size={16} /> GitHub
                        </a>
                    )}
                    {project.name === "Flostat Dashboard" && (
                        <button onClick={() => setIsArchitectureOpen(true)} className={`${styles.link} ${styles.archLink}`}>
                            <Layers size={16} /> Architecture
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

    const categories = ["All", ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = selectedCategory === "All"
        ? projectsData
        : projectsData.filter(p => p.category === selectedCategory);

    return (
        <section id="projects" className={styles.projectsSection}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.title}>Featured Projects</h2>

                <div className={styles.filterButtons}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div layout className={styles.grid}>
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard 
                            key={project.name} 
                            project={project} 
                            index={index} 
                            setIsArchitectureOpen={setIsArchitectureOpen} 
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isArchitectureOpen && (
                    <motion.div 
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsArchitectureOpen(false)}
                    >
                        <motion.div 
                            className={styles.modalContent}
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h3>Flostat Dashboard Architecture</h3>
                                <button className={styles.closeBtn} onClick={() => setIsArchitectureOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <ArchitectureDiagram />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
