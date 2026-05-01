"use client";

import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setTimeout(() => {
                setDotPosition({ x: e.clientX, y: e.clientY });
            }, 50);
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <>
            {/* Flashlight Effect Background */}
            {isVisible && (
                <div 
                    className={styles.flashlight}
                    style={{
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 153, 0, 0.05), transparent 40%)`
                    }}
                />
            )}
            
            <div
                className={`${styles.customCursor} ${isVisible ? styles.visible : ''} ${isClicking ? styles.clicking : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            />
            <div
                className={`${styles.cursorDot} ${isClicking ? styles.clicking : ''}`}
                style={{
                    left: `${dotPosition.x}px`,
                    top: `${dotPosition.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </>
    );
}
