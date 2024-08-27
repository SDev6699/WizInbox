import React from 'react';

interface ReviewAndSubmitProps {
  values: {
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    secondaryEmail: string;
    twoFactorAuth: boolean;
    securityQuestion: string;
    securityAnswer: string;
    preferredLanguage: string;
    timeZone: string;
  };
  agreed: boolean; // This prop will control whether the checkbox is checked
  onAgreementChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback to handle checkbox changes
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ values, agreed, onAgreementChange }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Review and Submit</h2>
      <div className="space-y-4">
        {/* Display form data */}
        <div className="grid grid-cols-2 gap-6">
          <div><strong>First Name:</strong> {values.firstName}</div>
          <div><strong>Last Name:</strong> {values.lastName}</div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div><strong>Username:</strong> {values.username}</div>
          <div><strong>Date of Birth:</strong> {values.dateOfBirth}</div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div><strong>Email:</strong> {values.email}</div>
          <div><strong>Phone Number:</strong> {values.phoneNumber}</div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div><strong>Secondary Email:</strong> {values.secondaryEmail}</div>
          <div><strong>Two-Factor Authentication:</strong> {values.twoFactorAuth ? 'Enabled' : 'Disabled'}</div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div><strong>Security Question:</strong> {values.securityQuestion}</div>
          <div><strong>Security Answer:</strong> {values.securityAnswer}</div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div><strong>Preferred Language:</strong> {values.preferredLanguage}</div>
          <div><strong>Time Zone:</strong> {values.timeZone}</div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-8">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={agreed}
            onChange={onAgreementChange}
          />
          I agree to the terms and conditions.
        </label>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
