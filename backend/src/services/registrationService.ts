import bcrypt from 'bcryptjs';
import User from '../models/User';
import { isEmailAvailableOnMailInABox, registerUserOnMailInABox } from './mailService';

export const registerUser = async (userData: any) => {
  // Generate a unique salt for this user
  const salt = bcrypt.genSaltSync(10);

  // Hash the password using the generated salt
  const hashedPassword = bcrypt.hashSync(userData.password, salt);

  // Create a new user in MongoDB
  const newUser = new User({
    ...userData,
    password: hashedPassword,
    salt, // Save the generated salt to the user model
  });

  // Save the user to MongoDB
  await newUser.save();

  // Register the user on Mail-in-a-Box
  await registerUserOnMailInABox(userData.email, userData.password);

  return newUser;
};


export const checkEmailAvailability = async (email: string, dateOfBirth: string) => {
  // Check if the email is available in WizInbox (MongoDB)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const suggestions = await generateEmailSuggestions(email, dateOfBirth);
    return { available: false, suggestions };
  }

  // Check if the email is available on Mail-in-a-Box
  const isAvailableOnMailInABox = await isEmailAvailableOnMailInABox(email);
  if (!isAvailableOnMailInABox) {
    const suggestions = await generateEmailSuggestions(email, dateOfBirth);
    return { available: false, suggestions };
  }

  return { available: true };
};

export const generateEmailSuggestions = async (email: string, dateOfBirth: string): Promise<string[]> => {
  const username = email.split('@')[0]; // Extract the username from the email
  const domain = email.split('@')[1]; // Extract the domain from the email
  const yearOfBirth = dateOfBirth.split('-')[0]; // Extract year from the date of birth

  // Create potential email suggestions
  const initialSuggestions = [
    `${username}${yearOfBirth}@${domain}`,
    `${username}_${yearOfBirth}@${domain}`,
    `${username}_${yearOfBirth}_mail@${domain}`,
    `${username}_user_${yearOfBirth}@${domain}`,
    `${username}_${yearOfBirth}_2024@${domain}`,
    `${username}_mailbox@${domain}`
  ];

  const availableSuggestions = [];

  // Check initial suggestions for availability
  for (const suggestion of initialSuggestions) {
    const isAvailable = await isEmailAvailableOnMailInABox(suggestion);
    if (isAvailable) {
      availableSuggestions.push(suggestion);
    }
    if (availableSuggestions.length >= 3) {
      break;
    }
  }

  // If less than 3 available suggestions, start numbering
  if (availableSuggestions.length < 3) {
    let i = 1;
    while (availableSuggestions.length < 3) {
      const numberedSuggestion = `${username}${i}@${domain}`;
      const isAvailable = await isEmailAvailableOnMailInABox(numberedSuggestion);
      if (isAvailable) {
        availableSuggestions.push(numberedSuggestion);
      }
      i++;
    }
  }

  return availableSuggestions;
};
