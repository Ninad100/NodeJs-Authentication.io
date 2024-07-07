import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressEjsLayouts from 'express-ejs-layouts';
import { homepageController } from './Non-API controllers/homepage.js';
import { signUpPage } from './Non-API controllers/signin.controller.js';
import { authRouter } from './Feature/Authentication/auth.routes.js';
import { appHomeController } from './Non-API controllers/apphome.controller.js';
import { forgotPassController } from './Non-API controllers/forgotPass.controller.js';
import { oauthLogout, setOAuthCookie } from './Non-API controllers/setOAuthCookie.js';



//Loading of the important required middlewares in proper sequence.
export const app = express();
//const GoogleStrategy = Strategy;
dotenv.config();
app.use(cookieParser());
app.use(expressEjsLayouts);
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
//app.use(passport.initialize());


//Session setup
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}));

app.use(passport.initialize()) // Passport initialization
app.use(passport.session())    //Allow passport to create the session.


//Defining routes

app.use('/api/',authRouter);
app.get('/',homepageController);
app.get('/signup-form',signUpPage)
app.get('/apphome',appHomeController);
app.get('/forgot-password',forgotPassController);

app.get('/auth/google', setOAuthCookie,
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));




//Passport code

const authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  }, authUser));


  passport.serializeUser( (user, done) => { 

    done(null, user)
} )


passport.deserializeUser((user, done) => {

        done (null, user)
});

//Setting cookie to manage the Front end layouts based on Login and Logout status
app.get('/auth/google/callback', setOAuthCookie,
  passport.authenticate( 'google', {
      successRedirect: '/apphome',
      failureRedirect: '/'
}));

app.post("/logout", oauthLogout);
