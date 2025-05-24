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
      title: language === 'hi' ? 'सभी के लिए न्याय' :
             language === 'mr' ? 'सर्वांसाठी न्याय' :
             language === 'te' ? 'అందరికీ న్याయం' :
             'Justice for All',
      description: language === 'hi' ? 'हम मानते हैं कि हर व्यक्ति को उनकी पृष्ठभूमि या शिक्षा की परवाह किए बिना कानूनी ज्ञान और न्याय तक पहुंच का अधिकार है।' :
                   language === 'mr' ? 'आम्ही मानतो की प्रत्येक व्यक्तीला त्यांची पार्श्वभूमी किंवा शिक्षणाची पर्वा न करता कायदेशीर ज्ञान आणि न्यायाचा अधिकार आहे.' :
                   language === 'te' ? 'ప్రతి వ్యక్తికి వారి నేపథ్యం లేదా విద్య లేకుండా న్యాయ జ్ఞానం మరియు న్యాయానికి ప్రాప్యత అధికారం ఉందని మేము నమ్ముతున్నాము.' :
                   'We believe every person deserves access to legal knowledge and justice, regardless of their background or education.'
    },
    {
      icon: Users,
      title: language === 'hi' ? 'समुदाय पहले' :
             language === 'mr' ? 'समुदाय प्रथम' :
             language === 'te' ? 'కమ్యూనిటీ మొదట' :
             'Community First',
      description: language === 'hi' ? 'हमारा फोकस ग्रामीण और वंचित समुदायों को आवश्यक कानूनी जानकारी के साथ सशक्त बनाने पर है।' :
                   language === 'mr' ? 'आमचे लक्ष ग्रामीण आणि वंचित समुदायांना आवश्यक कायदेशीर माहितीसह सक्षम करण्यावर आहे.' :
                   language === 'te' ? 'గ్రామీణ మరియు వెనుకబడిన కమ్యూనిటీలను అవసరమైన న్యాయ సమాచారంతో శక్తివంతం చేయడంలో మా దృష్టి ఉంది.' :
                   'Our focus is on empowering rural and underserved communities with essential legal information.'
    },
    {
      icon: Shield,
      title: language === 'hi' ? 'गोपनीयता और सुरक्षा' :
             language === 'mr' ? 'गोपनीयता आणि सुरक्षा' :
             language === 'te' ? 'గోప్యత & భద్రత' :
             'Privacy & Security',
      description: language === 'hi' ? 'आपकी कानूनी पूछताछ और व्यक्तिगत जानकारी पूरी तरह से गोपनीय और सुरक्षित है।' :
                   language === 'mr' ? 'तुमच्या कायदेशीर चौकशी आणि वैयक्तिक माहिती पूर्णपणे गोपनीय आणि सुरक्षित आहे.' :
                   language === 'te' ? 'మీ న్యాయ ప్రశ్నలు మరియు వ్యక్తిగత సమాచారం పూర్తిగా రహస్యంగా మరియు సురక్షితంగా ఉంటాయి.' :
                   'Your legal queries and personal information are completely confidential and secure.'
    },
    {
      icon: Heart,
      title: language === 'hi' ? 'दयालु सहायता' :
             language === 'mr' ? 'दयाळू समर्थन' :
             language === 'te' ? 'దయతో మద్దతు' :
             'Compassionate Support',
      description: language === 'hi' ? 'हम न्याय की तलाश करने वालों की चुनौतियों को समझते हुए सहानुभूति के साथ कानूनी मार्गदर्शन प्रदान करते हैं।' :
                   language === 'mr' ? 'आम्ही न्यायाच्या शोधात असलेल्यांच्या आव्हानांना समजून सहानुभूतीसह कायदेशीर मार्गदर्शन देतो.' :
                   language === 'te' ? 'న్యాయం కోరుకునే వారి సవాళ్లను అర్థం చేసుకుని సానుభూతితో న్యాయ మార్గదర్శకత్వం అందిస్తాము.' :
                   'We provide legal guidance with empathy, understanding the challenges faced by those seeking justice.'
    }
  ];

  const stats = [
    {
      number: '10K+',
      label: language === 'hi' ? 'लोगों की मदद की' :
             language === 'mr' ? 'लोकांना मदत केली' :
             language === 'te' ? 'ప్రజలకు సహాయం చేశాము' :
             'People Helped'
    },
    {
      number: '500+',
      label: language === 'hi' ? 'कानूनी मामले' :
             language === 'mr' ? 'कायदेशीर प्रकरणे' :
             language === 'te' ? 'న్యాయ కేసులు' :
             'Legal Cases'
    },
    {
      number: '24/7',
      label: language === 'hi' ? 'सहायता उपलब्ध' :
             language === 'mr' ? 'सपोर्ट उपलब्ध' :
             language === 'te' ? 'మద్దతు అందుబాటులో' :
             'Support Available'
    },
    {
      number: '4',
      label: language === 'hi' ? 'भाषाओं में उपलब्ध' :
             language === 'mr' ? 'भाषांमध्ये उपलब्ध' :
             language === 'te' ? 'భాషలలో అందుబాటులో' :
             'Languages Supported'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: language === 'hi' ? 'बहुभाषी समर्थन' :
             language === 'mr' ? 'बहुभाषिक समर्थन' :
             language === 'te' ? 'బహుభాష మద్దతు' :
             'Multi-Language Support',
      description: language === 'hi' ? 'अंग्रेजी, हिंदी, मराठी और तेलुगु में उपलब्ध' :
                   language === 'mr' ? 'इंग्रजी, हिंदी, मराठी आणि तेलुगूमध्ये उपलब्ध' :
                   language === 'te' ? 'ఇంగ్లీష్, హిందీ, మరాఠీ మరియు తెలుగులో అందుబాటులో' :
                   'Available in English, Hindi, Marathi, and Telugu'
    },
    {
      icon: BookOpen,
      title: language === 'hi' ? 'AI-संचालित खोज' :
             language === 'mr' ? 'AI-चालित शोध' :
             language === 'te' ? 'AI-శక్తితో శోధన' :
             'AI-Powered Search',
      description: language === 'hi' ? 'उन्नत AI तकनीक का उपयोग करके व्यापक कानूनी जानकारी प्राप्त करें' :
                   language === 'mr' ? 'प्रगत AI तंत्रज्ञानाचा वापर करून व्यापक कायदेशीर माहिती मिळवा' :
                   language === 'te' ? 'అధునాతన AI సాంకేతికతను ఉపయోగించి సమగ్ర న్యాయ సమాచారం పొందండి' :
                   'Get comprehensive legal information using advanced AI technology'
    },
    {
      icon: Target,
      title: language === 'hi' ? 'व्यक्तिगत सलाह' :
             language === 'mr' ? 'वैयक्तिक सल्ला' :
             language === 'te' ? 'వ్యక్తిగత సలహా' :
             'Personalized Guidance',
      description: language === 'hi' ? 'आपकी विशिष्ट स्थिति के आधार पर व्यक्तिगत कानूनी सलाह' :
                   language === 'mr' ? 'तुमच्या विशिष्ट परिस्थितीवर आधारित वैयक्तिक कायदेशीर सल्ला' :
                   language === 'te' ? 'మీ ప్రత్యేక పరిస్థితి ఆధారంగా వ్యక్తిగత న్యాయ సలహా' :
                   'Get personalized legal advice based on your specific situation'
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
            {language === 'hi' ? 'कानूनी अधिकार सलाहकार के बारे में' :
             language === 'mr' ? 'कायदेशीर हक्क सल्लागार बद्दल' :
             language === 'te' ? 'న్యాయ హక్కుల సలహాదారుని గురించి' :
             'About Legal Rights Advisor'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'hi' ? 'भारत के हर नागरिक को सुलभ कानूनी ज्ञान और उनके अधिकारों को समझने और सुरक्षित करने के लिए उपकरण प्रदान करना।' :
             language === 'mr' ? 'प्रत्येक भारतीय नागरिकाला त्यांचे हक्क समजून घेण्यासाठी आणि संरक्षणासाठी सुलभ कायदेशीर ज्ञान आणि साधने प्रदान करणे.' :
             language === 'te' ? 'ప్రతి భారతీయ పౌరుడికి వారి హక్కులను అర్థం చేసుకోవడానికి మరియు రక్షించుకోవడానికి అందుబాటులో ఉన్న న్యాయ జ్ఞానం మరియు సాధనాలను అందించడం.' :
             'Empowering every Indian citizen with accessible legal knowledge and tools to understand and protect their rights.'}
          </p>
        </motion.div>

        {/* Stats */}
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
        </motion.div>

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
