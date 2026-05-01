"use client";

import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section id="about" className={styles.hero}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/images/profile.png"
                    alt="Syed Sohail Ahmed"
                    width={150}
                    height={150}
                    className={styles.profileImage}
                    priority
                />
            </div>

            <h1 className={styles.name}>Syed Sohail Ahmed</h1>
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
                <a href="#projects" className={styles.primaryBtn}>View Work</a>
                <a href="#contact" className={styles.secondaryBtn}>Contact Me</a>
            </div>
        </section>
    );
}
