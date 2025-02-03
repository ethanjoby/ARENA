import React, { useState, useEffect } from "react";

const TypingAnimation = ({ text, speed = 50, boldWords = [] }) => {
  const [typedText, setTypedText] = useState("");
  const [boldedText, setBoldedText] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (animationDone) return; // Prevent re-running animation once completed

    let i = 0;
    let charIndex = 0;

    const typeText = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        setTimeout(typeText, speed);
      } else {
        boldImportantWords();
      }
    };

    const boldImportantWords = () => {
      let interval = setInterval(() => {
        let words = text.split(" ").map((word) => {
          let cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
          if (boldWords.includes(cleanWord)) {
            let boldPart = `<b>${word.slice(0, charIndex)}</b>${word.slice(charIndex)}`;
            return boldPart;
          }
          return word;
        });

        setBoldedText(words.join(" "));
        charIndex++;

        if (charIndex > Math.max(...boldWords.map((w) => w.length))) {
          clearInterval(interval);
          setAnimationDone(true); // Prevent future reanimation
        }
      }, speed / 2); // Faster bolding effect
    };

    typeText();
  }, [text, speed, boldWords, animationDone]);

  return (
    <div className="text-left" dangerouslySetInnerHTML={{ __html: boldedText || typedText }} />
  );
};

export default TypingAnimation;
