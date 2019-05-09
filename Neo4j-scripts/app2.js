var readline = require('readline');
const api  = require('./app_1.js');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/AIS';

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
          recursiveAsyncReadLine();
      }
      if (answer == '0'){
         process.exit()
      }
  }
);
};

recursiveAsyncReadLine(); 