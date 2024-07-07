import mongoose from "mongoose";
import { userSchema } from "./auth.schema.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


const authModel = mongoose.model('Authentication',userSchema)

export class AuthenticationRepository{

    //SignUP DB operations
    async signUp(obj){

        const {name,email,password} = obj;
        const authtype = 'basic';
        const passEncrypted = await bcrypt.hash(password,12);
        const user = new authModel({
            name: name,
            email: email,
            password: passEncrypted,
            authType: authtype
        });

        try{
            await user.save();
            if(user){
                return {success:true, userobj: user}
            }else{
                return {success:false, message: "Please try again later"}
            }
        }catch(err){
            console.log(err);
            return {success:false, message:err}
        }

    }

    //SignIN DB operations
    async signIn(obj){
        //console.log(obj)
        try{
            const {email,password} = obj;
            const user = await authModel.findOne({email:email});

            if(!user){
                return {success:false,message:'User not found !'}
            }

            const result = await bcrypt.compare(password,user.password);
            if(result){
                return {success:true,user: user}
            }else{
                return {success: false, message: "Login Failed"}
            }
            
        }catch(err){
            console.log(err);
            return {success:false,message:err}
        }
    }

    //Reset password Functionality
    async resetPassword(email,newpassword){
        try{
            const user = await authModel.findOne({email: email});
            if(user){
                const passEncrypted = await bcrypt.hash(newpassword,12);
                user.password = passEncrypted;
                await user.save();
                return {success:true,user: user}
            }else{
                return {success: false,message:"Please try again later."}
            }

        }catch(err){

            console.log(err);
            return {success:false,message:err}
        }
    }

    //Code to generate the OTP
    async otpGeneration(email){
        const otp = generatefourDigitOTP();

        const status = await authModel.findOneAndUpdate({email:email},{$set: {otp: String(otp)}});
        if(status){
            //sending OTP via email

            sendEmail(email,otp);

            return {success:true}
        }else{
            return {success:false}
        }
    }


    //COde to verify the OTP
    async verifyOtp(email,otp){
        try{
            const user = await authModel.findOne({email: email});
            if(!user){
                return {success:false}
            }
            if(String(user.otp) == String(otp)){
                return {success:true}
            }else{
                return {success:false}
            }

        }catch(err){
            console.log(err);
            return {success: false}
        }
    }


    //Code to update the password after using Forget Password functionality
    async updateForgetPassword(email,password){
        try{
            const user = await authModel.findOne({email: email});
            if(!user){
                return {success:false}
            }

            const passEncrypt = await bcrypt.hash(password,12);

            user.password = passEncrypt;

            await user.save();
            return {success:true}

        }catch(err){
            console.log(err);
            return {success:false}
        }
    }
}


function generatefourDigitOTP(){
    const otp = Math.random() * 9000
    return Math.floor(1000 + otp)
 }


 async function sendEmail(email,otp){

    //1. Creating transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ninad.awalgaonkar96@gmail.com',
            pass: 'znxt ldjz qztn wuga'
        },
    });

    //2. Configure Mail option

    const mailOptions = {
        from: 'ninad.awalgaonkar96@gmail.com',
        to: String(email),
        subject: 'Test application password reset OTP',
        text: String(otp)
    };


    //3. Send Email
    try{
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch(err){
        console.log('Email failed with error: '+ err);
    }
}