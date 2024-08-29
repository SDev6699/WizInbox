import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Import CORS middleware
import connectDB from './config/db'; // Import the connection logic
import registrationRoutes from './routes/registrationRoutes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend's origin
  credentials: true // Enable sending cookies with cross-origin requests, if needed
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', registrationRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
