import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const Envelope = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [flapZIndex, setFlapZIndex] = useState(40); // Initial high z-index

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Wait for flap to open (0.5s) + card to slide out (0.8s) + nice long pause
        setTimeout(() => setFlapZIndex(0), 900); // Manually change z-index after 0.9s
        setTimeout(() => onOpen?.(), 2500);
    };

    const stroke = "#1f2937"; // gray-800-ish
    const paper = "#ffffff";

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {/* Background/Sparkles from user's code */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100" />

            <motion.div
                className="relative w-[360px] h-[250px] sm:w-[700px] sm:h-[500px] select-none perspective-[1000px]"
                initial={{ scale: 0.9, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                {/* 1. Envelope Back (Behind everything) */}
                <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 560 390" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="paperBack" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#ffffff" />
                                <stop offset="1" stopColor="#fff1f2" />
                            </linearGradient>
                        </defs>
                        <rect
                            x="18" y="28" width="517" height="334" rx="0"
                            fill="url(#paperBack)" stroke={stroke} strokeWidth="3"
                        />
                    </svg>
                </div>

                {/* 2. The Letter/Card (Slides out from middle) */}
                <motion.div
                    className="absolute left-[7%] right-[7%] h-[80%] bottom-0 bg-white rounded-xl shadow-sm border border-rose-100 flex flex-col items-center justify-start pt-6 overflow-hidden z-10"
                    initial={{ y: "20%", opacity: 0 }} // Starts lowered (hidden behind pocket/flap)
                    animate={isOpen ? { y: "-50%", opacity: 1, zIndex: 25 } : { y: "20%", opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }} // Syncs with flap opening
                >
                    <div className="w-full text-center text-rose-500 font-bold text-xl sm:text-2xl font-comic">
                        A Special Letter For You ❤️
                    </div>
                    <div className="mt-4 w-3/4 h-2 bg-rose-50 rounded" />
                    <div className="mt-2 w-1/2 h-2 bg-rose-50 rounded" />
                    <div className="mt-4 w-3/4 h-2 bg-rose-50 rounded" />
                    <div className="mt-2 w-1/2 h-2 bg-rose-50 rounded" />
                    <div className="mt-4 w-3/4 h-2 bg-rose-50 rounded" />
                    <div className="mt-2 w-1/2 h-2 bg-rose-50 rounded" />
                </motion.div>

                {/* 3. Envelope Front Pocket (Covers the bottom of the letter) */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 560 390" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="paperFront" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#fff7f8" />
                                <stop offset="1" stopColor="#ffffff" />
                            </linearGradient>
                        </defs>
                        {/* Pocket path with corrected rounded bottom corners */}
                        <path
                            d="M 18 50 L 277 184 L 535 50 L 535 362 L 18 362 Z"
                            fill="url(#paperFront)" stroke={stroke} strokeWidth="3" strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* 4. Top Flap (Starts on top of simple Front, rotates up) */}
                {/* Positioned exactly at the fold line (y=28 relative to 390) */}
                <motion.div
                    className="absolute left-0 right-0 h-[55%] z-30 origin-top"
                    style={{ top: '7.18%' }}
                    initial={{ rotateX: 0 }}
                    animate={isOpen ? { rotateX: 180, zIndex: flapZIndex } : { rotateX: 0, zIndex: 40 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                    }}
                >
                    <svg className="w-full h-full" viewBox="0 0 560 220" preserveAspectRatio="none">
                        {/* Flap starts at y=0 inside this div, matching y=28 of container */}
                        <path
                            d="M 43 55 C 18 33 18 16 18 0 L 535 0 C 535 16 535 33 510 55 L 280 200 Z"
                            fill="#ffffff" stroke={stroke} strokeWidth="3" strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>

                {/* Sticker */}
                {!isOpen && (
                    <motion.div
                        className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer text-6xl drop-shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                    >
                        ❤️
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Envelope;