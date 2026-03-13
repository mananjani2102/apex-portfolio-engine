import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

const ShowcaseSection = () => {
  const { dispatch } = useApp();
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean lines, focused content',
      primaryColor: '#8a65ff',
      secondaryColor: '#38bdf8',
      preview: {
        header: 'Sarah Chen',
        title: 'Senior Product Designer',
        skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
        experience: 'Google, Meta, Airbnb'
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate polish, executive presence',
      primaryColor: '#3b82f6',
      secondaryColor: '#6366f1',
      preview: {
        header: 'Marcus Rodriguez',
        title: 'Engineering Manager',
        skills: ['System Design', 'Team Leadership', 'Agile'],
        experience: 'Microsoft, Amazon, Stripe'
      }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold expression, artistic flair',
      primaryColor: '#ec4899',
      secondaryColor: '#f97316',
      preview: {
        header: 'Elena Popov',
        title: 'Brand Designer',
        skills: ['Branding', 'Motion Design', 'Illustration'],
        experience: 'Netflix, Spotify, Nike'
      }
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Developer-focused, code-inspired',
      primaryColor: '#10b981',
      secondaryColor: '#06b6d4',
      preview: {
        header: 'David Kim',
        title: 'Full-Stack Developer',
        skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        experience: 'Stripe, GitHub, Vercel'
      }
    }
  ];

  const active = templates[activeTemplate];

  return (
    <section id="showcase" className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-full mb-6"
          >
            Portfolio Templates
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6">
            <span className="text-white">Choose Your</span>{' '}
            <span className="text-gradient">Style</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four professionally designed templates, each crafted for different industries
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-4">
              {templates.map((template, index) => (
                <motion.button
                  key={template.id}
                  onClick={() => setActiveTemplate(index)}
                  whileHover={{ x: 8 }}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    activeTemplate === index
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})` }}
                    >
                      {template.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-400">{template.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: activeTemplate === index ? 90 : 0 }}
                      className="text-gray-400"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: 'builder' })}
              className="w-full mt-8 py-5 px-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl text-lg font-semibold text-white flex items-center justify-center gap-3 shadow-high hover:shadow-glow-primary transition-all duration-300"
            >
              <span>Start with {active.name} Template</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-colors duration-500"
                style={{ background: `linear-gradient(135deg, ${active.primaryColor}40, ${active.secondaryColor}40)` }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTemplate}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-dark-800 rounded-3xl overflow-hidden border border-white/10"
                >
                  <div
                    className="h-2"
                    style={{ background: `linear-gradient(90deg, ${active.primaryColor}, ${active.secondaryColor})` }}
                  />

                  <div className="p-8">
                    <div className="flex items-start gap-6 mb-8">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                        style={{ background: `linear-gradient(135deg, ${active.primaryColor}, ${active.secondaryColor})` }}
                      >
                        {active.preview.header.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{active.preview.header}</h3>
                        <p className="text-gray-400">{active.preview.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{active.preview.experience}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {active.preview.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                              style={{ background: `${active.primaryColor}30`, borderColor: `${active.primaryColor}50` }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${active.primaryColor}, ${active.secondaryColor})` }}
                          />
                        </div>
                        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '70%' }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${active.primaryColor}, ${active.secondaryColor})` }}
                          />
                        </div>
                        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '90%' }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${active.primaryColor}, ${active.secondaryColor})` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ y: isHovering ? -5 : 0 }}
                    className="absolute bottom-4 right-4 flex items-center gap-2 text-sm text-gray-500"
                  >
                    <span>Live Preview</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
