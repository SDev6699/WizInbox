import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface EmailSetupProps {
  handleChange: (input: string, value: string) => void;
  values: {
    username: string; // We need the username from Personal Information
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const EmailSetup = forwardRef((props: EmailSetupProps, ref) => {
  const { handleChange, values } = props;
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const emailSuffix = "@wizinbox.com";

  useImperativeHandle(ref, () => ({
    validate: () => {
      return validate();
    }
  }));

  useEffect(() => {
    // Automatically update the email field when the username changes
    handleChange('email', `${values.username}${emailSuffix}`);
  }, [values.username]);

  const validate = () => {
    let valid = true;
    let tempErrors = { ...errors };

    if (!values.email) {
      tempErrors.email = 'Email Address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = 'Email Address is invalid';
      valid = false;
    } else {
      tempErrors.email = '';
    }

    if (!values.password) {
      tempErrors.password = 'Password is required';
      valid = false;
    } else if (values.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    } else {
      tempErrors.password = '';
    }

    if (!values.confirmPassword) {
      tempErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (values.confirmPassword !== values.password) {
      tempErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    } else {
      tempErrors.confirmPassword = '';
    }

    setErrors(tempErrors);
    return valid;
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
        {/* Email Address */}
        <div className="flex flex-col">
          <label className="font-medium">Email Address *</label>
          <div className="relative">
            <input
              type="text"
              name="email"
              value={values.username} // Bind to the username
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded p-3 pr-24 w-full`} // Make input full width
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
              {emailSuffix}
            </span>
          </div>
          <div className="h-5">
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
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
