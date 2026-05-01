import Image from 'next/image';
import styles from './Certifications.module.css';

const certificationsData = [
    {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-cloud-practitioner.png"
    },
    {
        name: "AWS re/Start Graduate",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-restart-graduate.png"
    },
    {
        name: "AWS Cloud Quest: Cloud Practitioner",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-cloud-quest.png"
    },
    {
        name: "AWS Knowledge: Serverless",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-serverless.png"
    },
    {
        name: "AWS Security Champion",
        issuer: "Amazon Web Services (AWS)",
        image: "/images/aws-security-champion.png"
    }
];

export default function Certifications() {
    return (
        <section id="certifications" className={styles.certificationsSection}>
            <h2 className={styles.title}>Certifications</h2>
            <div className={styles.grid}>
                {certificationsData.map((cert, index) => (
                    <div key={index} className={styles.certCard}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={cert.image}
                                alt={cert.name}
                                width={200}
                                height={200}
                                className={styles.certImage}
                            />
                        </div>
                        <h3 className={styles.certName}>{cert.name}</h3>
                        <span className={styles.issuer}>{cert.issuer}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
