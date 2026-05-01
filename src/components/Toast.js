"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ message, isVisible, onClose }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.toast}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <CheckCircle2 className={styles.icon} size={20} />
                    <span className={styles.message}>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
