// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const passport = require('passport');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const userRoutes = require('./src/pages/api/user/userRoutes');

// // dotenv.config();

// // const app = express();

// // // Middleware
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// // app.use(cors());

// // // Passport middleware
// // app.use(passport.initialize());

// // // Passport config
// // require('./src/pages/user-api/config/passport')(passport);

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log(err));

// // // Routes
// // app.use('/api', userRoutes);

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const next = require('next');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const userRoutes = require('./src/pages/api/user/userRoutes'); 

// dotenv.config();

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   // Middleware
//   server.use(bodyParser.urlencoded({ extended: false }));
//   server.use(bodyParser.json());
//   server.use(cors());

//   // Passport middleware
//   server.use(passport.initialize());
//   server.use('/api/user', userRoutes);
// //   server.use('/api', (req, res) => handle(req, res));

//   // Passport config
//   require('./src/pages/user-api/config/passport')(passport);

//   // Connect to MongoDB
//   mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));


//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   const PORT = process.env.PORT || 3000;
//   server.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// const express = require('express');
// const next = require('next');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   // Middleware
//   server.use(bodyParser.urlencoded({ extended: false }));
//   server.use(bodyParser.json());

//   // CORS configuration
//   const corsOptions = {
//     // origin: ['http://localhost:3000', 'https://project-dream-cars.vercel.app'], // Add your frontend URL here
//     origin: ['http://localhost:3000', 'https://project-dream-cars-j1d8utoms-misatohikaris-projects.vercel.app/'], // Add your frontend URL here
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//   };
//   server.use(cors(corsOptions));

//   // Passport middleware
//   server.use(passport.initialize());

//   // Passport config
//   require('./src/pages/user-api/config/passport')(passport);

//   // Connect to MongoDB
//   mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

//   // Use individual route handlers
//   const loginRoute = require('./src/pages/api/user/login');
//   const registerRoute = require('./src/pages/api/user/register');
//   const favoritesRoute = require('./src/pages/api/user/favorites');
//   const historyRoute = require('./src/pages/api/user/history');

//   server.use('/api/login', loginRoute);
//   server.use('/api/register', registerRoute);
//   server.use('/api/favorites', favoritesRoute);
//   server.use('/api/history', historyRoute);

//   // Next.js handling
//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   const PORT = process.env.PORT || 3000;
//   server.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`Server running on port ${PORT}`);
//   });
// });


const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  // CORS configuration
  const corsOptions = {
    origin: [
      'http://localhost:3000',
      'https://project-dream-cars-eij31u27n-misatohikaris-projects.vercel.app', // Use this for your production frontend URL
      'https://project-dream-cars-j1d8utoms-misatohikaris-projects.vercel.app' // Development frontend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  server.use(cors(corsOptions));

  // Passport middleware
  server.use(passport.initialize());

  // Passport config
  require('./src/pages/user-api/config/passport')(passport);

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

  // Use individual route handlers
  const loginRoute = require('./src/pages/api/user/login');
  const registerRoute = require('./src/pages/api/user/register');
  const favoritesRoute = require('./src/pages/api/user/favorites');
  const historyRoute = require('./src/pages/api/user/history');

  server.use('/api/login', loginRoute);
  server.use('/api/register', registerRoute);
  server.use('/api/favorites', favoritesRoute);
  server.use('/api/history', historyRoute);

  // Next.js handling
  server.all('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
  });
});
