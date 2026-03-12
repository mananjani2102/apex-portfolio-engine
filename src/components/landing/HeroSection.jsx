import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import ParticleCanvas from '../../utils/ParticleCanvas';
import Hero3DScene from '../../utils/Hero3DScene';

const HeroSection = () => {
  const { dispatch } = useApp();
  const sectionRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const wordVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(12px)', scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: i * 0.08,
      },
    }),
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const highlights = [
    { icon: '⚡', text: 'Instant Generation' },
    { icon: '📄', text: 'Any Resume Format' },
    { icon: '✓', text: 'ATS-Optimized Output' },
  ];

  const handleStartBuilding = () => {
    dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
  };

  const handlePasteAndGenerate = () => {
    if (inputText.trim()) {
      dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center"
    >
      <ParticleCanvas />
      <Hero3DScene />

      <div className="absolute inset-0 z-[2]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/5 rounded-full blur-[150px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col items-center text-center">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-primary-500/30 backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-gray-200 tracking-wide">
                  AI-Powered Portfolio Builder
                </span>
              </div>
            </motion.div>

            <h1 className="font-serif font-bold leading-[1.1] tracking-tight mb-6">
              <div className="flex flex-col items-center gap-2 sm:gap-4">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                  {['Paste.', 'Generate.'].map((word, i) => (
                    <motion.span
                      key={word}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                      className="text-display text-gradient drop-shadow-2xl"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                  {['Land', 'Jobs.'].map((word, i) => (
                    <motion.span
                      key={word}
                      custom={i + 2}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                      className="text-display text-outline drop-shadow-2xl"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>
            </h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              transition={{ delay: 0.6 }}
              className="max-w-2xl text-lg sm:text-xl text-gray-300 mb-10 text-balance leading-relaxed"
            >
              Paste your resume text or upload your PDF—our AI builds a stunning,
              <span className="text-gradient font-semibold"> ATS-optimized portfolio</span> in seconds.
              Zero design skills needed.
            </motion.p>

            {/* Input Area */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              transition={{ delay: 0.75 }}
              className="w-full max-w-2xl mb-10"
            >
              <div
                className={`relative rounded-2xl border-2 transition-all duration-300 ${
                  isDragging
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-white/10 bg-dark-800/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-32 p-5 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none rounded-2xl text-sm"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>or drop PDF here</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePasteAndGenerate}
                    disabled={!inputText.trim()}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      inputText.trim()
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:shadow-glow-primary'
                        : 'bg-white/10 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Generate Portfolio</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <p className="text-center text-gray-500 text-sm mt-3">
                or{' '}
                <button
                  onClick={handleStartBuilding}
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                >
                  start from scratch
                </button>
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-10"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 cursor-pointer"
        onClick={() => scrollToSection('features')}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"
          />
        </motion.div>
        <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">Scroll to explore</span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-[3] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
