import { useApp } from '../../context/AppContext';
import PersonalInfoStep from './PersonalInfoStep';
import ExperienceStep from './ExperienceStep';
import EducationStep from './EducationStep';
import SkillsStep from './SkillsStep';
import ProjectsStep from './ProjectsStep';
import StylePreferencesStep from './StylePreferencesStep';

export default function ManualInputTab() {
  const { state, dispatch } = useApp();

  const steps = [
    { number: 1, label: 'Personal', component: PersonalInfoStep },
    { number: 2, label: 'Experience', component: ExperienceStep },
    { number: 3, label: 'Education', component: EducationStep },
    { number: 4, label: 'Skills', component: SkillsStep },
    { number: 5, label: 'Projects', component: ProjectsStep },
    { number: 6, label: 'Style', component: StylePreferencesStep }
  ];

  const CurrentStepComponent = steps[state.uiState.currentStep - 1].component;

  const handleNext = () => {
    if (state.uiState.currentStep < 6) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handlePrevious = () => {
    if (state.uiState.currentStep > 1) {
      dispatch({ type: 'PREVIOUS_STEP' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            <button
              onClick={() => dispatch({ type: 'JUMP_TO_STEP', payload: step.number })}
              className={`flex flex-col items-center gap-1 min-w-16 ${
                step.number === state.uiState.currentStep
                  ? 'text-primary-500'
                  : step.number < state.uiState.currentStep
                  ? 'text-emerald-500'
                  : 'text-gray-500'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.number === state.uiState.currentStep
                    ? 'bg-primary-500 text-white'
                    : step.number < state.uiState.currentStep
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {step.number < state.uiState.currentStep ? '✓' : step.number}
              </div>
              <span className="text-xs">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${
                step.number < state.uiState.currentStep ? 'bg-emerald-500' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        <CurrentStepComponent />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={handlePrevious}
          disabled={state.uiState.currentStep === 1}
          className="px-6 py-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-500">
          Step {state.uiState.currentStep} of 6
        </span>

        <button
          onClick={handleNext}
          disabled={state.uiState.currentStep === 6}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
