import { useApp } from '../context/AppContext';
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportToPDF, generatePDFFilename } from '../utils/pdfExporter';
import { motion } from 'framer-motion';

export default function PortfolioPreview() {
  const { state, dispatch } = useApp();
  const portfolio = state.generatedPortfolio;
  const userData = state.userData;

  const handleExport = async () => {
    const filename = generatePDFFilename(userData.personalInfo.name || 'Portfolio');
    try {
      await exportToPDF('portfolio-content', filename, dispatch);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Portfolio exported successfully!', type: 'success' }
      });
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Export failed. Please try again.', type: 'error' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: 'builder' })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Builder</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={state.uiState.isExporting}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {state.uiState.isExporting ? `Exporting... ${state.uiState.exportProgress}%` : 'Export PDF'}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <div id="portfolio-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-12 space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4" style={{ color: portfolio?.theme?.colors?.primary?.from || '#3b82f6' }}>
                {userData.personalInfo.name || 'Your Name'}
              </h1>
              {userData.personalInfo.title && (
                <p className="text-2xl text-gray-700 mb-2">{userData.personalInfo.title}</p>
              )}
              {userData.personalInfo.location && (
                <p className="text-gray-600">{userData.personalInfo.location}</p>
              )}
              <div className="flex items-center justify-center gap-4 mt-4">
                {userData.personalInfo.email && (
                  <a href={`mailto:${userData.personalInfo.email}`} className="text-gray-600 hover:text-gray-900">
                    {userData.personalInfo.email}
                  </a>
                )}
                {userData.personalInfo.phone && (
                  <span className="text-gray-600">{userData.personalInfo.phone}</span>
                )}
              </div>
            </div>

            {userData.skills.technical.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2" style={{ color: portfolio?.theme?.colors?.primary?.from || '#3b82f6' }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {userData.skills.technical.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {userData.workExperience.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2" style={{ color: portfolio?.theme?.colors?.primary?.from || '#3b82f6' }}>
                  Experience
                </h2>
                <div className="space-y-6">
                  {userData.workExperience.map((exp) => (
                    <div key={exp.id} className="border-l-4 pl-6" style={{ borderColor: portfolio?.theme?.colors?.primary?.from || '#3b82f6' }}>
                      <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                      {exp.company && (
                        <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
                      )}
                      {exp.description && (
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userData.projects.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2" style={{ color: portfolio?.theme?.colors?.primary?.from || '#3b82f6' }}>
                  Projects
                </h2>
                <div className="space-y-6">
                  {userData.projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-600 mt-2">{project.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userData.education.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2" style={{ color: portfolio?.theme?.colors?.primary?.from || '#3b82f6' }}>
                  Education
                </h2>
                <div className="space-y-4">
                  {userData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      {edu.institution && (
                        <p className="text-gray-700">{edu.institution}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} {userData.personalInfo.name || 'Portfolio'}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Built with APEX Portfolio Engine
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
