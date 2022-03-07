const express = require("express");
const app = express();

app.get("/books", logger, (req,res) =>{
    return res.send({ route: "/books"});
})

app.get("/libraries", logger, checkPermission("librarian") , (req,res) =>{
    return res.send( { route: "/libraries", permission: req.permission});
})

app.get("/authors", logger, checkPermission("author") , (req,res) =>{
    return res.send({ route: "/authors", permission: req.permission});
})

function logger(req,res,next){
   return next();
}

function checkPermission(user){
    return function logg(req,res,next){
        if(user == "librarian" || user =="author"){
            req.permission = true;
            return next();
        }
    }
}

app.listen("5000",()=>{
    console.log("Listening port 5000");
})