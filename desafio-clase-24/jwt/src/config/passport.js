import passport from 'passport';
import local from 'passport-local';
import { userDAO } from '../dao/user/index.js';
import { checkPassword, createHash } from '../utils/bcrypt.js';
import { Strategy as GithubStrategy } from 'passport-github2';

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;

        try {
          const user = await userDAO.getUserByEmail({ email: username });

          if (user) {
            return done(null, false);
          }

          const hashedPassword = await createHash(password);

          const newUser = await userDAO.addUser({
            first_name,
            last_name,
            email: username,
            age,
            password: hashedPassword,
          });

          return done(null, newUser);
        } catch (err) {
          return done('Error when trying to sign up:' + err);
        }
      }
    )
  ),
    passport.use(
      'login',
      new LocalStrategy(
        {
          usernameField: 'email',
        },
        async (username, password, done) => {
          try {
            const user = await userDAO.getUserByEmail({ email: username });

            if (!user) {
              return done(null, false);
            }

            if (!checkPassword(user, password)) {
              console.log('Credentials do not match');
              return done(null, false);
            }

            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    ),
    passport.use(
      'github',
      new GithubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          callbackURL: 'http://localhost:8080/api/auth/githubcallback',
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log({ profile });
            const user = await userDAO.getUserByEmail({
              email: profile._json.email,
            });

            if (user) {
              return done(null, user);
            }

            const newUser = await userDAO.addUser({
              first_name: profile._json.name,
              // last_name: '',
              email: profile._json.email || profile.username,
              // age: 18,
              password: 'CreatedWithGithub',
            });

            return done(null, newUser);
          } catch (err) {
            return done(err);
          }
        }
      )
    ),
    passport.serializeUser((user, done) => {
      done(null, user.id);
    }),
    passport.deserializeUser(async (id, done) => {
      const user = await userDAO.getUserById(id);
      done(null, user);
    });
};
