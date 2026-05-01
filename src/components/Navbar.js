"use client";

import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import MagneticButton from './MagneticButton';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { activeTab, setActiveTab } = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setIsMenuOpen(false);
        window.scrollTo(0, 0); // Scroll to top when changing tabs
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'credentials', label: 'Credentials' },
        { id: 'playground', label: 'Playground' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <button onClick={() => handleTabClick('home')} className={styles.logoBtn}>Portfolio</button>
            </div>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                {navItems.map(item => (
                    <li key={item.id}>
                        <MagneticButton 
                            className={`${styles.navLink} ${activeTab === item.id ? styles.activeTab : ''}`}
                            onClick={() => handleTabClick(item.id)}
                        >
                            {item.label}
                        </MagneticButton>
                    </li>
                ))}
            </ul>

            <div className={styles.actions}>
                <MagneticButton className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
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
                </MagneticButton>
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
