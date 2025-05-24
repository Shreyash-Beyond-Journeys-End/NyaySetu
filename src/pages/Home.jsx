import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import LegalRightsCalculator from '../components/sections/LegalRightsCalculator';
import CaseStudies from '../components/sections/CaseStudies';
import DocumentTemplates from '../components/sections/DocumentTemplates';
import EmergencyContacts from '../components/sections/EmergencyContacts';
import LegalQuiz from '../components/sections/LegalQuiz';
import NewsUpdates from '../components/sections/NewsUpdates';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturesGrid />
      <LegalRightsCalculator />
      <CaseStudies />
      <DocumentTemplates />
      <EmergencyContacts />
      <LegalQuiz />
      <NewsUpdates />
    </motion.div>
  );
};

export default Home;
