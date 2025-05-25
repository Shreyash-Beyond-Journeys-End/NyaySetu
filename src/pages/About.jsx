import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Shield, Heart, Target, Award, Globe, BookOpen } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';

const About = () => {
  const { t, language } = useTranslation();

  const values = [
    {
      icon: Scale,
      title: t('about.values.justice.title'),
      description: t('about.values.justice.description')
    },
    {
      icon: Users,
      title: t('about.values.community.title'),
      description: t('about.values.community.description')
    },
    {
      icon: Shield,
      title: t('about.values.privacy.title'),
      description: t('about.values.privacy.description')
    },
    {
      icon: Heart,
      title: t('about.values.compassion.title'),
      description: t('about.values.compassion.description')
    },
    {
      icon: Target,
      title: t('about.values.personalized.title'),
      description: t('about.values.personalized.description')
    },
    {
      icon: Award,
      title: t('about.values.verified.title'),
      description: t('about.values.verified.description')
    }
  ];

  // const stats = [
  //   {
  //     number: '10K+',
  //     label: t('about.stats.people_helped')
  //   },
  //   {
  //     number: '500+',
  //     label: t('about.stats.legal_cases')
  //   },
  //   {
  //     number: '24/7',
  //     label: t('about.stats.support_available')
  //   },
  //   {
  //     number: '4',
  //     label: t('about.stats.languages_available')
  //   }
  // ];

  const features = [
    {
      icon: Globe,
      title: t('about.features.multilang.title'),
      description: t('about.features.multilang.description')
    },
    {
      icon: BookOpen,
      title: t('about.features.ai_search.title'),
      description: t('about.features.ai_search.description')
    },
    {
      icon: Target,
      title: t('about.features.personalized.title'),
      description: t('about.features.personalized.description')
    },
    {
      icon: Award,
      title: language === 'hi' ? 'प्रमाणित जानकारी' :
             language === 'mr' ? 'प्रमाणित माहिती' :
             language === 'te' ? 'ధృవీకరించబడిన సమాచారం' :
             'Verified Information',
      description: language === 'hi' ? 'सभी कानूनी जानकारी भारतीय कानूनों और विशेषज्ञों द्वारा सत्यापित है' :
                   language === 'mr' ? 'सर्व कायदेशीर माहिती भारतीय कायद्यांनी आणि तज्ञांनी सत्यापित आहे' :
                   language === 'te' ? 'అన్ని న్యాయ సమాచారం భారతీయ చట్టాలు మరియు నిపుణులచే ధృవీకరించబడింది' :
                   'All legal information is verified by Indian laws and experts'
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
          <Scale className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Stats
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {language === 'hi' ? 'हमारा मिशन' :
               language === 'mr' ? 'आमचे ध्येय' :
               language === 'te' ? 'మా లక్ష్యం' :
               'Our Mission'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              {language === 'hi' ? 'जटिल कानूनी प्रणालियों और आम नागरिकों के बीच की खाई को पाटना, विशेष रूप से उन ग्रामीण क्षेत्रों में जहां कानूनी शिक्षा तक पहुंच की कमी हो सकती है। हम कई भारतीय भाषाओं में सरल, समझने योग्य कानूनी मार्गदर्शन प्रदान करते हैं, यह सुनिश्चित करते हुए कि भाषा की बाधाएं लोगों को उनके अधिकारों को समझने से न रोकें।' :
               language === 'mr' ? 'जटिल कायदेशीर प्रणाली आणि सामान्य नागरिकांमधील अंतर पाटणे, विशेषतः ग्रामीण भागात जेथे कायदेशीर शिक्षणाचा अभाव असू शकतो. आम्ही अनेक भारतीय भाषांमध्ये सोपे, समजण्यायोग्य कायदेशीर मार्गदर्शन प्रदान करतो, भाषेचे अडथळे लोकांना त्यांचे हक्क समजण्यापासून रोखू नयेत याची खात्री करतो.' :
               language === 'te' ? 'సంక్లిష్ట న్యాయ వ్యవస్థలు మరియు సాధారణ పౌరుల మధ్య అంతరాన్ని తగ్గించడం, ముఖ్యంగా న్యాయ విద్యకు ప్రాప్యత లేని గ్రామీణ ప్రాంతాలలో. మేము అనేక భారతీయ భాషలలో సరళమైన, అర్థమయ్యే న్యాయ మార్గదర్శకత్వం అందిస్తాము, భాష అడ్డంకులు ప్రజలను వారి హక్కులను అర్థం చేసుకోకుండా అడ్డుకోకుండా చూసుకుంటాము.' :
               'To bridge the gap between complex legal systems and everyday citizens, especially those in rural areas who may lack access to legal education. We provide simple, understandable legal guidance in multiple Indian languages, ensuring that language barriers don\'t prevent people from understanding their rights.'}
            </p>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {language === 'hi' ? 'हमारे मूल्य' :
             language === 'mr' ? 'आमची मूल्ये' :
             language === 'te' ? 'మా విలువలు' :
             'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {language === 'hi' ? 'हमें क्या अलग बनाता है' :
             language === 'mr' ? 'आम्हाला काय वेगळे करते' :
             language === 'te' ? 'మాకు ప్రత్యేకత ఇచ్చేది' :
             'What Makes Us Different'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
