import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronRight, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import Button from '../ui/Button';

const LegalRightsCalculator = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState(null);

  const categories = [
    {
      id: 'labor',
      title: 'Labor Rights',
      description: 'Calculate minimum wage, overtime, and worker benefits',
      fields: [
        { name: 'workHours', label: 'Daily Work Hours', type: 'number' },
        { name: 'salary', label: 'Monthly Salary (₹)', type: 'number' },
        { name: 'workDays', label: 'Work Days per Month', type: 'number' }
      ]
    },
    {
      id: 'property',
      title: 'Property Rights',
      description: 'Understand property ownership and inheritance laws',
      fields: [
        { name: 'propertyValue', label: 'Property Value (₹)', type: 'number' },
        { name: 'ownershipType', label: 'Ownership Type', type: 'select', options: ['Individual', 'Joint', 'Inherited'] },
        { name: 'location', label: 'Property Location', type: 'text' }
      ]
    },
    {
      id: 'consumer',
      title: 'Consumer Rights',
      description: 'Know your rights as a consumer and compensation claims',
      fields: [
        { name: 'purchaseAmount', label: 'Purchase Amount (₹)', type: 'number' },
        { name: 'issueType', label: 'Issue Type', type: 'select', options: ['Defective Product', 'Service Issue', 'Overcharging'] },
        { name: 'purchaseDate', label: 'Purchase Date', type: 'date' }
      ]
    }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData({});
    setResults(null);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const calculateRights = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    let calculationResult = {};

    switch (selectedCategory) {
      case 'labor':
        const hourlyRate = formData.salary / (formData.workDays * formData.workHours);
        const overtimeRate = hourlyRate * 2;
        const minimumWage = 178; // Example minimum wage per day
        
        calculationResult = {
          hourlyRate: Math.round(hourlyRate),
          overtimeRate: Math.round(overtimeRate),
          isAboveMinimum: (formData.salary / formData.workDays) >= minimumWage,
          recommendations: [
            'You are entitled to overtime pay for work beyond 8 hours',
            'Ensure you receive ESI and PF benefits',
            'Keep records of your working hours'
          ]
        };
        break;
        
      case 'property':
        const stampDuty = formData.propertyValue * 0.05; // 5% stamp duty
        const registrationFee = formData.propertyValue * 0.01; // 1% registration
        
        calculationResult = {
          stampDuty: Math.round(stampDuty),
          registrationFee: Math.round(registrationFee),
          totalCost: Math.round(stampDuty + registrationFee),
          recommendations: [
            'Ensure clear title verification before purchase',
            'Register the property within 4 months',
            'Keep all original documents safe'
          ]
        };
        break;
        
      case 'consumer':
        const compensationAmount = formData.purchaseAmount * 0.5; // 50% compensation
        
        calculationResult = {
          compensationAmount: Math.round(compensationAmount),
          timeLimit: '2 years from purchase date',
          recommendations: [
            'File complaint within 2 years of purchase',
            'Keep purchase receipts and warranty cards',
            'Document the defect with photos/videos'
          ]
        };
        break;
    }

    setResults(calculationResult);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Legal Rights Calculator
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get personalized legal advice based on your specific situation
          </p>
        </motion.div>

        {!selectedCategory ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>Calculate Now</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedCategoryData.title}
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory('')}
                  >
                    Back
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCategoryData.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter ${field.label}`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    onClick={calculateRights}
                    className="w-full"
                    disabled={Object.keys(formData).length === 0}
                  >
                    Calculate My Rights
                  </Button>
                </div>
              </div>
            </Card>

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                      Your Legal Rights Analysis
                    </h4>

                    <div className="space-y-4">
                      {Object.entries(results).map(([key, value]) => {
                        if (key === 'recommendations') return null;
                        
                        return (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                            </span>
                            <span className="text-lg font-semibold text-blue-600">
                              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                               typeof value === 'number' ? `₹${value.toLocaleString()}` : value}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {results.recommendations && (
                      <div className="mt-6">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Legal Recommendations:
                        </h5>
                        <ul className="space-y-2">
                          {results.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {recommendation}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LegalRightsCalculator;
