"use client";

import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    if (!loading) return null;

    return (
        <div className={styles.loadingScreen}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <h1 className={styles.logoText}>SS</h1>
                </div>
                <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: `${progress}%` }} />
                </div>
                <p className={styles.loadingText}>Loading Portfolio...</p>
            </div>
        </div>
    );
}
