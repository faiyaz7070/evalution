const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"friends",(err,decoded)=>{
            if(decoded){
                req.body.usr=decoded.UserID
                next()
            }else{
                res.send("User already exist, please login")
            }
        })
    }else{
        res.send("User already exist, please login")
    }
}
module.exports={
    authenticate
}