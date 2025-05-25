class TranslationService {
  constructor() {
    // Replace with your actual Gemini API key
    this.apiKey = 'YOUR_ACTUAL_GEMINI_API_KEY_HERE';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    // Static translations for common UI elements
    this.staticTranslations = {
      en: {
        // App
        'app.title': 'NyaySetu',
        'app.subtitle': 'Know your rights, protect your future',
        
        // About Page Values
        'about.values.community.title': 'Community First',
        'about.values.community.description': 'Our focus is on empowering rural and underserved communities with essential legal information.',
        'about.values.personalized.title': 'Personalized Guidance',
        'about.values.personalized.description': 'Get personalized legal advice based on your specific situation',
        'about.values.verified.title': 'Verified Information',
        'about.values.verified.description': 'All legal information is verified by Indian laws and experts',
        
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
        'calculator.subtitle': 'Get personalized legal advice based on your specific situation',
        'calculator.button': 'Calculate My Rights',
        'calculator.analysis_title': 'Your Legal Rights Analysis',
        'calculator.recommendations': 'Legal Recommendations:',
        'documents.title': 'Legal Documents',
        'emergency.title': 'Emergency Contacts',
        'chatbot.title': 'Legal Assistant',
        
        // Search
        'search.placeholder': 'Ask about your legal rights...',
        'search.results': 'Search Results',
        'search.button': 'Search',
        'search.listening': 'Listening... speak now',
        'search.notSupported': 'Voice search not supported',
        'search.priority': 'Priority',
        'search.possibleComplaints': 'Possible Complaints',
        'search.userRights': 'Your Legal Rights',
        'search.relevantLaws': 'Relevant Laws',
        'search.recommendedSteps': 'Recommended Steps',
        'search.error.empty': 'Please enter a search query',
        'search.error.failed': 'Search failed. Please try again',
        
        // About Page
        'about.title': 'About NyaySetu',
        'about.description': 'Empowering every Indian citizen with accessible legal knowledge and tools to understand and protect their rights.',
        
        // Buttons & Actions
        'button.download': 'Download',
        'button.preview': 'Preview',
        'button.call': 'Call',
        'button.clear': 'Clear',
        'button.send': 'Send',
        'button.close': 'Close',
        'button.back': 'Back',
        
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
        'legal.low': 'Low Priority',
        
        // New feature card translations
        'features.ai_search_title': 'AI-Powered Legal Search',
        'features.ai_search_desc': 'Get comprehensive legal information using advanced AI technology',
        'features.calculator_title': 'Legal Rights Calculator',
        'features.calculator_desc': 'Calculate your legal rights based on specific situations',
        'features.documents_title': 'Legal Documents',
        'features.documents_desc': 'Download legal forms in multiple Indian languages',
        'features.emergency_title': 'Emergency Contact',
        'features.emergency_desc': 'Quick access to legal aid and emergency services',
        'features.assistant_title': 'AI Legal Assistant',
        'features.assistant_desc': 'Chat with AI for instant legal guidance and advice',
        'features.voice_title': 'Voice Support',
        'features.voice_desc': 'Ask questions and get answers using voice commands',
        'features.multi_lang_title': 'Multi-Language Support',
        'features.multi_lang_desc': 'Available in English, Hindi, Marathi, and Telugu',
        'features.privacy_title': 'Privacy Protected',
        'features.privacy_desc': 'Your legal queries are completely confidential and secure',
        
        // Document Templates UI
        'documents.category.all': 'All Documents',
        'documents.category.domestic_violence': 'Domestic Violence',
        'documents.category.labor_rights': 'Labor Rights',
        'documents.category.consumer_rights': 'Consumer Rights',
        'documents.category.property_rights': 'Property Rights',
        'documents.subtitle': 'Download ready-to-use legal forms in English, Hindi, Marathi, and Telugu',
        'documents.form_label': 'Form',
        'documents.required_info': 'Required Information:',
        'documents.more_fields': 'more fields...',
        'documents.available_languages': 'Available Languages:',
        'documents.lang_en': 'EN',
        'documents.lang_hi': 'हिं',
        'documents.lang_mr': 'मर',
        'documents.lang_te': 'తె',
        'documents.help_title': 'Need Help with Legal Documents?',
        'documents.help_desc': 'Our AI assistant can guide you through filling out any legal document step by step in your preferred language.',
        'documents.help_button': 'Get Document Help',
        
        // Document Templates
        'documents.templates.domestic_violence.title': 'Domestic Violence Complaint',
        'documents.templates.domestic_violence.description': 'File a complaint under the Domestic Violence Act, 2005',
        'documents.templates.domestic_violence.content.en.title': 'APPLICATION UNDER SECTION 12 OF THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005',
        'documents.templates.domestic_violence.fields.complainant_name': 'Complainant Name',
        'documents.templates.domestic_violence.fields.complainant_address': 'Complainant Address',
        'documents.templates.domestic_violence.fields.respondent_name': 'Respondent Name',
        'documents.templates.domestic_violence.fields.relationship': 'Relationship',
        'documents.templates.domestic_violence.fields.nature_of_violence': 'Nature of Violence',
        'documents.templates.domestic_violence.fields.relief_sought': 'Relief Sought',
        'documents.templates.domestic_violence.fields.date': 'Date',
        'documents.templates.domestic_violence.fields.signature': 'Signature',

        'documents.templates.labor_rights.title': 'Labor Complaint Application',
        'documents.templates.labor_rights.description': 'File complaint for unpaid wages and labor violations',
        'documents.templates.labor_rights.content.en.title': 'COMPLAINT UNDER MINIMUM WAGES ACT & LABOR LAWS',
        'documents.templates.labor_rights.fields.employee_name': 'Employee Name',
        'documents.templates.labor_rights.fields.employee_id': 'Employee ID',
        'documents.templates.labor_rights.fields.employer_name': 'Employer Name',
        'documents.templates.labor_rights.fields.work_period': 'Work Period',
        'documents.templates.labor_rights.fields.wages_due': 'Wages Due',
        'documents.templates.labor_rights.fields.nature_of_violation': 'Nature of Violation',
        'documents.templates.labor_rights.fields.compensation_sought': 'Compensation Sought',
        'documents.templates.labor_rights.fields.date': 'Date',
        'documents.templates.labor_rights.fields.signature': 'Signature',

        'documents.templates.consumer_rights.title': 'Consumer Complaint Format',
        'documents.templates.consumer_rights.description': 'File complaint for defective goods or poor services',
        'documents.templates.consumer_rights.content.en.title': 'CONSUMER COMPLAINT UNDER CONSUMER PROTECTION ACT, 2019',
        'documents.templates.consumer_rights.fields.consumer_name': 'Consumer Name',
        'documents.templates.consumer_rights.fields.consumer_address': 'Consumer Address',
        'documents.templates.consumer_rights.fields.seller_service_provider': 'Seller/Service Provider',
        'documents.templates.consumer_rights.fields.product_service_details': 'Product/Service Details',
        'documents.templates.consumer_rights.fields.purchase_date': 'Purchase Date',
        'documents.templates.consumer_rights.fields.amount_paid': 'Amount Paid',
        'documents.templates.consumer_rights.fields.nature_of_defect': 'Nature of Defect',
        'documents.templates.consumer_rights.fields.compensation_sought': 'Compensation Sought',
        'documents.templates.consumer_rights.fields.date': 'Date',
        'documents.templates.consumer_rights.fields.signature': 'Signature',

        // Features Section Heading
        'features.section_title_part1': 'Powerful Features for',
        'features.section_title_part2': 'Legal Empowerment',
        'features.section_subtitle': 'Access comprehensive legal tools designed specifically for Indian laws and rights',

        // Calculator Categories
        'calculator.labor_title': 'Labor Rights',
        'calculator.labor_desc': 'Calculate minimum wage, overtime, and employee benefits',
        'calculator.labor_field_workHours': 'Daily Work Hours',
        'calculator.labor_field_salary': 'Monthly Salary (₹)',
        'calculator.labor_field_workDays': 'Work Days in Month',
        'calculator.property_title': 'Property Rights',
        'calculator.property_desc': 'Understand property ownership and inheritance laws',
        'calculator.property_field_propertyValue': 'Property Value (₹)',
        'calculator.property_field_ownershipType': 'Ownership Type',
        'calculator.property_option_individual': 'Individual',
        'calculator.property_option_joint': 'Joint',
        'calculator.property_option_inherited': 'Inherited',
        'calculator.property_field_location': 'Property Location',
        'calculator.consumer_title': 'Consumer Rights',
        'calculator.consumer_desc': 'Know your rights and compensation claims as a consumer',
        'calculator.consumer_field_purchaseAmount': 'Purchase Amount (₹)',
        'calculator.consumer_field_issueType': 'Issue Type',
        'calculator.consumer_option_defective': 'Defective Product',
        'calculator.consumer_option_service': 'Service Issue',
        'calculator.consumer_option_overcharging': 'Overcharging',
        'calculator.consumer_field_purchaseDate': 'Purchase Date',
        
        // Calculator Recommendations
        'calculator.calculate_now': 'Calculate Now',
        'calculator.enter_field': 'Enter {field}',
        
        // Labor Recommendations
        'calculator.recommendations.labor.overtime': 'You are entitled to overtime pay for work beyond 8 hours',
        'calculator.recommendations.labor.benefits': 'Ensure you are receiving ESI and PF benefits',
        'calculator.recommendations.labor.records': 'Keep a record of your work hours',
        
        // Property Recommendations
        'calculator.recommendations.property.title': 'Ensure clear title verification before purchase',
        'calculator.recommendations.property.registration': 'Register the property within 4 months',
        'calculator.recommendations.property.documents': 'Keep all original documents safe',
        
        // Consumer Recommendations
        'calculator.recommendations.consumer.complaint': 'File a complaint within 2 years of purchase',
        'calculator.recommendations.consumer.receipts': 'Keep purchase receipts and warranty cards safe',
        'calculator.recommendations.consumer.documentation': 'Document the defect with photos/videos',
        
        // Contact Form
        'contact.form.name.label': 'Full Name *',
        'contact.form.name.placeholder': 'Enter your full name',
        'contact.form.email.label': 'Email Address *',
        'contact.form.email.placeholder': 'Enter your email',
        'contact.form.phone.label': 'Phone Number',
        'contact.form.phone.placeholder': 'Enter your phone number',
        'contact.form.subject.label': 'Subject *',
        'contact.form.subject.placeholder': 'Select a subject',
        'contact.form.submit': 'Send Message',
        'contact.form.submitting': 'Sending...',
        
        // About Page Values
        'about.values.privacy.title': 'Privacy & Security',
        'about.values.privacy.description': 'Your legal queries and personal information are completely confidential and secure.',
        'about.values.compassion.title': 'Compassionate Support',
        'about.values.compassion.description': 'We provide legal guidance with empathy, understanding the challenges faced by those seeking justice.',
        
        // About Page Stats
        'about.stats.people_helped': 'People Helped',
        'about.stats.legal_cases': 'Legal Cases',
        'about.stats.support_available': 'Support Available',
        'about.stats.languages_available': 'Languages Supported',
        
        // About Page Features
        'about.features.multilang.title': 'Multi-Language Support',
        'about.features.multilang.description': 'Available in English, Hindi, Marathi, and Telugu',
        'about.features.ai_search.title': 'AI-Powered Search',
        'about.features.ai_search.description': 'Get comprehensive legal information using advanced AI technology',
        // About Page Values
        'about.values.justice.title': 'Justice for All',
        'about.values.justice.description': 'We believe every person deserves access to legal knowledge and justice, regardless of their background or education.',
        // About Features
        'about.features.personalized.title': 'Personalized Guidance',
        'about.features.personalized.description': 'Get personalized legal advice based on your specific situation',
        // Contact Page
        'contact.subtitle': "Have questions about your legal rights? We're here to help.",
        // Document Templates
        'documents.preview': 'Preview',
        'documents.download': 'Download',
        'documents.download_lang': 'Download ({lang})',
        'documents.fill_required': 'Please fill in all required information',
        'documents.generating': 'Generating document...',
        'documents.download_success': 'Document downloaded successfully',
        'documents.download_error': 'Error downloading document',
        'documents.preview_title': 'Document Preview',

        // Emergency Section
        'emergency.subtitle': 'Quick access to legal aid and emergency services',
        'emergency.search_placeholder': 'Search by city or area...',
        'emergency.national_title': 'National Emergency Numbers',
        'emergency.legal_aid_title': 'Legal Aid Services',
        'emergency.police': 'Police',
        'emergency.ambulance': 'Ambulance',
        'emergency.fire': 'Fire',
        'emergency.women_helpline': 'Women Helpline',
        'emergency.child_helpline': 'Child Helpline',
        'emergency.senior_citizen': 'Senior Citizen Helpline',
        'emergency.legal_services': 'Legal Services',
        'emergency.hours': 'Hours',
        'emergency.available_24x7': 'Available 24x7',
        'emergency.call_button': 'Call Now',
        'emergency.location_error': 'Could not detect location',
        'emergency.no_results': 'No services found in this area',
        'emergency.searching': 'Searching for services...',
      },
      
      hi: {
        // App
        'app.title': 'न्यायसेतु',
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
        'calculator.subtitle': 'अपनी विशिष्ट स्थिति के आधार पर व्यक्तिगत कानूनी सलाह प्राप्त करें',
        'calculator.button': 'मेरे अधिकारों की गणना करें',
        'calculator.analysis_title': 'आपका कानूनी अधिकार विश्लेषण',
        'calculator.recommendations': 'कानूनी सिफारिशें:',
        'documents.title': 'कानूनी दस्तावेज',
        'emergency.title': 'आपातकालीन संपर्क',
        'chatbot.title': 'कानूनी सहायक',
        
        // Search
        'search.placeholder': 'अपने कानूनी अधिकारों के बारे में पूछें...',
        'search.results': 'खोज परिणाम',
        'search.button': 'खोजें',
        'search.listening': 'सुन रहे हैं... अब बोलें',
        'search.notSupported': 'आवाज खोज समर्थित नहीं है',
        'search.priority': 'प्राथमिकता',
        'search.possibleComplaints': 'संभावित शिकायतें',
        'search.userRights': 'आपके कानूनी अधिकार',
        'search.error.empty': 'कृपया खोज प्रश्न दर्ज करें',
        'search.error.failed': 'खोज विफल रही। कृपया पुनः प्रयास करें',
        
        // Buttons & Actions
        'button.download': 'डाउनलोड करें',
        'button.preview': 'पूर्वावलोकन',
        'button.call': 'कॉल करें',
        'button.clear': 'साफ करें',
        'button.send': 'भेजें',
        'button.close': 'बंद करें',
        'button.back': 'वापस',
        
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
        'legal.low': 'कम प्राथमिकता',
        
        // New feature card translations
        'features.ai_search_title': 'एआई-संचालित कानूनी खोज',
        'features.ai_search_desc': 'उन्नत एआई तकनीक का उपयोग करके व्यापक कानूनी जानकारी प्राप्त करें',
        'features.calculator_title': 'कानूनी अधिकार कैलकुलेटर',
        'features.calculator_desc': 'विशिष्ट परिस्थितियों के आधार पर अपने कानूनी अधिकारों की गणना करें',
        'features.documents_title': 'कानूनी दस्तावेज़',
        'features.documents_desc': 'कई भारतीय भाषाओं में कानूनी फॉर्म डाउनलोड करें',
        'features.emergency_title': 'आपातकालीन संपर्क',
        'features.emergency_desc': 'कानूनी सहायता और आपातकालीन सेवाओं तक त्वरित पहुँच',
        'features.assistant_title': 'एआई कानूनी सहायक',
        'features.assistant_desc': 'त्वरित कानूनी मार्गदर्शन और सलाह के लिए एआई से चैट करें',
        'features.voice_title': 'वॉयस सपोर्ट',
        'features.voice_desc': 'प्रश्न पूछें और वॉयस कमांड का उपयोग करके उत्तर प्राप्त करें',
        'features.multi_lang_title': 'मल्टी-लैंग्वेज सपोर्ट',
        'features.multi_lang_desc': 'अंग्रे़ी, हिंदी, मराठी और तेलुगु में उपलब्ध',
        'features.privacy_title': 'गोपनीयता संरक्षित',
        'features.privacy_desc': 'आपकी कानूनी क्वेरी पूरी तरह से गोपनीय और सुरक्षित है',
        
        // Document Templates UI
        'documents.category.all': 'सभी दस्तावेज़',
        'documents.category.domestic_violence': 'घरेलू हिंसा',
        'documents.category.labor_rights': 'श्रम अधिकार',
        'documents.category.consumer_rights': 'उपभोक्ता अधिकार',
        'documents.category.property_rights': 'संपत्ति अधिकार',
        'documents.subtitle': 'अंग्रे़ी, हिंदी, मराठी और तेलुगु में तैयार कानूनी फॉर्म डाउनलोड करें',
        'documents.form_label': 'फॉर्म',
        'documents.required_info': 'आवश्यक जानकारी:',
        'documents.more_fields': 'अधिक फ़ील्ड...',
        'documents.available_languages': 'उपलब्ध भाषा:',
        'documents.lang_en': 'EN',
        'documents.lang_hi': 'हिं',
        'documents.lang_mr': 'मर',
        'documents.lang_te': 'ते',
        'documents.help_title': 'कानूनी दस्तावेज़ों में सहायता चाहिए?',
        'documents.help_desc': 'हमारा एआई सहायक आपकी पसंदीदा भाषा में किसी भी कानूनी दस्तावेज़ को भरने में आपकी मदद कर सकता है।',
        'documents.help_button': 'दस्तावेज़ सहायता प्राप्त करें',
        
        // Document Templates
        'documents.templates.domestic_violence.title': 'घरेलू हिंसा शिकायत',
        'documents.templates.domestic_violence.description': 'घरेलू हिंसा अधिनियम, 2005 के तहत शिकायत दर्ज करें',
        'documents.templates.domestic_violence.content.hi.title': 'घरेलू हिंसा से महिलाओं की सुरक्षा अधिनियम, 2005 की धारा 12 के तहत आवेदन',
        'documents.templates.domestic_violence.fields.complainant_name': 'शिकायतकर्ता का नाम',
        'documents.templates.domestic_violence.fields.complainant_address': 'शिकायतकर्ता का पता',
        'documents.templates.domestic_violence.fields.respondent_name': 'प्रतिवादी का नाम',
        'documents.templates.domestic_violence.fields.relationship': 'रिश्ता',
        'documents.templates.domestic_violence.fields.nature_of_violence': 'हिंसा की प्रकृति',
        'documents.templates.domestic_violence.fields.relief_sought': 'मांगी गई राहत',
        'documents.templates.domestic_violence.fields.date': 'दिनांक',
        'documents.templates.domestic_violence.fields.signature': 'हस्ताक्षर',

        'documents.templates.labor_rights.title': 'श्रम शिकायत आवेदन',
        'documents.templates.labor_rights.description': 'अवैतनिक मजदूरी और श्रम उल्लंघन के लिए शिकायत दर्ज करें',
        'documents.templates.labor_rights.content.hi.title': 'न्यूनतम मजदूरी अधिनियम और श्रम कानूनों के तहत शिकायत',
        'documents.templates.labor_rights.fields.employee_name': 'कर्मचारी का नाम',
        'documents.templates.labor_rights.fields.employee_id': 'कर्मचारी आईडी',
        'documents.templates.labor_rights.fields.employer_name': 'नियोक्ता का नाम',
        'documents.templates.labor_rights.fields.work_period': 'कार्य अवधि',
        'documents.templates.labor_rights.fields.wages_due': 'बकाया मजदूरी',
        'documents.templates.labor_rights.fields.nature_of_violation': 'उल्लंघन की प्रकृति',
        'documents.templates.labor_rights.fields.compensation_sought': 'मांगा गया मुआवजा',
        'documents.templates.labor_rights.fields.date': 'दिनांक',
        'documents.templates.labor_rights.fields.signature': 'हस्ताक्षर',

        'documents.templates.consumer_rights.title': 'उपभोक्ता शिकायत प्रारूप',
        'documents.templates.consumer_rights.description': 'दोषपूर्ण वस्तुओं या खराब सेवाओं के लिए शिकायत दर्ज करें',
        'documents.templates.consumer_rights.content.hi.title': 'उपभोक्ता संरक्षण अधिनियम, 2019 के तहत उपभोक्ता शिकायत',
        'documents.templates.consumer_rights.fields.consumer_name': 'उपभोक्ता का नाम',
        'documents.templates.consumer_rights.fields.consumer_address': 'उपभोक्ता का पता',
        'documents.templates.consumer_rights.fields.seller_service_provider': 'विक्रेता/सेवा प्रदाता',
        'documents.templates.consumer_rights.fields.product_service_details': 'उत्पाद/सेवा विवरण',
        'documents.templates.consumer_rights.fields.purchase_date': 'खरीद की तारीख',
        'documents.templates.consumer_rights.fields.amount_paid': 'भुगतान की गई राशि',
        'documents.templates.consumer_rights.fields.nature_of_defect': 'दोष की प्रकृति',
        'documents.templates.consumer_rights.fields.compensation_sought': 'मांगा गया मुआवजा',
        'documents.templates.consumer_rights.fields.date': 'दिनांक',
        'documents.templates.consumer_rights.fields.signature': 'हस्ताक्षर',

        // Features Section Heading
        'features.section_title_part1': 'शक्तिशाली सुविधाएं',
        'features.section_title_part2': 'कानूनी सशक्तिकरण के लिए',
        'features.section_subtitle': 'भारतीय कानूनों और अधिकारों के लिए विशेष रूप से डिज़ाइन किए गए व्यापक कानूनी टूल्स तक पहुँचें',

        // Calculator Categories
        'calculator.labor_title': 'श्रम अधिकार',
        'calculator.labor_desc': 'न्यूनतम वेतन, ओवरटाइम और कर्मचारी लाभ की गणना करें',
        'calculator.labor_field_workHours': 'दैनिक कार्य घंटे',
        'calculator.labor_field_salary': 'मासिक वेतन (₹)',
        'calculator.labor_field_workDays': 'महीने में कार्य दिवस',
        'calculator.property_title': 'संपत्ति अधिकार',
        'calculator.property_desc': 'संपत्ति स्वामित्व और उत्तराधिकार कानूनों को समझें',
        'calculator.property_field_propertyValue': 'संपत्ति मूल्य (₹)',
        'calculator.property_field_ownershipType': 'स्वामित्व प्रकार',
        'calculator.property_option_individual': 'व्यक्तिगत',
        'calculator.property_option_joint': 'संयुक्त',
        'calculator.property_option_inherited': 'विरासत में मिला',
        'calculator.property_field_location': 'संपत्ति स्थान',
        'calculator.consumer_title': 'उपभोक्ता अधिकार',
        'calculator.consumer_desc': 'एक उपभोक्ता के रूप में अपने अधिकार और मुआवजा दावे जानें',
        'calculator.consumer_field_purchaseAmount': 'खरीद राशि (₹)',
        'calculator.consumer_field_issueType': 'समस्या का प्रकार',
        'calculator.consumer_option_defective': 'दोषपूर्ण उत्पाद',
        'calculator.consumer_option_service': 'सेवा समस्या',
        'calculator.consumer_option_overcharging': 'अधिक शुल्क',
        'calculator.consumer_field_purchaseDate': 'खरीद की तारीख',
        
        // Calculator Recommendations
        'calculator.calculate_now': 'अभी गणना करें',
        'calculator.enter_field': '{field} दर्ज करें',
        
        // Labor Recommendations
        'calculator.recommendations.labor.overtime': '8 घंटे से अधिक काम के लिए आप ओवरटाइम भुगतान के हकदार हैं',
        'calculator.recommendations.labor.benefits': 'सुनिश्चित करें कि आपको ESI और PF लाभ मिल रहे हैं',
        'calculator.recommendations.labor.records': 'अपने काम के घंटों का रिकॉर्ड रखें',
        
        // Property Recommendations
        'calculator.recommendations.property.title': 'खरीद से पहले स्पष्ट शीर्षक सत्यापन सुनिश्चित करें',
        'calculator.recommendations.property.registration': '4 महीने के भीतर संपत्ति पंजीकृत करें',
        'calculator.recommendations.property.documents': 'सभी मूल दस्तावेज सुरक्षित रखें',
        
        // Consumer Recommendations
        'calculator.recommendations.consumer.complaint': 'खरीद के 2 वर्षों के भीतर शिकायत दर्ज करें',
        'calculator.recommendations.consumer.receipts': 'खरीद रसीदें और वारंटी कार्ड सुरक्षित रखें',
        'calculator.recommendations.consumer.documentation': 'दोष को फोटो/वीडियो से दस्तावेजीकृत करें',
        
        // Contact Form
        'contact.form.name.label': 'पूरा नाम *',
        'contact.form.name.placeholder': 'अपना पूरा नाम दर्ज करें',
        'contact.form.email.label': 'ईमेल पता *',
        'contact.form.email.placeholder': 'अपना ईमेल दर्ज करें',
        'contact.form.phone.label': 'फोन नंबर',
        'contact.form.phone.placeholder': 'अपना फोन नंबर दर्ज करें',
        'contact.form.subject.label': 'विषय *',
        'contact.form.subject.placeholder': 'Select a subject',
        'contact.form.message.label': 'संदेश *',
        'contact.form.message.placeholder': 'अपनी कानूनी चिंता या प्रश्न का वर्णन करें...',
        
        // About Page Values
        'about.values.privacy.title': 'गोपनीयता और सुरक्षा',
        'about.values.privacy.description': 'आपकी कानूनी पूछताछ और व्यक्तिगत जानकारी पूरी तरह से गोपनीय और सुरक्षित है।',
        'about.values.compassion.title': 'दयालु सहायता',
        'about.values.compassion.description': 'हम न्याय की तलाश करने वालों की चुनौतियों को समझते हुए सहानुभूति के साथ कानूनी मार्गदर्शन प्रदान करते हैं।',
        
        // About Page Stats
        'about.stats.people_helped': 'लोगों की मदद की',
        'about.stats.legal_cases': 'कानूनी मामले',
        'about.stats.support_available': 'सहायता उपलब्ध',
        'about.stats.languages_available': 'भाषाओं में उपलब्ध',
        
        // About Page Features
        'about.features.multilang.title': 'बहुभाषी समर्थन',
        'about.features.multilang.description': 'अंग्रेजी, हिंदी, मराठी और तेलुगु में उपलब्ध',
        'about.features.ai_search.title': 'AI-संचालित खोज',
        'about.features.ai_search.description': 'उन्नत AI तकनीक का उपयोग करके व्यापक कानूनी जानकारी प्राप्त करें',
        // About Page Values
        'about.values.justice.title': 'सभी के लिए न्याय',
        'about.values.justice.description': 'हम मानते हैं कि हर व्यक्ति को उनकी पृष्ठभूमि या शिक्षा की परवाह किए बिना कानूनी ज्ञान और न्याय तक पहुंच का अधिकार है।',
        // About Features
        'about.features.personalized.title': 'व्यक्तिगत सलाह',
        'about.features.personalized.description': 'आपकी विशिष्ट स्थिति के आधार पर व्यक्तिगत कानूनी सलाह',
        // Contact Page
        'contact.subtitle': 'अपने कानूनी अधिकारों के बारे में प्रश्न हैं? हम यहाँ मदद करने के लिए हैं।',
        // Document Templates
        'documents.preview': 'Preview',
        'documents.download': 'Download',
        'documents.download_lang': 'Download ({lang})',
        'documents.fill_required': 'Please fill in all required information',
        'documents.generating': 'Generating document...',
        'documents.download_success': 'Document downloaded successfully',
        'documents.download_error': 'Error downloading document',
        'documents.preview_title': 'Document Preview',

        // Emergency Section
        'emergency.subtitle': 'Quick access to legal aid and emergency services',
        'emergency.search_placeholder': 'Search by city or area...',
        'emergency.national_title': 'National Emergency Numbers',
        'emergency.legal_aid_title': 'Legal Aid Services',
        'emergency.police': 'Police',
        'emergency.ambulance': 'Ambulance',
        'emergency.fire': 'Fire',
        'emergency.women_helpline': 'Women Helpline',
        'emergency.child_helpline': 'Child Helpline',
        'emergency.senior_citizen': 'Senior Citizen Helpline',
        'emergency.legal_services': 'Legal Services',
        'emergency.hours': 'Hours',
        'emergency.available_24x7': 'Available 24x7',
        'emergency.call_button': 'Call Now',
        'emergency.location_error': 'Could not detect location',
        'emergency.no_results': 'No services found in this area',
        'emergency.searching': 'Searching for services...',
      },
      
      mr: {
        // App
        'app.title': 'न्यायसेतु',
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
        'calculator.subtitle': 'तुमच्या विशिष्ट परिस्थितीवर आधारित वैयक्तिकृत कायदेशीर सल्ला मिळवा',
        'calculator.button': 'माझे हक्क मोजा',
        'calculator.analysis_title': 'तुमचे कायदेशीर हक्क विश्लेषण',
        'calculator.recommendations': 'कायदेशीर शिफारसी:',
        'documents.title': 'कायदेशीर कागदपत्रे',
        'emergency.title': 'आणीबाणीची संपर्क',
        'chatbot.title': 'कायदेशीर सहाय्यक',
        
        // Search
        'search.placeholder': 'तुमच्या कायदेशीर हक्कांबद्दल विचारा...',
        'search.results': 'शोध परिणाम',
        'search.button': 'शोधा',
        'search.listening': 'ऐकत आहे... आता बोला',
        'search.notSupported': 'वॉईस शोध समर्थित नाही',
        'search.priority': 'प्राधान्य',
        'search.possibleComplaints': 'संभाव्य तक्रारी',
        'search.userRights': 'तुमचे कायदेशीर हक्क',
        'search.error.empty': 'कृपया शोध प्रश्न प्रविष्ट करा',
        'search.error.failed': 'शोध अयशस्वी झाला. कृपया पुन्हा प्रयास करा',
        
        // Buttons & Actions
        'button.download': 'डाउनलोड करा',
        'button.preview': 'पूर्वावलोकन',
        'button.call': 'कॉल करा',
        'button.clear': 'साफ करा',
        'button.send': 'पाठवा',
        'button.close': 'बंद करा',
        'button.back': 'मागे',
        
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
        'legal.low': 'कमी प्राथमिकता',
        
        // New feature card translations
        'features.ai_search_title': 'एआय-संचालित कायदेशीर शोध',
        'features.ai_search_desc': 'प्रगत एआई तंत्रज्ञानाचा वापर करून व्यापक कायदेशीर माहिती मिळवा',
        'features.calculator_title': 'कायदेशीर हक्क कॅल्क्युलेटर',
        'features.calculator_desc': 'विशिष्ट परिस्थितींवर आधारित तुमचे कायदेशीर हक्क मोजा',
        'features.documents_title': 'कायदेशीर कागदपत्रे',
        'features.documents_desc': 'अनेक भारतीय भाषांमध्ये कायदेशीर फॉर्म डाउनलोड करें',
        'features.emergency_title': 'आणीबाणी संपर्क',
        'features.emergency_desc': 'कायदेशीर मदत आणि आणीबाणी सेवांसाठी जलद प्रवेश',
        'features.assistant_title': 'एआई कायदेशीर सहाय्यक',
        'features.assistant_desc': 'त्वरित कायदेशीर मार्गदर्शन आणि सलाह के लिए एआई से चॅट करें',
        'features.voice_title': 'वॉयस सपोर्ट',
        'features.voice_desc': 'प्रश्न विचारा आणि वॉयस कमांड वापरून उत्तरे मिळवा',
        'features.multi_lang_title': 'बहुभाषिक समर्थन',
        'features.multi_lang_desc': 'इंग्रजी, हिंदी, मराठी आणि तेलुगू मध्ये उपलब्ध',
        'features.privacy_title': 'गोपनीयता संरक्षित',
        'features.privacy_desc': 'तुमचे कायदेशीर प्रश्न पूर्णपणे गोपनीय आणि सुरक्षित आहेत',
        
        // Document Templates UI
        'documents.category.all': 'सर्व कागदपत्रे',
        'documents.category.domestic_violence': 'घरगुती हिंसा',
        'documents.category.labor_rights': 'श्रम अधिकार',
        'documents.category.consumer_rights': 'उपभोक्ता अधिकार',
        'documents.category.property_rights': 'संपत्ति अधिकार',
        'documents.subtitle': 'अंग्रे़ी, हिंदी, मराठी आणि तेलुगू मध्ये तयार कायदेशीर फॉर्म डाउनलोड करें',
        'documents.form_label': 'फॉर्म',
        'documents.required_info': 'आवश्यक माहिती:',
        'documents.more_fields': 'अधिक फील्ड...',
        'documents.available_languages': 'उपलब्ध भाषा:',
        'documents.lang_en': 'EN',
        'documents.lang_hi': 'हि',
        'documents.lang_mr': 'मर',
        'documents.lang_te': 'ते',
        'documents.help_title': 'कायदेशीर कागदपत्रांसाठी मदतीची गरज आहे?',
        'documents.help_desc': 'आमचा एआई सहायक तुमच्या पसंतीच्या भाषेत कोणतेही कायदेशीर कागदपत्र भरताना तुम्हाला मार्गदर्शन करू शकतो.',
        'documents.help_button': 'कागदपत्र मदत मिळवा',
        
        // Document Templates
        'documents.templates.domestic_violence.title': 'घरगुती हिंसा तक्रार',
        'documents.templates.domestic_violence.description': 'घरगुती हिंसाचारापासून महिलांचे संरक्षण अधिनियम, 2005 अंतर्गत तक्रार दाखल करा',
        'documents.templates.domestic_violence.content.mr.title': 'घरगुती हिंसाचारापासून महिलांचे संरक्षण अधिनियम, 2005 च्या कलम 12 अन्वये अर्ज',
        'documents.templates.domestic_violence.fields.complainant_name': 'तक्रारदाराचे नाव',
        'documents.templates.domestic_violence.fields.complainant_address': 'तक्रारदाराचा पत्ता',
        'documents.templates.domestic_violence.fields.respondent_name': 'प्रतिवादीचे नाव',
        'documents.templates.domestic_violence.fields.relationship': 'नाते',
        'documents.templates.domestic_violence.fields.nature_of_violence': 'हिंसा की प्रकृति',
        'documents.templates.domestic_violence.fields.relief_sought': 'मांगी गई राहत',
        'documents.templates.domestic_violence.fields.date': 'दिनांक',
        'documents.templates.domestic_violence.fields.signature': 'हस्ताक्षर',

        'documents.templates.labor_rights.title': 'श्रम शिकायत आवेदन',
        'documents.templates.labor_rights.description': 'अवैतनिक मजदूरी और श्रम उल्लंघन के लिए शिकायत दर्ज करें',
        'documents.templates.labor_rights.content.mr.title': 'किमान मजदूरी अधिनियम और श्रम कानूनों के तहत शिकायत',
        'documents.templates.labor_rights.fields.employee_name': 'कर्मचाऱ्याचे नाव',
        'documents.templates.labor_rights.fields.employee_id': 'कर्मचारी आईडी',
        'documents.templates.labor_rights.fields.employer_name': 'नियोक्त्याचे नाव',
        'documents.templates.labor_rights.fields.work_period': 'कार्य अवधि',
        'documents.templates.labor_rights.fields.wages_due': 'बकाया मजदूरी',
        'documents.templates.labor_rights.fields.nature_of_violation': 'उल्लंघन की प्रकृति',
        'documents.templates.labor_rights.fields.compensation_sought': 'मांगा गया मुआवजा',
        'documents.templates.labor_rights.fields.date': 'दिनांक',
        'documents.templates.labor_rights.fields.signature': 'हस्ताक्षर',

        'documents.templates.consumer_rights.title': 'उपभोक्ता शिकायत प्रारूप',
        'documents.templates.consumer_rights.description': 'दोषपूर्ण वस्तुओं या खराब सेवाओं के लिए शिकायत दर्ज करें',
        'documents.templates.consumer_rights.content.mr.title': 'उपभोक्ता संरक्षण कायदा, 2019 के तहत उपभोक्ता शिकायत',
        'documents.templates.consumer_rights.fields.consumer_name': 'उपभोक्ता का नाम',
        'documents.templates.consumer_rights.fields.consumer_address': 'उपभोक्ता का पत्ता',
        'documents.templates.consumer_rights.fields.seller_service_provider': 'विक्रेता/सेवा प्रदाता',
        'documents.templates.consumer_rights.fields.product_service_details': 'उत्पाद/सेवा विवरण',
        'documents.templates.consumer_rights.fields.purchase_date': 'खरीद की तारीख',
        'documents.templates.consumer_rights.fields.amount_paid': 'भुगतान की गई राशि',
        'documents.templates.consumer_rights.fields.nature_of_defect': 'दोष की प्रकृति',
        'documents.templates.consumer_rights.fields.compensation_sought': 'मांगा गया मुआवजा',
        'documents.templates.consumer_rights.fields.date': 'दिनांक',
        'documents.templates.consumer_rights.fields.signature': 'हस्ताक्षर',

        // Features Section Heading
        'features.section_title_part1': 'शक्तिशाली वैशिष्ट्ये',
        'features.section_title_part2': 'कायदेशीर सक्षमीकरणासाठी',
        'features.section_subtitle': 'भारतीय कायदे आणि हक्कांसाठी खास डिझाइन केलेली व्यापक कायदेशीर साधने वापरा',

        // Calculator Categories
        'calculator.labor_title': 'श्रमिक हक्क',
        'calculator.labor_desc': 'किमान वेतन, ओव्हरटाईम आणि कर्मचारी लाभांची गणना करा',
        'calculator.labor_field_workHours': 'दैनंदिन कामाचे तास',
        'calculator.labor_field_salary': 'मासिक वेतन (₹)',
        'calculator.labor_field_workDays': 'महिन्यातील कामाचे दिवस',
        'calculator.property_title': 'मालमत्ता हक्क',
        'calculator.property_desc': 'मालमत्ता मालकी आणि वारसा कायदे समजून घ्या',
        'calculator.property_field_propertyValue': 'मालमत्तेची किंमत (₹)',
        'calculator.property_field_ownershipType': 'मालकीचा प्रकार',
        'calculator.property_option_individual': 'वैयक्तिक',
        'calculator.property_option_joint': 'संयुक्त',
        'calculator.property_option_inherited': 'वारसा',
        'calculator.property_field_location': 'मालमत्तेचे स्थान',
        'calculator.consumer_title': 'ग्राहक हक्क',
        'calculator.consumer_desc': 'ग्राहक म्हणून आपले हक्क आणि नुकसानभरपाई जाणून घ्या',
        'calculator.consumer_field_purchaseAmount': 'खरेदी रक्कम (₹)',
        'calculator.consumer_field_issueType': 'समस्येचा प्रकार',
        'calculator.consumer_option_defective': 'दोषपूर्ण उत्पादन',
        'calculator.consumer_option_service': 'सेवा समस्या',
        'calculator.consumer_option_overcharging': 'अधिक आकारणी',
        'calculator.consumer_field_purchaseDate': 'खरेदीची तारीख',
        
        // Calculator Recommendations
        'calculator.calculate_now': 'आता गणना करा',
        'calculator.enter_field': '{field} प्रविष्ट करा',
        
        // Labor Recommendations
        'calculator.recommendations.labor.overtime': '8 तासांपेक्षा जास्त कामासाठी तुम्हाला ओव्हरटाइम पे मिळण्याचा हक्क आहे',
        'calculator.recommendations.labor.benefits': 'तुम्हाला ESI आणि PF लाभ मिळत आहेत याची खात्री करा',
        'calculator.recommendations.labor.records': 'तुमच्या कामाच्या तासांचा रेकॉर्ड ठेवा',
        
        // Property Recommendations
        'calculator.recommendations.property.title': 'खरेदी करण्यापूर्वी स्पष्ट शीर्षक सत्यापन सुनिश्चित करा',
        'calculator.recommendations.property.registration': '4 महिन्यांच्या आत मालमत्ता नोंदणी करा',
        'calculator.recommendations.property.documents': 'सर्व मूळ दस्तऐवज सुरक्षित ठेवा',
        
        // Consumer Recommendations
        'calculator.recommendations.consumer.complaint': 'खरेदीच्या 2 वर्षांच्या आत तक्रार दाखल करा',
        'calculator.recommendations.consumer.receipts': 'खरेदी रसीद आणि वॉरंटी कार्ड सुरक्षित ठेवा',
        'calculator.recommendations.consumer.documentation': 'दोष फोटो/व्हिडिओने दस्तऐवजीकृत करा',
        
        // Contact Form
        'contact.form.message.label': 'संदेश *',
        'contact.form.message.placeholder': 'अपनी कानूनी चिंता या प्रश्न का वर्णन करें...',
        
        // About Page Values
        'about.values.privacy.title': 'गोपनीयता आणि सुरक्षा',
        'about.values.privacy.description': 'तुमच्या कायदेशीर चौकशी आणि वैयक्तिक माहिती पूर्णपणे गोपनीय आणि सुरक्षित आहे.',
        'about.values.compassion.title': 'दयाळू समर्थन',
        'about.values.compassion.description': 'आम्ही न्यायाच्या शोधात असलेल्यांच्या आव्हानांना समजून सहानुभूतीसह कायदेशीर मार्गदर्शन देतो.',
        
        // About Page Stats
        'about.stats.people_helped': 'लोकांना मदत केली',
        'about.stats.legal_cases': 'कायदेशीर प्रकरणे',
        'about.stats.support_available': 'सपोर्ट उपलब्ध',
        'about.stats.languages_available': 'भाषांमध्ये उपलब्ध',
        
        // About Page Features
        'about.features.multilang.title': 'बहुभाषी समर्थन',
        'about.features.multilang.description': 'इंग्रजी, हिंदी, मराठी आणि तेलुगूमध्ये उपलब्ध',
        'about.features.ai_search.title': 'AI-चालित शोध',
        'about.features.ai_search.description': 'प्रगत AI तंत्रज्ञानाचा वापर करून व्यापक कायदेशीर माहिती मिळवा',
        // About Page Values
        'about.values.justice.title': 'सर्वांसाठी न्याय',
        'about.values.justice.description': 'आम्ही मानतो की प्रत्येक व्यक्तीला त्यांची पार्श्वभूमी किंवा शिक्षणाची पर्वा न करता कायदेशीर ज्ञान आणि न्यायाचा अधिकार आहे.',
        // About Features
        'about.features.personalized.title': 'वैयक्तिक सल्ला',
        'about.features.personalized.description': 'तुमच्या विशिष्ट परिस्थितीवर आधारित वैयक्तिक कायदेशीर सल्ला',
        // Contact Page
        'contact.subtitle': 'तुमच्या कायदेशीर हक्कांबद्दल प्रश्न आहेत? आम्ही मदतीसाठी येथे आहोत.',
        // Document Templates
        'documents.preview': 'Preview',
        'documents.download': 'Download',
        'documents.download_lang': 'Download ({lang})',
        'documents.fill_required': 'Please fill in all required information',
        'documents.generating': 'Generating document...',
        'documents.download_success': 'Document downloaded successfully',
        'documents.download_error': 'Error downloading document',
        'documents.preview_title': 'Document Preview',

        // Emergency Section
        'emergency.subtitle': 'Quick access to legal aid and emergency services',
        'emergency.search_placeholder': 'Search by city or area...',
        'emergency.national_title': 'National Emergency Numbers',
        'emergency.legal_aid_title': 'Legal Aid Services',
        'emergency.police': 'Police',
        'emergency.ambulance': 'Ambulance',
        'emergency.fire': 'Fire',
        'emergency.women_helpline': 'Women Helpline',
        'emergency.child_helpline': 'Child Helpline',
        'emergency.senior_citizen': 'Senior Citizen Helpline',
        'emergency.legal_services': 'Legal Services',
        'emergency.hours': 'Hours',
        'emergency.available_24x7': 'Available 24x7',
        'emergency.call_button': 'Call Now',
        'emergency.location_error': 'Could not detect location',
        'emergency.no_results': 'No services found in this area',
        'emergency.searching': 'Searching for services...',
      },
      
      te: {
        // App
        'app.title': 'న్యాయసేవతూ',
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
        'calculator.subtitle': 'మీ ప్రత్యేక పరిస్థితి ఆధారంగా వ్యక్తిగత న్యాయ సలహా పొందండి',
        'calculator.button': 'నా హక్కులను లెక్కించండి',
        'calculator.analysis_title': 'మీ న్యాయ హక్కుల విశ్లేషణ',
        'calculator.recommendations': 'న్యాయ సిఫార్సులు:',
        'documents.title': 'న్యాయ పత్రాలు',
        'emergency.title': 'అత్యవసర సంప్రదింపులు',
        'chatbot.title': 'న్యాయ సహాయకుడు',
        
        // Search
        'search.placeholder': 'మీ న్యాయ హక్కుల గురించి అడగండి...',
        'search.results': 'శోధన ఫలితాలు',
        'search.button': 'వెతకండి',
        'search.listening': 'వింటున్నాం... ఇప్పుడు మాట్లాడండి',
        'search.notSupported': 'వాయిస్ సెర్చ్ మద్దతు లేదు',
        'search.priority': 'ప్రాధాన్యత',
        'search.possibleComplaints': 'సాధ్యమైన ఫిర్యాదులు',
        'search.userRights': 'మీ న్యాయ హక్కులు',
        'search.error.empty': 'దయచేసి శోధన ప్రశ్నను నమోదు చేయండి',
        'search.error.failed': 'శోధన విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి',
        
        // Buttons & Actions
        'button.download': 'డౌన్‌లోడ్ చేయండి',
        'button.preview': 'ప్రివ్యూ',
        'button.call': 'కాల్ చేయండి',
        'button.clear': 'క్లియర్ చేయండి',
        'button.send': 'పంపండి',
        'button.close': 'మూసివేయండి',
        'button.back': 'వెనక్కి',
        
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
        'legal.low': 'తక్కువ ప్రాధాన్యత',
        
        // New feature card translations
        'features.ai_search_title': 'ఏఐ ఆధారిత న్యాయ శోధన',
        'features.ai_search_desc': 'అధునాతన ఏఐ సాంకేతికతను ఉపయోగించి సమగ్ర న్యాయ సమాచారం పొందండి',
        'features.calculator_title': 'న్యాయ హక్కుల కాలిక్యులేటర్',
        'features.calculator_desc': 'ప్రత్యేక పరిస్థితుల ఆధారంగా మీ న్యాయ హక్కులను లెక్కించండి',
        'features.documents_title': 'న్యాయ పత్రాలు',
        'features.documents_desc': 'బహుళ భారతీయ భాషల్లో న్యాయ ఫారమ్‌లను డౌన్‌లోడ్ చేయండి',
        'features.emergency_title': 'అత్యవసర సంప్రదింపులు',
        'features.emergency_desc': 'న్యాయ సహాయం మరియు అత్యవసర సేవలకు త్వరిత ప్రాప్తి',
        'features.assistant_title': 'ఏఐ న్యాయ సహాయకుడు',
        'features.assistant_desc': 'తక్షణ న్యాయ మార్గదర్శనం మరియు సలహా కోసం ఏఐతో చాట్ చేయండి',
        'features.voice_title': 'వాయిస్ మద్దతు',
        'features.voice_desc': 'ప్రశ్నలు అడగండి మరియు వాయిస్ కమాండ్లను ఉపయోగించి సమాధానాలు పొందండి',
        'features.multi_lang_title': 'బహుభాషా మద్దతు',
        'features.multi_lang_desc': 'ఇంగ్లీష్, హిందీ, మరాఠీ మరియు తెలుగు లో అందుబాటులో ఉంది',
        'features.privacy_title': 'గోప్యతా పరిరక్షణ',
        'features.privacy_desc': 'మీ న్యాయ ప్రశ్నలు పూర్తిగా గోప్యంగా మరియు సురక్షితంగా ఉంటాయి',
        
        // Document Templates UI
        'documents.category.all': 'అన్ని పత్రాలు',
        'documents.category.domestic_violence': 'గృహ హింస',
        'documents.category.labor_rights': 'శ్రమ హక్కులు',
        'documents.category.consumer_rights': 'వినియోగదారు హక్కులు',
        'documents.category.property_rights': 'ఆస్తి హక్కులు',
        'documents.subtitle': 'ఇంగ్లీష్, హిందీ, మరాఠీ మరియు తెలుగు లో సిద్ధంగా ఉన్న న్యాయ ఫారమ్‌లను డౌన్‌లోడ్ చేయండి',
        'documents.form_label': 'ఫారం',
        'documents.required_info': 'అవసరమైన సమాచారం:',
        'documents.more_fields': 'మరిన్ని ఫీల్డ్స్...',
        'documents.available_languages': 'లభ్యమైన భాషలు:',
        'documents.lang_en': 'EN',
        'documents.lang_hi': 'హి',
        'documents.lang_mr': 'మర్',
        'documents.lang_te': 'తె',
        'documents.help_title': 'న్యాయ పత్రాలకు సహాయం కావాలా?',
        'documents.help_desc': 'మా AI సహాయకుడు మీకు ఇష్టమైన భాషలో ఏదైనా న్యాయ పత్రాన్ని నింపడంలో మీకు దశల వారీగా మార్గనిర్దేశం చేయగలడు.',
        'documents.help_button': 'పత్ర సహాయం పొందండి',
        
        // Document Templates
        'documents.templates.domestic_violence.title': 'గృహ హింస ఫిర్యాదు',
        'documents.templates.domestic_violence.description': 'గృహ హింస చట్టం, 2005 కింద ఫిర్యాదు దాఖలు చేయండి',
        'documents.templates.domestic_violence.content.te.title': 'గృహ హింస నుండి మహిళల రక్షణ చట్టం, 2005 యొక్క సెక్షన్ 12 కింద దరఖాస్తు',
        'documents.templates.domestic_violence.fields.complainant_name': 'ఫిర్యాదుదారు పేరు',
        'documents.templates.domestic_violence.fields.complainant_address': 'ఫిర్యాదుదారు చిరునామా',
        'documents.templates.domestic_violence.fields.respondent_name': 'ప్రతివాది పేరు',
        'documents.templates.domestic_violence.fields.relationship': 'సంబంధం',
        'documents.templates.domestic_violence.fields.nature_of_violence': 'హింస యొక్క స్వభావం',
        'documents.templates.domestic_violence.fields.relief_sought': 'కోరిన ఉపశమనం',
        'documents.templates.domestic_violence.fields.date': 'తేదీ',
        'documents.templates.domestic_violence.fields.signature': 'సంతకం',

        'documents.templates.labor_rights.title': 'కార్మిక ఫిర్యాదు దరఖాస్తు',
        'documents.templates.labor_rights.description': 'చెల్లించని వేతనాలు మరియు కార్మిక ఉల్లంఘనల కోసం ఫిర్యాదు దాఖలు చేయండి',
        'documents.templates.labor_rights.content.te.title': 'కనీస వేతన చట్టం & కార్మిక చట్టాల కింద ఫిర్యాదు',
        'documents.templates.labor_rights.fields.employee_name': 'ఉద్యోగి పేరు',
        'documents.templates.labor_rights.fields.employee_id': 'ఉద్యోగి ID',
        'documents.templates.labor_rights.fields.employer_name': 'యజమాని పేరు',
        'documents.templates.labor_rights.fields.work_period': 'పని కాలం',
        'documents.templates.labor_rights.fields.wages_due': 'బకాయి వేతనాలు',
        'documents.templates.labor_rights.fields.nature_of_violation': 'ఉల్లంఘన స్వభావం',
        'documents.templates.labor_rights.fields.compensation_sought': 'కోరిన నష్టపరిహారం',
        'documents.templates.labor_rights.fields.date': 'తేదీ',
        'documents.templates.labor_rights.fields.signature': 'సంతకం',

        'documents.templates.consumer_rights.title': 'వినియోగదారు ఫిర్యాదు ఫారమ్',
        'documents.templates.consumer_rights.description': 'లోపభూయిష్ట వస్తువులు లేదా పేలవమైన సేవల కోసం ఫిర్యాదు దాఖలు చేయండి',
        'documents.templates.consumer_rights.content.te.title': 'వినియోగదారుల రక్షణ చట్టం, 2019 కింద వినియోగదారుల ఫిర్యాదు',
        'documents.templates.consumer_rights.fields.consumer_name': 'వినియోగదారు పేరు',
        'documents.templates.consumer_rights.fields.consumer_address': 'వినియోగదారు చిరునామా',
        'documents.templates.consumer_rights.fields.seller_service_provider': 'అమ్మకందారు/సేవా ప్రదాత',
        'documents.templates.consumer_rights.fields.product_service_details': 'ఉత్పత్తి/సేవ వివరాలు',
        'documents.templates.consumer_rights.fields.purchase_date': 'కొనుగోలు తేదీ',
        'documents.templates.consumer_rights.fields.amount_paid': 'చెల్లించిన మొత్తం',
        'documents.templates.consumer_rights.fields.nature_of_defect': 'లోపం యొక్క స్వభావం',
        'documents.templates.consumer_rights.fields.compensation_sought': 'కోరిన నష్టపరిహారం',
        'documents.templates.consumer_rights.fields.date': 'తేదీ',
        'documents.templates.consumer_rights.fields.signature': 'సంతకం',

        // Features Section Heading
        'features.section_title_part1': 'శక్తివంతమైన లక్షణాలు',
        'features.section_title_part2': 'న్యాయ సాధికారత కోసం',
        'features.section_subtitle': 'భారతీయ చట్టాలు మరియు హక్కుల కోసం ప్రత్యేకంగా రూపొందించిన సమగ్ర న్యాయ సాధనాలను పొందండి',

        // Calculator Categories
        'calculator.labor_title': 'శ్రమ హక్కులు',
        'calculator.labor_desc': 'కనీస వేతనం, ఓవర్‌టైమ్ మరియు ఉద్యోగి ప్రయోజనాలను లెక్కించండి',
        'calculator.labor_field_workHours': 'రోజువారీ పని గంటలు',
        'calculator.labor_field_salary': 'నెలవారీ జీతం (₹)',
        'calculator.labor_field_workDays': 'నెలలో పని రోజులు',
        'calculator.property_title': 'ఆస్తి హక్కులు',
        'calculator.property_desc': 'ఆస్తి యాజమాన్యం మరియు వారసత్వ చట్టాలను అర్థం చేసుకోండి',
        'calculator.property_field_propertyValue': 'ఆస్తి విలువ (₹)',
        'calculator.property_field_ownershipType': 'యాజమాన్య రకం',
        'calculator.property_option_individual': 'వ్యక్తిగత',
        'calculator.property_option_joint': 'సంయుక్త',
        'calculator.property_option_inherited': 'వారసత్వం',
        'calculator.property_field_location': 'ఆస్తి స్థానం',
        'calculator.consumer_title': 'వినియోగదారు హక్కులు',
        'calculator.consumer_desc': 'వినియోగదారుగా మీ హక్కులు మరియు నష్టపరిహారం క్లెయిమ్‌లను తెలుసుకోండి',
        'calculator.consumer_field_purchaseAmount': 'కొనుగోలు మొత్తం (₹)',
        'calculator.consumer_field_issueType': 'సమస్య రకం',
        'calculator.consumer_option_defective': 'లోపభూయిష్ట ఉత్పత్తి',
        'calculator.consumer_option_service': 'సేవ సమస్య',
        'calculator.consumer_option_overcharging': 'అధిక వసూలు',
        'calculator.consumer_field_purchaseDate': 'కొనుగోలు తేదీ',
        
        // Calculator Recommendations
        'calculator.calculate_now': 'ఇప్పుడు లెక్కించండి',
        'calculator.enter_field': '{field} నమోదు చేయండి',
        
        // Labor Recommendations
        'calculator.recommendations.labor.overtime': '8 గంటలకు మించి పని చేసినందుకు మీకు ఓవర్‌టైమ్ చెల్లింపు హక్కు ఉంది',
        'calculator.recommendations.labor.benefits': 'మీకు ESI మరియు PF ప్రయోజనాలు లభిస్తున్నాయని నిర్ధారించుకోండి',
        'calculator.recommendations.labor.records': 'మీ పని గంటల రికార్డ్‌లను ఉంచండి',
        
        // Property Recommendations
        'calculator.recommendations.property.title': 'కొనుగోలు చేయడానికి ముందు స్పష్టమైన టైటిల్ ధృవీకరణను నిర్ధారించుకోండి',
        'calculator.recommendations.property.registration': '4 నెలల్లోపు ఆస్తిని నమోదు చేయండి',
        'calculator.recommendations.property.documents': 'అన్ని అసలు పత్రాలను సురక్షితంగా ఉంచండి',
        
        // Consumer Recommendations
        'calculator.recommendations.consumer.complaint': 'కొనుగోలు నుండి 2 సంవత్సరాలలోపు ఫిర్యాదు దాఖలు చేయండి',
        'calculator.recommendations.consumer.receipts': 'కొనుగోలు రసీదులు మరియు వారంటీ కార్డ్‌లను సురక్షితంగా ఉంచండి',
        'calculator.recommendations.consumer.documentation': 'లోపాన్ని ఫోటోలు/వీడియోలతో డాక్యుమెంట్ చేయండి',
        
        // About Page Values
        'about.values.privacy.title': 'గోప్యత & భద్రత',
        'about.values.privacy.description': 'మీ న్యాయ ప్రశ్నలు మరియు వ్యక్తిగత సమాచారం పూర్తిగా రహస్యంగా మరియు సురక్షితంగా ఉంటాయి.',
        'about.values.compassion.title': 'దయతో మద్దతు',
        'about.values.compassion.description': 'న్యాయం కోరుకునే వారి సవాళ్లను అర్థం చేసుకుని సానుభూతితో న్యాయ మార్గదర్శకత్వం అందిస్తాము.',
        
        // About Page Stats
        'about.stats.people_helped': 'ప్రజలకు సహాయం చేశాము',
        // About Page Values
        'about.values.justice.title': 'అందరికీ న్యాయం',
        'about.values.justice.description': 'ప్రతి వ్యక్తికి వారి నేపథ్యం లేదా విద్య లేకుండా న్యాయ జ్ఞానం మరియు న్యాయానికి ప్రాప్యత అధికారం ఉందని మేము నమ్ముతున్నాము.',
        // About Features
        'about.features.personalized.title': 'వ్యక్తిగత సలహా',
        'about.features.personalized.description': 'మీ ప్రత్యేక పరిస్థితి ఆధారంగా వ్యక్తిగత న్యాయ సలహా',
        // Contact Page
        'contact.subtitle': 'మీ న్యాయ హక్కుల గురించి ప్రశ్నలు ఉన్నాయా? మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము.',
        // Document Templates
        'documents.preview': 'Preview',
        'documents.download': 'Download',
        'documents.download_lang': 'Download ({lang})',
        'documents.fill_required': 'Please fill in all required information',
        'documents.generating': 'Generating document...',
        'documents.download_success': 'Document downloaded successfully',
        'documents.download_error': 'Error downloading document',
        'documents.preview_title': 'Document Preview',

        // Emergency Section
        'emergency.subtitle': 'Quick access to legal aid and emergency services',
        'emergency.search_placeholder': 'Search by city or area...',
        'emergency.national_title': 'National Emergency Numbers',
        'emergency.legal_aid_title': 'Legal Aid Services',
        'emergency.police': 'Police',
        'emergency.ambulance': 'Ambulance',
        'emergency.fire': 'Fire',
        'emergency.women_helpline': 'Women Helpline',
        'emergency.child_helpline': 'Child Helpline',
        'emergency.senior_citizen': 'Senior Citizen Helpline',
        'emergency.legal_services': 'Legal Services',
        'emergency.hours': 'Hours',
        'emergency.available_24x7': 'Available 24x7',
        'emergency.call_button': 'Call Now',
        'emergency.location_error': 'Could not detect location',
        'emergency.no_results': 'No services found in this area',
        'emergency.searching': 'Searching for services...',
      },
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
