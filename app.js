var express = require ("express");
var ejs = require ("ejs");
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");
var app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// MONGOOSE/MODEL SCHEMA
var blogSchema = new mongoose.Schema({
  title: String,
  image: {type: String, default: "placeholderimage.jpg"},
  body: {String},
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1465915147858-4a9762d4ff68?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5dd96b113b2b58309989e3820d046095&auto=format&fit=crop&w=1050&q=80",
//   body: "Hello this is a test blog"
// });

// RESTFUL ROUTES
app.get("/", function(req,res){
  res.redirect("/blogs");
});
app.get("/blogs", function(req,res){
  Blog.find({},function(err,blogs){
    if(err){
      console.log("Error");
    }else{
      res.render("index",{blogs: blogs});
    }
  });
});

app.listen(3000, function(){
  console.log("blog server started ....");
});
