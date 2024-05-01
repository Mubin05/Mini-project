const express=require("express");
const app=express();
const mongoose = require("mongoose");
const path = require("node:path");
const methodoverride=require("method-override");
const Chat=require("./models/chat.js"); 
const port = process.env.PORT||8080;

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
 main()
    .then(()=> {
         console.log("connection successful");
    })
    .catch(err => console.log(err));
async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 }
 //Main route
 app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{ chats });
});

//home route
app.get("/",(req,res)=>{
     res.send("root is working")
 });
 //NEW route
 app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
});
//CREATE Route
app.post("/chats",(req,res)=>{
    let { from,to,msg }=req.body;

    let newChat= new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat
    .save()
    .then(res => {
        console.log("chat was saved")
    })
    .catch(err => {console.log(err)});
    res.redirect("/chats");
})

//Edit Route

app.get("/chats/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
//UPDATE route
app.put("/chats/:id", async (req,res) => {
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg: newMsg}, { runValidators: true, new: true});
    console.log(updatedchat);
    res.redirect("/chats");
});

//DEstroy route
app.delete("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let Deleted_chat= await Chat.findByIdAndDelete(id);
    console.log(Deleted_chat);
    res.redirect("/chats");
})
app.listen(port,()=>{
    console.log("server is listing on port 8080");
});
