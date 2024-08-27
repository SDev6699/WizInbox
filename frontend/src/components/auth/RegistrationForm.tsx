import React, { useState, useRef } from 'react';
import PersonalInformation from './PersonalInformation';
import EmailSetup from './EmailSetup';
import SecurityInformation from './SecurityInformation';
import Preferences from './Preferences';
import ReviewAndSubmit from './ReviewAndSubmit';

interface RegistrationFormProps {
  step: number;
  nextStep: (isValid: boolean) => void;
  prevStep: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ step, nextStep, prevStep }) => {
  const personalInfoRef = useRef<any>(null);
  const emailSetupRef = useRef<any>(null);
  const securityInfoRef = useRef<any>(null);
  const preferencesRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    secondaryEmail: '',
    twoFactorAuth: false,
    securityQuestion: '',
    securityAnswer: '',
    preferredLanguage: 'English',
    timeZone: '',
  });

  const [agreed, setAgreed] = useState(false); // This state controls the checkbox in ReviewAndSubmit

  const handleChange = (input: string, value: string) => {
    setFormData({ ...formData, [input]: value });
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        return personalInfoRef.current?.validate();
      case 2:
        return emailSetupRef.current?.validate();
      case 3:
        return securityInfoRef.current?.validate();
      case 4:
        return preferencesRef.current?.validate();
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    const isValid = validateCurrentStep();
    nextStep(isValid); // Pass the validation result to the parent
  };

  const handleSubmit = () => {
    console.log("Form submitted", formData);
  };

  return (
    <>
      {step === 1 && (
        <PersonalInformation
          ref={personalInfoRef}
          handleChange={handleChange}
          values={formData}
        />
      )}
      {step === 2 && (
        <EmailSetup
          ref={emailSetupRef}
          handleChange={handleChange}
          values={formData}
        />
      )}
      {step === 3 && (
        <SecurityInformation
          ref={securityInfoRef}
          handleChange={handleChange}
          values={formData}
        />
      )}
      {step === 4 && (
        <Preferences
          ref={preferencesRef}
          handleChange={handleChange}
          values={formData}
        />
      )}
      {step === 5 && (
        <ReviewAndSubmit
          values={formData}
          agreed={agreed}
          onAgreementChange={handleAgreementChange}
        />
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-600"
          >
            Previous
          </button>
        )}
        {step < 5 && (
          <button
            onClick={handleNextStep}
            className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
          >
            Next Step
          </button>
        )}
        {step === 5 && (
          <button
            onClick={handleSubmit}
            className={`bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 ${!agreed ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!agreed}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default RegistrationForm;
