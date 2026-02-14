import { motion } from 'framer-motion';
import YesNoButtons from './YesNoButtons';

const Card = ({ onYes }) => {
    return (
        <motion.div
            className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-[90%] md:w-full text-center border-4 border-valentine-pink z-10 flex flex-col items-center justify-center m-4"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold text-valentine-red mb-6 drop-shadow-sm font-comic">
                Hey Mahathi! ❤️
            </h1>

            <div className="mb-6 relative w-full aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-inner border-2 border-valentine-bg bg-valentine-bg flex items-center justify-center">
                <img
                    src="/cute-ask.gif"
                    alt="Cute Bear"
                    className="w-50% h-full"
                />
            </div>

            <h2 className="text-3xl font-bold text-gray-700 mb-8 font-comic">
                Will you be my Valentine? 🌹
            </h2>

            <p className="text-sm text-gray-500 mb-6 -mt-4">
                (I dare you to say no 😉)
            </p>

            <div className="w-full flex justify-center">
                <YesNoButtons onYes={onYes} />
            </div>
        </motion.div>
    );
};

export default Card;
