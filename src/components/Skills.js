import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaNodeJs, FaReact, FaPython, FaHtml5, FaCss3Alt, FaAws, FaDocker, FaLinux, FaGitAlt, FaJenkins, FaGithub
} from 'react-icons/fa';
import { SiNextdotjs, SiDjango, SiFastapi, SiExpress, SiTailwindcss, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiKubernetes, SiFlutter, SiNestjs } from 'react-icons/si';
import styles from './Skills.module.css';

const allSkills = [
    { name: "Node.js", icon: <FaNodeJs />, category: "Backend" },
    { name: "Nest.js", icon: <SiNestjs />, category: "Backend" },
    { name: "Express", icon: <SiExpress />, category: "Backend" },
    { name: "Django", icon: <SiDjango />, category: "Backend" },
    { name: "FastAPI", icon: <SiFastapi />, category: "Backend" },
    { name: "Python", icon: <FaPython />, category: "Backend" },
    
    { name: "React", icon: <FaReact />, category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
    { name: "HTML", icon: <FaHtml5 />, category: "Frontend" },
    { name: "CSS", icon: <FaCss3Alt />, category: "Frontend" },
    { name: "Tailwind", icon: <SiTailwindcss />, category: "Frontend" },
    
    { name: "Flutter", icon: <SiFlutter />, category: "Mobile" },
    
    { name: "AWS Lambda", icon: <FaAws />, category: "Cloud" },
    { name: "API Gateway", icon: <FaAws />, category: "Cloud" },
    { name: "DynamoDB", icon: <FaAws />, category: "Cloud" },
    { name: "IoT Core", icon: <FaAws />, category: "Cloud" },
    { name: "Firebase", icon: <SiFirebase />, category: "Cloud" },
    
    { name: "MongoDB", icon: <SiMongodb />, category: "Databases" },
    { name: "PostgreSQL", icon: <SiPostgresql />, category: "Databases" },
    { name: "MySQL", icon: <SiMysql />, category: "Databases" },
    
    { name: "Linux", icon: <FaLinux />, category: "DevOps" },
    { name: "Docker", icon: <FaDocker />, category: "DevOps" },
    { name: "Kubernetes", icon: <SiKubernetes />, category: "DevOps" },
    { name: "Jenkins", icon: <FaJenkins />, category: "DevOps" },
    { name: "GitHub Actions", icon: <FaGithub />, category: "DevOps" },
    { name: "Git", icon: <FaGitAlt />, category: "DevOps" }
];

const categories = ["All", "Frontend", "Backend", "Cloud", "Databases", "DevOps", "Mobile"];

const SkillCard = ({ skill }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <motion.div 
            ref={cardRef}
            className={styles.skillCard}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.skillCardContent}>
                <span className={styles.icon}>{skill.icon}</span>
                <span className={styles.name}>{skill.name}</span>
            </div>
        </motion.div>
    );
};

export default function Skills() {
    const [activeTab, setActiveTab] = useState("All");

    const filteredSkills = activeTab === "All" 
        ? allSkills 
        : allSkills.filter(skill => skill.category === activeTab);

    return (
        <section id="skills" className={styles.skillsSection}>
            <h2 className={styles.title}>Technical Arsenal</h2>
            
            <div className={styles.tabsContainer}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ''}`}
                    >
                        {cat}
                        {activeTab === cat && (
                            <motion.div 
                                className={styles.activeTabBackground} 
                                layoutId="activeTabBackground"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <motion.div className={styles.skillsGrid} layout>
                <AnimatePresence mode='popLayout'>
                    {filteredSkills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
