import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const URL = process.env.DB_URL;

export const connectToMongoDB = async () => {
    try{
       await mongoose.connect(URL,{
            useNewURLParser: true,
            useUnifiedTopology: true
        });

        console.log('App is connected to MongoDB');
    }catch(err){
        console.log(err);
    }
}