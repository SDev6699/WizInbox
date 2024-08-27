import React from 'react';
import LeftPanel from './LeftPanel';
import ProgressIndicator from './ProgressIndicator';

interface RegistrationLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({ children, currentStep, totalSteps }) => {
  return (
    <div className="h-full w-full flex">
      {/* Left Panel */}
      <div className="w-2/5 h-full bg-black flex items-center justify-center">
        <LeftPanel />
      </div>

      {/* Right Panel */}
      <div className="w-3/5 h-full bg-gray-50 flex flex-col p-8">
        {/* Progress Indicator moved a bit below */}
        <div className="mb-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Form Content with increased width */}
        <div className="flex-grow">
          <div className="w-full max-w-lg mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLayout;
