import { useApp } from '../../context/AppContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ProjectsStep() {
  const { state, dispatch } = useApp();

  const addProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        title: '',
        type: 'personal',
        description: '',
        role: '',
        technologies: [],
        url: '',
        github: ''
      }
    });
  };

  const updateProject = (id, field, value) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, [field]: value }
    });
  };

  const deleteProject = (id) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Projects</h3>
          <p className="text-gray-400 text-sm">Showcase your work</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {state.userData.projects.map((project) => (
          <div key={project.id} className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h4 className="text-white font-medium">
                {project.title || 'New Project'}
              </h4>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
              />

              <textarea
                className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none resize-none"
                placeholder="Describe your project..."
                rows={3}
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}

        {state.userData.projects.length === 0 && (
          <div className="text-center py-12 glass rounded-xl">
            <p className="text-gray-400">No projects added yet. Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
