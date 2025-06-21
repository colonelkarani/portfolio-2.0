require("dotenv").config();
const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Blog = require("./models/blogModel");
const { type } = require("os");
const { log } = require("console");
const Contact = require("./models/contactModel")
const Project = require("./models/projectModel")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.get("/blogs/:slug",async(req,res)=>{
    const blog = await Blog.findOne({slug: req.params.slug})
    if (!blog){
        return res.status(404).send(" blog not found")
    }
    res.render("blogs", {blog})
})

app.get("/project", (req, res)=>{
    res.render("project")
})

app.get("/blog", async(req,res)=>{
    const blogs = await Blog.find()
   
    res.render("blog", {blogs})
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
     subject: String,
     email:String})

const Message = mongoose.model("Messages", MessageSchema);
//Message.insertOne({fullname:"Victor", message:"How can I contact yjou?", email:"Mavnovo@gmail.com"})


app.post("/contact", async (req, res)=>{
    const {fullname, email,subject, message}= req.body
    const NewMessage = new Message({fullname, email,  subject ,message})
    await NewMessage.save().then(console.log("message saved"))
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
app.post("/api/project", async(req,res)=>{
    const project = new Project(req.body)
    try {
        const savedProject = await project.save()
        console.log("New project Created"
            + project
        ); 
        res.redirect("/")       
    } catch (error) {
        console.log("error creating new project  "+ error );        
    }
})
app.get('/project/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('project', { project });
});


app.listen(3000, ()=>{
    console.log("app is listening on http://localhost:3000");    
})