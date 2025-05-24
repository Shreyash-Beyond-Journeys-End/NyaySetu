import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Shield, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Scale,
      title: "Justice for All",
      description: "We believe every person deserves access to legal knowledge and justice, regardless of their background or education."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Our focus is on empowering rural and underserved communities with essential legal information."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your legal queries and personal information are completely confidential and secure."
    },
    {
      icon: Heart,
      title: "Compassionate Support",
      description: "We provide legal guidance with empathy, understanding the challenges faced by those seeking justice."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Legal Rights Advisor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering every Indian citizen with accessible legal knowledge and tools to understand and protect their rights.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              To bridge the gap between complex legal systems and everyday citizens, especially those in rural areas who may lack access to legal education. We provide simple, understandable legal guidance in multiple Indian languages, ensuring that language barriers don't prevent people from understanding their rights.
            </p>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              The Problem We're Solving
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">70%</div>
                <p className="text-gray-600 dark:text-gray-300">
                  of Indians are unaware of their basic legal rights
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">45%</div>
                <p className="text-gray-600 dark:text-gray-300">
                  of legal cases involve people who lack proper legal guidance
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">80%</div>
                <p className="text-gray-600 dark:text-gray-300">
                  of rural population has limited access to legal services
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🗣️ Voice-Enabled Interface
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ask questions in your voice and get spoken responses in Hindi, Marathi, or English.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🧮 Smart Legal Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get personalized legal advice based on your specific situation and case details.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  📱 Mobile-First Design
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized for smartphones to reach users in remote areas with limited internet.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🤖 AI Legal Assistant
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  24/7 chatbot trained on Indian laws to provide instant legal guidance.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
