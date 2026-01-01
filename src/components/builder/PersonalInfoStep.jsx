import { useApp } from '../../context/AppContext';
import { useDebounce } from '../../hooks/useDebounce';
import { validateEmail, formatPhoneNumber } from '../../utils/validation';
import Input from '../shared/Input';

export default function PersonalInfoStep() {
  const { state, dispatch } = useApp();
  const personalInfo = state.userData.personalInfo;

  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
        <p className="text-gray-400 text-sm">Tell us about yourself</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          value={personalInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
          required
        />

        <Input
          label="Professional Title"
          value={personalInfo.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Senior Product Designer"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            required
          />

          <Input
            label="Phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', formatPhoneNumber(e.target.value))}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <Input
          label="Location"
          value={personalInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn URL"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />

          <Input
            label="GitHub URL"
            value={personalInfo.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
    </div>
  );
}
