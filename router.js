import Auth from './controllers/auth';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  // if we want to create a protected route use this requireAuth
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });


  app.post('/signin', requireSignin,Auth.signIn); // requireSignin ile
  app.post('/signup', Auth.signUp);

};