import { motion } from 'framer-motion';

const Success = () => {
    return (
        <motion.div
            className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-[90%] md:w-full text-center border-4 border-valentine-pink z-10 flex flex-col items-center justify-center m-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            <h1 className="text-5xl md:text-6xl font-bold text-valentine-red mb-16 animate-bounce drop-shadow-md">
                ❤️ YAY!! ❤️
            </h1>

            <div className="w-full aspect-video bg-valentine-bg rounded-2xl overflow-hidden shadow-inner mb-16">
                <img
                    src="/cat-kiss.gif"
                    alt="Cat Kissing"
                    className="w-full h-full object-cover"
                />
            </div>

            <p className="text-xl text-gray-700 font-semibold font-comic">
                So it's official. I've got the most beautiful Valentine. ☺️ Call me!
            </p>
        </motion.div>
    );
};

export default Success;
