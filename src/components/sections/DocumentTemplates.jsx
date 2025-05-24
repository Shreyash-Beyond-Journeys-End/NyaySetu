import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Languages, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DocumentTemplates = () => {
  const { t, i18n } = useTranslation();
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
      title: 'Domestic Violence Complaint Application',
      category: 'domestic-violence',
      description: 'File a complaint under the Domestic Violence Act, 2005',
      languages: ['en', 'hi', 'mr'],
      fields: ['Complainant Details', 'Respondent Details', 'Incident Description', 'Relief Sought'],
      downloadCount: 1250,
      type: 'PDF Form'
    },
    {
      id: 2,
      title: 'Protection Order Application',
      category: 'domestic-violence',
      description: 'Apply for immediate protection from domestic violence',
      languages: ['en', 'hi', 'mr'],
      fields: ['Personal Information', 'Violence Details', 'Protection Needed'],
      downloadCount: 890,
      type: 'PDF Form'
    },
    {
      id: 3,
      title: 'Labor Complaint Format',
      category: 'labor-rights',
      description: 'File complaint for unpaid wages and labor violations',
      languages: ['en', 'hi', 'mr'],
      fields: ['Employee Details', 'Employer Information', 'Violation Details', 'Compensation Sought'],
      downloadCount: 2100,
      type: 'Word Document'
    },
    {
      id: 4,
      title: 'Minimum Wage Claim Application',
      category: 'labor-rights',
      description: 'Claim for minimum wage differences and overtime pay',
      languages: ['en', 'hi', 'mr'],
      fields: ['Work Details', 'Salary Information', 'Claim Calculation'],
      downloadCount: 1680,
      type: 'PDF Form'
    },
    {
      id: 5,
      title: 'Consumer Complaint Format',
      category: 'consumer-rights',
      description: 'File complaint in consumer court for defective goods/services',
      languages: ['en', 'hi', 'mr'],
      fields: ['Consumer Details', 'Purchase Information', 'Defect Description', 'Relief Claimed'],
      downloadCount: 3200,
      type: 'PDF Form'
    },
    {
      id: 6,
      title: 'Property Ownership Affidavit',
      category: 'property-rights',
      description: 'Declare property ownership and inheritance rights',
      languages: ['en', 'hi', 'mr'],
      fields: ['Property Details', 'Ownership History', 'Legal Heirs'],
      downloadCount: 950,
      type: 'Word Document'
    },
    {
      id: 7,
      title: 'RTI Application Format',
      category: 'all',
      description: 'Request information under Right to Information Act',
      languages: ['en', 'hi', 'mr'],
      fields: ['Information Sought', 'Reason for Request', 'Preferred Format'],
      downloadCount: 4500,
      type: 'PDF Form'
    },
    {
      id: 8,
      title: 'Legal Notice Template',
      category: 'all',
      description: 'Send legal notice for various legal matters',
      languages: ['en', 'hi', 'mr'],
      fields: ['Sender Details', 'Recipient Information', 'Legal Demand', 'Consequences'],
      downloadCount: 2800,
      type: 'Word Document'
    }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documentTemplates 
    : documentTemplates.filter(doc => doc.category === selectedCategory);

  const handleDownload = (document) => {
    // Simulate download
    toast.success(`Downloading ${document.title} in ${i18n.language.toUpperCase()}`);
    console.log(`Downloading: ${document.title} in ${i18n.language}`);
  };

  const handlePreview = (document) => {
    toast.info(`Opening preview for ${document.title}`);
    console.log(`Preview: ${document.title}`);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Legal Document Templates
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Download ready-to-use legal forms and templates in your preferred language
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {document.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {document.description}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {document.type}
                    </span>
                  </div>

                  {/* Document Fields */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Required Fields:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {document.fields.slice(0, 2).map((field, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                        >
                          {field}
                        </span>
                      ))}
                      {document.fields.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                          +{document.fields.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Languages className="h-4 w-4" />
                      <span>Available in:</span>
                      <div className="flex space-x-1">
                        {document.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded uppercase"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Download Stats */}
                  <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{document.downloadCount.toLocaleString()} downloads</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(document)}
                      className="flex-1 flex items-center justify-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="flex-1 flex items-center justify-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
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
          <Card className="p-8 text-center bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help Filling Out Documents?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our AI assistant can guide you through filling out any legal document step by step.
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
