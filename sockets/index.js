import { Server } from "socket.io";
import express from "express"
import cors from "cors"
import {createServer} from "http"
const app=express()
const port=8080
const server=createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        credentials:true,
    }
})
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST"],
    credentials:true,
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

io.on("connection",(socket)=>{
    console.log("User Connected :", socket.id)
    socket.on("disconnect",()=>{
        console.log("User dissconnected");
        
    })
    socket.broadcast.emit("rahul",`${socket.id} joined the server`)
})



server.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})

// app.listen(port,()=>{
//     console.log(`Server is running on ${port}`)
//  })

 app.get("/",(req,res)=>{
    res.send(`<h1>Hello World</h1>`)
 })