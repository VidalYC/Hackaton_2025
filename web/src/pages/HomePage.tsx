import React from 'react';
import { motion } from 'framer-motion';
import { Hero, StatsSection, FeaturesSection, TechnologyOverview, CTASection } from '../components/sections/Index';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-700 ease-in-out">
      {/* Hero */}
      <motion.section
        id="hero"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Hero />
      </motion.section>

      <div className="h-8 bg-gradient-to-b from-gray-50 to-white"></div>

      {/* Stats */}
      <motion.section
        id="stats"
        className="scroll-mt-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <StatsSection />
      </motion.section>

      <div className="h-8 bg-gradient-to-b from-white to-gray-50"></div>

      {/* Features */}
      <motion.section
        id="features"
        className="scroll-mt-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FeaturesSection onPageChange={onPageChange} />
      </motion.section>

      <div className="h-8 bg-gradient-to-b from-gray-50 to-white"></div>

      {/* Technology */}
      <motion.section
        id="technology"
        className="scroll-mt-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TechnologyOverview />
      </motion.section>

      <div className="h-8 bg-gradient-to-b from-white to-gray-50"></div>

      {/* CTA */}
      <motion.section
        id="cta"
        className="scroll-mt-20"
        variants={fadeInUp} // igual que Hero
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CTASection onPageChange={onPageChange} />
      </motion.section>
    </div>
  );
};

export default HomePage;
