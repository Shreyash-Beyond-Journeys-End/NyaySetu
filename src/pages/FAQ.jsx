import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const { speak } = useTextToSpeech();

  const faqs = [
    {
      question: "What are my basic legal rights in India?",
      answer: "Every Indian citizen has fundamental rights including right to equality, freedom of speech, right to life and personal liberty, and right against exploitation as guaranteed by the Constitution."
    },
    {
      question: "How can I file a complaint for domestic violence?",
      answer: "You can file a complaint under the Domestic Violence Act, 2005 at the nearest magistrate's court or police station. You can also contact the National Women Helpline at 1091."
    },
    {
      question: "What should I do if my employer doesn't pay minimum wage?",
      answer: "You can file a complaint with the Labour Commissioner or approach the industrial tribunal. Keep records of your work hours and salary payments as evidence."
    },
    {
      question: "How long do I have to file a consumer complaint?",
      answer: "Consumer complaints must be filed within 2 years from the date of purchase or when the problem was discovered. Keep all receipts and warranty documents."
    },
    {
      question: "Can I get free legal aid?",
      answer: "Yes, free legal aid is available for those who cannot afford legal services. Contact your local Legal Services Authority or call the legal aid helpline."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const speakAnswer = (answer) => {
    speak(answer);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get answers to common legal questions
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left focus:outline-none"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                          <button
                            onClick={() => speakAnswer(faq.answer)}
                            className="ml-4 p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
