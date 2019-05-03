const inquirer  = require('./inquirer');
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:11001", neo4j.auth.basic("neo4j", "12345"));
const session = driver.session();

module.exports = {

 run1 : async () => {
  const choice = await inquirer.clubPlayers();
      session
      .run("MATCH p=(a)-[r:PLAYS_FOR]->(c) where c.name=$name RETURN p",{name: choice.cname})
      .then(function(resp){
        resp.records.forEach(function(val){console.log(val._fields[0].start.properties.name);});})
      .catch(function(err){console.log(err);});
},

/*run2 : async (callback) => {
  const choice = await inquirer.matchDetails();
  var name1 = 'empty';
  name1 = 'name1';
  callback(name1);
},*/

run2 : async (callback) => {
  const choice = await inquirer.matchDetails();
      session
      .run("MATCH p=(h:Club)-[r:home]->(m:Match)<-[q:away]->(a:Club) where m.name=$name RETURN h,a",{name: choice.mname})
      .then(function(resp){
        resp.records.forEach(function(val){
          console.log("Home:"+val._fields[0].properties.name)
          console.log("Away:"+val._fields[1].properties.name)
          ;});})
      .catch(function(err){console.log(err);});
},

run3 : async () => {
  const choice = await inquirer.playerCountry();
      session
      .run("MATCH (p)-[r:PLAYS_FOR]->(t:Country) where p.name=$name RETURN p,t",{name: choice.player})
      .then(function(resp){
        resp.records.forEach(function(val){ 
          console.log(val._fields[0].properties.name+" plays for "+val._fields[1].properties.name);
          ;});})
      .catch(function(err){console.log(err);});
},

run4 : async () => {
  const choice = await inquirer.manager();
  console.log(choice.tname);
      session
      .run("MATCH (m)-[r:MANAGES]->(t) where t.name=$name RETURN m,t",{name: choice.tname})
      .then(function(resp){
        resp.records.forEach(function(val){ 
          console.log(val._fields[0].properties.name+" manages "+val._fields[1].properties.name);
          ;});})
      .catch(function(err){console.log(err);});
},

run5 : async () => {
  const choice = await inquirer.playingInMatch();
  console.log(choice.mname);
  session
  .run("MATCH (m)<-[h:home]-(c:Club) where m.name=$name RETURN c",{name: choice.mname})
  .then(function(resp){
    resp.records.forEach(function(val){ 
      val.forEach(function(n){console.log("------------------------------");console.log(n.properties.name);console.log("------------------------------");});
      ;});})
      .catch(function(err){console.log(err);});

      session
      .run("MATCH (p)-[r:STARTING]->(m)<-[h:home]-(c:Club)<-[z:PLAYS_FOR]-(p) where m.name=$name RETURN p",{name: choice.mname})
      .then(function(resp){
        resp.records.forEach(function(val){ 
          val.forEach(function(n){console.log(n.properties.name)});
          ;});})
          .catch(function(err){console.log(err);});
          
          session
          .run("MATCH (p)-[r:SUB]->(m)<-[h:home]-(c:Club)<-[z:PLAYS_FOR]-(p) where m.name=$name RETURN p",{name: choice.mname})
          .then(function(resp){console.log("****Subs*****");
            resp.records.forEach(function(val){
              val.forEach(function(n){console.log(n.properties.name)});
              ;});})
              .catch(function(err){console.log(err);});

       session
          .run("MATCH (m)<-[h:away]-(c:Club) where m.name=$name RETURN c",{name: choice.mname})
          .then(function(resp){
            resp.records.forEach(function(val){ 
              val.forEach(function(n){console.log("------------------------------");console.log(n.properties.name);console.log("------------------------------");});
              ;});})
              .catch(function(err){console.log(err);});

          session
          .run("MATCH (p)-[r:STARTING]->(m)<-[h:away]-(c:Club)<-[z:PLAYS_FOR]-(p) where m.name=$name RETURN p",{name: choice.mname})
          .then(function(resp){
            resp.records.forEach(function(val){ 
              val.forEach(function(n){console.log(n.properties.name)});
              ;});})  
      .catch(function(err){console.log(err);});
      
      session
          .run("MATCH (p)-[r:SUB]->(m)<-[h:away]-(c:Club)<-[z:PLAYS_FOR]-(p) where m.name=$name RETURN p",{name: choice.mname})
          .then(function(resp){console.log("****Subs*****");
            resp.records.forEach(function(val){
              val.forEach(function(n){console.log(n.properties.name)});
              ;});})
              .catch(function(err){console.log(err);});
}

}


