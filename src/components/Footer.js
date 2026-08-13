import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.links}>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                    <a href="https://www.linkedin.com/in/-syedsohailahmed/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                    <a href="mailto:ahmedsyedsohail776@gmail.com" className={styles.link}>Email</a>
                </div>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Developer Portfolio. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
