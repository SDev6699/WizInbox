import React, { useState } from 'react';
import RegistrationForm from '../components/auth/RegistrationForm';
import AuthLayout from '../components/layout/AuthLayout';
import ProgressIndicator from '../components/layout/ProgressIndicator';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = (isValid: boolean) => {
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <ProgressIndicator currentStep={step} totalSteps={totalSteps} />
      <RegistrationForm step={step} nextStep={nextStep} prevStep={prevStep} />
    </AuthLayout>
  );
};

export default Register;
