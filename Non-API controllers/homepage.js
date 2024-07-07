
//Homepage
export function homepageController(req,res,next){
    if(!req.cookies.token){
        res.render('homepage',{logErr:false,token: req.cookies.token,resetNote:false,resetNote:false,message: ''})
    }else{
        res.render('apphome',{logErr:false,token: req.cookies.token,resetNote:false,resetNote:false,message: ''})
    }
    
}