

export class CustomErrorHandler extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode;
    }
}


export const applicationErrorHandler = (err,req,res,next) =>{
    err.statusCode = statusCode ||500;
    err.message = err.message || "Server Error";
    res.status(err.statusCode).send({success: false, "message": err.message});
    next();
}