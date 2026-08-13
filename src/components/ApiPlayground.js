"use client";

import { useState } from 'react';
import { Play, Code, Database, Server } from 'lucide-react';
import styles from './ApiPlayground.module.css';

export default function ApiPlayground() {
    const [activeEndpoint, setActiveEndpoint] = useState('/api/skills');
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const endpoints = {
        '/api/skills': {
            method: 'GET',
            description: 'Fetch technical skills array.',
            data: {
                status: 200,
                data: {
                    backend: ["Node.js", "Python", "Express", "Nest.js", "Django", "FastAPI"],
                    frontend: ["React.js", "Next.js", "Tailwind CSS"],
                    cloud: ["AWS EC2", "S3", "Lambda", "Docker", "CI/CD"],
                    database: ["MongoDB", "PostgreSQL"]
                }
            }
        },
        '/api/projects?limit=2': {
            method: 'GET',
            description: 'Fetch top 2 featured projects.',
            data: {
                status: 200,
                data: [
                    { id: "proj_1", name: "Flostat Dashboard", stack: ["Next.js", "Node", "AWS"] },
                    { id: "proj_2", name: "E-Commerce API", stack: ["Django", "Postgres"] }
                ]
            }
        },
        '/api/contact': {
            method: 'POST',
            description: 'Send a message to Syed Sohail Ahmed.',
            data: {
                status: 401,
                error: "Unauthorized",
                message: "Please use the official contact form to send messages."
            }
        }
    };

    const handleSendRequest = () => {
        setIsLoading(true);
        setResponse(null);
        
        // Simulate network delay
        setTimeout(() => {
            setResponse(endpoints[activeEndpoint].data);
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className={styles.playgroundContainer}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Server size={16} /> API Endpoints
                </div>
                <div className={styles.endpointList}>
                    {Object.keys(endpoints).map((ep) => (
                        <button 
                            key={ep}
                            className={`${styles.endpointBtn} ${activeEndpoint === ep ? styles.active : ''}`}
                            onClick={() => setActiveEndpoint(ep)}
                        >
                            <span className={`${styles.method} ${styles[endpoints[ep].method]}`}>
                                {endpoints[ep].method}
                            </span>
                            <span className={styles.path}>{ep.split('?')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.mainPanel}>
                <div className={styles.requestHeader}>
                    <div className={styles.urlBar}>
                        <span className={`${styles.methodBadge} ${styles[endpoints[activeEndpoint].method]}`}>
                            {endpoints[activeEndpoint].method}
                        </span>
                        <span className={styles.baseUrl}>https://api.syedsohail.com</span>
                        <span className={styles.activePath}>{activeEndpoint}</span>
                    </div>
                    <button 
                        className={styles.sendBtn} 
                        onClick={handleSendRequest}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : <><Play size={14} /> Send Request</>}
                    </button>
                </div>

                <div className={styles.description}>
                    {endpoints[activeEndpoint].description}
                </div>

                <div className={styles.responseArea}>
                    <div className={styles.responseHeader}>
                        <Code size={14} /> Response
                        {response && (
                            <span className={`${styles.statusCode} ${response.status === 200 ? styles.success : styles.error}`}>
                                Status: {response.status} {response.status === 200 ? 'OK' : 'Error'}
                            </span>
                        )}
                    </div>
                    <div className={styles.responseBody}>
                        {isLoading ? (
                            <div className={styles.loadingPulse}>Fetching data...</div>
                        ) : response ? (
                            <pre className={styles.jsonOutput}>
                                {JSON.stringify(response, null, 2)}
                            </pre>
                        ) : (
                            <div className={styles.emptyState}>
                                <Database size={32} opacity={0.2} />
                                <p>Click "Send Request" to fetch data.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
