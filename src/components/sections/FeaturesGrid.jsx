import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Calculator, 
  FileText, 
  Phone, 
  MessageSquare, 
  Volume2,
  Globe,
  Shield,
  Search
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../ui/Card';

const FeaturesGrid = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Search,
      title: 'AI-Powered Legal Search',
      description: 'Get comprehensive legal information using advanced AI technology',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Calculator,
      title: t('calculator.title'),
      description: 'Calculate your legal rights based on specific situations',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FileText,
      title: t('documents.title'),
      description: 'Download legal forms in multiple Indian languages',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Phone,
      title: t('emergency.title'),
      description: 'Quick access to legal aid and emergency services',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: MessageSquare,
      title: 'AI Legal Assistant',
      description: 'Chat with AI for instant legal guidance and advice',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Volume2,
      title: 'Voice Support',
      description: 'Ask questions and get answers using voice commands',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in English, Hindi, Marathi, and Telugu',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your legal queries are completely confidential and secure',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Legal Empowerment
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access comprehensive legal tools designed specifically for Indian laws and rights
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                <div className="p-6">
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
