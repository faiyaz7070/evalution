const express=require("express")
const {PostModel}=require("../model/post.model")
const postRouter=express.Router()
postRouter.get("/all",async(req,res)=>{
    let payload=req.body
    let data=await PostModel.find(payload)
    res.send(data)
})
postRouter.post("/create",async(req,res)=>{
    const addone=req.body
    try {
        const post=new PostModel(addone)
        await post.save()
        res.send("all data created")
    } catch (error) {
        console.log(error);
        
    }

})
postRouter.patch("/edit/:id",async(req,res)=>{
    const newid=req.params.id;
    const body=req.body
    try {
        await PostModel.findByIdAndUpdate({_id:newid},body)
        res.send("data has been edited")
    } catch (error) {
        console.log(error);
    }
    
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const newid=req.params.id;
   
    try {
        await PostModel.findByIdAndDelete({_id:newid})
        res.send("data has been deleted")
    } catch (error) {
        console.log(error);
    }
})

module.exports={
    postRouter
}