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
// RESTFUL ROUTES
app.get("/", function(req,res){
  res.redirect("/blogs");
});
app.get("/blogs", function(req,res){
  res.render("index");
});

app.listen(3000, function(){
  console.log("blog server started ....");
});
