import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

const CTASection = () => {
  const { dispatch } = useApp();
  const sectionRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleStartBuilding = () => {
    dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
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

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-[120px]"
        />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-30" />

          <div className="relative bg-dark-800/80 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-h2 lg:text-h1 font-bold mb-4">
                <span className="text-gradient">Ready to Build</span>{' '}
                <span className="text-white">Your Portfolio?</span>
              </h2>

              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
                Paste your resume text or upload your PDF—your portfolio will be ready in seconds.
              </p>

              {/* Input Area */}
              <div
                className={`relative rounded-2xl border-2 transition-all duration-300 max-w-xl mx-auto mb-8 ${
                  isDragging
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-white/10 bg-dark-900/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-28 p-4 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none rounded-2xl text-sm"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>or drop PDF</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartBuilding}
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:shadow-glow-primary transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Generate</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Instant generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Any resume format</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>ATS-optimized output</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
