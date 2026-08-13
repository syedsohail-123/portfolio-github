import styles from './Experience.module.css';

const experienceData = [
    {
        company: "Flostat",
        role: "Backend Developer",
        duration: "2025 - Present",
        summary: "Working as a Backend Developer contributing to core system architecture.",
        achievements: [
            "Developing scalable backend services.",
            "Collaborating with cross-functional teams to deliver features.",
            "Optimizing application performance and reliability."
        ]
    }
];

export default function Experience() {
    return (
        <section id="experience" className={styles.experienceSection}>
            <h2 className={styles.title}>Work Experience</h2>
            <div className={styles.timeline}>
                {experienceData.map((exp, index) => (
                    <div key={index} className={styles.experienceItem}>
                        <h3 className={styles.role}>{exp.role}</h3>
                        <div className={styles.company}>
                            <span>{exp.company}</span>
                            <span className={styles.duration}>{exp.duration}</span>
                        </div>
                        <p className={styles.summary}>{exp.summary}</p>
                        <ul className={styles.achievements}>
                            {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className={styles.achievement}>{achievement}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
