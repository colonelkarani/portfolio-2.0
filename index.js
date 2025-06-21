require("dotenv").config();
const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Blog = require("./blogModel")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.get("/blogs/:slug",async(req,res)=>{
    const blog = await Blog.findOne({slug: req.params.slug})
    if (!blog){
        return res.status(404).send(" blog not found")
    }
    res.render("blog", {blog})
})

app.use(express.static(path.join(__dirname , "public")));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())

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
app.post("/api/blog", async(req,res)=>{
    const blog = new Blog(req.body)
    try {
        const savedBlog = await blog.save()
        console.log("New Blog Created"
            + blog
        ); 
        res.redirect("/")       
    } catch (error) {
        console.log("error creating new blog  "+ error );        
    }
})
app.listen(3000, ()=>{
    console.log("app is listening on http://localhost:3000");    
})