import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Star, 
  ExternalLink,
  Filter,
  Users,
  Shield,
  Heart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Button from '../ui/Button';

const EmergencyContacts = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactCategories = [
    { id: 'all', name: 'All Contacts', icon: Users },
    { id: 'emergency', name: 'Emergency', icon: Shield },
    { id: 'legal-aid', name: 'Legal Aid', icon: Heart },
    { id: 'lawyers', name: 'Lawyers', icon: Users }
  ];

  const emergencyContacts = [
    {
      id: 1,
      name: 'Police Emergency',
      category: 'emergency',
      phone: '100',
      description: 'For immediate police assistance and emergency situations',
      availability: '24/7',
      type: 'Helpline',
      location: 'Pan India',
      languages: ['Hindi', 'English', 'Regional']
    },
    {
      id: 2,
      name: 'Women Helpline',
      category: 'emergency',
      phone: '1091',
      description: 'Support for women in distress, domestic violence cases',
      availability: '24/7',
      type: 'Helpline',
      location: 'Pan India',
      languages: ['Hindi', 'English', 'Regional']
    },
    {
      id: 3,
      name: 'Child Helpline',
      category: 'emergency',
      phone: '1098',
      description: 'Child protection and emergency assistance for children',
      availability: '24/7',
      type: 'Helpline',
      location: 'Pan India',
      languages: ['Hindi', 'English', 'Regional']
    },
    {
      id: 4,
      name: 'Legal Aid Services Authority',
      category: 'legal-aid',
      phone: '15100',
      description: 'Free legal aid and guidance for economically weaker sections',
      availability: '9 AM - 6 PM',
      type: 'Legal Aid',
      location: 'State-wise',
      languages: ['Hindi', 'English', 'Regional'],
      website: 'nalsa.gov.in'
    },
    {
      id: 5,
      name: 'Mumbai Legal Aid Cell',
      category: 'legal-aid',
      phone: '+91-22-2672-3415',
      description: 'Free legal consultation and representation for Mumbai residents',
      availability: '10 AM - 5 PM',
      type: 'Legal Aid',
      location: 'Mumbai, Maharashtra',
      languages: ['Hindi', 'Marathi', 'English'],
      address: 'High Court Building, Mumbai',
      rating: 4.2
    },
    {
      id: 6,
      name: 'Delhi Legal Aid Society',
      category: 'legal-aid',
      phone: '+91-11-2338-7379',
      description: 'Comprehensive legal aid services for Delhi NCR',
      availability: '9 AM - 6 PM',
      type: 'Legal Aid',
      location: 'Delhi NCR',
      languages: ['Hindi', 'English', 'Punjabi'],
      address: 'Patiala House Courts Complex, New Delhi',
      rating: 4.5
    },
    {
      id: 7,
      name: 'Advocate Priya Sharma',
      category: 'lawyers',
      phone: '+91-98765-43210',
      description: 'Specializes in domestic violence and women\'s rights cases',
      availability: '10 AM - 7 PM',
      type: 'Private Lawyer',
      location: 'Mumbai, Maharashtra',
      languages: ['Hindi', 'Marathi', 'English'],
      specialization: ['Domestic Violence', 'Family Law', 'Women Rights'],
      experience: '12 years',
      rating: 4.8,
      consultationFee: '₹500'
    },
    {
      id: 8,
      name: 'Advocate Ram Kumar',
      category: 'lawyers',
      phone: '+91-98234-56789',
      description: 'Expert in labor law and worker rights cases',
      availability: '9 AM - 6 PM',
      type: 'Private Lawyer',
      location: 'Delhi NCR',
      languages: ['Hindi', 'English'],
      specialization: ['Labor Law', 'Worker Rights', 'Industrial Disputes'],
      experience: '15 years',
      rating: 4.6,
      consultationFee: '₹800'
    }
  ];

  const filteredContacts = selectedCategory === 'all' 
    ? emergencyContacts 
    : emergencyContacts.filter(contact => contact.category === selectedCategory);

  const searchFilteredContacts = searchLocation
    ? filteredContacts.filter(contact => 
        contact.location.toLowerCase().includes(searchLocation.toLowerCase())
      )
    : filteredContacts;

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
    toast.success(`Calling ${phone}`);
  };

  const handleWebsite = (website) => {
    window.open(`https://${website}`, '_blank');
  };

  return (
    <section className="py-20 px-4 bg-red-50 dark:bg-red-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Phone className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Emergency Legal Contacts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get immediate help from lawyers, legal aid services, and emergency helplines
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location (e.g., Mumbai, Delhi)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {contactCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchFilteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {contact.name}
                    </h3>
                    {contact.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {contact.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {contact.description}
                  </p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {contact.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {contact.availability}
                      </span>
                    </div>

                    {contact.specialization && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {contact.specialization.map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {contact.consultationFee && (
                    <div className="mb-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        Consultation Fee: 
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400 ml-1">
                        {contact.consultationFee}
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleCall(contact.phone)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </Button>
                    
                    {contact.website && (
                      <Button
                        variant="outline"
                        onClick={() => handleWebsite(contact.website)}
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Emergency Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Emergency Situation Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Immediate Danger
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Call 100 for police immediately. If possible, record evidence and stay in a safe location.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Legal Consultation
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  For non-emergency legal matters, contact legal aid services or private lawyers during business hours.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Document Everything
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Keep records of incidents, take photos if safe, and maintain copies of all legal documents.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyContacts;
