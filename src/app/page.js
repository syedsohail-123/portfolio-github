"use client";

import { motion } from 'framer-motion';
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Home() {
  return (
    <>
      <Hero />
      <motion.div {...fadeInUp}>
        <About />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Skills />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Experience />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Projects />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Education />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Certifications />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Contact />
      </motion.div>
    </>
  );
}
