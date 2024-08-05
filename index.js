import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose
    .connect("mongodb://127.0.0.1:27017",{
        dbName:"backend2",
    })
    .then(()=>console.log("Databse connected"))
    .catch((e)=> console.log(e));
    
    const messageSchema = new mongoose.Schema({
        name:String,
        email:String
    });

    const Messge = mongoose.model("Message", messageSchema);

const app = express();

app.use(express.static(path.join(path.resolve(),"public")));

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render(index);
});

app.get("/success", (req,res)=>{
    res.render("success");
});

app.post("/contact", async (req,res)=>{
    // console.log(req.body);
    const {name,email} = req.body;
    await Messge.create({name: name, email: email});

    res.redirect("/success");
});

app.listen(5000,()=>{
    console.log("Server is working");
});