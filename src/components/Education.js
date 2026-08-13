"use client";

import { GitHubCalendar } from 'react-github-calendar';
import styles from './Education.module.css';

const educationData = [
    {
        degree: "Electrical and Electronics Engineering",
        college: "Deccan College Of Engineering and Technology",
        year: "2019 - 2023"
    }
];

export default function Education() {
    return (
        <section id="education" className={styles.educationSection}>
            <h2 className={styles.title}>Education</h2>
            <div className={styles.list}>
                {educationData.map((edu, index) => (
                    <div key={index} className={styles.educationItem}>
                        <div>
                            <h3 className={styles.degree}>{edu.degree}</h3>
                            <p className={styles.college}>{edu.college}</p>
                        </div>
                        <span className={styles.year}>{edu.year}</span>
                    </div>
                ))}
            </div>

            <div className={styles.githubSection}>
                <h3 className={styles.githubTitle}>GitHub Contributions</h3>
                <div className={styles.calendarWrapper}>
                    <GitHubCalendar
                        username="syedsohail-123"
                        blockSize={12}
                        blockMargin={4}
                        fontSize={14}
                    />
                </div>
            </div>
        </section>
    );
}
