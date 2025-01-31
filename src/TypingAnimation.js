import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, speed = 100 }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const typeText = () => {
      for (let i = 0; i <= text.length; i++) {
        setTimeout(() => {
          setTypedText(text.slice(0, i));
        }, i * speed);
      }
    };

    typeText();
  }, [text, speed]);

  return <div>{typedText}</div>;
};

export default TypingAnimation;
