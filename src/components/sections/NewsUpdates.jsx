import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Calendar, 
  ExternalLink, 
  Filter, 
  Clock,
  TrendingUp,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

const NewsUpdates = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { speak } = useTextToSpeech();

  const newsCategories = [
    { id: 'all', name: 'All News' },
    { id: 'new-laws', name: 'New Laws' },
    { id: 'court-rulings', name: 'Court Rulings' },
    { id: 'amendments', name: 'Amendments' },
    { id: 'women-rights', name: "Women's Rights" },
    { id: 'labor-law', name: 'Labor Law' }
  ];

  const legalNews = [
    {
      id: 1,
      title: 'Supreme Court Strengthens Protection Against Domestic Violence',
      summary: 'SC expands definition of domestic violence to include economic abuse and emotional harassment in landmark judgment.',
      category: 'court-rulings',
      date: '2025-05-20',
      readTime: '5 min read',
      importance: 'high',
      source: 'Supreme Court of India',
      impact: 'Will benefit millions of women across India',
      details: 'The Supreme Court has broadened the scope of domestic violence to include economic deprivation and emotional abuse, making it easier for women to seek legal protection. This judgment will help prosecute cases where physical violence is not present but other forms of abuse occur.',
      tags: ['Domestic Violence', 'Women Rights', 'Supreme Court']
    },
    {
      id: 2,
      title: 'New Labor Code 2025: Enhanced Worker Protection',
      summary: 'Parliament passes comprehensive labor reform bill with stronger provisions for gig workers and minimum wage guarantees.',
      category: 'new-laws',
      date: '2025-05-18',
      readTime: '8 min read',
      importance: 'high',
      source: 'Parliament of India',
      impact: 'Affects over 50 crore workers nationwide',
      details: 'The new Labor Code 2025 introduces universal minimum wage, mandatory health insurance for all workers including gig economy workers, and stronger penalties for labor law violations. Platform workers like delivery partners and cab drivers will now have formal employment rights.',
      tags: ['Labor Law', 'Gig Workers', 'Minimum Wage']
    },
    {
      id: 3,
      title: 'Consumer Protection Act Amendment: Faster Dispute Resolution',
      summary: 'New amendments mandate online dispute resolution mechanism for consumer complaints under ₹20 lakhs.',
      category: 'amendments',
      date: '2025-05-15',
      readTime: '4 min read',
      importance: 'medium',
      source: 'Ministry of Consumer Affairs',
      impact: 'Speeds up resolution for 80% of consumer cases',
      details: 'The amendment introduces mandatory online mediation for consumer disputes valued under ₹20 lakhs, with a target resolution time of 60 days. Consumers can now file complaints digitally and track progress online.',
      tags: ['Consumer Rights', 'Digital Justice', 'Amendment']
    },
    {
      id: 4,
      title: 'High Court Rules on Property Rights for Daughters',
      summary: 'Delhi High Court confirms equal inheritance rights for daughters in ancestral property regardless of when father died.',
      category: 'court-rulings',
      date: '2025-05-12',
      readTime: '6 min read',
      importance: 'high',
      source: 'Delhi High Court',
      impact: 'Clarifies property rights for millions of women',
      details: 'The Delhi High Court has ruled that daughters have equal rights in ancestral property irrespective of whether their father died before or after the 2005 amendment to the Hindu Succession Act. This judgment provides clarity on a contentious legal issue.',
      tags: ['Property Rights', 'Women Rights', 'Inheritance']
    },
    {
      id: 5,
      title: 'RTI Amendment: Faster Information Access',
      summary: 'Government reduces RTI response time from 30 days to 15 days for urgent matters.',
      category: 'amendments',
      date: '2025-05-10',
      readTime: '3 min read',
      importance: 'medium',
      source: 'Central Information Commission',
      impact: 'Improves government transparency',
      details: 'The Right to Information Act has been amended to provide faster responses for urgent matters. Matters related to life and liberty must now be responded to within 15 days instead of the earlier 30-day deadline.',
      tags: ['RTI', 'Government Transparency', 'Public Rights']
    },
    {
      id: 6,
      title: 'Workplace Sexual Harassment: Stricter Penalties Introduced',
      summary: 'New guidelines mandate faster investigation and higher compensation for workplace harassment victims.',
      category: 'new-laws',
      date: '2025-05-08',
      readTime: '7 min read',
      importance: 'high',
      source: 'Ministry of Women and Child Development',
      impact: 'Enhances workplace safety for women',
      details: 'The updated guidelines under the Sexual Harassment of Women at Workplace Act mandate completion of investigations within 60 days and increase minimum compensation amounts. Companies failing to comply face higher penalties.',
      tags: ['Workplace Safety', 'Women Rights', 'Sexual Harassment']
    },
    {
      id: 7,
      title: 'Digital Evidence Admissibility: New Legal Framework',
      summary: 'Supreme Court establishes comprehensive guidelines for accepting digital evidence in courts.',
      category: 'court-rulings',
      date: '2025-05-05',
      readTime: '5 min read',
      importance: 'medium',
      source: 'Supreme Court of India',
      impact: 'Modernizes evidence law for digital age',
      details: 'The Supreme Court has issued detailed guidelines on how digital evidence including WhatsApp messages, emails, and social media posts can be presented and verified in courts. This addresses the growing need for digital evidence in modern litigation.',
      tags: ['Digital Evidence', 'Court Procedures', 'Technology Law']
    },
    {
      id: 8,
      title: 'Free Legal Aid Expansion: Coverage Doubled',
      summary: 'Government expands free legal aid eligibility criteria to cover more economically disadvantaged citizens.',
      category: 'new-laws',
      date: '2025-05-02',
      readTime: '4 min read',
      importance: 'medium',
      source: 'National Legal Services Authority',
      impact: 'Doubles the number of eligible beneficiaries',
      details: 'The eligibility criteria for free legal aid has been expanded to include families with annual income up to ₹5 lakhs (increased from ₹2 lakhs). This change will help more middle-class families access legal services.',
      tags: ['Legal Aid', 'Access to Justice', 'Legal Services']
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? legalNews 
    : legalNews.filter(news => news.category === selectedCategory);

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    }
  };

  const speakNews = (news) => {
    const text = `${news.title}. ${news.summary}. Published on ${news.date}. Impact: ${news.impact}.`;
    speak(text);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
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
          <Newspaper className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Latest Legal Updates
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed about new laws, court rulings, and legal developments that affect your rights
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {newsCategories.map((category) => (
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

        {/* Featured News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6" />
              <span className="font-semibold">Featured News</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {legalNews[0].title}
            </h3>
            <p className="text-indigo-100 mb-4">
              {legalNews[0].summary}
            </p>
            <div className="flex items-center space-x-4 text-sm text-indigo-200">
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(legalNews[0].date)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{legalNews[0].readTime}</span>
              </span>
            </div>
          </Card>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.slice(1).map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImportanceColor(news.importance)}`}>
                      {news.importance === 'high' && <AlertCircle className="inline h-3 w-3 mr-1" />}
                      {news.importance.toUpperCase()}
                    </span>
                    <button
                      onClick={() => speakNews(news)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {news.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {news.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {news.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(news.date)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{news.readTime}</span>
                      </span>
                    </div>
                    <div className="mt-1 text-blue-600 dark:text-blue-400">
                      Impact: {news.impact}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 text-center bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated with Legal News
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get weekly updates on important legal developments delivered to your phone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
              <Button>Subscribe</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsUpdates;
