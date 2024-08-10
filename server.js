const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let mongoConnected = false; // Global variable for connection status

app.prepare().then(async () => {
  const server = express();

  // Middleware
  server.use(express.json());

  // Passport middleware
  server.use(passport.initialize());

  // Passport config
  require('./src/pages/user-api/config/passport')(passport);

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
    mongoConnected = true;
  } catch (err) {
    console.log('MongoDB connection error:', err);
    mongoConnected = false;
  }

  // Middleware to check MongoDB connection
  server.use((req, res, next) => {
    req.mongoConnected = mongoConnected;
    next();
  });

  // Next.js handling
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
  });
});


/*note
vercel is serverless, server.js is not run by default. this server.js express logic is needed for the local environment to run but 
including mongo connection logic here will be problem on vercel since does not run this page.
so I implemented mongodb connection logic under utils

Also, on Vercel, if you don’t set up CORS headers to allow connections between different domains, 
the production site (like https://project-dream-cars.vercel.app) to the deployment URL (like https://project-dream-cars-q47k2a1an-misatohikaris-projects.vercel.app)
we can't connect from production to deployment site. 
This is because the production site url is public url and without the specification in the header, the communication is blocked to secure deployment process.
this means without Cors headers setup, we get errors when trying to log in or register, because the frontend and backend can’t communicate properly.

*/