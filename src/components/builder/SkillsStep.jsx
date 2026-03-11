import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SKILLS_DATABASE } from '../../utils/skillsDatabase';

export default function SkillsStep() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (value) => {
    setInput(value);
    if (value.length > 0) {
      const filtered = SKILLS_DATABASE
        .filter(s => s.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skillName) => {
    dispatch({
      type: 'ADD_SKILL',
      payload: {
        name: skillName,
        proficiency: 'intermediate',
        category: 'technical'
      }
    });
    setInput('');
    setSuggestions([]);
  };

  const removeSkill = (skillName) => {
    dispatch({
      type: 'DELETE_SKILL',
      payload: { name: skillName, category: 'technical' }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      addSkill(input.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Skills</h3>
        <p className="text-gray-400 text-sm">Add your technical and professional skills</p>
      </div>

      <div className="relative">
        <input
          className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
          placeholder="Type a skill and press Enter..."
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 glass border border-white/10 rounded-lg overflow-hidden z-10">
            {suggestions.map((skill) => (
              <button
                key={skill.name}
                onClick={() => addSkill(skill.name)}
                className="w-full px-4 py-2 text-left text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{skill.name}</span>
                <span className="text-xs text-gray-400">{skill.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {state.userData.skills.technical.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-lg text-white"
          >
            <span>{skill.name}</span>
            <button
              onClick={() => removeSkill(skill.name)}
              className="hover:text-red-400 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}

        {state.userData.skills.technical.length === 0 && (
          <div className="w-full text-center py-12 glass rounded-xl">
            <p className="text-gray-400">No skills added yet. Start typing to add skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}
