import React from 'react';
import { motion } from 'framer-motion';
import SmartSearch from '../components/common/SmartSearch';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import LegalRightsCalculator from '../components/sections/LegalRightsCalculator';
import DocumentTemplates from '../components/sections/DocumentTemplates';
import EmergencyContacts from '../components/sections/EmergencyContacts';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Smart Search Section (replaces hero) */}
      <SmartSearch />
      
      {/* Features Grid */}
      <FeaturesGrid />
      
      {/* Legal Rights Calculator */}
      <LegalRightsCalculator />
      
      {/* Document Templates */}
      <DocumentTemplates />
      
      {/* Emergency Contacts */}
      <EmergencyContacts />
    </motion.div>
  );
};

export default Home;
