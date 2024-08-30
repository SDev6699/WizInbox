import React, { useState, useRef } from 'react';
import PersonalInformation from './PersonalInformation';
import EmailSetup from './EmailSetup';
import SecurityInformation from './SecurityInformation';
import Preferences from './Preferences';
import ReviewAndSubmit from './ReviewAndSubmit';
import { registerUser } from '../../services/registrationService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegistrationFormProps {
  step: number;
  nextStep: (isValid: boolean) => void;
  prevStep: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ step, nextStep, prevStep }) => {
  const navigate = useNavigate();
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

  const [agreed, setAgreed] = useState(false);

  const handleChange = (input: string, value: string) => {
    setFormData({ ...formData, [input]: value });
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const validateCurrentStep = async () => {
    switch (step) {
      case 1:
        return personalInfoRef.current?.validate();
      case 2:
        const isUsernameValid = await emailSetupRef.current?.checkUsername();
        return isUsernameValid && emailSetupRef.current?.validate();
      case 3:
        return securityInfoRef.current?.validate();
      case 4:
        return preferencesRef.current?.validate();
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validateCurrentStep();
    nextStep(isValid);
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(formData);
  
      // Assuming a successful registration response contains a status or message
      if (response && response.success) {  // Adjust based on your API response structure
        toast.success('Registration successful! Redirecting to login page...', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('Error during registration. Please try again.');
    }
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

        <div className="ml-auto">
          {step < 5 && (
            <button
              onClick={handleNextStep}
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 ml-4"
            >
              Next Step
            </button>
          )}

          {step === 5 && (
            <button
              onClick={handleSubmit}
              className={`bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 ml-4 ${!agreed ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!agreed}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;
