import { forwardRef, useImperativeHandle } from 'react';

interface PreferencesProps {
  handleChange: (input: string, value: string) => void;
  values: {
    preferredLanguage: string;
    timeZone: string;
  };
}

const Preferences = forwardRef((props: PreferencesProps, ref) => {
  const { handleChange, values } = props;

  useImperativeHandle(ref, () => ({
    validate: () => {
      return validate();
    }
  }));

  const validate = () => {
    return true; // No specific validation needed for preferences, but can add if necessary
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Preferences</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Preferred Language */}
        <div className="flex flex-col">
          <label className="font-medium">Preferred Language *</label>
          <select
            name="preferredLanguage"
            value={values.preferredLanguage}
            onChange={(e) => handleChange('preferredLanguage', e.target.value)}
            className="border border-gray-300 rounded p-3"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            {/* Add more options as needed */}
          </select>
          <div className="h-5"></div> {/* This div reserves space for error message */}
        </div>

        {/* Time Zone */}
        <div className="flex flex-col">
          <label className="font-medium">Time Zone *</label>
          <select
            name="timeZone"
            value={values.timeZone}
            onChange={(e) => handleChange('timeZone', e.target.value)}
            className="border border-gray-300 rounded p-3"
          >
            <option value="GMT-5">GMT-5 (Eastern Time)</option>
            <option value="GMT-6">GMT-6 (Central Time)</option>
            <option value="GMT-7">GMT-7 (Mountain Time)</option>
            <option value="GMT-8">GMT-8 (Pacific Time)</option>
            {/* Add more options as needed */}
          </select>
          <div className="h-5"></div> {/* This div reserves space for error message */}
        </div>
      </div>
    </div>
  );
});

export default Preferences;
