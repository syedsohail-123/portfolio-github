"use client";

import { useState } from 'react';
import styles from './Projects.module.css';

const projectsData = [
    {
        name: "flostat-dashbaord",
        category: "Full Stack",
        techStack: ["React", "Next.js", "Chart.js", "Node.js"],
        description: "A comprehensive dashboard for visualizing and monitoring flow statistics and system metrics in real-time.",
        features: [
            "Real-time data visualization with interactive charts",
            "User-friendly interface for monitoring system status",
            "Historical data analysis and reporting",
            "Responsive design for access on any device"
        ],
        liveDemo: null,
        github: "https://github.com/syedsohail-123/flostat-dashbaord.git"
    },
    {
        name: "heath_monitor_project",
        category: "IoT",
        techStack: ["Python", "IoT", "Data Analytics", "Cloud"],
        description: "An intelligent health monitoring system designed to track and analyze vital health metrics for proactive healthcare.",
        features: [
            "Real-time monitoring of health parameters",
            "Automated alerts for critical thresholds",
            "Data storage and trend analysis",
            "Secure user authentication and data privacy"
        ],
        liveDemo: null,
        github: "https://github.com/syedsohail-123/heath_monitor_project.git"
    }
];

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = selectedCategory === "All"
        ? projectsData
        : projectsData.filter(p => p.category === selectedCategory);

    return (
        <section id="projects" className={styles.projectsSection}>
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

            <div className={styles.grid}>
                {filteredProjects.map((project, index) => (
                    <div key={index} className={styles.projectCard}>
                        <div className={styles.content}>
                            <h3 className={styles.projectName}>{project.name}</h3>
                            <div className={styles.techStack}>
                                {project.techStack.map((tech, idx) => (
                                    <span key={idx} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>
                            <p className={styles.description}>{project.description}</p>
                            <ul className={styles.features}>
                                {project.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            <div className={styles.links}>
                                {project.liveDemo && <a href={project.liveDemo} className={`${styles.link} ${styles.demoLink}`} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                                {project.github && <a href={project.github} className={`${styles.link} ${styles.githubLink}`} target="_blank" rel="noopener noreferrer">GitHub</a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
