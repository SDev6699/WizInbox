import { Request, Response } from 'express';
import { registerUser, checkEmailAvailability } from '../services/registrationService';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUser = await registerUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const checkEmailAvailabilityController = async (req: Request, res: Response) => {
  try {
    const { email, dateOfBirth } = req.body;
    const result = await checkEmailAvailability(email, dateOfBirth);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};
