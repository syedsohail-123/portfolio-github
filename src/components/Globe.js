"use client";

import styles from './Globe.module.css';

export default function Globe() {
    return (
        <div className={styles.globeContainer}>
            <div className={styles.globe}>
                <div className={styles.globeWrap}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                </div>
                <div className={styles.marker}>
                    <div className={styles.pulse}></div>
                    <span>IST</span>
                </div>
            </div>
        </div>
    );
}
