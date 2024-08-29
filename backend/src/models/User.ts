import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }, // Store the unique salt for the password
  phoneNumber: { type: String, required: true },
  secondaryEmail: { type: String, required: true },
  twoFactorAuth: { type: Boolean, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  preferredLanguage: { type: String, required: true },
  timeZone: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
export default User;
