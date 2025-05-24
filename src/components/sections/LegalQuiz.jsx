import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  Volume2,
  Star,
  Award,
  Target
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

const LegalQuiz = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { speak } = useTextToSpeech();

  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum age for marriage for women in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      correctAnswer: 1,
      explanation: "The legal minimum age for marriage for women in India is 18 years as per the Prohibition of Child Marriage Act, 2006.",
      category: "Family Law",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Under which act can a woman file a complaint for domestic violence?",
      options: [
        "Indian Penal Code, 1860", 
        "Protection of Women from Domestic Violence Act, 2005",
        "Criminal Procedure Code, 1973",
        "Indian Evidence Act, 1872"
      ],
      correctAnswer: 1,
      explanation: "The Protection of Women from Domestic Violence Act, 2005 specifically deals with domestic violence cases and provides comprehensive protection to women.",
      category: "Women's Rights",
      difficulty: "Medium"
    },
    {
      id: 3,
      question: "What is the maximum working hours per day for an adult worker as per the Factories Act?",
      options: ["8 hours", "9 hours", "10 hours", "12 hours"],
      correctAnswer: 1,
      explanation: "According to the Factories Act, 1948, the maximum working hours for an adult worker should not exceed 9 hours per day.",
      category: "Labor Law",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "Within how many days should a consumer complaint be filed?",
      options: ["1 year", "2 years", "3 years", "No time limit"],
      correctAnswer: 1,
      explanation: "Consumer complaints must be filed within 2 years from the date of purchase or when the cause of action arose, as per the Consumer Protection Act.",
      category: "Consumer Rights",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "Which article of the Indian Constitution guarantees the Right to Equality?",
      options: ["Article 12", "Article 14", "Article 19", "Article 21"],
      correctAnswer: 1,
      explanation: "Article 14 of the Indian Constitution guarantees the Right to Equality before law and equal protection of laws.",
      category: "Constitutional Rights",
      difficulty: "Hard"
    },
    {
      id: 6,
      question: "What is the punishment for dowry harassment under Section 498A of IPC?",
      options: [
        "Fine only", 
        "Imprisonment up to 3 years and fine",
        "Imprisonment up to 7 years and fine", 
        "Life imprisonment"
      ],
      correctAnswer: 1,
      explanation: "Section 498A of IPC prescribes imprisonment up to 3 years and fine for dowry harassment.",
      category: "Criminal Law",
      difficulty: "Hard"
    },
    {
      id: 7,
      question: "RTI (Right to Information) application should be replied within how many days?",
      options: ["15 days", "30 days", "45 days", "60 days"],
      correctAnswer: 1,
      explanation: "RTI applications should be replied within 30 days as per the Right to Information Act, 2005.",
      category: "Public Rights",
      difficulty: "Medium"
    },
    {
      id: 8,
      question: "What is the current minimum wage per day for agricultural workers (approximate)?",
      options: ["₹150", "₹200", "₹300", "₹400"],
      correctAnswer: 2,
      explanation: "The minimum wage varies by state, but it's approximately ₹300 per day for agricultural workers in most states.",
      category: "Labor Law",
      difficulty: "Medium"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    setUserAnswers([...userAnswers, {
      questionId: quizQuestions[currentQuestion].id,
      selectedAnswer,
      isCorrect,
      question: quizQuestions[currentQuestion].question
    }]);

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error('Incorrect. Try again next time!');
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const speakQuestion = () => {
    const question = quizQuestions[currentQuestion];
    const text = `${question.question} Option A: ${question.options[0]}. Option B: ${question.options[1]}. Option C: ${question.options[2]}. Option D: ${question.options[3]}.`;
    speak(text);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You have great legal knowledge!", emoji: "🏆", color: "text-green-600" };
    if (percentage >= 60) return { message: "Good job! Keep learning more about your rights.", emoji: "👍", color: "text-blue-600" };
    if (percentage >= 40) return { message: "Not bad! There's room for improvement.", emoji: "📚", color: "text-yellow-600" };
    return { message: "Keep studying! Legal knowledge is important.", emoji: "💪", color: "text-red-600" };
  };

  const currentQ = quizQuestions[currentQuestion];

  if (quizCompleted) {
    const scoreData = getScoreMessage();
    
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="p-8">
              <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Quiz Completed! {scoreData.emoji}
              </h2>
              
              <div className="text-6xl font-bold mb-4">
                <span className={scoreData.color}>{score}</span>
                <span className="text-gray-400">/{quizQuestions.length}</span>
              </div>
              
              <p className={`text-xl mb-6 ${scoreData.color}`}>
                {scoreData.message}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {score}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Correct Answers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {quizQuestions.length - score}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    To Improve
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restartQuiz} className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Take Quiz Again</span>
                </Button>
                <Button variant="outline">
                  Share Results
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <BookOpen className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Legal Awareness Quiz
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Test your knowledge of Indian laws and constitutional rights
          </p>
        </motion.div>

        <Card className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Score: {score}/{currentQuestion}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                    {currentQ.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                    {currentQ.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {currentQ.question}
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={speakQuestion}
                className="ml-4"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  } ${
                    showResult && index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : ''
                  } ${
                    showResult && selectedAnswer === index && index !== currentQ.correctAnswer
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                      : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                    {showResult && index === currentQ.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700"
              >
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Explanation:
                </h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {currentQ.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showResult}
              className="px-8"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LegalQuiz;
