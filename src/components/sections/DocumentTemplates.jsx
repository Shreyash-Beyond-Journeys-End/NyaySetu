import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const DocumentTemplates = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Add 2-3 more widely used templates (e.g., Affidavit, Power of Attorney, Rent Receipt)
  const documentTemplates = [
    {
      id: 1,
      title: 'Rental Agreement',
      description: 'Standard rental agreement template for landlords and tenants.',
      content: {
        en: {
          title: 'Rental Agreement',
          fields: {
            'Landlord Name': '________________________',
            'Tenant Name': '________________________',
            'Property Address': '________________________',
            'Rent Amount': '________________________',
            'Start Date': '________________________',
            'End Date': '________________________',
            'Signature': '________________________'
          }
        }
      }
    },
    {
      id: 2,
      title: 'Employment Contract',
      description: 'Basic employment contract template for employers and employees.',
      content: {
        en: {
          title: 'Employment Contract',
          fields: {
            'Employer Name': '________________________',
            'Employee Name': '________________________',
            'Position': '________________________',
            'Salary': '________________________',
            'Start Date': '________________________',
            'Signature': '________________________'
          }
        }
      }
    },
    {
      id: 3,
      title: 'Consumer Complaint',
      description: 'Template for filing a consumer complaint.',
      content: {
        en: {
          title: 'Consumer Complaint',
          fields: {
            'Complainant Name': '________________________',
            'Address': '________________________',
            'Product/Service': '________________________',
            'Complaint Details': '________________________',
            'Relief Sought': '________________________',
            'Date': '________________________',
            'Signature': '________________________'
          }
        }
      }
    },
    {
      id: 4,
      title: 'Affidavit',
      description: 'General purpose affidavit template.',
      content: {
        en: {
          title: 'Affidavit',
          fields: {
            'Affiant Name': '________________________',
            'Statement': '________________________',
            'Date': '________________________',
            'Signature': '________________________'
          }
        }
      }
    },
    {
      id: 5,
      title: 'Power of Attorney',
      description: 'Template for granting power of attorney.',
      content: {
        en: {
          title: 'Power of Attorney',
          fields: {
            'Principal Name': '________________________',
            'Attorney Name': '________________________',
            'Scope of Power': '________________________',
            'Effective Date': '________________________',
            'Signature': '________________________'
          }
        }
      }
    },
    {
      id: 6,
      title: 'Rent Receipt',
      description: 'Receipt template for rent payment.',
      content: {
        en: {
          title: 'Rent Receipt',
          fields: {
            'Landlord Name': '________________________',
            'Tenant Name': '________________________',
            'Amount Received': '________________________',
            'Month': '________________________',
            'Date': '________________________',
            'Signature': '________________________'
          }
        }
      }
    }
  ];

  const generatePDF = (document) => {
    try {
      const doc = new jsPDF();
      const content = document.content.en;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(16);
      doc.text(content.title, 20, 30);
      doc.setFontSize(12);
      let yPosition = 50;
      Object.entries(content.fields).forEach(([field, value]) => {
        doc.text(`${field}: ${value}`, 20, yPosition);
        yPosition += 15;
      });
      yPosition += 20;
      doc.text('Note: Please fill in all required information before submission.', 20, yPosition);
      const fileName = `${document.title}_en.pdf`;
      doc.save(fileName);
      toast.success(`Document downloaded: ${fileName}`);
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const previewDocument = (document) => {
    const content = document.content.en;
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
            {t('documents.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {documentTemplates.map((document, index) => (
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
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {document.description}
                  </p>
                  <div className="space-y-3 flex flex-row gap-2">
                    <Button
                      size="sm"
                      onClick={() => previewDocument(document)}
                      className="flex-1 flex items-center justify-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => generatePDF(document)}
                      className="flex-1 flex items-center justify-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download (English)</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentTemplates;
