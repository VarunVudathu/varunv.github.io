import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Envelope from './components/Envelope'
import Card from './components/Card'
import Success from './components/Success'

function App() {
  const [phase, setPhase] = useState('envelope') // 'envelope', 'card', 'success'

  const handleYes = () => {
    setPhase('success')
    confetti({
      particleCount: 150,
      spread: 100
    })
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-valentine-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffb6c1 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      ></div>

      {/* Floating Hearts - Gentle animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-10 left-10 text-2xl text-valentine-red opacity-60"
          animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >❤️</motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-4xl text-valentine-pink opacity-60"
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >💕</motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-3xl text-red-400 opacity-50"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >💖</motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/5 text-5xl text-red-300 opacity-40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >💗</motion.div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'envelope' && (
          <Envelope key="envelope" onOpen={() => setPhase('card')} />
        )}
        {phase === 'card' && (
          <Card key="card" onYes={handleYes} />
        )}
        {phase === 'success' && (
          <Success key="success" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
