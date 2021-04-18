import { NextFunction } from 'express';
import passport from 'passport';
import {
  Strategy,
  VerifyCallback,
  Profile,
  StrategyOptions,
} from 'passport-google-oauth20';
import redisClient from './redisClient';

interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
}

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/api/v1/auth/google/callback',
};

async function verify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  const emailArr = profile?.emails;
  const photoArr = profile?.photos;
  const user: IUser = {
    id: profile.id,
    firstName: profile?.name?.givenName,
    lastName: profile?.name?.familyName,
    email: emailArr ? emailArr[0].value : '',
    photo: photoArr ? photoArr[0].value : '',
  };

  try {
    await redisClient.setAsync(user.id, JSON.stringify(user));
    // create user in postgres as well...
    done('', user);
  } catch (error) {
    done(error, user);
  }
}

passport.use(new Strategy(options, verify));

passport.serializeUser((user: any, done: VerifyCallback) => {
  done('', user.id);
});

passport.deserializeUser(async (id: any, done: VerifyCallback) => {
  let user: IUser = { id: '' };

  try {
    user = await redisClient.getAsync(id);
    done('', user);
  } catch (error) {
    // log error, then pull from postgres
    done(error, user);
  }
});

export default passport;
