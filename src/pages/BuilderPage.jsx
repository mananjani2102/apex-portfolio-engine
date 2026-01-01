import { useApp } from '../context/AppContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import BuilderHeader from '../components/builder/BuilderHeader';
import InputPanel from '../components/builder/InputPanel';
import PreviewPanel from '../components/builder/PreviewPanel';

export default function BuilderPage() {
  const { state, dispatch } = useApp();

  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      action: () => {
        localStorage.setItem('apex_app_state', JSON.stringify(state));
        dispatch({ type: 'MARK_CLEAN' });
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { message: 'Progress saved!', type: 'success' }
        });
      }
    },
    {
      key: 'Escape',
      action: () => {
        if (state.uiState.currentPage === 'builder') {
          const confirmLeave = window.confirm(
            state.uiState.isDirty
              ? 'You have unsaved changes. Are you sure you want to leave?'
              : 'Return to home page?'
          );
          if (confirmLeave) {
            dispatch({ type: 'NAVIGATE_TO', payload: 'landing' });
          }
        }
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-dark-950">
      <BuilderHeader />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <InputPanel />
        <PreviewPanel />
      </div>
    </div>
  );
}
