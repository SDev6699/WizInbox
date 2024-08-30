import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { checkEmailAvailability } from '../../services/registrationService'; // Import the API call

interface EmailSetupProps {
  handleChange: (input: string, value: string) => void;
  values: {
    username: string; // We need the username from Personal Information
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string; // Add dateOfBirth for username check
  };
}

const EmailSetup = forwardRef((props: EmailSetupProps, ref) => {
  const { handleChange, values } = props;
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const emailSuffix = "@wizinbox.com";

  useImperativeHandle(ref, () => ({
    validate: () => {
      return validate();
    },
    checkUsername: async () => {
      if (validate()) { // Check for errors first
        return await validateUsername(); // Then call the API if no errors
      }
      return false; // Return false if there are validation errors
    }
  }));

  useEffect(() => {
    // Automatically update the email field when the username changes
    handleChange('email', `${values.username}${emailSuffix}`);
  }, [values.username]);

  const validate = () => {
    let valid = true;
    let tempErrors = { ...errors };

    if (!values.username) {
      tempErrors.username = 'Username is required';
      valid = false;
    }

    if (!values.password) {
      tempErrors.password = 'Password is required';
      valid = false;
    } else if (values.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    if (!values.confirmPassword) {
      tempErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (values.confirmPassword !== values.password) {
      tempErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const validateUsername = async () => {
    try {
      const response = await checkEmailAvailability(values.email, values.dateOfBirth);
      if (!response.available) {
        setUsernameSuggestions(response.suggestions);
        setErrors({ ...errors, username: 'Username is taken. Please choose a suggestion or enter a new one.' });
        return false;
      }
      return true;
    } catch (error) {
      setErrors({ ...errors, username: 'Error checking username availability. Please try again.' });
      return false;
    }
  };

  // Handle input changes and clear errors for the corresponding field
  const handleInputChange = (input: string, value: string) => {
    handleChange(input, value);
    setErrors({ ...errors, [input]: '' }); // Clear the error for the specific input field
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Email ID Creation and Password Setup</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Username with Email Suffix */}
        <div className="flex flex-col">
          <label className="font-medium">Username *</label>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded p-3 pr-24 w-full`} // Adjust input padding to accommodate suffix
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
              {emailSuffix}
            </span>
          </div>
          <div className="h-5">
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Display suggestions if username is taken */}
          {usernameSuggestions.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Suggestions:</p>
              <div className="flex flex-wrap">
                {usernameSuggestions.map((suggestion, index) => (
                  <span
                    key={index}
                    className="text-blue-600 cursor-pointer hover:underline mr-2"
                    onClick={() => handleChange('username', suggestion.split('@')[0])}
                  >
                    {suggestion.split('@')[0]}
                    {index < usernameSuggestions.length - 1 && ','}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="font-medium">Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded p-3 w-full`}
          />
          <div className="h-5">
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="font-medium">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded p-3 w-full`}
          />
          <div className="h-5">
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EmailSetup;
