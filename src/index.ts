import cors from 'cors'; // allow requests from cross origin urls
import express from 'express'; // server framework
import session from 'express-session'; // sessions based on tokens
import dotenv from 'dotenv'; // create environment variables from .env files
import helmet from 'helmet'; // create security headers on requests
import morgan from 'morgan'; // logs helpful dev info to the CLI
import responseTime from 'response-time'; // add response time header

// load environment variables
dotenv.config({ path: __dirname + '/config/vars.env' });

// import passport config
import passport from './config/passport';

// import App class
import App from './models/app';

// import routers
import auth from './routes/auth';
import status from './routes/status';
import user from './routes/user';

const app = new App({
  port: parseInt(process.env.PORT || '5000'),
  middleware: [
    express.json({ limit: '50mb' }),
    responseTime({ suffix: false }),
    morgan('dev'),
    helmet(),
    cors({
      origin: [
        'http://localhost:3000',
        'https://localhost',
        'http://localhost:5000',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['X-Response-Time'],
    }),
    // express session must be called before passport session
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    }),
    passport.initialize(),
    passport.session(),
  ],
  routes: [
    { path: '/api/v1/auth', router: auth },
    { path: '/api/v1/status', router: status },
    { path: '/api/v1/user', router: user },
  ],
});

app.listen();
