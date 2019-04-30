var readline = require('readline');
const api  = require('./app_1.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
         console.log("bbye");
         break;
      default:
          recursiveAsyncReadLine(); //Calling this function again to ask new question
      }
      if (answer == '0'){
         process.exit()
      }
      else 
         recursiveAsyncReadLine(); 
  });
};

recursiveAsyncReadLine(); 