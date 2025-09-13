// Example configuration file
// Copy this to config.js and update with your values

export const config = {
  // Local MongoDB
  MONGODB_URI: 'mongodb://localhost:27017/contest-tracker',
  
  // MongoDB Atlas (cloud) example:
  // MONGODB_URI: 'mongodb+srv://username:password@cluster.mongodb.net/contest-tracker?retryWrites=true&w=majority',
  
  // Server settings
  PORT: 5000,
  NODE_ENV: 'development'
};

// Common MongoDB connection options:
export const mongoOptions = {
  // Local MongoDB
  local: 'mongodb://localhost:27017/contest-tracker',
  
  // MongoDB Atlas (cloud)
  atlas: 'mongodb+srv://username:password@cluster.mongodb.net/contest-tracker?retryWrites=true&w=majority',
  
  // Docker MongoDB
  docker: 'mongodb://mongo:27017/contest-tracker'
};
