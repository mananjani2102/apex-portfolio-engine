import { useApp } from '../../context/AppContext';

export default function StylePreferencesStep() {
  const { state, dispatch } = useApp();
  const preferences = state.userData.preferences;

  const updatePreference = (field, value) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Style Preferences</h3>
        <p className="text-gray-400 text-sm">Customize your portfolio's look and feel</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-4">
            Professional Intensity
            <span className="text-gray-400 font-normal ml-2 text-sm">
              ({preferences.professionalIntensity}%)
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={preferences.professionalIntensity}
            onChange={(e) => updatePreference('professionalIntensity', parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Minimal</span>
            <span>Balanced</span>
            <span>Bold</span>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Layout Density</label>
          <div className="grid grid-cols-3 gap-3">
            {['spacious', 'balanced', 'compact'].map((density) => (
              <button
                key={density}
                onClick={() => updatePreference('layoutDensity', density)}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  preferences.layoutDensity === density
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                {density.charAt(0).toUpperCase() + density.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between glass rounded-lg p-4">
          <div>
            <p className="text-white font-medium">Show Profile Photo</p>
            <p className="text-gray-400 text-sm">Display your photo in the portfolio</p>
          </div>
          <button
            onClick={() => updatePreference('showProfilePhoto', !preferences.showProfilePhoto)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              preferences.showProfilePhoto ? 'bg-primary-500' : 'bg-white/10'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.showProfilePhoto ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
