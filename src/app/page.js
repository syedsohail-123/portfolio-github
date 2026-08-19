"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';
import dynamic from 'next/dynamic';

// Load Hero immediately since it's the first thing users see
import Hero from "../components/Hero";

// Lazy load all other components to massively reduce initial bundle size
const About = dynamic(() => import("../components/About"));
const Skills = dynamic(() => import("../components/Skills"));
const Experience = dynamic(() => import("../components/Experience"));
const Projects = dynamic(() => import("../components/Projects"));
const Credentials = dynamic(() => import("../components/Credentials"));
const Contact = dynamic(() => import("../components/Contact"));
const Terminal = dynamic(() => import("../components/Terminal"));
const ApiPlayground = dynamic(() => import("../components/ApiPlayground"));

const fadeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" }
};

const PlaygroundTab = () => (
    <section style={{ padding: '2rem 0' }}>
        <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}
        >
            Developer Playground
        </motion.h2>
        <p style={{ textAlign: 'center', color: 'var(--secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Interact with simulated backend systems. Try typing <strong>'whoami'</strong> or <strong>'skills'</strong> in the terminal below!
        </p>
        <Terminal />
        <ApiPlayground />
    </section>
);

export default function Home() {
  const { activeTab } = useNavigation();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Hero key="home" />;
      case 'about':
        return <About key="about" />;
      case 'skills':
        return <Skills key="skills" />;
      case 'experience':
        return <Experience key="experience" />;
      case 'projects':
        return <Projects key="projects" />;
      case 'credentials':
        return <Credentials key="credentials" />;
      case 'playground':
        return <PlaygroundTab key="playground" />;
      case 'contact':
        return <Contact key="contact" />;
      default:
        return <Hero key="home" />;
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeTransition}
        >
          {renderActiveTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
