import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, Calendar, Award, ChevronRight, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

const CaseStudies = () => {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { speak } = useTextToSpeech();

  const caseStudies = [
    {
      id: 1,
      title: "Domestic Violence Case - Priya's Story",
      category: "Domestic Violence",
      summary: "Rural woman gets justice against abusive husband using legal aid",
      outcome: "Protection order granted, maintenance awarded",
      timeline: "6 months",
      location: "Rural Maharashtra",
      details: {
        background: "Priya, a 28-year-old woman from a village in Maharashtra, faced daily physical and mental abuse from her husband and in-laws. She was unaware of her legal rights and suffered in silence for 3 years.",
        challenge: "Lack of awareness about domestic violence laws, fear of social stigma, no financial support for legal proceedings.",
        solution: "Through our app, Priya learned about the Protection of Women from Domestic Violence Act, 2005. She used our document templates to file a complaint and found nearby legal aid through our emergency contacts feature.",
        result: "The court granted a protection order within 2 weeks. Priya received ₹5,000 monthly maintenance and secured custody of her children. She now lives independently and has started a small business.",
        impact: "Priya's case inspired 15+ women in her village to seek help for similar issues."
      }
    },
    {
      id: 2,
      title: "Labor Rights Victory - Ram's Fight for Fair Wages",
      category: "Labor Rights",
      summary: "Construction worker recovers ₹50,000 in unpaid wages",
      outcome: "Full payment recovered with compensation",
      timeline: "4 months",
      location: "Delhi NCR",
      details: {
        background: "Ram worked as a construction laborer for 8 months but received only half the promised wages. His employer kept delaying payments citing various excuses.",
        challenge: "No written contract, illiterate, didn't know minimum wage laws, feared losing job if he complained.",
        solution: "Ram used our voice search feature in Hindi to understand his rights. Our legal calculator showed he was owed ₹50,000. He filed a complaint using our guidance.",
        result: "The Labor Commissioner intervened. Ram received full payment of ₹50,000 plus ₹10,000 compensation for the delay. His employer was also fined.",
        impact: "Ram's success led to formation of a workers' group that now uses our app to check their rights regularly."
      }
    },
    {
      id: 3,
      title: "Consumer Rights Win - Meera vs. Electronics Store",
      category: "Consumer Rights",
      summary: "Defective smartphone leads to full refund and compensation",
      outcome: "₹25,000 refund + ₹5,000 compensation",
      timeline: "2 months",
      location: "Bangalore",
      details: {
        background: "Meera bought a smartphone worth ₹25,000 that stopped working within a week. The store refused replacement claiming 'user damage' despite the phone being under warranty.",
        challenge: "Store manager was uncooperative, warranty card was confusing, didn't know about consumer courts.",
        solution: "Meera used our consumer rights calculator which showed she was entitled to replacement or refund. She prepared her case using our document templates.",
        result: "Consumer forum ruled in her favor within 2 months. She got full refund of ₹25,000 plus ₹5,000 compensation for mental harassment.",
        impact: "The electronics store now clearly explains warranty terms to customers and has improved their service quality."
      }
    },
    {
      id: 4,
      title: "Property Dispute Resolution - Farmer's Land Rights",
      category: "Property Rights",
      summary: "Elderly farmer protects ancestral land from illegal occupation",
      outcome: "Land ownership confirmed, occupants removed",
      timeline: "8 months",
      location: "Rural Haryana",
      details: {
        background: "75-year-old Kishan's 5-acre ancestral land was illegally occupied by local strongmen who claimed they had purchased it. Kishan had no proper documentation.",
        challenge: "Missing land records, elderly and frail, expensive legal procedures, influential opponents.",
        solution: "Kishan's grandson used our app to understand property laws. They found free legal aid and learned about revenue court procedures through our guidance.",
        result: "Revenue court confirmed Kishan's ownership based on historical records. Police removed illegal occupants. Land was restored to rightful owner.",
        impact: "Kishan's case encouraged other farmers in the area to verify and secure their land documents."
      }
    }
  ];

  const speakCaseDetails = (caseStudy) => {
    const text = `${caseStudy.title}. ${caseStudy.summary}. Outcome: ${caseStudy.outcome}. Location: ${caseStudy.location}.`;
    speak(text);
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Real Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our platform has helped real people protect their rights and get justice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card 
                className="h-full cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedCase(caseStudy)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                      {caseStudy.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakCaseDetails(caseStudy);
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {caseStudy.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {caseStudy.summary}
                  </p>
                  
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Timeline: {caseStudy.timeline}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      <span className="line-clamp-1">{caseStudy.outcome}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    <span>Read Full Story</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCase(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedCase.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {selectedCase.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedCase.timeline}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCase(null)}
                    >
                      Close
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Background
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedCase.details.background}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Challenge
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedCase.details.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Our Solution
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedCase.details.solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Result
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedCase.details.result}
                      </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                        Impact
                      </h3>
                      <p className="text-green-700 dark:text-green-300 leading-relaxed">
                        {selectedCase.details.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;
