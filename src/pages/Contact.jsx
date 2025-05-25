import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Contact = () => {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    language: language
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(
        language === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।' :
        language === 'mr' ? 'संदेश यशस्वीरित्या पाठवला गेला! आम्ही लवकरच तुमच्याशी संपर्क करू.' :
        language === 'te' ? 'సందేశం విజయవంతంగా పంపబడింది! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము.' :
        'Message sent successfully! We will get back to you soon.'
      );
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        language: language
      });
    } catch (error) {
      toast.error(
        language === 'hi' ? 'संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।' :
        language === 'mr' ? 'संदेश पाठवण्यात त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.' :
        language === 'te' ? 'సందేశం పంపడంలో లోపం వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి.' :
        'Error sending message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'hi' ? 'हमें ईमेल करें' :
             language === 'mr' ? 'आम्हाला ईमेल करा' :
             language === 'te' ? 'మాకు ఇమెయిల్ చేయండి' :
             'Email Us',
      description: language === 'hi' ? 'ईमेल के माध्यम से संपर्क करें' :
                  language === 'mr' ? 'ईमेलद्वारे संपर्क साधा' :
                  language === 'te' ? 'ఇమెయిల్ ద్వారా సంప్రదించండి' :
                  'Get in touch via email',
      contact: 'support@legalrights.in',
      action: 'mailto:support@legalrights.in'
    },
    {
      icon: Phone,
      title: language === 'hi' ? 'हमें कॉल करें' :
             language === 'mr' ? 'आम्हाला कॉल करा' :
             language === 'te' ? 'మాకు కాల్ చేయండి' :
             'Call Us',
      description: language === 'hi' ? '24/7 कानूनी हेल्पलाइन' :
                  language === 'mr' ? '24/7 कायदेशीर हेल्पलाइन' :
                  language === 'te' ? '24/7 న్యాయ హెల్ప్‌లైన్' :
                  '24/7 Legal Helpline',
      contact: '+91-1800-LEGAL-AID',
      action: 'tel:+911800532252'
    },
    {
      icon: MapPin,
      title: language === 'hi' ? 'हमसे मिलें' :
             language === 'mr' ? 'आमच्याशी भेटा' :
             language === 'te' ? 'మమ్మల్ని కలవండి' :
             'Visit Us',
      description: language === 'hi' ? 'हमारा मुख्यालय' :
                  language === 'mr' ? 'आमचे मुख्यालय' :
                  language === 'te' ? 'మా ప్రధాన కార్యాలయం' :
                  'Our headquarters',
      contact: language === 'hi' ? 'मुंबई, महाराष्ट्र, भारत' :
               language === 'mr' ? 'मुंबई, महाराष्ट्र, भारत' :
               language === 'te' ? 'ముంబై, మహారాష్ట్ర, భారతదేశం' :
               'Mumbai, Maharashtra, India',
      action: '#'
    }
  ];

  const subjects = {
    en: [
      'Legal Query',
      'Domestic Violence',
      'Worker Rights',
      'Property Dispute',
      'Consumer Rights',
      'App Support',
      'Other'
    ],
    hi: [
      'कानूनी प्रश्न',
      'घरेलू हिंसा',
      'श्रमिक अधिकार',
      'संपत्ति विवाद',
      'उपभोक्ता अधिकार',
      'ऐप सहायता',
      'अन्य'
    ],
    mr: [
      'कायदेशीर प्रश्न',
      'घरगुती हिंसाचार',
      'कामगार हक्क',
      'मालमत्ता वाद',
      'ग्राहक हक्क',
      'अॅप सपोर्ट',
      'इतर'
    ],
    te: [
      'న్యాయ ప్రశ్న',
      'గృహ హింస',
      'కార్మిక హక్కులు',
      'ఆస్తి వివాదం',
      'వినియోగదారుల హక్కులు',
      'యాప్ మద్దతు',
      'ఇతర'
    ]
  };

  const quickLinks = [
    {
      icon: MessageSquare,
      title: language === 'hi' ? 'लाइव चैट शुरू करें' :
             language === 'mr' ? 'लाइव्ह चॅट सुरू करा' :
             language === 'te' ? 'లైవ్ చాట్ ప్రారంభించండి' :
             'Start Live Chat',
      description: language === 'hi' ? 'तत्काल सहायता के लिए' :
                  language === 'mr' ? 'त्वरित मदतीसाठी' :
                  language === 'te' ? 'తక్షణ సహాయం కోసం' :
                  'For instant assistance'
    },
    {
      icon: Clock,
      title: language === 'hi' ? 'कार्यालय समय' :
             language === 'mr' ? 'कार्यालयीन वेळ' :
             language === 'te' ? 'కార్యాలయ సమయం' :
             'Office Hours',
      description: language === 'hi' ? 'सोमवार - शुक्रवार: 9 AM - 6 PM' :
                  language === 'mr' ? 'सोमवार - शुक्रवार: 9 AM - 6 PM' :
                  language === 'te' ? 'సోమవారం - శుక్రవారం: 9 AM - 6 PM' :
                  'Monday - Friday: 9 AM - 6 PM'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Mail className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('nav.contact')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <info.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {info.description}
                    </p>
                    <a
                      href={info.action}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {info.contact}
                    </a>
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick Actions */}
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <link.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'hi' ? 'हमें संदेश भेजें' :
                 language === 'mr' ? 'आम्हाला संदेश पाठवा' :
                 language === 'te' ? 'మాకు సందేశం పంపండి' :
                 'Send us a Message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'hi' ? 'पूरा नाम *' :
                       language === 'mr' ? 'पूर्ण नाव *' :
                       language === 'te' ? 'పూర్తి పేరు *' :
                       'Full Name *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' :
                                  language === 'mr' ? 'तुमचे पूर्ण नाव टाका' :
                                  language === 'te' ? 'మీ పూర్తి పేరు నమోదు చేయండి' :
                                  'Enter your full name'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.email.placeholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.phone.placeholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.subject.label')}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">
                        {t('contact.form.subject.placeholder')}
                      </option>
                      {(subjects[language] || subjects.en).map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.message.placeholder')}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>
                    {isSubmitting 
                      ? t('contact.form.submitting')
                      : t('contact.form.submit')
                    }
                  </span>
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* Response Time Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  {language === 'hi' ? 'त्वरित प्रतिक्रिया' :
                   language === 'mr' ? 'त्वरित प्रतिसाद' :
                   language === 'te' ? 'వేగవంతమైన ప్రతిస్పందన' :
                   'Quick Response'}
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {language === 'hi' ? 'हम 24 घंटों के भीतर सभी संदेशों का जवाब देते हैं। आपातकालीन मामलों के लिए, कृपया हमारी हेल्पलाइन पर कॉल करें।' :
                   language === 'mr' ? 'आम्ही 24 तासांच्या आत सर्व संदेशांना उत्तर देतो. आणीबाणीच्या प्रकरणांसाठी, कृपया आमच्या हेल्पलाइनवर कॉल करा.' :
                   language === 'te' ? 'మేము 24 గంటలలోపు అన్ని సందేశాలకు ప్రత్యుత్తరం ఇస్తాము. అత్యవసర విషయాల కోసం, దయచేసి మా హెల్ప్‌లైన్‌కు కాల్ చేయండి.' :
                   'We respond to all messages within 24 hours. For emergency matters, please call our helpline.'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
