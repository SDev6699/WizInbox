import { useState, forwardRef, useImperativeHandle } from 'react';

interface SecurityInformationProps {
  handleChange: (input: string, value: string) => void;
  values: {
    phoneNumber: string;
    secondaryEmail: string;
    twoFactorAuth: boolean;
    securityQuestion: string;
    securityAnswer: string;
  };
}

const SecurityInformation = forwardRef((props: SecurityInformationProps, ref) => {
  const { handleChange, values } = props;
  const [errors, setErrors] = useState({
    phoneNumber: '',
    secondaryEmail: '',
    securityQuestion: '',
    securityAnswer: '',
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
      return validate();
    }
  }));

  const validate = () => {
    let valid = true;
    let tempErrors = { ...errors };

    if (!values.phoneNumber) {
      tempErrors.phoneNumber = 'Phone Number is required';
      valid = false;
    } else {
      tempErrors.phoneNumber = '';
    }

    if (!values.secondaryEmail) {
      tempErrors.secondaryEmail = 'Secondary Email Address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.secondaryEmail)) {
      tempErrors.secondaryEmail = 'Secondary Email Address is invalid';
      valid = false;
    } else {
      tempErrors.secondaryEmail = '';
    }

    if (!values.securityQuestion) {
      tempErrors.securityQuestion = 'Security Question is required';
      valid = false;
    } else {
      tempErrors.securityQuestion = '';
    }

    if (!values.securityAnswer) {
      tempErrors.securityAnswer = 'Security Answer is required';
      valid = false;
    } else {
      tempErrors.securityAnswer = '';
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
      <h2 className="text-3xl font-semibold mb-8">Account Security and Recovery</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium">Phone Number *</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={values.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className={`border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5"> {/* This div reserves space for error message */}
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Secondary Email */}
        <div className="flex flex-col">
          <label className="font-medium">Secondary Email Address *</label>
          <input
            type="email"
            name="secondaryEmail"
            placeholder="Secondary Email"
            value={values.secondaryEmail}
            onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
            className={`border ${errors.secondaryEmail ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5"> {/* This div reserves space for error message */}
            {errors.secondaryEmail && <p className="text-red-500 text-sm mt-1">{errors.secondaryEmail}</p>}
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="twoFactorAuth"
            checked={values.twoFactorAuth}
            onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked.toString())}
            className="w-4 h-4"
          />
          <label className="font-medium">Enable Two-Factor Authentication (2FA)</label>
        </div>

        {/* Security Question */}
        <div className="flex flex-col">
          <label className="font-medium">Security Question *</label>
          <input
            type="text"
            name="securityQuestion"
            placeholder="Security Question"
            value={values.securityQuestion}
            onChange={(e) => handleInputChange('securityQuestion', e.target.value)}
            className={`border ${errors.securityQuestion ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5"> {/* This div reserves space for error message */}
            {errors.securityQuestion && <p className="text-red-500 text-sm mt-1">{errors.securityQuestion}</p>}
          </div>
        </div>

        {/* Security Answer */}
        <div className="flex flex-col">
          <label className="font-medium">Security Answer *</label>
          <input
            type="text"
            name="securityAnswer"
            placeholder="Security Answer"
            value={values.securityAnswer}
            onChange={(e) => handleInputChange('securityAnswer', e.target.value)}
            className={`border ${errors.securityAnswer ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5"> {/* This div reserves space for error message */}
            {errors.securityAnswer && <p className="text-red-500 text-sm mt-1">{errors.securityAnswer}</p>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SecurityInformation;
