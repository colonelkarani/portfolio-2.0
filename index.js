require("dotenv").config();
const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(express.static(path.join(__dirname , "public")));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("mongodb connected ");    
})

const MessageSchema = new mongoose.Schema({
    fullname:String,
     message: String,
     email:String})

const Message = mongoose.model("Messages", MessageSchema);
//Message.insertOne({fullname:"Victor", message:"How can I contact yjou?", email:"Mavnovo@gmail.com"})


app.post("/contact", async (req, res)=>{
    const {fullname, email, message}= req.body
    const NewMessage = new Message({fullname, email, message})
    await NewMessage.save()
    res.redirect('/')
})


app.listen(3000, ()=>{
    console.log("app is listening on http://localhost:3000");    
})