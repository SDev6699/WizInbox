import { useState, forwardRef, useImperativeHandle } from 'react';

interface PersonalInformationProps {
  handleChange: (input: string, value: string) => void;
  values: {
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: string;
  };
}

const PersonalInformation = forwardRef((props: PersonalInformationProps, ref) => {
  const { handleChange, values } = props;
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: ''
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
      return validate();
    }
  }));

  const validate = () => {
    let valid = true;
    let tempErrors = { ...errors };

    if (!values.firstName) {
      tempErrors.firstName = 'First Name is required';
      valid = false;
    } else {
      tempErrors.firstName = '';
    }

    if (!values.lastName) {
      tempErrors.lastName = 'Last Name is required';
      valid = false;
    } else {
      tempErrors.lastName = '';
    }

    if (!values.username) {
      tempErrors.username = 'Username is required';
      valid = false;
    } else {
      tempErrors.username = '';
    }

    if (!values.dateOfBirth) {
      tempErrors.dateOfBirth = 'Date of Birth is required';
      valid = false;
    } else {
      tempErrors.dateOfBirth = '';
    }

    setErrors(tempErrors); // Update error state
    return valid; // Return validation status
  };

  // Handle input changes and clear errors for the corresponding field
  const handleInputChange = (input: string, value: string) => {
    handleChange(input, value);
    setErrors({ ...errors, [input]: '' }); // Clear the error for the specific input field
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Personal Information</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* First Name */}
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <label className="font-medium">First Name *</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5">
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
        </div>

        {/* Last Name */}
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <label className="font-medium">Last Name *</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5">
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Username */}
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <label className="font-medium">Username *</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={`border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5">
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <label className="font-medium">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded p-3`}
          />
          <div className="h-5">
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PersonalInformation;
