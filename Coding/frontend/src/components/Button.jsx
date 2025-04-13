import React from 'react';

const Button = ({ children, variant = 'pink', size = 'md', className = '', ...props }) => {
  // Base styles for all buttons
  const baseStyles =
    'rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors';

  // Size variants
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg',
  };

  // Color variants
  const variantStyles = {
    pink: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    red: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
  };

  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
