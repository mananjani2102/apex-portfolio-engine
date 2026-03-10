import { useApp } from '../../context/AppContext';
import ResumeUploadTab from './ResumeUploadTab';
import ManualInputTab from './ManualInputTab';

export default function InputPanel() {
  const { state, dispatch } = useApp();

  return (
    <div className="w-full lg:w-1/2 border-r border-white/10 bg-dark-900/50 overflow-y-auto">
      <div className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="flex">
          <button
            onClick={() => dispatch({ type: 'SET_BUILDER_TAB', payload: 'upload' })}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              state.uiState.builderTab === 'upload'
                ? 'text-white border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_BUILDER_TAB', payload: 'manual' })}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              state.uiState.builderTab === 'manual'
                ? 'text-white border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Manual Input
          </button>
        </div>
      </div>

      <div className="p-6">
        {state.uiState.builderTab === 'upload' ? <ResumeUploadTab /> : <ManualInputTab />}
      </div>
    </div>
  );
}
