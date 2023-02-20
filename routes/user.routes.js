const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()
userRouter.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body
    try {
        bcrypt.hash(password,8,async(err,hash)=>{
            if(err) res.send("something went wrong")
            else{

                const user=new UserModel({name,email,password:hash})
               await user.save()
               res.send({"msg":"new user has been added"})
            }
        })
    } catch (error) {
        console.log(error);
    }
   
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({UserID:user[0]._id},"friends");

                    res.send({"msg":"log in succesfull","token":token})
                }else{
                    res.send("something went wrong")
                }

            })
        }else{
            res.send({"msg":"log in first"})
        }
    } catch (error) {
        console.log(error)
        
    }
   
})


module.exports={
    userRouter
}