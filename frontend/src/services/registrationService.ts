import api from './api';

// Check email availability
export const checkEmailAvailability = async (email: string, dateOfBirth: string) => {
  try {
    const response = await api.post('/check-username', { email, dateOfBirth });
    return response.data;
  } catch (error) {
    throw new Error('Error checking email availability');
  }
};

// Register a new user
export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error registering user');
  }
};
