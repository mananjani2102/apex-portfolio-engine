import { motion } from 'framer-motion';
import { ArrowLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { generatePortfolio } from '../../utils/portfolioGenerator';

export default function BuilderHeader() {
  const { state, dispatch } = useApp();

  const handleGenerate = async () => {
    try {
      await generatePortfolio(state.userData, dispatch);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Portfolio generated successfully!', type: 'success' }
      });
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: error.message, type: 'error' }
      });
    }
  };

  const progressPercentage = (state.uiState.currentStep / 6) * 100;

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: 'landing' })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gradient">APEX Builder</h1>
              {state.uiState.builderTab === 'manual' && (
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                  <span>Step {state.uiState.currentStep} of 6</span>
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {state.uiState.lastSaved && (
              <span className="text-xs text-gray-500 hidden sm:inline">
                Saved {Math.floor((Date.now() - state.uiState.lastSaved) / 1000)}s ago
              </span>
            )}

            <button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={state.uiState.isGenerating}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium hover:shadow-glow-primary transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.uiState.isGenerating ? 'Generating...' : 'Generate Portfolio'}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
