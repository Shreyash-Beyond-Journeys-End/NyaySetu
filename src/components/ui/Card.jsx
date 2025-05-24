import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick, ...props }) => {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300";
  
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
