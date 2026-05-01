"use client";

import { ExternalLink, Award, BookOpen, GitBranch } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import Image from 'next/image';
import styles from './Credentials.module.css';
import { motion as fmotion } from 'framer-motion';

const educationData = [
    {
        degree: "Bachelor of Technology in Computer Science",
        college: "Deccan College Of Engineering and Technology",
        year: "2019 - 2023",
        description: "Specialized in software engineering, database management, and web technologies. Completed major project on IoT Health Monitoring."
    }
];

const certificationsData = [
    {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-cloud-practitioner.png",
        verifyLink: "https://www.credly.com/users/syed-sohail-ahmed.247effe5" // To be updated by user
    },
    {
        name: "AWS re/Start Graduate",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-restart-graduate.png",
        verifyLink: "https://www.credly.com/users/syed-sohail-ahmed.247effe5"
    },
    {
        name: "AWS Cloud Quest: Cloud Practitioner",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-cloud-quest.png",
        verifyLink: "https://www.credly.com/users/syed-sohail-ahmed.247effe5"
    },
    {
        name: "AWS Knowledge: Serverless",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-serverless.png",
        verifyLink: "https://www.credly.com/users/syed-sohail-ahmed.247effe5"
    },
    {
        name: "AWS Security Champion",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-security-champion.png",
        verifyLink: "https://www.credly.com/users/syed-sohail-ahmed.247effe5"
    }
];

export default function Credentials() {
    return (
        <section id="credentials" className={styles.credentialsSection}>
            <fmotion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.mainTitle}>Background & Credentials</h2>
            </fmotion.div>

            <div className={styles.contentGrid}>
                {/* Timeline Section */}
                <div className={styles.timelineContainer}>
                    <div className={styles.sectionHeader}>
                        <BookOpen className={styles.headerIcon} />
                        <h3>Education Timeline</h3>
                    </div>
                    
                    <div className={styles.timeline}>
                        {educationData.map((edu, index) => (
                            <fmotion.div 
                                key={index} 
                                className={styles.timelineItem}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineContent}>
                                    <span className={styles.yearBadge}>{edu.year}</span>
                                    <h4 className={styles.degree}>{edu.degree}</h4>
                                    <p className={styles.college}>{edu.college}</p>
                                    <p className={styles.description}>{edu.description}</p>
                                </div>
                            </fmotion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications Section */}
                <div className={styles.certContainer}>
                    <div className={styles.sectionHeader}>
                        <Award className={styles.headerIcon} />
                        <h3>AWS Certifications</h3>
                    </div>

                    <div className={styles.certGrid}>
                        {certificationsData.map((cert, index) => (
                            <fmotion.div 
                                key={index} 
                                className={styles.certCard}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className={styles.certImageWrapper}>
                                    {/* Using standard img tag fallback if next/image fails due to missing files */}
                                    <img 
                                        src={cert.image} 
                                        alt={cert.name} 
                                        className={styles.certImage}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/150/ff9900/FFFFFF?text=AWS+Badge";
                                        }}
                                    />
                                </div>
                                <div className={styles.certInfo}>
                                    <h4 className={styles.certName}>{cert.name}</h4>
                                    <p className={styles.certIssuer}>{cert.issuer}</p>
                                    <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer" className={styles.verifyBtn}>
                                        Verify Badge <ExternalLink size={14} />
                                    </a>
                                </div>
                            </fmotion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* GitHub Dashboard Widget */}
            <fmotion.div 
                className={styles.githubWidget}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className={styles.widgetHeader}>
                    <GitBranch className={styles.widgetIcon} />
                    <h3>Live GitHub Activity</h3>
                </div>
                <div className={styles.calendarContainer}>
                    <GitHubCalendar
                        username="syedsohail-123"
                        blockSize={14}
                        blockMargin={6}
                        fontSize={14}
                        colorScheme="dark"
                    />
                </div>
            </fmotion.div>
        </section>
    );
}
