"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">Portfolio</Link>
            </div>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                <li><Link href="#about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link href="#about-detailed" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</Link></li>
                <li><Link href="#skills" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Skills</Link></li>
                <li><Link href="#experience" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Experience</Link></li>
                <li><Link href="#projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
                <li><Link href="#education" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Education</Link></li>
                <li><Link href="#certifications" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Certifications</Link></li>
                <li><Link href="#contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>

            <div className={styles.actions}>
                <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
                    {theme === 'light' ? (
                        <>
                            <Moon size={18} />
                            <span>Dark</span>
                        </>
                    ) : (
                        <>
                            <Sun size={18} />
                            <span>Light</span>
                        </>
                    )}
                </button>
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
