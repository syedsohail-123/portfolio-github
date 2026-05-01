"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Phone, Github } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            // Replace these with your EmailJS credentials
            // Get them from https://www.emailjs.com/
            await emailjs.send(
                'YOUR_SERVICE_ID', // Replace with your service ID
                'YOUR_TEMPLATE_ID', // Replace with your template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: 'ahmedsyedsohail776@gmail.com'
                },
                'YOUR_PUBLIC_KEY' // Replace with your public key
            );

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Email send error:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className={styles.contactSection}>
            <h2 className={styles.title}>Get In Touch</h2>
            <p className={styles.subtitle}>
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className={styles.contactContainer}>
                <a href="mailto:ahmedsyedsohail776@gmail.com" className={styles.contactCard}>
                    <Mail className={styles.icon} size={24} />
                    <span className={styles.label}>Email</span>
                    <span className={styles.value}>ahmedsyedsohail776@gmail.com</span>
                </a>

                <a href="https://www.linkedin.com/in/-syedsohailahmed/" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                    <Linkedin className={styles.icon} size={24} />
                    <span className={styles.label}>LinkedIn</span>
                    <span className={styles.value}>Connect with me</span>
                </a>

                <a href="tel:9390634592" className={styles.contactCard}>
                    <Phone className={styles.icon} size={24} />
                    <span className={styles.label}>Phone</span>
                    <span className={styles.value}>+91 9390634592</span>
                </a>

                <a href="https://github.com/syedsohail-123" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                    <Github className={styles.icon} size={24} />
                    <span className={styles.label}>GitHub</span>
                    <span className={styles.value}>Check my code</span>
                </a>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Send Me a Message</h3>

                <div className={styles.formGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className={styles.textarea}
                    />
                </div>

                <button type="submit" disabled={loading} className={styles.submitBtn}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                    <p className={styles.successMessage}>Message sent successfully! I'll get back to you soon.</p>
                )}
                {status === 'error' && (
                    <p className={styles.errorMessage}>Failed to send message. Please try emailing me directly.</p>
                )}
            </form>
        </section>
    );
}
