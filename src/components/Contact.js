"use client";

import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, Phone, Github, Terminal as TerminalIcon, Calendar, Send } from 'lucide-react';
import Globe from './Globe';
import Toast from './Toast';
import styles from './Contact.module.css';

export default function Contact() {
    const [toastMessage, setToastMessage] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);
    
    // Terminal Form State
    const [history, setHistory] = useState([
        { text: "Welcome to the interactive contact terminal.", type: "system" },
        { text: "Initiating communication sequence...", type: "system" },
        { text: "> What is your name?", type: "prompt" }
    ]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState(0); // 0: name, 1: email, 2: message
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const showToast = (message) => {
        setToastMessage(message);
        setIsToastVisible(true);
        setTimeout(() => setIsToastVisible(false), 3000);
    };

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard! ✅`);
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            const val = input.trim();
            const newHistory = [...history, { text: val, type: "input" }];
            
            if (step === 0) {
                setFormData({ ...formData, name: val });
                newHistory.push({ text: `> Hello ${val}! What is your email address?`, type: "prompt" });
                setStep(1);
            } else if (step === 1) {
                setFormData({ ...formData, email: val });
                newHistory.push({ text: "> Excellent. Type your message below and hit Enter to send:", type: "prompt" });
                setStep(2);
            } else if (step === 2) {
                setFormData({ ...formData, message: val });
                newHistory.push({ text: "> Sending message through secure channels...", type: "system" });
                
                // Simulate sending delay for now
                setTimeout(() => {
                    setHistory(prev => [
                        ...prev,
                        { text: "SUCCESS: Message delivered to Syed Sohail Ahmed! 🎉", type: "success" },
                        { text: "> Session closed. You may close this terminal.", type: "system" }
                    ]);
                    setStep(3); // done
                }, 1500);
            }
            
            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <section id="contact" className={styles.contactSection}>
            <h2 className={styles.title}>Get In Touch</h2>
            <p className={styles.subtitle}>
                Interact with the terminal to send a message, or copy my contact details below.
            </p>

            <div className={styles.mainGrid}>
                {/* Left Column: Contact Cards & Globe */}
                <div className={styles.leftColumn}>
                    <div className={styles.globeWrapper}>
                        <Globe />
                    </div>

                    <div className={styles.contactContainer}>
                        <button onClick={() => handleCopy('ahmedsyedsohail776@gmail.com', 'Email')} className={styles.contactCard}>
                            <Mail className={styles.icon} size={24} />
                            <div className={styles.cardContent}>
                                <span className={styles.label}>Email</span>
                                <span className={styles.value}>ahmedsyedsohail776@gmail.com</span>
                            </div>
                        </button>

                        <button onClick={() => handleCopy('+919390634592', 'Phone number')} className={styles.contactCard}>
                            <Phone className={styles.icon} size={24} />
                            <div className={styles.cardContent}>
                                <span className={styles.label}>Phone</span>
                                <span className={styles.value}>+91 9390634592</span>
                            </div>
                        </button>

                        <a href="https://www.linkedin.com/in/-syedsohailahmed/" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                            <Linkedin className={styles.icon} size={24} />
                            <div className={styles.cardContent}>
                                <span className={styles.label}>LinkedIn</span>
                                <span className={styles.value}>Connect with me</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right Column: Terminal Form & Calendly Placeholder */}
                <div className={styles.rightColumn}>
                    <div className={styles.terminalContainer} onClick={() => step < 3 && inputRef.current?.focus()}>
                        <div className={styles.terminalHeader}>
                            <div className={styles.macButtons}>
                                <span className={styles.close}></span>
                                <span className={styles.minimize}></span>
                                <span className={styles.maximize}></span>
                            </div>
                            <div className={styles.terminalTitle}>
                                <TerminalIcon size={14} /> contact.exe
                            </div>
                        </div>
                        
                        <div className={styles.terminalBody}>
                            {history.map((line, idx) => (
                                <div key={idx} className={`${styles.line} ${styles[line.type]}`}>
                                    {line.text}
                                </div>
                            ))}
                            {step < 3 && (
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputPrompt}>_</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleCommand}
                                        className={styles.inputField}
                                        spellCheck="false"
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>
                    </div>

                    {/* Calendly Placeholder */}
                    <div className={styles.calendlyPlaceholder}>
                        <Calendar className={styles.calendlyIcon} size={32} />
                        <div className={styles.calendlyInfo}>
                            <h4>Want to chat directly?</h4>
                            <p>Book a 15-minute introductory meeting with me via Calendly.</p>
                            <button className={styles.calendlyBtn}>
                                Schedule Meeting
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Toast message={toastMessage} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
        </section>
    );
}
