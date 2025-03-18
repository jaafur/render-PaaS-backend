const mongoose = require('mongoose');

const url = 'mongodb+srv://fullStackCourse:06220029644Aa@cluster0.mjmpc.mongodb.net/NoteApp?retryWrites=true&w=majority';

console.log('Trying to connect to MongoDB...');
console.log('MongoDB URI:', url);
console.log('Type of URL:', typeof url);

mongoose
  .connect(url)
  .then(() => {
    console.log('✅ Connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('⛔ Connection error:', err.message);
    process.exit(1);
  });
