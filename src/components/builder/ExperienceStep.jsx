import { useApp } from '../../context/AppContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';

export default function ExperienceStep() {
  const { state, dispatch } = useApp();

  const addExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: []
      }
    });
  };

  const updateExperience = (id, field, value) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, [field]: value }
    });
  };

  const deleteExperience = (id) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Work Experience</h3>
          <p className="text-gray-400 text-sm">Add your professional experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {state.userData.workExperience.map((exp) => (
          <div key={exp.id} className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h4 className="text-white font-medium">
                {exp.title || 'New Experience'}
              </h4>
              <button
                onClick={() => deleteExperience(exp.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              />
              <input
                className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
            </div>

            <textarea
              className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none resize-none"
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
            />
          </div>
        ))}

        {state.userData.workExperience.length === 0 && (
          <div className="text-center py-12 glass rounded-xl">
            <p className="text-gray-400">No work experience added yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
