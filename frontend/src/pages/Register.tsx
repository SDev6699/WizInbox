import React, { useState } from 'react';
import RegistrationForm from '../components/auth/RegistrationForm';
import RegistrationLayout from '../components/layout/RegistrationLayout';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = (isValid: boolean) => {
    if (isValid) {
      setStep((prevStep) => prevStep + 1); // Move to the next step
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1); // Move to the previous step
    }
  };

  return (
    <RegistrationLayout currentStep={step} totalSteps={totalSteps}>
      <RegistrationForm step={step} nextStep={nextStep} prevStep={prevStep} />
    </RegistrationLayout>
  );
};

export default Register;
