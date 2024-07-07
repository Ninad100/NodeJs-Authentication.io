
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prompt from 'prompt-sync'
import { CustomErrorHandler } from "../../error.handler.js";
import { AuthenticationRepository } from "./auth.repository.js";

dotenv.config();

export class AuthenticationController{
    constructor(){
        this.authenticationRepository = new AuthenticationRepository();
    }

//Function to perform the signup
    async signUpController(req,res,next){
        try{
            //req.body.authType ='basic';
            const user = await this.authenticationRepository.signUp(req.body)

            if(user.success){
                //res.status(200).json({success:true,user: user.userobj})
                res.redirect('/');
            }else{
                res.render('signupForm',{signupSuccess:true,message: '',logErr:true,token: req.cookies.token,resetNote:false});
                next(new CustomErrorHandler(400,user.message));
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err))
        }
    }

    //Function to perform the SignIN
    async signInController(req,res,next){
        try{
            const loggedin = await this.authenticationRepository.signIn(req.body);
            if(loggedin.success){
                const token = jwt.sign({email:loggedin.user.email},process.env.TOKEN,{expiresIn: '2h'});
                res.cookie('token',token);
                //res.status(200).json({success:true,message:"Login Successful !",user:loggedin.user})
               
               
                res.redirect('/apphome')
            }else{
                console.log('err')
                res.render('homepage',{logErr:true,token: req.cookies.token,resetNote:false,message: ''})
                next(new CustomErrorHandler(400,loggedin.message))
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err));
        }
    }

    //Function to Reset the password after logging in
    async resetPasswordController(req,res,next){
        try{
            const {email,currentPassword,NewPassword} = req.body;
            const status = await this.authenticationRepository.resetPassword(email,NewPassword);
            if(status.success){
                //res.status(200).json({success:true,user: status.user});
               // prompt('Password changed successfully');
                res.render('apphome',{resetNote:true,token: req.cookies.token, message: "Password change Successfully."})
            }else{
                res.render('apphome',{resetNote:false,token: req.cookies.token, message: "Password change failed!"})
                next(new CustomErrorHandler(400,status.message));
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err))
        }
    }

    //Signout with normal authentication
    signoutController(req,res,next){
        res.clearCookie('token');
        res.redirect('/')
    }

    //OTP generation controller for the Forget Password Functionality
    async otpGenrationController(req,res,next){
        try{
            const email = req.body.email
            const otp = await this.authenticationRepository.otpGeneration(email);
            if(otp.success){
                res.render('otpview',{resetNote: false,useremail: email,status:false});
            }else{
                res.render('otpview',{resetNote:false,useremail: email,status: false});
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err))
        }
    }

    //Verifying the OTP controller
    async verifyOtpController(req,res,next){
        try{
            const {email,otp} = req.body;
            console.log(email)
            const status = await this.authenticationRepository.verifyOtp(email,otp);
            if(status.success){
                console.log(email)
                res.render('updateForgetPass',{resetNote:false,useremail: String(email),status: false,error:false})
            }else{
                res.render('otpview',{resetNote:false,useremail: email,status: true})
            }

        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err));
        }
    }

    //Update password after Verifying the OTP.
    async updateForgetPasswordController(req,res,next){
        try{
            console.log(req.body)
            const {email,NewPassword} = req.body;
            const updated = await this.authenticationRepository.updateForgetPassword(email,NewPassword);
            if(updated.success){
                res.render('updatePassword',{resetNote:false})
            }else{
                res.render('updateForgetPass',{resetNote:false,useremail: email,status: false,error:true})
            }

        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err))
        }
    }
}