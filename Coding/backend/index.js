// Packages
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Configure dotenv with the correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Debug environment variables
console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});

// Utiles
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://your-frontend-domain.com'], // Add your frontend URL when deployed
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount routes
app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
