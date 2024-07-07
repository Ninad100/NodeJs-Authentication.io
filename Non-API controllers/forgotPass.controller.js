
//Forget password
export function forgotPassController(req,res,next){
    res.render('forgetPassword',{logErr:false,token: req.cookies.token,resetNote:false,resetNote:false,message: ''})
}