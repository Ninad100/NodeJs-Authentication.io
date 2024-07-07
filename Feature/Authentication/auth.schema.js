import mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type:String, required: true, unique: true, 
        match: [/.+\@.+\../,"Please enter valid email"] 
    },
    password: {type:String,required:true},
    //This authType is not needed actually. But I was thinking how to separate the normal and regular authentication.
    authType: {
        type: String,
        enum: ['basic','oauth']
    },

    //OTP will be saved here. To set expiry may be i need to create new schema for OTP map it with user email id
    // as email id will be unique. The I can use {expireAfterSeconds: 300}. This is not the requirement of project.
    // This comment is for person who will be reading it through GitHub and have similar doubt.
    otp: {type: String}
    
});
