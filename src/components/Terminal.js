"use client";

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import styles from './Terminal.module.css';

export default function Terminal() {
    const [history, setHistory] = useState([
        { text: "Welcome to Syed Sohail Ahmed's Interactive Shell v1.0.0", type: "system" },
        { text: "Type 'help' to see a list of available commands.", type: "system" }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const commands = {
        help: "Available commands: help, whoami, skills, clear, echo",
        whoami: "Syed Sohail Ahmed - Backend & AWS Specialist. I build scalable APIs and Cloud Infrastructure.",
        skills: "Node.js, Python, AWS, Docker, React, MongoDB, PostgreSQL, CI/CD",
        clear: "CLEAR_ACTION",
        echo: "Echo requires an argument. Usage: echo [text]"
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let response = "";

            if (cmd === '') return;

            const args = cmd.split(' ');
            const mainCmd = args[0];

            if (mainCmd === 'clear') {
                setHistory([]);
                setInput('');
                return;
            } else if (mainCmd === 'echo') {
                response = args.slice(1).join(' ');
            } else if (commands[mainCmd]) {
                response = commands[mainCmd];
            } else {
                response = `Command not found: ${mainCmd}. Type 'help' for available commands.`;
            }

            setHistory(prev => [
                ...prev,
                { text: `visitor@syedsohail:~$ ${input}`, type: "input" },
                { text: response, type: "output" }
            ]);
            setInput('');
        }
    };

    return (
        <div className={styles.terminalContainer} onClick={() => inputRef.current.focus()}>
            <div className={styles.terminalHeader}>
                <div className={styles.macButtons}>
                    <span className={styles.close}></span>
                    <span className={styles.minimize}></span>
                    <span className={styles.maximize}></span>
                </div>
                <div className={styles.title}>
                    <TerminalIcon size={14} /> visitor@syedsohail: ~
                </div>
            </div>
            
            <div className={styles.terminalBody}>
                {history.map((line, idx) => (
                    <div 
                        key={idx} 
                        className={`${styles.line} ${styles[line.type]}`}
                    >
                        {line.text}
                    </div>
                ))}
                <div className={styles.inputContainer}>
                    <span className={styles.prompt}>visitor@syedsohail:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className={styles.input}
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
