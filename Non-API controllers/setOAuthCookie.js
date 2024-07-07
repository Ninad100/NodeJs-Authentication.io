import cookieParser from "cookie-parser";


//All these functions for OAUTH.
export function setOAuthCookie(req,res,next){
    res.cookie('token','oauth')
    next();
}


/*export function clearCookie(req,res,next){
    res.clearCookie('oauth');
    next();
}*/


export function oauthLogout(req,res,next){
    req.logOut((err)=>{
        console.log(err);
    });
    res.clearCookie('token');
    res.redirect("/")
    
}