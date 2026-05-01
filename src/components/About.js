"use client";

import { motion } from 'framer-motion';
import { Rocket, Brain, Target, Sparkles } from 'lucide-react';
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

export default function About() {
    const currentFocus = [
        "Developing end-to-end web applications with React.js & Node.js",
        "Creating REST APIs using Django and FastAPI",
        "Deploying applications using Docker, AWS, and CI/CD pipelines"
    ];

    const learning = [
        "Kubernetes and advanced AWS DevOps tools",
        "Microservices architecture and serverless design",
        "Performance optimization and monitoring tools (Grafana, Prometheus)",
        "Flutter for cross-platform mobile development"
    ];

    return (
        <section id="about-detailed" className={styles.aboutSection}>
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
                    <p className={styles.greeting}>Hi, I'm <span className={styles.highlight}>Syed Sohail Ahmed</span></p>
                    <p className={styles.description}>
                        <Rocket className={styles.icon} size={20} />
                        A dedicated <strong>Full-Stack Developer</strong> specializing in the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js) and Python-based backends.
                    </p>
                    <p className={styles.description}>
                        <Brain className={styles.icon} size={20} />
                        Passionate about building scalable web applications, automating workflows, and implementing modern DevOps practices.
                    </p>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.card}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        <div className={styles.cardHeader}>
                            <Target className={styles.cardIcon} size={24} />
                            <h3 className={styles.cardTitle}>Current Focus</h3>
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

                    <motion.div
                        className={styles.card}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        <div className={styles.cardHeader}>
                            <Sparkles className={styles.cardIcon} size={24} />
                            <h3 className={styles.cardTitle}>Learning & Exploring</h3>
                        </div>
                        <motion.ul className={styles.list}>
                            {learning.map((item, index) => (
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
