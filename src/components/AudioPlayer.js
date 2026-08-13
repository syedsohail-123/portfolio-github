"use client";

import { useState, useEffect } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer({ textToSpeak }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [speechSynthesis, setSpeechSynthesis] = useState(null);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setSpeechSynthesis(window.speechSynthesis);
        } else {
            setIsSupported(false);
        }
        
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const togglePlay = () => {
        if (!isSupported || !speechSynthesis) return;

        if (isPlaying) {
            speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const msg = new SpeechSynthesisUtterance(textToSpeak);
            
            // Get available voices (they might load asynchronously, so we fetch them on click)
            const voices = speechSynthesis.getVoices();
            
            // Keywords to identify male and premium voices
            const maleKeywords = ['male', 'guy', 'david', 'mark', 'alex', 'daniel', 'brian', 'arthur', 'george', 'ryan', 'aaron'];
            const premiumKeywords = ['online', 'premium', 'neural', 'natural'];
            const femaleKeywords = ['female', 'zira', 'siri', 'google', 'hazel', 'samantha', 'victoria'];

            let bestVoice = voices[0];
            let highestScore = -999;

            voices.forEach(v => {
                let score = 0;
                const lowerName = v.name.toLowerCase();
                
                // Prefer English
                if (v.lang.includes('en')) score += 10;
                
                // Highly reward male names
                if (maleKeywords.some(kw => lowerName.includes(kw))) score += 50;
                
                // Highly reward cloud/premium voices (often available in Edge/Safari)
                if (premiumKeywords.some(kw => lowerName.includes(kw))) score += 30;
                
                // Penalize female/default voices
                if (femaleKeywords.some(kw => lowerName.includes(kw))) score -= 50;

                if (score > highestScore) {
                    highestScore = score;
                    bestVoice = v;
                }
            });

            if (bestVoice) {
                msg.voice = bestVoice;
            }
            
            msg.rate = 0.95; // Slightly slower for clearer articulation
            msg.pitch = 0.9; // Slightly deeper pitch for a more male/professional tone
            
            msg.onend = () => {
                setIsPlaying(false);
            };

            speechSynthesis.speak(msg);
            setIsPlaying(true);
        }
    };



    if (!isSupported) return null;

    return (
        <div className={styles.audioContainer}>
            <button 
                onClick={togglePlay} 
                className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
                aria-label={isPlaying ? "Stop Audio" : "Play Intro Audio"}
            >
                {isPlaying ? <Square size={16} /> : <Play size={16} />}
            </button>
            <div className={styles.visualizer}>
                <Volume2 size={16} className={styles.volIcon} />
                <span className={styles.label}>
                    {isPlaying ? "AI Voice Active..." : "Play AI Intro"}
                </span>
                {isPlaying && (
                    <div className={styles.bars}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div 
                                key={i} 
                                className={styles.bar}
                                animate={{ height: ['4px', '14px', '4px'] }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 0.5 + (Math.random() * 0.5),
                                    delay: i * 0.1 
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
