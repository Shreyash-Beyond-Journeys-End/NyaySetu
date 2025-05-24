class TranslationService {
  constructor() {
    // Replace with your actual Gemini API key
    this.apiKey = 'YOUR_ACTUAL_GEMINI_API_KEY_HERE';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    // Static translations for common UI elements
    this.staticTranslations = {
      en: {
        // App
        'app.title': 'Legal Rights Advisor',
        'app.subtitle': 'Know Your Rights, Protect Your Future',
        
        // Navigation
        'nav.home': 'Home',
        'nav.faq': 'FAQ',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.search': 'Search',
        
        // Features
        'features.title': 'Powerful Features',
        'features.subtitle': 'Comprehensive legal tools for Indian laws',
        'calculator.title': 'Legal Rights Calculator',
        'documents.title': 'Legal Documents',
        'emergency.title': 'Emergency Contacts',
        'chatbot.title': 'Legal Assistant',
        
        // Search
        'search.placeholder': 'Ask about your legal rights...',
        'search.results': 'Search Results',
        'search.button': 'Search',
        'search.listening': 'Listening... speak now',
        'search.notSupported': 'Voice search not supported',
        
        // Buttons & Actions
        'button.download': 'Download',
        'button.preview': 'Preview',
        'button.call': 'Call',
        'button.clear': 'Clear',
        'button.send': 'Send',
        'button.close': 'Close',
        
        // Common
        'loading': 'Loading...',
        'error': 'Error occurred',
        'success': 'Success',
        'required': 'Required',
        'optional': 'Optional',
        'date': 'Date',
        'signature': 'Signature',
        
        // Legal Terms
        'legal.complaint': 'Complaint',
        'legal.application': 'Application',
        'legal.rights': 'Legal Rights',
        'legal.laws': 'Relevant Laws',
        'legal.steps': 'Recommended Steps',
        'legal.emergency': 'Emergency',
        'legal.urgent': 'Urgent',
        'legal.medium': 'Medium Priority',
        'legal.low': 'Low Priority'
      },
      
      hi: {
        // App
        'app.title': 'कानूनी अधिकार सलाहकार',
        'app.subtitle': 'अपने अधिकारों को जानें, अपने भविष्य की रक्षा करें',
        
        // Navigation
        'nav.home': 'होम',
        'nav.faq': 'प्रश्न उत्तर',
        'nav.about': 'हमारे बारे में',
        'nav.contact': 'संपर्क करें',
        'nav.search': 'खोजें',
        
        // Features
        'features.title': 'शक्तिशाली सुविधाएं',
        'features.subtitle': 'भारतीय कानूनों के लिए व्यापक कानूनी उपकरण',
        'calculator.title': 'कानूनी अधिकार कैलकुलेटर',
        'documents.title': 'कानूनी दस्तावेज',
        'emergency.title': 'आपातकालीन संपर्क',
        'chatbot.title': 'कानूनी सहायक',
        
        // Search
        'search.placeholder': 'अपने कानूनी अधिकारों के बारे में पूछें...',
        'search.results': 'खोज परिणाम',
        'search.button': 'खोजें',
        'search.listening': 'सुन रहे हैं... अब बोलें',
        'search.notSupported': 'आवाज खोज समर्थित नहीं है',
        
        // Buttons & Actions
        'button.download': 'डाउनलोड करें',
        'button.preview': 'पूर्वावलोकन',
        'button.call': 'कॉल करें',
        'button.clear': 'साफ करें',
        'button.send': 'भेजें',
        'button.close': 'बंद करें',
        
        // Common
        'loading': 'लोड हो रहा है...',
        'error': 'त्रुटि हुई',
        'success': 'सफलता',
        'required': 'आवश्यक',
        'optional': 'वैकल्पिक',
        'date': 'दिनांक',
        'signature': 'हस्ताक्षर',
        
        // Legal Terms
        'legal.complaint': 'शिकायत',
        'legal.application': 'आवेदन',
        'legal.rights': 'कानूनी अधिकार',
        'legal.laws': 'संबंधित कानून',
        'legal.steps': 'सुझाए गए कदम',
        'legal.emergency': 'आपातकाल',
        'legal.urgent': 'तत्काल',
        'legal.medium': 'मध्यम प्राथमिकता',
        'legal.low': 'कम प्राथमिकता'
      },
      
      mr: {
        // App
        'app.title': 'कायदेशीर हक्क सल्लागार',
        'app.subtitle': 'तुमचे हक्क जाणा, तुमच्या भविष्याचे रक्षण करा',
        
        // Navigation
        'nav.home': 'होम',
        'nav.faq': 'प्रश्न उत्तरे',
        'nav.about': 'आमच्याबद्दल',
        'nav.contact': 'संपर्क',
        'nav.search': 'शोधा',
        
        // Features
        'features.title': 'शक्तिशाली वैशिष्ट्ये',
        'features.subtitle': 'भारतीय कायद्यांसाठी व्यापक कायदेशीर साधने',
        'calculator.title': 'कायदेशीर हक्क कॅल्क्युलेटर',
        'documents.title': 'कायदेशीर कागदपत्रे',
        'emergency.title': 'आणीबाणीची संपर्क',
        'chatbot.title': 'कायदेशीर सहाय्यक',
        
        // Search
        'search.placeholder': 'तुमच्या कायदेशीर हक्कांबद्दल विचारा...',
        'search.results': 'शोध परिणाम',
        'search.button': 'शोधा',
        'search.listening': 'ऐकत आहे... आता बोला',
        'search.notSupported': 'आवाज शोध समर्थित नाही',
        
        // Buttons & Actions
        'button.download': 'डाउनलोड करा',
        'button.preview': 'पूर्वावलोकन',
        'button.call': 'कॉल करा',
        'button.clear': 'साफ करा',
        'button.send': 'पाठवा',
        'button.close': 'बंद करा',
        
        // Common
        'loading': 'लोड होत आहे...',
        'error': 'त्रुटी झाली',
        'success': 'यश',
        'required': 'आवश्यक',
        'optional': 'ऐच्छिक',
        'date': 'दिनांक',
        'signature': 'स्वाक्षरी',
        
        // Legal Terms
        'legal.complaint': 'तक्रार',
        'legal.application': 'अर्ज',
        'legal.rights': 'कायदेशीर हक्क',
        'legal.laws': 'संबंधित कायदे',
        'legal.steps': 'शिफारस केलेली पावले',
        'legal.emergency': 'आणीबाणी',
        'legal.urgent': 'तातडीचे',
        'legal.medium': 'मध्यम प्राथमिकता',
        'legal.low': 'कमी प्राथमिकता'
      },
      
      te: {
        // App
        'app.title': 'న్యాయ హక్కుల సలహాదారు',
        'app.subtitle': 'మీ హక్కులను తెలుసుకోండి, మీ భవిష్యత్తును రక్షించుకోండి',
        
        // Navigation
        'nav.home': 'హోమ్',
        'nav.faq': 'ప్రశ్న సమాధానాలు',
        'nav.about': 'మా గురించి',
        'nav.contact': 'సంప్రదించండి',
        'nav.search': 'వెతకండి',
        
        // Features
        'features.title': 'శక్తివంతమైన లక్షణాలు',
        'features.subtitle': 'భారతీయ చట్టాల కోసం సమగ్ర న్యాయ సాధనాలు',
        'calculator.title': 'న్యాయ హక్కుల కాలిక్యులేటర్',
        'documents.title': 'న్యాయ పత్రాలు',
        'emergency.title': 'అత్యవసర సంప్రదింపులు',
        'chatbot.title': 'న్యాయ సహాయకుడు',
        
        // Search
        'search.placeholder': 'మీ న్యాయ హక్కుల గురించి అడగండి...',
        'search.results': 'శోధన ఫలితాలు',
        'search.button': 'వెతకండి',
        'search.listening': 'వింటున్నాం... ఇప్పుడు మాట్లాడండి',
        'search.notSupported': 'వాయిస్ సెర్చ్ మద్దతు లేదు',
        
        // Buttons & Actions
        'button.download': 'డౌన్‌లోడ్ చేయండి',
        'button.preview': 'ప్రివ్యూ',
        'button.call': 'కాల్ చేయండి',
        'button.clear': 'క్లియర్ చేయండి',
        'button.send': 'పంపండి',
        'button.close': 'మూసివేయండి',
        
        // Common
        'loading': 'లోడ్ అవుతోంది...',
        'error': 'లోపం సంభవించింది',
        'success': 'విజయం',
        'required': 'అవసరం',
        'optional': 'ఐచ్ఛికం',
        'date': 'తేదీ',
        'signature': 'సంతకం',
        
        // Legal Terms
        'legal.complaint': 'ఫిర్యాదు',
        'legal.application': 'దరఖాస్తు',
        'legal.rights': 'న్యాయ హక్కులు',
        'legal.laws': 'సంబంధిత చట్టాలు',
        'legal.steps': 'సిఫార్సు చేయబడిన చర్యలు',
        'legal.emergency': 'అత్యవసరం',
        'legal.urgent': 'అత్యవసరం',
        'legal.medium': 'మధ్యస్థ ప్రాధాన్యత',
        'legal.low': 'తక్కువ ప్రాధాన్యత'
      }
    };
  }

  // Get static translation
  translate(key, language = 'en') {
    return this.staticTranslations[language]?.[key] || 
           this.staticTranslations.en[key] || 
           key;
  }

  // Dynamic translation using Gemini AI (for user-generated content)
  async translateDynamic(text, targetLanguage, sourceLanguage = 'en') {
    if (!text || targetLanguage === sourceLanguage) return text;
    
    try {
      const languageNames = {
        'en': 'English',
        'hi': 'Hindi',
        'mr': 'Marathi', 
        'te': 'Telugu'
      };
      
      const prompt = `Translate the following text from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. 
      Keep the meaning accurate and use appropriate legal terminology if applicable:
      
      "${text}"
      
      Only provide the translation, no explanations.`;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text.trim();
      }
      
      return text;
    } catch (error) {
      console.error('Dynamic translation error:', error);
      return text; // Return original text if translation fails
    }
  }

  // Get supported languages
  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
    ];
  }

  // Check if language is supported
  isLanguageSupported(languageCode) {
    return Object.keys(this.staticTranslations).includes(languageCode);
  }

  // Get language direction (for RTL languages if needed in future)
  getLanguageDirection(languageCode) {
    // All current supported languages are LTR
    return 'ltr';
  }
}

export default new TranslationService();
