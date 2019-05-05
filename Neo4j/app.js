var readline = require('readline');
const api  = require('./app_1.js');
const figlet  = require('figlet');
const chalk  = require('chalk');
// clear();
console.log(
  chalk.yellow(
    figlet.textSync('Advanced Database', { horizontalLayout: 'full' })
  )
);
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("1. List of player of a club");
console.log("2. Details of a match");
console.log("3. National team of a player");
console.log("4. Manager of the club");
console.log("5. Starting line up and Substitutes of a match");
var recursiveAsyncReadLine = function () {
  rl.question('Enter your Choice:', function (answer) {
   switch (answer) {
      case '1':
            api.run1();
            break;
      case '2':
            api.run2();
         break;
      case '3':
            api.run3();
         break;
      case '4':
            api.run4();
         break;
      case '5':
            api.run5();
         break;
      default:
          recursiveAsyncReadLine(); //Calling this function again to ask new question
      }
      if (answer == '0'){
         process.exit()
      }
      // else 
      //    recursiveAsyncReadLine(); 
  });
};

recursiveAsyncReadLine(); 

// players of club
// MATCH p=(a)-[r:PLAYS_FOR]->(c) where c.name="Chelsea" RETURN p
// match details
// MATCH p=(h:Club)-[r:home]->(m:Match)<-[q:away]->(a:Club) where m.name="Chelsea_vs_Liverpool" RETURN h,a
// country of a player
// MATCH (p)-[r:PLAYS_FOR]->(t:Country) where p.name="" RETURN p,t
// manager details of a team
// MATCH (m)-[r:MANAGES]->(t) where t.name="Chelsea" RETURN m,t

// As an end user, I want to know the number of matches my favourite teamis playing as home or away team in a league of my choice.

// all match:
// MATCH (u:User)-[r:FOLLOWS]->(c:Club)-->(m:Match) where u.name="akshay" RETURN m
// home:
// MATCH (u:User)-[r:FOLLOWS]->(c:Club)-[h:home]->(m:Match) where u.name="akshay" RETURN m
// away
// MATCH (u:User)-[r:FOLLOWS]->(c:Club)-[h:away]->(m:Match) where u.name="akshay" RETURN m


// As an end user, I want to know the name,venue,date,description of themeet-ups associated with my favourite team

// MATCH (u:User)-[r:FOLLOWS]->(c:Club)<--(m:meetup) where u.name="akshay" RETURN m

// As an end user, I want to know the total number of meet-ups formy favourite team.

// MATCH (u:User)-[r:FOLLOWS]->(c:Club)<--(m:meetup) where u.name="akshay" RETURN Count(m)

// matches in will a specific player is appeared

// MATCH (p)-[:STARTING|:SUB]->(m) where p.name="Willy_Caballero" RETURN p,m

// organizer details
// MATCH p=(u:User)-[r:organize]->(m) where m.name="UMU_LP" RETURN u