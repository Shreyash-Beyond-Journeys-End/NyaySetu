import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, HelpCircle, Search } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const FAQ = () => {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { speak } = useTextToSpeech();

  const faqs = {
    en: [
      {
        question: "What are my basic legal rights in India?",
        answer: "Every Indian citizen has fundamental rights including right to equality (Article 14), freedom of speech and expression (Article 19), right to life and personal liberty (Article 21), right against exploitation (Articles 23-24), and right to constitutional remedies (Article 32). These are guaranteed by the Constitution and are enforceable by courts.",
        category: "Constitutional Rights"
      },
      {
        question: "How can I file a complaint for domestic violence?",
        answer: "You can file a complaint under the Protection of Women from Domestic Violence Act, 2005 at the nearest magistrate's court or police station. You can also contact the National Women Helpline at 1091. Our app provides ready-to-use complaint templates that you can download and fill.",
        category: "Domestic Violence"
      },
      {
        question: "What should I do if my employer doesn't pay minimum wage?",
        answer: "You can file a complaint with the Labour Commissioner or approach the industrial tribunal. Keep records of your work hours and salary payments as evidence. The current minimum wage varies by state but is approximately ₹300 per day for most workers.",
        category: "Labor Rights"
      },
      {
        question: "How long do I have to file a consumer complaint?",
        answer: "Consumer complaints must be filed within 2 years from the date of purchase or when the problem was discovered. Keep all receipts, warranty documents, and evidence of the defect. You can file complaints online through the National Consumer Helpline.",
        category: "Consumer Rights"
      },
      {
        question: "Can I get free legal aid?",
        answer: "Yes, free legal aid is available for those who cannot afford legal services. Contact your local Legal Services Authority or call the legal aid helpline at 15100. Eligibility includes families with annual income below ₹5 lakhs.",
        category: "Legal Aid"
      },
      {
        question: "What documents do I need for property registration?",
        answer: "You need sale deed, property tax receipts, survey settlement records, encumbrance certificate, identity and address proofs of both parties, and passport-size photographs. Stamp duty and registration fees apply as per state regulations.",
        category: "Property Rights"
      },
      {
        question: "How do I file an RTI application?",
        answer: "You can file RTI applications online through the RTI portal or submit physically to the concerned Public Information Officer (PIO). Include specific information you seek, contact details, and pay the prescribed fee (₹10 for most applications).",
        category: "Right to Information"
      },
      {
        question: "What is the procedure for police complaint?",
        answer: "You can file an FIR for cognizable offenses or a simple complaint for non-cognizable offenses. Visit the nearest police station, provide details in writing, and ensure you get a copy of the complaint with acknowledgment.",
        category: "Criminal Law"
      }
    ],
    hi: [
      {
        question: "भारत में मेरे बुनियादी कानूनी अधिकार क्या हैं?",
        answer: "प्रत्येक भारतीय नागरिक के पास मौलिक अधिकार हैं जिसमें समानता का अधिकार (अनुच्छेद 14), भाषण और अभिव्यक्ति की स्वतंत्रता (अनुच्छेद 19), जीवन और व्यक्तिगत स्वतंत्रता का अधिकार (अनुच्छेद 21), शोषण के विरुद्ध अधिकार (अनुच्छेद 23-24), और संवैधानिक उपचारों का अधिकार (अनुच्छेद 32) शामिल हैं।",
        category: "संवैधानिक अधिकार"
      },
      {
        question: "घरेलू हिंसा के लिए शिकायत कैसे दर्ज करूं?",
        answer: "आप घरेलू हिंसा से महिलाओं की सुरक्षा अधिनियम, 2005 के तहत निकटतम मजिस्ट्रेट न्यायालय या पुलिस स्टेशन में शिकायत दर्ज कर सकते हैं। राष्ट्रीय महिला हेल्पलाइन 1091 पर भी संपर्क कर सकते हैं।",
        category: "घरेलू हिंसा"
      },
      {
        question: "यदि मेरा नियोक्ता न्यूनतम मजदूरी नहीं देता तो क्या करूं?",
        answer: "आप श्रम आयुक्त के पास शिकायत दर्ज कर सकते हैं या औद्योगिक न्यायाधिकरण से संपर्क कर सकते हैं। अपने काम के घंटे और वेतन भुगतान का रिकॉर्ड रखें।",
        category: "श्रम अधिकार"
      },
      {
        question: "उपभोक्ता शिकायत दर्ज करने के लिए कितना समय है?",
        answer: "उपभोक्ता शिकायतें खरीद की तारीख से या समस्या का पता चलने से 2 साल के भीतर दर्ज करनी चाहिए। सभी रसीदें और वारंटी दस्तावेज सुरक्षित रखें।",
        category: "उपभोक्ता अधिकार"
      },
      {
        question: "क्या मुझे मुफ्त कानूनी सहायता मिल सकती है?",
        answer: "हां, जो लोग कानूनी सेवाओं का खर्च नहीं उठा सकते उनके लिए मुफ्त कानूनी सहायता उपलब्ध है। अपने स्थानीय कानूनी सेवा प्राधिकरण से संपर्क करें या 15100 पर कॉल करें।",
        category: "कानूनी सहायता"
      }
    ],
    mr: [
      {
        question: "भारतात माझे मूलभूत कायदेशीर हक्क कोणते आहेत?",
        answer: "प्रत्येक भारतीय नागरिकाला मूलभूत हक्क आहेत ज्यात समानतेचा हक्क (कलम 14), भाषण आणि अभिव्यक्ती स्वातंत्र्य (कलम 19), जीवन आणि वैयक्तिक स्वातंत्र्याचा हक्क (कलम 21) समाविष्ट आहे.",
        category: "संवैधानिक हक्क"
      },
      {
        question: "घरगुती हिंसाचारासाठी तक्रार कशी नोंदवावी?",
        answer: "तुम्ही घरगुती हिंसाचारापासून महिलांचे संरक्षण कायदा, 2005 अंतर्गत जवळच्या दंडाधिकारी न्यायालयात किंवा पोलीस स्टेशनमध्ये तक्रार नोंदवू शकता.",
        category: "घरगुती हिंसाचार"
      },
      {
        question: "जर माझा नियोक्ता किमान वेतन देत नसेल तर काय करावे?",
        answer: "तुम्ही कामगार आयुक्तांकडे तक्रार नोंदवू शकता किंवा औद्योगिक न्यायाधिकरणाशी संपर्क साधू शकता. तुमच्या कामाच्या तासांची आणि पगार पेमेंटची नोंद ठेवा.",
        category: "कामगार हक्क"
      }
    ],
    te: [
      {
        question: "భారతదేశంలో నా ప్రాథమిక న్యాయ హక్కులు ఏమిటి?",
        answer: "ప్రతి భారతీయ పౌరుడికి సమానత్వ హక్కు (ఆర్టికల్ 14), వాక్ మరియు వ్యక్తీకరణ స్వేచ్ఛ (ఆర్టికల్ 19), జీవితం మరియు వ్యక్తిగత స్వేచ్ఛ (ఆర్టికల్ 21) వంటి ప్రాథమిక హక్కులు ఉన్నాయి.",
        category: "రాజ్యాంగ హక్కులు"
      },
      {
        question: "గృహ హింసకు ఫిర్యాదు ఎలా దాఖలు చేయాలి?",
        answer: "మీరు గృహ హింస నుండి మహిళల రక్షణ చట్టం, 2005 కింద సమీప మేజిస్ట్రేట్ కోర్టు లేదా పోలీస్ స్టేషన్‌లో ఫిర్యాదు దాఖలు చేయవచ్చు.",
        category: "గృహ హింస"
      },
      {
        question: "నా యజమాని కనీస వేతనం చెల్లించకపోతే ఏం చేయాలి?",
        answer: "మీరు కార్మిక కమిషనర్‌కు ఫిర్యాదు చేయవచ్చు లేదా పారిశ్రామిక న్యాయస్థానాన్ని సంప్రదించవచ్చు. మీ పని గంటలు మరియు వేతన చెల్లింపుల రికార్డులను ఉంచండి.",
        category: "కార్మిక హక్కులు"
      }
    ]
  };

  const currentFaqs = faqs[language] || faqs.en;

  const filteredFaqs = searchQuery
    ? currentFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentFaqs;

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
          <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('nav.faq')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'hi' ? 'आम कानूनी प्रश्नों के उत्तर प्राप्त करें' :
             language === 'mr' ? 'सामान्य कायदेशीर प्रश्नांची उत्तरे मिळवा' :
             language === 'te' ? 'సాధారణ న్యాయ ప్రశ్నలకు సమాధానాలు పొందండి' :
             'Get answers to common legal questions'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'प्रश्न खोजें...' :
                         language === 'mr' ? 'प्रश्न शोधा...' :
                         language === 'te' ? 'ప్రశ్నలను వెతకండి...' :
                         'Search questions...'}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'hi' ? 'कोई प्रश्न नहीं मिला' :
                 language === 'mr' ? 'कोणताही प्रश्न सापडला नाही' :
                 language === 'te' ? 'ప్రశ్నలు కనుగొనబడలేదు' :
                 'No questions found'}
              </p>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => (
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
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4"
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
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                              {faq.answer}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => speakAnswer(faq.answer)}
                              className="ml-4 flex-shrink-0"
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 text-center bg-blue-50 dark:bg-blue-900/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'hi' ? 'अपना सवाल नहीं मिला?' :
               language === 'mr' ? 'तुमचा प्रश्न सापडला नाही?' :
               language === 'te' ? 'మీ ప్రశ్న కనుగొనలేదా?' :
               'Didn\'t find your question?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'hi' ? 'हमारे AI असिस्टेंट से चैट करें या हमसे संपर्क करें' :
               language === 'mr' ? 'आमच्या AI असिस्टंटशी चॅट करा किंवा आमच्याशी संपर्क साधा' :
               language === 'te' ? 'మా AI సహాయకుడితో చాట్ చేయండి లేదా మమ్మల్ని సంప్రదించండి' :
               'Chat with our AI assistant or contact us directly'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                {language === 'hi' ? 'AI से चैट करें' :
                 language === 'mr' ? 'AI शी चॅट करा' :
                 language === 'te' ? 'AI తో చాట్ చేయండి' :
                 'Chat with AI'}
              </Button>
              <Button variant="outline">
                {t('nav.contact')}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
