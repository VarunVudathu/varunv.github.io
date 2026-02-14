
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const YesNoButtons = ({ onYes }) => {
  const [noBtnState, setNoBtnState] = useState({
    top: 'auto',
    left: 'auto',
    position: 'relative',
    scale: 1,
    text: 'No'
  });
  const [yesScale, setYesScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showFunnyText, setShowFunnyText] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const noTexts = [
    "Are you sure?", "Really sure?", "Think again!", "Last chance!", "Surely not?",
    "You might regret this!", "Give it another thought!", "Are you absolutely certain?",
    "This could be a mistake!", "Have a heart!", "Don't be so cold!", "Change of heart?",
    "Wouldn't you reconsider?", "Is that your final answer?", "You're breaking my heart ;(",
  ];

  const handleNoAction = () => {
    if (isMobile) {
      setYesScale(prev => prev + 0.3);
      const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
      setNoBtnState(prev => ({
        ...prev,
        scale: Math.max(0.6, prev.scale * 0.8),
        text: randomText
      }));
    } else {
      // Desktop: just move it if clicked somehow
      moveNoButton();
    }
  };

  const moveNoButton = () => {
    if (isMobile) return;

    if (!timerStarted) {
      setTimerStarted(true);
      setTimeout(() => {
        setShowFunnyText(true);
      }, 5000);
    }

    // "Glitchy" / Teleport logic: Pick a random spot on viewport
    // Using fixed positioning to jump anywhere
    const newX = Math.random() * (window.innerWidth - 150);
    const newY = Math.random() * (window.innerHeight - 100);

    setNoBtnState(prev => ({
      ...prev,
      position: 'fixed',
      left: newX,
      top: newY,
    }));
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 relative w-full p-4">
      <div className="flex gap-8 items-center justify-center w-full">
        <motion.button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 cursor-pointer rounded-full shadow-lg text-2xl transition-colors border-b-4 border-green-700 active:border-b-0 active:translate-y-1 z-10"
          style={{ scale: yesScale }}
          onClick={onYes}
          whileHover={{ scale: yesScale * 1.1 }}
          whileTap={{ scale: yesScale * 0.9 }}
        >
          Yes! 💖
        </motion.button>

        {/* Only render No button in flex container if it's NOT fixed */}
        {noBtnState.position !== 'fixed' && (
          <motion.div
            style={{ position: 'relative' }} // Wrapper to keep layout flow initially
          >
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl whitespace-nowrap border-b-4 border-red-700"
              style={{
                position: noBtnState.position,
                top: noBtnState.top,
                left: noBtnState.left,
                scale: noBtnState.scale,
                zIndex: 50,
              }}
              onMouseEnter={moveNoButton}
              onClick={handleNoAction}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {noBtnState.text}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Render the No button here if it is fixed, so it doesn't take up space in the layout */}
      {noBtnState.position === 'fixed' && (
        <motion.button
          key="no-btn-fixed"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl whitespace-nowrap border-b-4 border-red-700 z-50"
          style={{
            position: noBtnState.position,
            top: noBtnState.top,
            left: noBtnState.left,
            scale: noBtnState.scale,
          }}
          onMouseEnter={moveNoButton}
          onClick={handleNoAction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {noBtnState.text}
        </motion.button>
      )}

      {showFunnyText && (
        <div className="mt-4 text-xl font-bold text-gray-700 whitespace-nowrap z-0">
          I guess you only have one choice now hehe
        </div>
      )}
    </div>
  );
};

export default YesNoButtons;

