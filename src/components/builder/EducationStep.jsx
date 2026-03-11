import { useApp } from '../../context/AppContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function EducationStep() {
  const { state, dispatch } = useApp();

  const addEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        institution: '',
        degree: '',
        field: '',
        graduationYear: '',
        gpa: '',
        honors: ''
      }
    });
  };

  const updateEducation = (id, field, value) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, [field]: value }
    });
  };

  const deleteEducation = (id) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
          <p className="text-gray-400 text-sm">Add your academic background</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {state.userData.education.map((edu) => (
          <div key={edu.id} className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h4 className="text-white font-medium">
                {edu.degree || 'New Education'}
              </h4>
              <button
                onClick={() => deleteEducation(edu.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                placeholder="Degree (e.g., B.S. Computer Science)"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
              <input
                className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
              />
            </div>
          </div>
        ))}

        {state.userData.education.length === 0 && (
          <div className="text-center py-12 glass rounded-xl">
            <p className="text-gray-400">No education added yet. Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
