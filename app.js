//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// using express
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];

app.get("/", function(req, res){
  res.render("home", {paragraph: homeStartingContent, postObject: items })
});

// About page
app.get("/About", function(req, res){
  res.render("about", {paragraph: aboutContent})
});

// contact page
app.get("/contact", function(req, res){
  res.render("contact", {paragraph: contactContent})
});

// compose page..
app.get("/compose", function(req, res){
  res.render("compose")
});

// posting on compose page
 app.post("/compose", function(req, res){
  const postObject = {
    input: req.body.confession,
    text: req.body.postArea
  };
  items.push(postObject);
  console.log(items);
  res.redirect("/");
 });

//  getting the url and posting the data(using express routers)
 app.get("/postObject/:testing", function(req, res){
   const paraName = req.params.testing;
   items.forEach(function(postObject){
    var post1 =  _.lowerCase([paraName]);
    var post2 = _.lowerCase([postObject.input]);
    if(post1 == post2){
      res.render("post", {SendPost1: paraName, SendPost2: postObject.text})
    }
   });
 });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
