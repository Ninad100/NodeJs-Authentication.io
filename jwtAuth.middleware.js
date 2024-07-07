import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const jwtAuth = (req,res,next) =>{

    //1. Read the token
    const token = req.cookies.token

    //2. Veify if token is present
    if(!token){
        prompt('Please perform login first');
        res.redirect('/apphome')
    }

    //3. Verify

    try{
        const payload = jwt.verify(token,process.env.TOKEN);
        req.emailid = payload.email;
        console.log(req.emailid)
    }catch(err){
        console.log(err);
    }

    //4. Calling next middleware

    next();
}