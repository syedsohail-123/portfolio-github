import {
    FaNodeJs, FaReact, FaPython, FaHtml5, FaCss3Alt, FaAws, FaDocker, FaLinux, FaGitAlt, FaJenkins, FaGithub
} from 'react-icons/fa';
import { SiNextdotjs, SiDjango, SiFastapi, SiExpress, SiTailwindcss, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiKubernetes } from 'react-icons/si';
import { VscAzureDevops } from 'react-icons/vsc'; // Using VscAzureDevops as a fallback or generic tool icon if needed, but mostly covered.
import styles from './Skills.module.css';

const skillsData = [
    {
        category: "Backend",
        items: [
            { name: "Node.js", icon: <FaNodeJs /> },
            { name: "Django", icon: <SiDjango /> },
            { name: "FastAPI", icon: <SiFastapi /> },
            { name: "Express", icon: <SiExpress /> },
            { name: "Python", icon: <FaPython /> }
        ]
    },
    {
        category: "Frontend",
        items: [
            { name: "React", icon: <FaReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "HTML", icon: <FaHtml5 /> },
            { name: "CSS", icon: <FaCss3Alt /> },
            { name: "Tailwind", icon: <SiTailwindcss /> }
        ]
    },
    {
        category: "Cloud",
        items: [
            { name: "AWS Lambda", icon: <FaAws /> },
            { name: "API Gateway", icon: <FaAws /> },
            { name: "DynamoDB", icon: <FaAws /> },
            { name: "IoT Core", icon: <FaAws /> },
            { name: "Firebase", icon: <SiFirebase /> }
        ]
    },
    {
        category: "Databases",
        items: [
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "DynamoDB", icon: <FaAws /> },
            { name: "MySQL", icon: <SiMysql /> }
        ]
    },
    {
        category: "DevOps & Tools",
        items: [
            { name: "Linux", icon: <FaLinux /> },
            { name: "Docker", icon: <FaDocker /> },
            { name: "Kubernetes", icon: <SiKubernetes /> },
            { name: "Jenkins", icon: <FaJenkins /> },
            { name: "GitHub Actions", icon: <FaGithub /> },
            { name: "Git", icon: <FaGitAlt /> }
        ]
    }
];

export default function Skills() {
    return (
        <section id="skills" className={styles.skillsSection}>
            <h2 className={styles.title}>Technical Skills</h2>
            <div className={styles.grid}>
                {skillsData.map((category, index) => (
                    <div key={index} className={styles.categoryCard}>
                        <h3 className={styles.categoryTitle}>{category.category}</h3>
                        <div className={styles.skillList}>
                            {category.items.map((skill, idx) => (
                                <div key={idx} className={styles.skillItem}>
                                    <span className={styles.icon}>{skill.icon}</span>
                                    <span className={styles.name}>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
