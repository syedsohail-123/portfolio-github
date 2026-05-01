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
            const msg = new SpeechSynthesisUtterance(textToSpeak);
            
            // Try to find an English voice, preferably male/neutral
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Google')) || voices[0];
            if (preferredVoice) {
                msg.voice = preferredVoice;
            }
            
            msg.rate = 0.9; // Slightly slower for better clarity
            msg.pitch = 1.0;
            
            msg.onend = () => {
                setIsPlaying(false);
            };
            
            setUtterance(msg);
        } else {
            setIsSupported(false);
        }
        
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, [textToSpeak]);

    const togglePlay = () => {
        if (!isSupported || !speechSynthesis || !utterance) return;

        if (isPlaying) {
            speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            speechSynthesis.speak(utterance);
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
