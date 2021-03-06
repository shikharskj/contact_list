const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Contact_collection = require("./models/contact");

const app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded()); // parser---> also a middleware
app.use(express.static("assets"));

var contactList=[
    {   name:"Shikhar",
        phone:"6394816023"
    },
    {    name:"Tony Stark",
         phone:"9415245608"
    },
    {   name:"Vaibhav",
        phone:"7023757394"
    }
];
app.get("/", function(req,res){
    // console.log(__dirname);
    Contact_collection.find({},function(error,contacts){
        if(error){
            console.log("error in fetching contacts from DB");
            return;
        }
        return res.render("home",{
            title:"Contacts List",
            contact_list: contacts
        });
    });
});

app.get("/practice",function(req,res){
    return res.render("practice",{
        title:"Let us play with EJS"
    })
});
// form request
app.post("/Create-contact",function(req,res){
    Contact_collection.create({
        name:req.body.name,
        phone:req.body.phone
    },function(error,newContact){
        if(error){
            console.log("error in creating a contact");
            return;
        }

        console.log("****",newContact);
        return res.redirect("back");
    });
});
//for deleting the contact
app.get("/delete-contact",function(req,res){
    //get the id from query in the url
    let id = req.query.id;
    // find the contact in DB using id and delete it
    Contact_collection.findByIdAndDelete(id,function(error){
        if(error){
            console.log("ERROR in deleting an object from DB");
            return;
        }
        return res.redirect("back");
    });
});
app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("Yup, my express server is up and running on port:",port);
});
