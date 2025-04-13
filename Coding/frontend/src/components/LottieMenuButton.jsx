import React from 'react';
import Lottie from 'lottie-react';
import hamburgerAnimation from '../assets/animations/hamburger.json';
import closeAnimation from '../assets/animations/close.json';

const LottieMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      className="top-5 right-7 border border-gray-800 p-2 fixed rounded-lg hover:bg-gray-700 transition-colors"
      onClick={onClick}
    >
      <div className="w-6 h-6">
        <Lottie
          animationData={isOpen ? closeAnimation : hamburgerAnimation}
          loop={false}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </button>
  );
};

export default LottieMenuButton;
