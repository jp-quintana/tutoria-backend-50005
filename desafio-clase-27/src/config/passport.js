import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

export const cookieExtractor = (req) => {
  let token = null;
  if (req) {
    token = req.cookies['coderCookieToken'];
  }
  return token;
};

export const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
