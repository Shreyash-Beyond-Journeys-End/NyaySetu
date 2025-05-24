import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Languages, Filter, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/appStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const DocumentTemplates = () => {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'domestic-violence', name: 'Domestic Violence' },
    { id: 'labor-rights', name: 'Labor Rights' },
    { id: 'consumer-rights', name: 'Consumer Rights' },
    { id: 'property-rights', name: 'Property Rights' }
  ];

  const documentTemplates = [
    {
      id: 1,
      title: 'Domestic Violence Complaint',
      category: 'domestic-violence',
      description: 'File a complaint under the Domestic Violence Act, 2005',
      languages: ['en', 'hi', 'mr', 'te'],
      fields: [
        'Complainant Name and Address',
        'Respondent Details',
        'Nature of Domestic Violence',
        'Relief Sought',
        'Supporting Evidence'
      ],
      content: {
        en: {
          title: 'APPLICATION UNDER SECTION 12 OF THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005',
          fields: {
            'Complainant Name': '________________________',
            'Complainant Address': '________________________',
            'Respondent Name': '________________________',
            'Relationship': '________________________',
            'Nature of Violence': '________________________',
            'Relief Sought': '________________________',
            'Date': '________________________',
            'Signature': '________________________'
          }
        },
        hi: {
          title: 'घरेलू हिंसा से महिलाओं की सुरक्षा अधिनियम, 2005 की धारा 12 के तहत आवेदन',
          fields: {
            'शिकायतकर्ता का नाम': '________________________',
            'शिकायतकर्ता का पता': '________________________',
            'प्रतिवादी का नाम': '________________________',
            'रिश्ता': '________________________',
            'हिंसा की प्रकृति': '________________________',
            'मांगी गई राहत': '________________________',
            'दिनांक': '________________________',
            'हस्ताक्षर': '________________________'
          }
        },
        mr: {
          title: 'घरगुती हिंसाचारापासून महिलांचे संरक्षण अधिनियम, 2005 च्या कलम 12 अन्वये अर्ज',
          fields: {
            'तक्रारदाराचे नाव': '________________________',
            'तक्रारदाराचा पत्ता': '________________________',
            'प्रतिवादीचे नाव': '________________________',
            'नाते': '________________________',
            'हिंसाचाराचे स्वरूप': '________________________',
            'मागितलेला दिलासा': '________________________',
            'दिनांक': '________________________',
            'स्वाक्षरी': '________________________'
          }
        },
        te: {
          title: 'గృహ హింస నుండి మహిళల రక్షణ చట్టం, 2005 యొక్క సెక్షన్ 12 కింద దరખాస్తు',
          fields: {
            'ఫిర్యాదుదారు పేరు': '________________________',
            'ఫిర్యాదుదారు చిరునామా': '________________________',
            'ప్రతివాది పేరు': '________________________',
            'సంబంధం': '________________________',
            'హింస యొక్క స్వభావం': '________________________',
            'కోరిన ఉపశమనం': '________________________',
            'తేదీ': '________________________',
            'సంతకం': '________________________'
          }
        }
      }
    },
    {
      id: 2,
      title: 'Labor Complaint Application',
      category: 'labor-rights',
      description: 'File complaint for unpaid wages and labor violations',
      languages: ['en', 'hi', 'mr', 'te'],
      fields: [
        'Employee Details',
        'Employer Information',
        'Nature of Violation',
        'Compensation Sought'
      ],
      content: {
        en: {
          title: 'COMPLAINT UNDER MINIMUM WAGES ACT & LABOR LAWS',
          fields: {
            'Employee Name': '________________________',
            'Employee ID': '________________________',
            'Employer Name': '________________________',
            'Work Period': '________________________',
            'Wages Due': '________________________',
            'Nature of Violation': '________________________',
            'Compensation Sought': '________________________',
            'Date': '________________________',
            'Signature': '________________________'
          }
        },
        hi: {
          title: 'न्यूनतम मजदूरी अधिनियम और श्रम कानूनों के तहत शिकायत',
          fields: {
            'कर्मचारी का नाम': '________________________',
            'कर्मचारी आईडी': '________________________',
            'नियोक्ता का नाम': '________________________',
            'कार्य अवधि': '________________________',
            'बकाया मजदूरी': '________________________',
            'उल्लंघन की प्रकृति': '________________________',
            'मांगा गया मुआवजा': '________________________',
            'दिनांक': '________________________',
            'हस्ताक्षर': '________________________'
          }
        },
        mr: {
          title: 'किमान वेतन कायदा आणि श्रम कायद्यांतर्गत तक्रार',
          fields: {
            'कर्मचाऱ्याचे नाव': '________________________',
            'कर्मचारी आयडी': '________________________',
            'नियोक्त्याचे नाव': '________________________',
            'कामाचा कालावधी': '________________________',
            'थकित वेतन': '________________________',
            'उल्लंघनाचे स्वरूप': '________________________',
            'मागितली भरपाई': '________________________',
            'दिनांक': '________________________',
            'स्वाक्षरी': '________________________'
          }
        },
        te: {
          title: 'కనీస వేతన చట్టం & కార్మిక చట్టాల కింద ఫిర్యాదు',
          fields: {
            'ఉద్యోగి పేరు': '________________________',
            'ఉద్యోగి ID': '________________________',
            'యజమాని పేరు': '________________________',
            'పని కాలం': '________________________',
            'బకాయి వేతనాలు': '________________________',
            'ఉల్లంఘన స్వభావం': '________________________',
            'కోరిన నష్టపరిహారం': '________________________',
            'తేదీ': '________________________',
            'సంతకం': '________________________'
          }
        }
      }
    },
    {
      id: 3,
      title: 'Consumer Complaint Format',
      category: 'consumer-rights',
      description: 'File complaint for defective goods or poor services',
      languages: ['en', 'hi', 'mr', 'te'],
      fields: [
        'Consumer Details',
        'Purchase Information',
        'Defect Description',
        'Compensation Claimed'
      ],
      content: {
        en: {
          title: 'CONSUMER COMPLAINT UNDER CONSUMER PROTECTION ACT, 2019',
          fields: {
            'Consumer Name': '________________________',
            'Consumer Address': '________________________',
            'Seller/Service Provider': '________________________',
            'Product/Service Details': '________________________',
            'Purchase Date': '________________________',
            'Amount Paid': '________________________',
            'Nature of Defect': '________________________',
            'Compensation Sought': '________________________',
            'Date': '________________________',
            'Signature': '________________________'
          }
        },
        hi: {
          title: 'उपभोक्ता संरक्षण अधिनियम, 2019 के तहत उपभोक्ता शिकायत',
          fields: {
            'उपभोक्ता का नाम': '________________________',
            'उपभोक्ता का पता': '________________________',
            'विक्रेता/सेवा प्रदाता': '________________________',
            'उत्पाद/सेवा विवरण': '________________________',
            'खरीद की तारीख': '________________________',
            'भुगतान की गई राशि': '________________________',
            'दोष की प्रकृति': '________________________',
            'मांगा गया मुआवजा': '________________________',
            'दिनांक': '________________________',
            'हस्ताक्षर': '________________________'
          }
        },
        mr: {
          title: 'ग्राहक संरक्षण कायदा, 2019 अंतर्गत ग्राहक तक्रार',
          fields: {
            'ग्राहकाचे नाव': '________________________',
            'ग्राहकाचा पत्ता': '________________________',
            'विक्रेता/सेवा प्रदाता': '________________________',
            'उत्पादन/सेवा तपशील': '________________________',
            'खरेदीची तारीख': '________________________',
            'भरलेली रक्कम': '________________________',
            'दोषाचे स्वरूप': '________________________',
            'मागितली नुकसानभरपाई': '________________________',
            'दिनांक': '________________________',
            'स्वाक्षरी': '________________________'
          }
        },
        te: {
          title: 'వినియోగదారుల రక్షణ చట్టం, 2019 కింద వినియోగదారుల ఫిర్యాదు',
          fields: {
            'వినియోగదారు పేరు': '________________________',
            'వినియోగదారు చిరునామా': '________________________',
            'అమ్మకందారు/సేవా ప్రదాత': '________________________',
            'ఉత్పత్తి/సేవ వివరాలు': '________________________',
            'కొనుగోలు తేదీ': '________________________',
            'చెల్లించిన మొత్తం': '________________________',
            'లోపం యొక్క స్వభావం': '________________________',
            'కోరిన నష్టపరిహారం': '________________________',
            'తేదీ': '________________________',
            'సంతకం': '________________________'
          }
        }
      }
    }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documentTemplates 
    : documentTemplates.filter(doc => doc.category === selectedCategory);

  const generatePDF = (document, selectedLanguage) => {
    try {
      const doc = new jsPDF();
      const content = document.content[selectedLanguage];
      
      // Set font for different languages
      if (selectedLanguage === 'hi' || selectedLanguage === 'mr' || selectedLanguage === 'te') {
        // For Indian languages, we'll use a basic approach
        doc.setFont('helvetica', 'normal');
      }
      
      // Title
      doc.setFontSize(16);
      doc.text(content.title, 20, 30);
      
      // Fields
      doc.setFontSize(12);
      let yPosition = 50;
      
      Object.entries(content.fields).forEach(([field, value]) => {
        doc.text(`${field}: ${value}`, 20, yPosition);
        yPosition += 15;
      });
      
      // Footer
      yPosition += 20;
      doc.text('Note: Please fill in all required information before submission.', 20, yPosition);
      
      // Save the PDF
      const fileName = `${document.title}_${selectedLanguage}.pdf`;
      doc.save(fileName);
      
      toast.success(`Document downloaded: ${fileName}`);
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const previewDocument = (document, selectedLanguage) => {
    const content = document.content[selectedLanguage];
    const previewWindow = window.open('', '_blank');
    
    previewWindow.document.write(`
      <html>
        <head>
          <title>${document.title} - Preview</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .title { font-size: 18px; font-weight: bold; margin-bottom: 20px; text-align: center; }
            .field { margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ccc; }
            .field-label { font-weight: bold; }
            .field-value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="title">${content.title}</div>
          ${Object.entries(content.fields).map(([field, value]) => `
            <div class="field">
              <div class="field-label">${field}:</div>
              <div class="field-value">${value}</div>
            </div>
          `).join('')}
          <br><br>
          <p><strong>Note:</strong> Please fill in all required information before submission.</p>
        </body>
      </html>
    `);
  };

  return (
    <section id="documents" className="py-20 px-4 bg-blue-50 dark:bg-blue-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('documents.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Download ready-to-use legal forms in English, Hindi, Marathi, and Telugu
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </motion.div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {document.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                      Form
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {document.description}
                  </p>

                  {/* Required Fields */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Required Information:
                    </h4>
                    <div className="space-y-1">
                      {document.fields.slice(0, 3).map((field, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          <span>{field}</span>
                        </div>
                      ))}
                      {document.fields.length > 3 && (
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          +{document.fields.length - 3} more fields...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages Available */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <Languages className="h-4 w-4" />
                      <span>Available Languages:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {document.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded uppercase font-medium"
                        >
                          {lang === 'en' ? 'English' : 
                           lang === 'hi' ? 'हिंदी' :
                           lang === 'mr' ? 'मराठी' :
                           lang === 'te' ? 'తెలుగు' : lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => previewDocument(document, language)}
                        className="flex-1 flex items-center justify-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => generatePDF(document, language)}
                        className="flex-1 flex items-center justify-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                    
                    {/* Language-specific downloads */}
                    <div className="grid grid-cols-2 gap-2">
                      {document.languages.filter(lang => lang !== language).map((lang) => (
                        <Button
                          key={lang}
                          variant="outline"
                          size="sm"
                          onClick={() => generatePDF(document, lang)}
                          className="text-xs"
                        >
                          Download in {lang === 'en' ? 'EN' : 
                                     lang === 'hi' ? 'हिं' :
                                     lang === 'mr' ? 'मर' :
                                     lang === 'te' ? 'తె' : lang}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help with Legal Documents?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our AI assistant can guide you through filling out any legal document step by step in your preferred language.
            </p>
            <Button className="mx-auto">
              Get Document Help
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentTemplates;
