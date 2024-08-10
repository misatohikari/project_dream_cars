// utils/mongodb.js
const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
  
      cached.promise = mongoose.connect(process.env.MONGO_URL, options)
        .then((mongoose) => {
          console.log('MongoDB connected successfully'); // Log successful connection
          return mongoose;
        })
        .catch(err => {
          console.error('MongoDB connection error:', err); // Log connection error
          throw err;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }
  

module.exports = connectToDatabase;
