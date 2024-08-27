import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mb-6">
      {steps.map((step) => (
        <div
          key={step}
          className={`flex items-center justify-center w-10 h-10 rounded-full mx-2 ${
            step === currentStep
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
