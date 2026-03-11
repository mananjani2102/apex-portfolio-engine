import { useApp } from '../../context/AppContext';
import { ComputerDesktopIcon, DeviceTabletIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function PreviewPanel() {
  const { state, dispatch } = useApp();

  const devices = [
    { name: 'desktop', icon: ComputerDesktopIcon, width: '100%' },
    { name: 'tablet', icon: DeviceTabletIcon, width: '768px' },
    { name: 'mobile', icon: DevicePhoneMobileIcon, width: '375px' }
  ];

  return (
    <div className="w-full lg:w-1/2 bg-dark-950 overflow-hidden flex flex-col">
      <div className="sticky top-0 z-40 glass border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">Live Preview</h3>

          <div className="flex items-center gap-2">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.name}
                  onClick={() => dispatch({ type: 'SET_PREVIEW_DEVICE', payload: device.name })}
                  className={`p-2 rounded-lg transition-colors ${
                    state.uiState.previewDevice === device.name
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={device.name}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="mx-auto transition-all duration-300" style={{
          maxWidth: devices.find(d => d.name === state.uiState.previewDevice)?.width
        }}>
          <div className="glass rounded-xl p-8 min-h-[600px]">
            <div className="space-y-8">
              {state.userData.personalInfo.name && (
                <div>
                  <h1 className="text-4xl font-bold text-gradient mb-2">
                    {state.userData.personalInfo.name}
                  </h1>
                  {state.userData.personalInfo.title && (
                    <p className="text-xl text-gray-300">{state.userData.personalInfo.title}</p>
                  )}
                  {state.userData.personalInfo.location && (
                    <p className="text-gray-400 mt-2">{state.userData.personalInfo.location}</p>
                  )}
                </div>
              )}

              {state.userData.skills.technical.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {state.userData.skills.technical.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-sm text-white"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {state.userData.workExperience.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Experience</h2>
                  <div className="space-y-4">
                    {state.userData.workExperience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-primary-500 pl-4">
                        <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                        {exp.company && (
                          <p className="text-gray-300">{exp.company}</p>
                        )}
                        {exp.description && (
                          <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {state.userData.projects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Projects</h2>
                  <div className="space-y-4">
                    {state.userData.projects.map((project) => (
                      <div key={project.id} className="glass rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        {project.description && (
                          <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!state.userData.personalInfo.name && (
                <div className="text-center py-20">
                  <p className="text-gray-400">
                    Your portfolio preview will appear here as you fill in the form.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
