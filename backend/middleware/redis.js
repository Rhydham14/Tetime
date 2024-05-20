// const redis = require('redis');

// // Create a Redis client
// const client = redis.createClient();
  
// // Handle Redis connection errors
// client.on('error', (err) => {
//   console.error('Error connecting to Redis:', err);
// });

// // Connect to Redis
// client.connect().then(() => {
//   console.log('Connected to Redis server');
// });

// module.exports = client;



const redis = require('redis');

// Use environment variable for Redis URL
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({ url: redisUrl });

// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

// Connect to Redis
client.connect().then(() => {
  console.log('Connected to Redis server');
});

module.exports = client;
