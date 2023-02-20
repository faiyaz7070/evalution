const express=require("express")
const {connection}=require("./db")
const{userRouter}=require("./routes/user.routes")
const{postRouter}=require("./routes/post.routes")
const{ authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts", postRouter)











app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("your port is 4500")
})