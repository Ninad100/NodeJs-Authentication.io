
//App home Controller
export function appHomeController(req,res,next){
    res.render('apphome',{token: req.cookies.token,resetNote:false,message:''});
}