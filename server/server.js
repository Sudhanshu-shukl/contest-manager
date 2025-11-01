import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import contestRoutes from './routes/contests.js';
import { importCodeforcesContests } from './services/codeforces.js';
import { importAtCoderContests } from './services/atcoder.js';
import { importLeetCodeContests } from './services/leetcode.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contests', contestRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Contest Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
  console.log(`📱 Access from phone: http://YOUR_IP:${PORT}/api`);
  console.log(`💡 Find your IP with: ipconfig (Windows) or ifconfig (Mac/Linux)`);

  // Background job: import contests every 6 hours
  const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
  const runImports = async () => {
    // Import Codeforces contests
    try {
      const result = await importCodeforcesContests();
      console.log('🗓️ Codeforces import:', result);
    } catch (e) {
      console.error('Failed Codeforces import:', e.message);
    }

    // Import AtCoder contests
    try {
      const result = await importAtCoderContests();
      console.log('🗓️ AtCoder import:', result);
    } catch (e) {
      console.error('Failed AtCoder import:', e.message);
    }

    // Import LeetCode contests
    try {
      const result = await importLeetCodeContests();
      console.log('🗓️ LeetCode import:', result);
    } catch (e) {
      console.error('Failed LeetCode import:', e.message);
    }
  };

  // Kick off once on boot, then schedule
  runImports();
  setInterval(runImports, SIX_HOURS_MS);
});
