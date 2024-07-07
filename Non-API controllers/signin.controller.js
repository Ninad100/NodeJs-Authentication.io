

//Sign Up


export function signUpPage(req,res,next){
    res.render('signupForm',{signupSuccess:false,resetNote:false,logErr:true,token: req.cookies.token,message: false});
}