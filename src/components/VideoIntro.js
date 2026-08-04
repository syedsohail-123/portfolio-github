"use client";

import { motion } from 'framer-motion';
import styles from './VideoIntro.module.css';

export default function VideoIntro() {
  return (
    <motion.div 
      className={styles.videoContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className={styles.ideHeader}>
        <div className={styles.ideButtons}>
          <span className={styles.redDot}></span>
          <span className={styles.yellowDot}></span>
          <span className={styles.greenDot}></span>
        </div>
        <div className={styles.ideTab}>Syed_Sohail_Pitch.js</div>
      </div>
      <video 
        controls 
        preload="metadata"
        className={styles.videoPlayer}
      >
        <source src="/assests/🎬_AI_Video_Generation_Prompt.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}
