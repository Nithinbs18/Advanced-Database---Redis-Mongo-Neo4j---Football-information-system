var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:11004", neo4j.auth.basic("neo4j", "12345"));
const session = driver.session();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
   res.send('<h2>This is a demo of neo4j');
});
app.get("/create", function(req,res){
//    const resultPromise = session.run(
//   "create(a:player{name:$name}) -[:plays_for]->(cname:club{name:$cname}) ",
//   {
//       name: "qwerty",
//       cname: "asdfg"
//    }
//    );
//    resultPromise.then(result => {
//      session.close();
     res.send('<h2>data inserted</h2>');
//      console.log(node.properties);
//      driver.close();
//    });
//    resultPromise.catch(function(err){
//      console.log(err);
//    });
});


app.get("/read", function(req,res){
   session
      .run("MATCH p=(a)-[r:PLAYS_FOR]->(b) RETURN p")
      .then(function(resp){
         // console.log(resp.length);
         resp.records.forEach(function(val){
            console.log(val._fields[0].start.properties.name);
            console.log(val._fields[0].relationship);
            console.log(val._fields[0].end.properties.name);
            console.log(val._fields[0]);
         });
         res.render("res.ejs");
      })
      .catch(function(err){
     console.log(err); });
});
app.listen(1111, function(){console.log("server started")});
