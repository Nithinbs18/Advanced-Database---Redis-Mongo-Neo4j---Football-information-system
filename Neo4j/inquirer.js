const inquirer   = require('inquirer');
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:11004", neo4j.auth.basic("neo4j", "12345"));
const session = driver.session();

module.exports = {

  clubPlayers: () => {
    const questions = [
      {
        name: 'cname',
        type: 'list',
        message: 'Enter the club name to retrive the Players:',
        choices: ['Chelsea',' Manchester_United','Liverpool']
      }
    ];
    return inquirer.prompt(questions);
  },

  matchDetails: () => {
    const questions = [
      {
        name: 'mname',
        type: 'list',
        message: 'Enter the name name of the match',
        choices: ['Chelsea_vs_Manchester_United','Chelsea_vs_Liverpool','Manchester_United_vs_Chelsea','Manchester_United_vs_Liverpool','Liverpool_vs_Chelsea','Liverpool_vs_Manchester_United']
      }
    ];
    return inquirer.prompt(questions);
  },

  playerDetails: () => {
    const questions = [
      {
        name: 'player',
        type: 'input',
        message: 'Enter the player name:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  playerCountry: () => {
    const questions = [
      {
        name: 'player',
        type: 'input',
        message: 'Enter the player name:',
      }
    ];
    return inquirer.prompt(questions);
  },

  manager: () => {
    const questions = [
      {
        name: 'tname',
        type: 'list',
        message: 'Select the club:',
        choices: ['Chelsea','Manchester_United','Liverpool']
      }
    ];
    return inquirer.prompt(questions);
  },

  playingInMatch: () => {
    const questions = [
      {
        name: 'mname',
        type: 'list',
        message: 'Enter the name name of the match',
        choices: ['Chelsea_vs_Manchester_United','Chelsea_vs_Liverpool','Manchester_United_vs_Chelsea','Manchester_United_vs_Liverpool','Liverpool_vs_Chelsea','Liverpool_vs_Manchester_United']
      }
    ];
    return inquirer.prompt(questions);
  }

}
