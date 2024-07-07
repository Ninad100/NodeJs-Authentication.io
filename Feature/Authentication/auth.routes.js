import express from 'express';
import { AuthenticationController } from './auth.controller.js';
import { jwtAuth } from '../../jwtAuth.middleware.js';


export const authRouter = express.Router();

const authObj = new AuthenticationController();

//Signup route
authRouter.post('/signup',(req,res,next)=>{
    authObj.signUpController(req,res,next);
});

//Normal Login route
authRouter.post('/login',(req,res,next)=>{
    authObj.signInController(req,res,next);
});


//Reset Password Route
authRouter.post('/reset-password',jwtAuth,(req,res,next)=>{
    authObj.resetPasswordController(req,res,next);
});


//Normal signout route
authRouter.get('/signout', (req,res,next)=>{
    authObj.signoutController(req,res,next);
});


//OTP generation route
authRouter.post('/otp',(req,res,next)=>{
    authObj.otpGenrationController(req,res,next);
});


//OTP verification route
authRouter.post('/verify',(req,res,next)=>{
    authObj.verifyOtpController(req,res,next);
});


//Update password after forget password route
authRouter.post('/update-pass',(req,res,next)=>{
    authObj.updateForgetPasswordController(req,res,next);
})
