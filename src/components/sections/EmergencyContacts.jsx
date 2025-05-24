import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Search, Filter, Loader } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/appStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const EmergencyContacts = () => {
  const { t } = useTranslation();
  const { userLocation, setUserLocation } = useAppStore();
  const [selectedState, setSelectedState] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const states = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const emergencyNumbers = {
    national: [
      { name: 'Police Emergency', number: '100', description: 'For immediate police assistance' },
      { name: 'Fire Emergency', number: '101', description: 'Fire department emergency' },
      { name: 'Ambulance', number: '108', description: 'Medical emergency services' },
      { name: 'Women Helpline', number: '1091', description: 'Women in distress helpline' },
      { name: 'Child Helpline', number: '1098', description: 'Child protection services' },
      { name: 'Senior Citizen Helpline', number: '14567', description: 'Support for senior citizens' }
    ],
    legal: {
      'Delhi': [
        { name: 'Delhi Legal Aid', number: '+91-11-2338-7379', hours: '9 AM - 6 PM' },
        { name: 'Delhi High Court Legal Aid', number: '+91-11-2393-9944', hours: '10 AM - 5 PM' }
      ],
      'Mumbai': [
        { name: 'Mumbai Legal Aid', number: '+91-22-2672-3415', hours: '10 AM - 5 PM' },
        { name: 'Bombay High Court Legal Aid', number: '+91-22-2266-1612', hours: '10 AM - 4 PM' }
      ],
      'Bangalore': [
        { name: 'Karnataka State Legal Aid', number: '+91-80-2221-4917', hours: '9 AM - 5 PM' },
        { name: 'High Court Legal Aid', number: '+91-80-2221-4918', hours: '10 AM - 4 PM' }
      ],
      'Chennai': [
        { name: 'Tamil Nadu Legal Aid', number: '+91-44-2851-4516', hours: '9 AM - 5 PM' },
        { name: 'Madras High Court Legal Aid', number: '+91-44-2851-4517', hours: '10 AM - 4 PM' }
      ],
      'default': [
        { name: 'National Legal Aid Helpline', number: '15100', hours: '24/7' },
        { name: 'Tele-Law Services', number: '9999999999', hours: '9 AM - 6 PM' }
      ]
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          // You would typically reverse geocode here to get city/state
          setLocationLoading(false);
          toast.success('Location detected successfully');
        },
        (error) => {
          console.error('Location error:', error);
          setLocationLoading(false);
          toast.error('Unable to get your location. Please select manually.');
        }
      );
    } else {
      setLocationLoading(false);
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
    toast.success(`Calling ${number}`);
  };

  const getLegalContacts = () => {
    return emergencyNumbers.legal[selectedState] || emergencyNumbers.legal.default;
  };

  return (
    <section id="emergency" className="py-20 px-4 bg-red-50 dark:bg-red-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Phone className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('emergency.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get immediate help with emergency services and legal aid
          </p>
        </motion.div>

        {/* Location Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Your Location for Local Legal Aid
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={getCurrentLocation}
                disabled={locationLoading}
                variant="outline"
                className="flex items-center space-x-2"
              >
                {locationLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span>Auto-Detect Location</span>
              </Button>
              
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select your city</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </Card>
        </motion.div>

        {/* National Emergency Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            National Emergency Numbers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyNumbers.national.map((contact, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {contact.description}
                    </p>
                    <p className="text-lg font-bold text-red-600">{contact.number}</p>
                  </div>
                  <Button
                    onClick={() => handleCall(contact.number)}
                    className="bg-red-600 hover:bg-red-700 ml-4"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Local Legal Aid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Legal Aid Services
            {selectedState && (
              <span className="text-lg font-normal text-blue-600 ml-2">
                in {selectedState}
              </span>
            )}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getLegalContacts().map((contact, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {contact.name}
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <p>Hours: {contact.hours}</p>
                      <p className="font-medium text-blue-600">{contact.number}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(contact.number)}
                    variant="outline"
                    className="ml-4"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Emergency Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Emergency Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  🚨 Immediate Danger
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Call 100 for police immediately. Stay in a safe location and follow police instructions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  ⚖️ Legal Emergency
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Contact legal aid services during business hours or call the 24/7 helpline for urgent matters.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  📋 Important Tips
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Keep important documents safe, record incidents when possible, and always prioritize your safety.
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
