import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronRight, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../ui/Card';
import Button from '../ui/Button';

const LegalRightsCalculator = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState(null);

  const categories = useMemo(() => [
    {
      id: 'labor',
      title: t('calculator.labor_title'),
      description: t('calculator.labor_desc'),
      fields: [
        { name: 'workHours', label: t('calculator.labor_field_workHours'), type: 'number' },
        { name: 'salary', label: t('calculator.labor_field_salary'), type: 'number' },
        { name: 'workDays', label: t('calculator.labor_field_workDays'), type: 'number' }
      ]
    },
    {
      id: 'property',
      title: t('calculator.property_title'),
      description: t('calculator.property_desc'),
      fields: [
        { name: 'propertyValue', label: t('calculator.property_field_propertyValue'), type: 'number' },
        { name: 'ownershipType', label: t('calculator.property_field_ownershipType'), type: 'select', options: [t('calculator.property_option_individual'), t('calculator.property_option_joint'), t('calculator.property_option_inherited')] },
        { name: 'location', label: t('calculator.property_field_location'), type: 'text' }
      ]
    },
    {
      id: 'consumer',
      title: t('calculator.consumer_title'),
      description: t('calculator.consumer_desc'),
      fields: [
        { name: 'purchaseAmount', label: t('calculator.consumer_field_purchaseAmount'), type: 'number' },
        { name: 'issueType', label: t('calculator.consumer_field_issueType'), type: 'select', options: [t('calculator.consumer_option_defective'), t('calculator.consumer_option_service'), t('calculator.consumer_option_overcharging')] },
        { name: 'purchaseDate', label: t('calculator.consumer_field_purchaseDate'), type: 'date' }
      ]
    }
  ], [t]);

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
            t('calculator.recommendations.labor.overtime'),
            t('calculator.recommendations.labor.benefits'),
            t('calculator.recommendations.labor.records')
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
            t('calculator.recommendations.property.title'),
            t('calculator.recommendations.property.registration'),
            t('calculator.recommendations.property.documents')
          ]
        };
        break;
        
      case 'consumer':
        const compensationAmount = formData.purchaseAmount * 0.5; // 50% compensation
        
        calculationResult = {
          compensationAmount: Math.round(compensationAmount),
          timeLimit: '2 years from purchase date',
          recommendations: [
            t('calculator.recommendations.consumer.complaint'),
            t('calculator.recommendations.consumer.receipts'),
            t('calculator.recommendations.consumer.documentation')
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
            {t('calculator.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('calculator.subtitle')}
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
                      <span>{t('calculator.calculate_now')}</span>
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
                    {t('button.back')}
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
                          placeholder={t('calculator.enter_field', { field: field.label })}
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
                    {t('calculator.button')}
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
                      {t('calculator.analysis_title')}
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
                          {t('calculator.recommendations')}
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
