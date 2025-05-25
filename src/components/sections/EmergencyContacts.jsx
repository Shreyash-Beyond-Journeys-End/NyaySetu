import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Loader, Search as SearchIcon, Scale, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const cityList = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

const EmergencyContacts = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // National and city-based helplines
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
      'Kolkata': [
        { name: 'West Bengal Legal Aid', number: '+91-33-2248-8400', hours: '10 AM - 5 PM' }
      ],
      'Hyderabad': [
        { name: 'Telangana Legal Aid', number: '+91-40-2323-3677', hours: '10 AM - 5 PM' }
      ],
      'default': [
        { name: 'National Legal Aid Helpline', number: '15100', hours: '24/7' },
        { name: 'Tele-Law Services', number: '9999999999', hours: '9 AM - 6 PM' }
      ]
    }
  };

  // Geolocation and city mapping
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationLoading(false);
        },
        (error) => {
          setLocationLoading(false);
          toast.error('Unable to get your location. Please select manually.');
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      // Approximate city mapping
      const { latitude, longitude } = location;
      if (latitude >= 28 && latitude <= 29 && longitude >= 76 && longitude <= 78) setCity('Delhi');
      else if (latitude >= 18 && latitude <= 20 && longitude >= 72 && longitude <= 73) setCity('Mumbai');
      else if (latitude >= 12 && latitude <= 14 && longitude >= 77 && longitude <= 78) setCity('Bangalore');
      else if (latitude >= 13 && latitude <= 14 && longitude >= 79 && longitude <= 81) setCity('Chennai');
      else if (latitude >= 22 && latitude <= 23 && longitude >= 88 && longitude <= 89) setCity('Kolkata');
      else if (latitude >= 17 && latitude <= 18 && longitude >= 78 && longitude <= 79) setCity('Hyderabad');
      else setCity('');
    }
  }, [location]);

  const getLegalContacts = () => {
    if (search) {
      // Search by city or keyword
      const cityKey = cityList.find(c => c.toLowerCase() === search.toLowerCase());
      if (cityKey && emergencyNumbers.legal[cityKey]) return emergencyNumbers.legal[cityKey];
      // Search in all contacts
      let allContacts = [];
      Object.values(emergencyNumbers.legal).forEach(arr => { if (Array.isArray(arr)) allContacts = allContacts.concat(arr); });
      return allContacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.number.includes(search)
      );
    }
    if (city && emergencyNumbers.legal[city]) return emergencyNumbers.legal[city];
    return emergencyNumbers.legal.default;
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
    toast.success(`Calling ${number}`);
  };

  // Filter national numbers by search
  const filteredNational = search
    ? emergencyNumbers.national.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.number.includes(search)
      )
    : emergencyNumbers.national;

  return (
    <section id="emergency" className="py-20 px-4 bg-gradient-to-b from-red-50 to-white dark:from-red-900/10 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -inset-2 bg-red-100 dark:bg-red-900/30 rounded-full blur-lg"
            />
            <Phone className="h-16 w-16 text-red-600 dark:text-red-400 relative" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('emergency.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('emergency.subtitle')}
          </p>
        </motion.div>

        {/* Search/Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('emergency.search_placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {locationLoading ? (
                <Loader className="h-5 w-5 text-red-500 animate-spin" />
              ) : (
                <MapPin className="h-5 w-5 text-red-500" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">
                {locationLoading 
                  ? t('emergency.searching')
                  : city 
                    ? `${t('emergency.detected')}: ${city}` 
                    : t('emergency.location_error')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* National Emergency Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Phone className="h-6 w-6 text-red-500 mr-3" />
            {t('emergency.national_title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNational.map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                  <div className="flex flex-col h-full">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                      {contact.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {contact.number}
                      </p>
                      <Button
                        onClick={() => handleCall(contact.number)}
                        className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                        size="sm"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {t('emergency.call_button')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Local Legal Aid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Scale className="h-6 w-6 text-blue-500 mr-3" />
            {t('emergency.legal_aid_title')}
            {city && (
              <span className="ml-3 text-lg font-normal text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {city}
              </span>
            )}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getLegalContacts().map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {contact.name}
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          {contact.hours}
                        </p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {contact.number}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleCall(contact.number)}
                      variant="outline"
                      className="ml-4 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {t('emergency.call_button')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyContacts;
