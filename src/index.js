const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app'); // ✅ uses routes including /api/student

dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);

// Setup socket events
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Connect DB and launch app
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');

    // ✅ Just require it — don’t call as a function
    require('./cronJobs/cronScheduler');

    const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

  })
  .catch((err) => console.error('MongoDB connection error:', err));
