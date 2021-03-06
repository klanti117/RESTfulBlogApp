var express = require ("express");
var ejs = require ("ejs");
var bodyParser = require ("body-parser");
var methodOverride = require ("method-override");
var mongoose = require ("mongoose");
var app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// MONGOOSE/MODEL SCHEMA
var blogSchema = new mongoose.Schema({
  title: String,
  image: {type: String, default: "placeholderimage.jpg"},
  body: String,
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
// INDEX ROUTE
app.get("/blogs", function(req,res){
  Blog.find({},function(err,blogs){
    if(err){
      console.log("Error");
    }else{
      res.render("index",{blogs: blogs});
    }
  });
});
//NEW ROUTE
app.get("/blogs/new", function(req,res){
  res.render("new");
});
//CREATE ROUTE
app.post("/blogs", function(req,res){
  //create the blog
  Blog.create(req.body.blog, function(err,newBlog){
    if(err){
      res.render("new");
    }else{
      //redirect to index
      res.redirect("/blogs");
    }
  });
});
// SHOW ROUTE
app.get("/blogs/:id",function(req,res){
  Blog.findById(req.params.id,function(err, blog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.render("show",{blog: blog});
    }
  });
});
// EDIT ROUTES
app.get("/blogs/:id/edit",function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.render("edit",{blog: blog});
    }
  });
});
// UPDATE ROUTES
app.put("/blogs/:id", function(req,res){
  console.log("Title : " + req.body.blog.title + "\nImage URL : " + req.body.blog.image + "\nDescription : " + req.body.blog.body + "\n");
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
    if(err){
      console.log(err);
      res.redirect("/blogs");
    }else{
      var showUrl = "/blogs/" + blog._id;
      res.redirect(showUrl);
    }
  });
});
// DELETE ROUTES
app.delete("/blogs/:id", function(req, res){
  //delete blogs
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/blogs");
    }else{
      res.redirect("/blogs");
    }
  });
});
//LISTEN
app.listen(3000, function(){
  console.log("blog server started ....");
});
