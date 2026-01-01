import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef(null);

  const handleSliderChange = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full mb-6"
          >
            AI Magic
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6">
            <span className="text-white">What You Paste</span>{' '}
            <span className="text-gradient">→ What AI Creates</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See the transformation from raw text to polished portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            ref={sliderRef}
            onMouseMove={handleSliderChange}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              handleSliderChange({ clientX: touch.clientX });
            }}
            className="relative aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10"
          >
            {/* Before - Raw Text */}
            <div className="absolute inset-0 bg-dark-800">
              <div className="absolute inset-0 p-4 md:p-8">
                <div className="h-full bg-dark-900 rounded-xl p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden border border-white/5">
                  <div className="text-gray-500 mb-4">// Your pasted resume text</div>
                  <div className="space-y-3 text-gray-400">
                    <p className="text-white font-semibold">JOHN DOE</p>
                    <p>Senior Software Developer</p>
                    <p className="text-gray-500">john.doe@email.com | (555) 123-4567</p>
                    <p className="mt-4">EXPERIENCE</p>
                    <p className="text-gray-500">Tech Corp Inc. - Senior Developer</p>
                    <p className="text-gray-500">2020 - Present</p>
                    <p className="text-gray-500 text-xs">- Led development of microservices...</p>
                    <p className="text-gray-500 text-xs">- Improved system performance by 40%...</p>
                    <p className="mt-4">SKILLS</p>
                    <p className="text-gray-500">React, Node.js, Python, AWS, Docker</p>
                    <p className="mt-4">EDUCATION</p>
                    <p className="text-gray-500">BS Computer Science - MIT, 2018</p>
                  </div>
                </div>
              </div>
            </div>

            {/* After - Portfolio */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0 p-4 md:p-8">
                <div className="h-full bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 rounded-xl p-4 md:p-6 border border-primary-500/20 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl">
                      JD
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg md:text-xl">John Doe</div>
                      <div className="text-primary-400 text-sm">Senior Software Developer</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Experience */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-white text-sm font-medium">Tech Corp Inc.</span>
                      <span className="text-gray-500 text-xs">2020 - Present</span>
                    </div>
                    <div className="pl-5 space-y-1">
                      <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                      <div className="h-1.5 w-4/5 bg-gradient-to-r from-primary-500/60 to-accent-500/60 rounded-full" />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mt-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span className="text-gray-400 text-xs">MIT - Computer Science</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Slider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-dark-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-dark-900/80 backdrop-blur rounded-lg text-gray-300 text-xs font-medium border border-white/10">
              Raw Resume Text
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg text-white text-xs font-medium">
              AI-Generated Portfolio
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            Drag the slider to see the transformation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
